import { AdhkarItem } from "@/features-adhkar/types";

export const searchAdhkar = (items: AdhkarItem[], query: string): AdhkarItem[] => {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();

  return items.filter((item) => {
    // Search by title
    if (item.title.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search by entries
    return item.entries.some((entry) => {
      return (
        (entry.arabicText && entry.arabicText.toLowerCase().includes(searchTerm)) ||
        (entry.transliteration && entry.transliteration.toLowerCase().includes(searchTerm)) ||
        (entry.translation?.en && entry.translation.en.toLowerCase().includes(searchTerm))
      );
    });
  });
};
