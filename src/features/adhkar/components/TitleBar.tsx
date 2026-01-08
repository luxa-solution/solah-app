import { AdhkarType, AdhkarItem } from "@/features-adhkar/data";
import { TitleBar as AppTitleBar } from "@/shared/components";

import { useAdhkarStore } from "../store/adhkarStore";

const titles = {
  before: "Before Prayer",
  during: "During Prayer",
  after: "After Prayer",
};

interface TitleBarProps {
  adhkar_type: AdhkarType;
  adhkarItem?: AdhkarItem;
  showBookmark?: boolean;
}

export function TitleBar({ adhkar_type, adhkarItem, showBookmark = false }: TitleBarProps) {
  const { toggleBookmark, isBookmarked } = useAdhkarStore();

  const handleBookmark = () => {
    if (adhkarItem) {
      toggleBookmark(adhkarItem);
    }
  };

  const isBookmarkedItem = adhkarItem ? isBookmarked(adhkarItem) : false;

  return (
    <AppTitleBar
      title={titles[adhkar_type]}
      showBookmark={showBookmark && !!adhkarItem}
      onBookmark={handleBookmark}
      isBookmarked={isBookmarkedItem}
    />
  );
}
