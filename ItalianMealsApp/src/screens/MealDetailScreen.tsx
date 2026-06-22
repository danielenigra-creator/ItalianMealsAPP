import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DATA = [
  { id: "1", name: "Alpha" },
  { id: "2", name: "Beta" },
  { id: "3", name: "Gamma" },
];

export default function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.id;

  // id mancante
  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Invalid route param</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const item = DATA.find((p) => p.id === id);

  // item non trovato
  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Product not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>

      <Text style={styles.text}>ID: {item.id}</Text>
      <Text style={styles.text}>Name: {item.name}</Text>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    marginBottom: 10,
  },

  error: {
    fontSize: 18,
    marginBottom: 20,
    color: "red",
  },
});
