import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchItalianMeals } from "../services/mealsApi";

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
  const [loading, setLoading] = useState(true);

  const user: User = route?.params?.user;

  async function loadMeals() {
    try {
      await new Promise((res) => setTimeout(res, 1500));

      setLoading(true);
      const data = await fetchItalianMeals();
      setMeals(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Caricamento piatti...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Piatti Italiani</Text>

      <View style={styles.userHeader}>
        <Image source={{ uri: user?.avatarUri }} style={styles.avatar} />
        <Text style={styles.userName}>{user?.name ?? "Utente"}</Text>
      </View>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Details", {
                idMeal: item.idMeal,
              })
            }
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.img} />
            <Text style={styles.text}>{item.strMeal}</Text>
            <Text style={styles.idText}>ID: {item.idMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },

  avatar: { width: 48, height: 48, borderRadius: 24 },

  userName: { fontSize: 18, fontWeight: "600" },

  item: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 12,
  },

  img: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },

  text: { fontSize: 18, fontWeight: "600" },

  idText: { color: "#666" },
});
