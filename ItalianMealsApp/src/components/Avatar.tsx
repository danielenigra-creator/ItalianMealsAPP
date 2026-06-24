import React, { useState } from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Avatar({ uri }: { uri: string }) {
  const [error, setError] = useState(false);

  function onAdd() {
    console.log("Pressed");
  }

  return (
    <View style={styles.headerStyle}>
      <Text>Prova</Text>

      {!error ? (
        <Image
          style={styles.image}
          source={{ uri }}
          onError={() => setError(true)}
        />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.text}>?</Text>
        </View>
      )}

      <Pressable onPress={onAdd} style={styles.button}>
        <Text style={{ fontWeight: "600" }}>Tap</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },

  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },

  fallback: {
    width: 200,
    height: 200,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  text: {
    fontSize: 50,
    fontWeight: "bold",
  },

  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    opacity: 0.6,
  },
});
