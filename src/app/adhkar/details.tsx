import { useLocalSearchParams } from "expo-router";

import { AdhkarType } from "@/features-adhkar/data";
import { AdhkarDetails } from "@/features-adhkar/screens";

function Details() {
  const { adhkar_type, id } = useLocalSearchParams<{ id: string; adhkar_type: string }>();

  return <AdhkarDetails adhkar_type={adhkar_type as AdhkarType} id={id} />;
}

export default Details;
