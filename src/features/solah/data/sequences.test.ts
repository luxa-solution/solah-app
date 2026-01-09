import { buildSolahGuide } from "./sequences";

jest.mock("./media", () => ({
  stepImages: {
    qiyam: 1,
    ruku: 2,
    afterRuku: 3,
    sujud: 4,
    jalsah: 5,
    tashahhud: 6,
  },
  guideIllustrations: {
    Subhi: 10,
    Dhuhr: 11,
    Asr: 12,
    Maghrib: 13,
    Isha: 14,
  },
  commonAudios: {
    takbir: "takbir",
    taawwudh: "taawwudh",
    amin: "amin",
    ruku: "ruku",
    rukuExtra: "rukuExtra",
    tasmi: "tasmi",
    tahmid: "tahmid",
    qawmahHamd: "qawmahHamd",
    sujud: "sujud",
    sujudExtra: "sujudExtra",
    jalsah: "jalsah",
    tashahhud: "tashahhud",
    salawat: "salawat",
    fourThings: "fourThings",
    tasleemRight: "tasleemRight",
    tasleemLeft: "tasleemLeft",
    openingDua: "openingDua",
    fatiha: "fatiha",
  },
  specificAudios: {
    Subhi: { qiyamFatiha: "fajrFatiha" },
    Dhuhr: { qiyamFatiha: "dhuhrFatiha" },
    Asr: { qiyamFatiha: "asrFatiha" },
    Maghrib: { qiyamFatiha: "maghribFatiha" },
    Isha: { qiyamFatiha: "ishaFatiha" },
  },
}));

describe("buildSolahGuide", () => {
  it("builds a 2-rakaah guide with Final Sitting in r2", () => {
    const g = buildSolahGuide("Subhi", 2, "Dawn solah");

    expect(g.solah).toBe("Subhi");
    expect(g.rakaat).toBe(2);
    expect(g.description.en).toBe("Dawn solah");

    // ids + solah fields
    const ids = g.items.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.some((id) => id.startsWith("r1-"))).toBe(true);
    expect(ids.some((id) => id.startsWith("r2-"))).toBe(true);
    expect(g.items.every((x) => x.solah === "Subhi")).toBe(true);

    // final sitting only appears for rakaat=2 in r2
    const titles = g.items.map((x) => x.title);
    expect(titles).toContain("Final Sitting (Tashahhud)");
    expect(titles).not.toContain("First Tashahhud");
  });

  it("builds a 3-rakaah guide with First Tashahhud in r2 and Final Sitting in r3", () => {
    const g = buildSolahGuide("Maghrib", 3, "Evening solah");

    const titles = g.items.map((x) => x.title);

    expect(titles).toContain("First Tashahhud");
    expect(titles).toContain("Final Sitting (Tashahhud)");

    // Ensure r3 exists (IDs for r3)
    expect(g.items.some((x) => x.id.startsWith("r3-"))).toBe(true);
    // Ensure no r4
    expect(g.items.some((x) => x.id.startsWith("r4-"))).toBe(false);
  });

  it("builds a 4-rakaah guide that includes r4 and Final Sitting in r4", () => {
    const g = buildSolahGuide("Dhuhr", 4, "Midday solah");

    expect(g.items.some((x) => x.id.startsWith("r4-"))).toBe(true);

    const titles = g.items.map((x) => x.title);
    expect(titles).toContain("First Tashahhud");
    expect(titles).toContain("Final Sitting (Tashahhud)");
  });
});
