import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchItalianMeals } from "../services/mealsApi";
import Avatar from "../components/Avatar";


interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function HomeScreen({ navigation }: any) {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMeals() {
    try {
      const data = await fetchItalianMeals();
      setMeals(data);
    } catch (error) {
      console.error("Errore nel caricamento dei pasti:", error);
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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

  item: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
  },

  idText: {
    marginTop: 4,
    color: "#666",
  },
});
