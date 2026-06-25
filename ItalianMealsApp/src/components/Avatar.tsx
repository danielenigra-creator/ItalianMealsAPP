import React, { useState, useEffect } from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";

export default function Avatar({ uri }: { uri: string }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [uri]);

  function onAdd() {
    console.log("Pressed");
  }

  return (
    <View style={styles.headerStyle}>
      <Text>Prova</Text>

      {!error ? (
        <Image
          style={styles.image}
          source={{ uri: uri }}
          onError={(e) => {
            console.log("Image error:", e.nativeEvent);
            setError(true);
          }}
        />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.text}>?</Text>
        </View>
      )}

      
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
