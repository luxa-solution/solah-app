import fs from "fs";
import path from "path";

const repoRoot = path.resolve(__dirname, "..", "..", "..");

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

describe("data structure tooling", () => {
  it("splits settings locations into a dedicated folder while preserving the import entry", () => {
    expect(exists("src/features/settings/constants/locations.ts")).toBe(true);
    expect(exists("src/features/settings/constants/location/default.ts")).toBe(true);
    expect(exists("src/features/settings/constants/location/africa.ts")).toBe(true);
    expect(exists("src/features/settings/constants/location/gulf.ts")).toBe(true);
    expect(exists("src/features/settings/constants/location/asia.ts")).toBe(true);
    expect(exists("src/features/settings/constants/location/europe.ts")).toBe(true);
    expect(exists("src/features/settings/constants/location/index.ts")).toBe(true);
  });

  it("splits solah guide sequences into a dedicated folder while preserving the import entry", () => {
    expect(exists("src/features/solah/data/sequences.ts")).toBe(true);
    expect(exists("src/features/solah/data/sequences/opening.ts")).toBe(true);
    expect(exists("src/features/solah/data/sequences/qiyam.ts")).toBe(true);
    expect(exists("src/features/solah/data/sequences/ruku.ts")).toBe(true);
    expect(exists("src/features/solah/data/sequences/sujud.ts")).toBe(true);
    expect(exists("src/features/solah/data/sequences/tashahhud.ts")).toBe(true);
    expect(exists("src/features/solah/data/sequences/buildSolahGuide.ts")).toBe(true);
    expect(exists("src/features/solah/data/sequences/index.ts")).toBe(true);
  });
});
