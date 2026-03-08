import { useLocalSearchParams } from "expo-router";

import { AdhkarDetails } from "@/features-adhkar/screens";
import { AdhkarType } from "@/features-adhkar/types";

function Details() {
  const { adhkar_type, id } = useLocalSearchParams<{ id: string; adhkar_type: string }>();

  return <AdhkarDetails adhkar_type={adhkar_type as AdhkarType} id={id} />;
}

export default Details;
