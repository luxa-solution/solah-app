import {
  getAppForbiddenDirectoryNames,
  getSrcTopLevelDirectoryNames,
} from "./repoStructure";

describe("architecture layout tooling", () => {
  it("keeps the src top-level layout within the approved boundaries", () => {
    expect(getSrcTopLevelDirectoryNames()).toEqual(["app", "features", "shared", "test"]);
  });

  it("keeps feature-style folders out of app routing", () => {
    expect(getAppForbiddenDirectoryNames()).toEqual([]);
  });
});
