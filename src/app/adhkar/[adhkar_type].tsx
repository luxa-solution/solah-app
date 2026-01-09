import { useLocalSearchParams } from "expo-router";

import { AdhkarList } from "@/features-adhkar/screens";
import { AdhkarType } from "@/features-adhkar/types";

function Screen() {
  const { adhkar_type } = useLocalSearchParams();
  const name = Array.isArray(adhkar_type) ? adhkar_type[0] : adhkar_type;

  return <AdhkarList adhkar_type={name as AdhkarType} />;
}

export default Screen;
