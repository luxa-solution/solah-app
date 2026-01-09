// scripts/perf-local.mjs
import {execSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PERF_DIR = ".perf";
const OUT_DIR = path.join(PERF_DIR, "export");
const LOCK_FILE = path.join(PERF_DIR, "lock");

// ---- Config (env overrides) ----
const CFG = {
  WARN_ABS_MB: Number(process.env.PERF_WARN_ABS_MB ?? "15"),
  TOP_N: Number(process.env.PERF_TOP_N ?? "10"),
  LARGE_FILE_KB: Number(process.env.PERF_LARGE_FILE_KB ?? "200"),
  HUGE_FILE_KB: Number(process.env.PERF_HUGE_FILE_KB ?? "500"),

  SKIP: process.env.PERF_SKIP === "1",
  VERBOSE: process.env.PERF_VERBOSE === "1",

  // If set, always run even if no relevant changes (kept for convenience)
  FORCE: process.env.PERF_FORCE === "1",

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

function bytesToKB(b) {
  return b / 1024;
}

/**
 * Format bytes:
 * - show KB when between 0 and 999 KB (inclusive of 0, exclusive of 1000)
 * - show MB when >= 1000 KB
 */
function fmtSize(bytes) {
  const kb = bytesToKB(bytes);
  if (kb < 1000) return `${kb.toFixed(1)} KB`;
  const mb = bytesToMB(bytes);
  return `${mb.toFixed(2)} MB`;
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
        } catch {
          // ignore
        }
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

// ---- locking (non-blocking; skip if another run is active) ----
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
  } catch {
    // ignore
  }
}

// ---- change detection (local main only) ----
function getChangedFilesVsLocalMain() {
  // If "main" doesn't exist locally, we can't diff. Just return [] so we run anyway.
  const hasMain = !!safeSh("git rev-parse main", "");
  if (!hasMain) return [];

  const raw = safeSh("git diff --name-only main...HEAD", "");
  return raw ? raw.split("\n").filter(Boolean) : [];
}

// ---- expo asset hash -> original name mapping ----
function loadAssetMap(exportDir) {
  const metaPath = path.join(exportDir, "metadata.json");
  if (!fs.existsSync(metaPath)) return new Map();

  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    const map = new Map();

    for (const asset of meta.assets ?? []) {
      const baseDir = asset.fileSystemLocation || "";
      const name = asset.name;
      const type = asset.type;

      // Prefer a relative-ish path if possible
      // fileSystemLocation often contains absolute path; try to strip repo root.
      const repoRoot = process.cwd().replace(/\\/g, "/");
      const baseNormalized = String(baseDir).replace(/\\/g, "/");
      const baseRel =
        baseNormalized.startsWith(repoRoot) ? baseNormalized.slice(repoRoot.length).replace(/^\/+/, "") : baseNormalized;

      for (const hash of asset.fileHashes ?? []) {
        const original = baseRel
          ? path.posix.join(baseRel, `${name}.${type}`)
          : `${name}.${type}`;
        map.set(hash, original);
      }
    }

    return map;
  } catch {
    return new Map();
  }
}

// ---- main compare (current only) ----
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
  const large = files.filter((f) => f.bytes / 1024 > CFG.LARGE_FILE_KB);

  return {total, files, topFiles, huge, large};
}

function resolveReasonableName(fileRelPath, assetMap) {
  // Metro-hashed assets are often in "assets/<hash>" (sometimes with extension).
  // Try to map the last path segment (hash) to the original path via metadata.json.
  const base = path.basename(fileRelPath);
  const noExt = base.replace(/\.[^/.]+$/, "");

  return assetMap.get(base) ?? assetMap.get(noExt) ?? fileRelPath;
}

function printSummary({current}) {
  const currentDeps = getDependencyCount(process.cwd()).total;

  const absMB = bytesToMB(current.total);
  const warnAbs = absMB >= CFG.WARN_ABS_MB;

  const assetMap = loadAssetMap(OUT_DIR);

  console.log("\n==============================================================");
  console.log("📊 Local Performance Preview (current only)");
  console.log("==============================================================");

  console.log(`Export size (android): ${fmtSize(current.total)} ${warnAbs ? "⚠️" : "✅"}`);
  console.log(`Dependencies:          ${currentDeps}`);
  console.log(`Huge files:            ${current.huge.length} (>${CFG.HUGE_FILE_KB}KB)`);

  console.log("\nSummary");
  console.log(`- Abs threshold: ${CFG.WARN_ABS_MB}MB`);
  console.log(`- Huge files threshold: >${CFG.HUGE_FILE_KB}KB`);
  console.log(`- Large files threshold: >${CFG.LARGE_FILE_KB}KB`);

  console.log(`\nTop ${CFG.TOP_N} largest files:`);
  current.topFiles.forEach((f, idx) => {
    const prefix = idx < 3 ? "🔥" : "•";
    const pretty = resolveReasonableName(f.file, assetMap);
    console.log(`${prefix} ${fmtSize(f.bytes).padStart(9)}  ${pretty}`);
  });

  // Info-only warnings
  const warnings = [];
  if (warnAbs) warnings.push(`Export size ${absMB.toFixed(2)}MB >= ${CFG.WARN_ABS_MB}MB`);
  if (current.huge.length > 0) warnings.push(`Found ${current.huge.length} huge files > ${CFG.HUGE_FILE_KB}KB`);

  if (warnings.length) {
    console.log("\n⚠️ Warnings (info-only):");
    warnings.forEach((w) => console.log(`- ${w}`));
  } else {
    console.log("\n✅ Looks good (no warnings).");
  }

  console.log("\nℹ️ Non-blocking. To skip perf entirely: PERF_SKIP=1 git push");
}

async function main() {
  if (CFG.SKIP) {
    console.log("ℹ️ PERF_SKIP=1 set. Skipping perf preview.");
    process.exit(0);
  }

  const locked = acquireLock();
  if (!locked) process.exit(0);

  try {
    // Fast path: skip if no relevant changes vs local main (unless forced).
    if (!CFG.FORCE) {
      const changed = getChangedFilesVsLocalMain();
      const relevant = changed.filter(isRelevant);
      if (changed.length > 0 && relevant.length === 0) {
        console.log("✅ Perf preview skipped (no relevant changes vs local main).");
        process.exit(0);
      }
    }

    const current = analyzeCurrentExport();
    printSummary({current});

    process.exit(0);
  } catch (e) {
    // non-blocking
    console.log("\n⚠️ Perf preview failed (non-blocking).");
    console.log(e?.message ?? e);
    console.log("ℹ️ Continuing without perf preview.");
    process.exit(0);
  } finally {
    releaseLock();
  }
}

main();
