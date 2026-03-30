import fs from "fs";
import path from "path";

describe("pre-push tooling", () => {
  it("runs coverage checks without formatting", () => {
    const repoRoot = path.resolve(__dirname, "..", "..", "..");
    const prePush = fs.readFileSync(path.join(repoRoot, ".husky", "pre-push"), "utf8");
    const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8")) as {
      scripts?: Record<string, string>;
    };

    expect(pkg.scripts?.["test:cov"]).toContain("jest --coverage");
    expect(prePush).toContain("npm run test:cov");
    expect(prePush).not.toContain("npm run format");
  });
});
