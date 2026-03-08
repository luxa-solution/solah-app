import { useLocalSearchParams } from "expo-router/build/hooks";

import { SolahGuide } from "@/features-guide/screens";
import { SolahName } from "@/features-solah/types";

function SolahNameScreen() {
  const { solah_name } = useLocalSearchParams();
  const name = Array.isArray(solah_name) ? solah_name[0] : solah_name;

  return <SolahGuide solahName={name as SolahName} />;
}

export default SolahNameScreen;
