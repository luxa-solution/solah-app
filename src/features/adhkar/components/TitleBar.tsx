import { AdhkarType } from "@/features-adhkar/data";
import { TitleBar as AppTitleBar } from "@/shared/components";

import { useAdhkarStore } from "../store/adhkarStore";

const titles = {
  before: "Before Prayer",
  during: "During Prayer",
  after: "After Prayer",
};

interface TitleBarProps {
  adhkar_type: AdhkarType;
  showBookmark?: boolean;
}

export function TitleBar({ adhkar_type, showBookmark = false }: TitleBarProps) {
  const { toggleGroupBookmark, isGroupBookmarked } = useAdhkarStore();

  const handleBookmark = () => {
    toggleGroupBookmark(adhkar_type);
  };

  const isBookmarked = isGroupBookmarked(adhkar_type);

  return (
    <AppTitleBar
      title={titles[adhkar_type]}
      showBookmark={showBookmark}
      onBookmark={handleBookmark}
      isBookmarked={isBookmarked}
    />
  );
}
