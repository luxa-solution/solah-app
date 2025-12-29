import { useRouter } from "expo-router";
import { Appbar } from "react-native-paper";

interface TitleBarProps {
  title: string;
  showBack?: boolean;
}

export const TitleBar = ({ title, showBack = true }: TitleBarProps) => {
  const router = useRouter();
  return (
    <Appbar.Header style={{ paddingLeft: 0 }}>
      {showBack && <Appbar.BackAction onPress={() => router.back()} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
