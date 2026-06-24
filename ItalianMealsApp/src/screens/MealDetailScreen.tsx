import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

// services/auth.ts
export const MOCK_USERS = [
  {
    email: "mario.rossi@student.it",
    password: "React2026!",
    name: "Mario Rossi",
    avatarUri: "https://picsum.photos/seed/mario-rossi/128",
  },
  {
    email: "giulia.bianchi@student.it",
    password: "Expo2026!",
    name: "Giulia Bianchi",
    avatarUri: "https://picsum.photos/seed/giulia-bianchi/128",
  },
  {
    email: "luca.verdi@student.it",
    password: "Mobile2026!",
    name: "Luca Verdi",
    avatarUri: "https://picsum.photos/seed/luca-verdi/128",
  },
];

export function validateLogin(email: string, password: string) {
  return MOCK_USERS.find(
    (u) => u.email === email.trim() && u.password === password,
  );
}

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

  const item = MOCK_USERS.find((p) => p.email === id);

  // item non trovato
  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>User not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>

      <Text style={styles.text}>ID: {item.email }</Text>
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
