import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchItalianMeals } from "../services/mealsApi";
import Avatar from "../components/Avatar";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface User {
  email: string;
  password: string;
  name: string;
  avatarUri: string;
}

export default function MealsListScreen({ navigation, route }: any) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const user: User = route?.params?.user;

  async function loadMeals() {
    try {
      const data = await fetchItalianMeals();
      setMeals(data || []);
    } catch (error) {
      console.error("Errore nel caricamento dei pasti:", error);
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Avatar rotondo + nome utente loggato */}
      <Text style={styles.title}>Piatti Italiani </Text>
      <View style={styles.userHeader}>
        <Image source={{ uri: user?.avatarUri }} style={styles.avatar} />
        <Text style={styles.userName}>{user?.name ?? "Utente"}</Text>
      </View>

      <Button title="Go Back" onPress={() => navigation.navigate("Login")} />

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Details", {
                id: item.idMeal,
              })
            }
          >
            <Avatar uri={item.strMealThumb} />
            <Text style={styles.text}>{item.strMeal}</Text>
            <Text style={styles.idText}>ID: {item.idMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  userName: {
    fontSize: 18,
    fontWeight: "600",
  },

  item: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 28,
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
  },

  idText: {
    marginTop: 4,
    color: "#666",
  },

  error: {
    fontSize: 18,
    marginBottom: 20,
    color: "red",
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  }
});
