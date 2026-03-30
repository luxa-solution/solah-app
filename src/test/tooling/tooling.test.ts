import fs from "fs";
import path from "path";

describe("tooling", () => {
  it("runs coverage checks from the pre-push hook", () => {
    const repoRoot = path.resolve(__dirname, "..", "..", "..");
    const prePush = fs.readFileSync(path.join(repoRoot, ".husky", "pre-push"), "utf8");
    const pkg = JSON.parse(
      fs.readFileSync(path.join(repoRoot, "package.json"), "utf8")
    ) as {
      scripts?: Record<string, string>;
    };

    expect(pkg.scripts?.["test:cov"]).toContain("jest --coverage");
    expect(prePush).toContain("npm run test:cov");
  });
});
