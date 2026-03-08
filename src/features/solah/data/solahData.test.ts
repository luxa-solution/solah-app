import { solahGuides, solahNames } from "./solahData";

jest.mock("./sequences", () => ({
  buildSolahGuide: (solah: any, rakaat: any, descriptionEn: any) => ({
    solah,
    rakaat,
    description: { en: descriptionEn },
    illustration: null,
    items: [],
  }),
}));

describe("solahData", () => {
  it("exports guides for every solah name", () => {
    for (const name of solahNames) {
      expect(solahGuides[name]).toBeTruthy();
      expect(solahGuides[name].solah).toBe(name);
    }
  });

  it("uses correct rakaat counts", () => {
    expect(solahGuides.Subhi.rakaat).toBe(2);
    expect(solahGuides.Maghrib.rakaat).toBe(3);
    expect(solahGuides.Dhuhr.rakaat).toBe(4);
    expect(solahGuides.Asr.rakaat).toBe(4);
    expect(solahGuides.Isha.rakaat).toBe(4);
  });
});
