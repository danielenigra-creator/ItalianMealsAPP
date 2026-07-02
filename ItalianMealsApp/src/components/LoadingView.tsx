import { View, ActivityIndicator, Text } from "react-native";

export default function LoadingView() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Caricamento...</Text>
    </View>
  );
}
