import fs from "fs";
import path from "path";

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const srcRoot = path.join(repoRoot, "src");
const appRoot = path.join(srcRoot, "app");

const ALLOWED_SRC_TOP_LEVEL_DIRECTORIES = ["app", "features", "shared", "test"] as const;
const FORBIDDEN_APP_DIRECTORY_NAMES = [
  "components",
  "constants",
  "data",
  "hooks",
  "screens",
  "services",
  "store",
  "types",
  "utils",
] as const;

function getDirectoryNames(rootPath: string): string[] {
  return fs
    .readdirSync(rootPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

function walkDirectoryNames(rootPath: string): string[] {
  const names: string[] = [];

  for (const entry of fs.readdirSync(rootPath, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    names.push(entry.name);
    names.push(...walkDirectoryNames(path.join(rootPath, entry.name)));
  }

  return names.sort((left, right) => left.localeCompare(right));
}

export function getSrcTopLevelDirectoryNames(): string[] {
  const directoryNames = getDirectoryNames(srcRoot);

  return directoryNames.filter((name) => name !== "core");
}

export function getAppForbiddenDirectoryNames(): string[] {
  const directoryNames = walkDirectoryNames(appRoot);

  return directoryNames.filter((name) =>
    FORBIDDEN_APP_DIRECTORY_NAMES.includes(name as (typeof FORBIDDEN_APP_DIRECTORY_NAMES)[number])
  );
}

export function getAllowedSrcTopLevelDirectories(): readonly string[] {
  return ALLOWED_SRC_TOP_LEVEL_DIRECTORIES;
}
