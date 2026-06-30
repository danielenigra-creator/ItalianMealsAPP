import { View, Text, Button } from "react-native";

type Props = {
  message: string;
  onRetry: () => void;
};

export default function ErrorView({ message, onRetry }: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{message}</Text>

      <Button title="Retry" onPress={onRetry} />
    </View>
  );
}
