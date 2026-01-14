import { AdhkarItem } from "../data/types";

export const searchAdhkar = (items: AdhkarItem[], query: string): AdhkarItem[] => {
  if (!query.trim()) {
    return items;
  }

  const searchTerm = query.toLowerCase().trim();

  return items.filter((item) => {
    if (item.title.toLowerCase().includes(searchTerm)) {
      return true;
    }

    return item.entries.some((entry) => {
      return (
        (entry.arabicText && entry.arabicText.toLowerCase().includes(searchTerm)) ||
        (entry.transliteration && entry.transliteration.toLowerCase().includes(searchTerm)) ||
        (entry.translation?.en && entry.translation.en.toLowerCase().includes(searchTerm))
      );
    });
  });
};
