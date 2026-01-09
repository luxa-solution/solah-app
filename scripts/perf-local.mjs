// scripts/perf-local.mjs
import {execSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const PERF_DIR = ".perf";
const OUT_DIR = path.join(PERF_DIR, "export");
const BASELINE_FILE = path.join(PERF_DIR, "main-baseline.json");
const LOCK_FILE = path.join(PERF_DIR, "lock");

const BASE_BRANCH = "main";        // local main only
const BASE_REF = BASE_BRANCH;

// ---- Config (env overrides) ----
const CFG = {
  WARN_ABS_MB: Number(process.env.PERF_WARN_ABS_MB ?? "15"),
  WARN_DELTA_MB: Number(process.env.PERF_WARN_DELTA_MB ?? "0.5"),
  WARN_DELTA_PCT: Number(process.env.PERF_WARN_DELTA_PCT ?? "10"),
  WARN_NEW_DEPS: Number(process.env.PERF_WARN_NEW_DEPS ?? "2"),

  TOP_N: Number(process.env.PERF_TOP_N ?? "10"),
  LARGE_FILE_KB: Number(process.env.PERF_LARGE_FILE_KB ?? "200"),
  HUGE_FILE_KB: Number(process.env.PERF_HUGE_FILE_KB ?? "500"),

  SKIP: process.env.PERF_SKIP === "1",
  VERBOSE: process.env.PERF_VERBOSE === "1",

  // Always run even if no relevant changes
  FORCE: process.env.PERF_FORCE === "1",

  // Refresh baseline explicitly and exit (best-effort)
  BASELINE_ONLY: process.env.PERF_BASELINE === "1",

  // lock age threshold
  LOCK_TTL_MS: 2 * 60 * 1000,
};

// Same filter as your workflow (edit as needed)
const RELEVANT_PATHS = [
  "src/",
  "assets/",
  "app.json",
  "app.config.",
  "metro.config",
  "babel.config",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  ".github/workflows/",
  ".eas/workflows/",
];

// ---- tiny helpers ----
function ensureDir(p) {
  fs.mkdirSync(p, {recursive: true});
}

function fileExists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function rmrf(p) {
  fs.rmSync(p, {recursive: true, force: true});
}

function sh(cmd, opts = {}) {
  if (CFG.VERBOSE) console.log(`🔍 ${cmd}`);
  return execSync(cmd, {stdio: "pipe", encoding: "utf8", ...opts}).trim();
}

function safeSh(cmd, fallback = "") {
  try {
    return sh(cmd);
  } catch {
    return fallback;
  }
}

function bytesToMB(b) {
  return b / (1024 * 1024);
}

function fmtMB(b) {
  return `${bytesToMB(b).toFixed(2)} MB`;
}

function fmtKB(b) {
  return `${(b / 1024).toFixed(1)} KB`;
}

function isRelevant(file) {
  return RELEVANT_PATHS.some((p) => {
    if (p.endsWith("/")) return file.startsWith(p);
    if (p.endsWith(".")) return file.startsWith(p) || path.basename(file).startsWith(p);
    return file === p || file.includes(p);
  });
}

function walk(dir) {
  let total = 0;
  const files = [];

  function go(current) {
    for (const entry of fs.readdirSync(current, {withFileTypes: true})) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) go(full);
      else {
        try {
          const st = fs.statSync(full);
          total += st.size;
          files.push({file: path.relative(dir, full), bytes: st.size});
        } catch {}
      }
    }
  }

  if (fileExists(dir)) go(dir);
  return {total, files};
}

function getDependencyCount(repoDir = process.cwd()) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(repoDir, "package.json"), "utf8"));
    const deps = Object.keys(pkg.dependencies || {}).length;
    const dev = Object.keys(pkg.devDependencies || {}).length;
    return {deps, dev, total: deps + dev};
  } catch {
    return {deps: 0, dev: 0, total: 0};
  }
}

// ---- locking (non-blocking) ----
function acquireLock() {
  ensureDir(PERF_DIR);

  if (fileExists(LOCK_FILE)) {
    try {
      const st = fs.statSync(LOCK_FILE);
      const age = Date.now() - st.mtimeMs;
      if (age < CFG.LOCK_TTL_MS) {
        console.log("ℹ️ Perf check already running (lock present). Skipping.");
        return false;
      }
      rmrf(LOCK_FILE);
    } catch {
      console.log("ℹ️ Perf lock present but could not be validated. Skipping.");
      return false;
    }
  }

  fs.writeFileSync(LOCK_FILE, `${process.pid}\n${new Date().toISOString()}\n`, {flag: "w"});
  return true;
}

function releaseLock() {
  try {
    fs.unlinkSync(LOCK_FILE);
  } catch {}
}

// ---- git helpers (LOCAL main only) ----
function hasLocalMain() {
  // exists if rev-parse succeeds
  return !!safeSh(`git rev-parse ${BASE_REF}`, "");
}

function getLocalMainSha() {
  return safeSh(`git rev-parse ${BASE_REF}`, "");
}

function getChangedFilesVsLocalMain() {
  const raw = safeSh(`git diff --name-only ${BASE_REF}...HEAD`, "");
  return raw ? raw.split("\n").filter(Boolean) : [];
}

// ---- baseline management ----
function readBaseline() {
  if (!fileExists(BASELINE_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(BASELINE_FILE, "utf8"));
  } catch {
    return null;
  }
}

/**
 * Best-effort baseline update. Never throws.
 * - Rebuild if missing or local main sha changed.
 * - If worktree export fails, keep old baseline (if any) and continue.
 */
function ensureBaseline(mainSha) {
  if (!mainSha) {
    console.log("ℹ️ No local main SHA available. Baseline unavailable.");
    return readBaseline();
  }

  const cached = readBaseline();
  if (cached?.mainSha === mainSha && typeof cached.exportBytes === "number") {
    return cached;
  }

  console.log("\n==============================================================");
  console.log("📌 Updating local baseline (local main changed or missing)");
  console.log("==============================================================");
  console.log(`Baseline SHA: ${mainSha.slice(0, 7)} (${BASE_REF})`);

  // Build baseline in a detached worktree at local main SHA
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "perf-main-"));
  const wtDir = path.join(tmpDir, "wt");

  try {
    execSync(`git worktree add --detach "${wtDir}" ${mainSha}`, {stdio: "ignore"});

    // Worktree has no node_modules. Install.
    console.log("Installing deps in worktree (npm ci)...");
    execSync(`npm ci`, {cwd: wtDir, stdio: "inherit"});

    const wtOut = path.join(wtDir, OUT_DIR);
    rmrf(wtOut);
    ensureDir(path.dirname(wtOut));

    console.log("Running baseline export in worktree...");
    execSync(`npx expo export --platform android --output-dir "${OUT_DIR}"`, {
      cwd: wtDir,
      stdio: "inherit",
    });

    const {total, files} = walk(wtOut);
    files.sort((a, b) => b.bytes - a.bytes);

    const deps = getDependencyCount(wtDir);

    const baseline = {
      mainSha,
      generatedAt: new Date().toISOString(),
      platform: "android",
      exportBytes: total,
      exportMB: bytesToMB(total),
      depCount: deps.total,
      topFiles: files.slice(0, CFG.TOP_N).map((f) => ({file: f.file, bytes: f.bytes})),
    };

    ensureDir(PERF_DIR);
    fs.writeFileSync(BASELINE_FILE, JSON.stringify(baseline, null, 2));

    console.log(`✅ Baseline cached: ${fmtMB(total)} (deps: ${deps.total})`);
    return baseline;
  } catch (e) {
    console.log("⚠️ Failed to build baseline. Keeping previous baseline if any.");
    console.log(e?.message ?? e);
    return cached ?? null;
  } finally {
    try {
      execSync(`git worktree remove --force "${wtDir}"`, {stdio: "ignore"});
    } catch {}
    try {
      rmrf(tmpDir);
    } catch {}
  }
}

// ---- main compare ----
function analyzeCurrentExport() {
  rmrf(OUT_DIR);
  ensureDir(PERF_DIR);

  console.log("\n==============================================================");
  console.log("🚀 Exporting current branch (android)");
  console.log("==============================================================");
  execSync(`npx expo export --platform android --output-dir "${OUT_DIR}"`, {stdio: "inherit"});

  const {total, files} = walk(OUT_DIR);
  files.sort((a, b) => b.bytes - a.bytes);

  const topFiles = files.slice(0, CFG.TOP_N);
  const huge = files.filter((f) => f.bytes / 1024 > CFG.HUGE_FILE_KB);

  return {total, files, topFiles, huge};
}

function buildWarnings({currentBytes, baseBytes, currentDeps, baseDeps, hugeCount}) {
  const warnings = [];

  const curMB = bytesToMB(currentBytes);
  if (curMB >= CFG.WARN_ABS_MB) warnings.push(`Export size ${curMB.toFixed(2)}MB >= ${CFG.WARN_ABS_MB}MB`);

  if (typeof baseBytes === "number") {
    const delta = currentBytes - baseBytes;
    const deltaMB = bytesToMB(delta);
    const pct = baseBytes > 0 ? (delta / baseBytes) * 100 : 0;

    if (deltaMB >= CFG.WARN_DELTA_MB) warnings.push(`Size increased by +${deltaMB.toFixed(2)}MB`);
    if (pct >= CFG.WARN_DELTA_PCT) warnings.push(`Size increased by +${pct.toFixed(1)}%`);
  }

  if (typeof baseDeps === "number") {
    const depDelta = currentDeps - baseDeps;
    if (depDelta > CFG.WARN_NEW_DEPS) warnings.push(`Added +${depDelta} dependencies`);
  }

  if (hugeCount > 0) warnings.push(`Found ${hugeCount} huge files > ${CFG.HUGE_FILE_KB}KB`);

  return warnings;
}

function printSummary({current, baseline}) {
  const currentBytes = current.total;
  const currentDeps = getDependencyCount(process.cwd()).total;

  const baseBytes = baseline?.exportBytes;
  const baseDeps = baseline?.depCount;

  const curMB = bytesToMB(currentBytes);
  const warnAbs = curMB >= CFG.WARN_ABS_MB;

  let deltaLine = "_No baseline available._";
  let depLine = `${currentDeps}`;
  if (typeof baseBytes === "number") {
    const delta = currentBytes - baseBytes;
    const pct = baseBytes > 0 ? (delta / baseBytes) * 100 : 0;
    const sign = delta >= 0 ? "+" : "";
    deltaLine = `${sign}${bytesToMB(delta).toFixed(2)}MB (${sign}${pct.toFixed(1)}%)`;
  }
  if (typeof baseDeps === "number") {
    const depDelta = currentDeps - baseDeps;
    const sign = depDelta >= 0 ? "+" : "";
    depLine = `${currentDeps} (${sign}${depDelta})`;
  }

  console.log("\n==============================================================");
  console.log("📊 Local Performance Preview (vs local main)");
  console.log("==============================================================");

  console.log(`Export size (android): ${fmtMB(currentBytes)} ${warnAbs ? "⚠️" : "✅"}`);
  console.log(`Δ vs main baseline:    ${deltaLine}`);
  console.log(`Dependencies:          ${depLine}`);
  console.log(`Huge files:            ${current.huge.length} (>${CFG.HUGE_FILE_KB}KB)`);

  console.log("\nSummary");
  console.log(`- Abs threshold: ${CFG.WARN_ABS_MB}MB`);
  console.log(`- Delta threshold: +${CFG.WARN_DELTA_MB}MB or +${CFG.WARN_DELTA_PCT}%`);
  console.log(`- New deps threshold: +${CFG.WARN_NEW_DEPS}`);

  console.log(`\nTop ${CFG.TOP_N} largest files:`);
  current.topFiles.forEach((f, idx) => {
    const prefix = idx < 3 ? "🔥" : "•";
    console.log(`${prefix} ${fmtKB(f.bytes).padStart(9)}  ${f.file}`);
  });

  return {currentDeps, baseBytes, baseDeps};
}

async function main() {
  if (CFG.SKIP) {
    console.log("ℹ️ PERF_SKIP=1 set. Skipping perf preview.");
    process.exit(0);
  }

  const locked = acquireLock();
  if (!locked) process.exit(0);

  try {
    if (!hasLocalMain()) {
      console.log("ℹ️ Local 'main' not found. Running absolute-only check (no baseline).");
    }

    const mainSha = getLocalMainSha();

    // Fast path: skip if no relevant changes vs local main
    if (!CFG.FORCE && mainSha) {
      const changed = getChangedFilesVsLocalMain();
      const relevant = changed.filter(isRelevant);
      if (changed.length > 0 && relevant.length === 0) {
        console.log("✅ Perf preview skipped (no relevant changes vs local main).");
        process.exit(0);
      }
    }

    // If user wants only baseline refresh
    if (CFG.BASELINE_ONLY) {
      ensureBaseline(mainSha);
      console.log("✅ Baseline refresh done (best-effort).");
      process.exit(0);
    }

    // Baseline (best-effort, cached)
    const baseline = ensureBaseline(mainSha);

    // Current export + analysis
    const current = analyzeCurrentExport();
    const {currentDeps, baseBytes, baseDeps} = printSummary({current, baseline});

    const warnings = buildWarnings({
      currentBytes: current.total,
      baseBytes,
      currentDeps,
      baseDeps,
      hugeCount: current.huge.length,
    });

    if (warnings.length === 0) {
      console.log("\n✅ Looks good (no warnings).");
      process.exit(0);
    }

    console.log("\n⚠️ Warnings (info-only):");
    warnings.forEach((w) => console.log(`- ${w}`));
    console.log("\nℹ️ Non-blocking. To skip perf entirely: PERF_SKIP=1 git push");
    process.exit(0);
  } catch (e) {
    console.log("\n⚠️ Perf preview failed (non-blocking).");
    console.log(e?.message ?? e);
    console.log("ℹ️ Continuing without perf preview.");
    process.exit(0);
  } finally {
    releaseLock();
  }
}

main();
