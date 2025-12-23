import { AdhkarType } from "@/features-adhkar/data";
import { TitleBar as AppTitleBar } from "@/shared/components";

const titles = {
  before: "Before Prayer",
  during: "During Prayer",
  after: "After Prayer",
};

export function TitleBar({ adhkar_type }: { adhkar_type: AdhkarType }) {
  return <AppTitleBar title={titles[adhkar_type]} />;
}
