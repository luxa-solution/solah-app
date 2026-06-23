export const adhkarAudioAssets: Record<number, number> = {
  // Duas after Takbeer
  187: require("../../../../assets/audio/adhkar/187-dua-after-takbeer-in-salah.mp3"),
  188: require("../../../../assets/audio/adhkar/188-dua-when-starting-tahajjud-prayer.mp3"),
  190: require("../../../../assets/audio/adhkar/190-dua-at-tahajjud-at-beginning.mp3"),
  191: require("../../../../assets/audio/adhkar/191-dua-at-the-start-of-the-prayer-after-takbeer.mp3"),
  192: require("../../../../assets/audio/adhkar/192-dua-at-the-beginning-of-salah-allahu-akbar-kabira.mp3"),

  // Whisperings
  193: require("../../../../assets/audio/adhkar/193-dua-for-whisperings-in-prayer-auzubillah-minashaitan-nirajeem.mp3"),

  // Ruku
  195: require("../../../../assets/audio/adhkar/195-dua-in-ruku-subhana-rabbiyal-azeem.mp3"),
  196: require("../../../../assets/audio/adhkar/196-dua-for-ruku-subhana-rabbiyal-adheem-wa-bihamdihi.mp3"),
  197: require("../../../../assets/audio/adhkar/197-dua-in-ruku-subbuhun-quddusun-rabbul-mala-ikati-war-ruh.mp3"),
  198: require("../../../../assets/audio/adhkar/198-dua-for-ruku-allahumma-laka-rakatu-wa-bika-amantu.mp3"),
  199: require("../../../../assets/audio/adhkar/199-dua-at-ruku.mp3"),
  200: require("../../../../assets/audio/adhkar/200-dua-in-rukoo-subhanaka-wa-bihamdika-astaghfiruka.mp3"),
  201: require("../../../../assets/audio/adhkar/201-dua-in-ruku-dua-for-forgiveness.mp3"),

  // Rising from Ruku
  203: require("../../../../assets/audio/adhkar/203-dua-after-ruku-allahumma-rabbana-wa-lakal-hamd.mp3"),
  204: require("../../../../assets/audio/adhkar/204-rabbana-lakal-hamd-dua-after-ruku.mp3"),
  205: require("../../../../assets/audio/adhkar/205-rabbana-wa-lakal-hamd-dua-after-rukoo.mp3"),
  206: require("../../../../assets/audio/adhkar/206-dua-when-raising-from-ruku-1.mp3"),
  208: require("../../../../assets/audio/adhkar/208-dua-when-raising-from-ruku-2.mp3"),

  // Sujood
  213: require("../../../../assets/audio/adhkar/213-dua-in-sujood-subhana-rabbiyal-ala.mp3"),
  214: require("../../../../assets/audio/adhkar/214-dua-for-sajdah-sajda-dua.mp3"),
  215: require("../../../../assets/audio/adhkar/215-dua-for-sujood-allahumma-maghfir-lee.mp3"),
  216: require("../../../../assets/audio/adhkar/216-dua-after-ruku-supplication-upon-rising-from-bowing.mp3"),
  217: require("../../../../assets/audio/adhkar/217-dua-when-raising-from-ruku-dua-noor.mp3"),
  218: require("../../../../assets/audio/adhkar/218-dua-in-sajdah.mp3"),
  219: require("../../../../assets/audio/adhkar/219-dua-in-sujood-subbuhun-quddusun-rabbul-mala-ikati-war-ruh.mp3"),
  220: require("../../../../assets/audio/adhkar/220-dua-in-sujood-allaahumma-laka-sajadtu-wa-laka-aslamtu.mp3"),
  221: require("../../../../assets/audio/adhkar/221-dua-for-sujood.mp3"),

  // Between Sujood
  222: require("../../../../assets/audio/adhkar/222-dua-between-two-sujood.mp3"),
  223: require("../../../../assets/audio/adhkar/223-dua-between-sujood-allahummaghfirli-warhamni-wahdini-warzuqni.mp3"),

  // Sajdah Tilawah
  225: require("../../../../assets/audio/adhkar/225-dua-for-sajdah-in-quran.mp3"),
  226: require("../../../../assets/audio/adhkar/226-sajdah-dua-for-night-recitation.mp3"),
  227: require("../../../../assets/audio/adhkar/227-dua-after-reciting-the-verses-of-prostration.mp3"),

  // Tashahhud
  228: require("../../../../assets/audio/adhkar/228-tashahhud-dua-attahiyat-lillahi-wa-salawatu.mp3"),

  // Salawat after Tashahhud
  229: require("../../../../assets/audio/adhkar/229-durood-sharif-durood-ibrahim.mp3"),
  230: require("../../../../assets/audio/adhkar/230-dua-after-tashahhud-darood-sharif.mp3"),

  // Before Salam
  231: require("../../../../assets/audio/adhkar/231-dua-masura-1-allahumma-allif-baina-qulubina.mp3"),
  232: require("../../../../assets/audio/adhkar/232-dua-e-masura-2-dua-for-protection-from-hellfire.mp3"),
  233: require("../../../../assets/audio/adhkar/233-dua-masura-3-allahummaghfirli-ma-qaddamtu.mp3"),
  234: require("../../../../assets/audio/adhkar/234-dua-e-masura-4-allahumma-inni-zalamtu-nafsi.mp3"),
  235: require("../../../../assets/audio/adhkar/235-dua-mashura-5-allahumma-bi-ilmika-al-ghaib.mp3"),
  236: require("../../../../assets/audio/adhkar/236-dua-masurah-6-allahumma-inni-as-aluka-min-khairi.mp3"),
  237: require("../../../../assets/audio/adhkar/237-dua-for-protection-from-punishment-of-grave-hell-and-dajjal.mp3"),
  238: require("../../../../assets/audio/adhkar/238-dua-at-the-end-of-salah-allahumma-inni-a-uzu-bika.mp3"),
  239: require("../../../../assets/audio/adhkar/239-dua-masoora-7-allahumma-a-inni-ala-zikrika.mp3"),
  240: require("../../../../assets/audio/adhkar/240-dua-masoorah-8-allahumma-inni-a-uzu-bika-minal.mp3"),
  241: require("../../../../assets/audio/adhkar/241-dua-for-jannah-allahumma-inni-as-aluka-al-jannah.mp3"),
};

/**
 * Resolve the bundled audio module for an entry, given its sourceId.
 * Returns undefined for entries with no confirmed audio yet (e.g. entries
 * still marked `audio: null` in your adhkar-*.ts files).
 */
export function getAdhkarAudioSource(sourceId?: number) {
  if (!sourceId) return undefined;
  return adhkarAudioAssets[sourceId];
}
