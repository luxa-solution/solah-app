import fs from "fs";
import path from "path";

describe("ci workflow tooling", () => {
  it("does not run formatting", () => {
    const repoRoot = path.resolve(__dirname, "..", "..", "..");
    const ciWorkflow = fs.readFileSync(
      path.join(repoRoot, ".github", "workflows", "ci.yml"),
      "utf8"
    );

    expect(ciWorkflow).not.toContain("npm run format");
  });
});
