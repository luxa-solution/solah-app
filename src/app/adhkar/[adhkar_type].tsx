import { useLocalSearchParams } from "expo-router";

import { AdhkarType } from "@/features-adhkar/data";
import { AdhkarList } from "@/features-adhkar/screens";

function Screen() {
  const { adhkar_type } = useLocalSearchParams();
  const name = Array.isArray(adhkar_type) ? adhkar_type[0] : adhkar_type;

  return <AdhkarList adhkar_type={name as AdhkarType} />;
}

export default Screen;
