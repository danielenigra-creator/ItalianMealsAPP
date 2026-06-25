import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
}

export default function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.id;
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadMealDetail() {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const json = await response.json();
      setMeal(json.meals?.[0] || null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) loadMealDetail();
  }, [id]);

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Invalid route param</Text>
        <Button title="Go Back" onPress={() => navigation.navigate("Login")} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Pasto non trovato</Text>
        <Button title="Go Back" onPress={() => navigation.navigate("Login")} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.text}>Categoria: {meal.strCategory}</Text>
      <Text style={styles.text}>Cucina: {meal.strArea}</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("Login")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 6,
    color: "#444",
  },

  instructions: {
    fontSize: 14,
    marginTop: 10,
    lineHeight: 22,
    color: "#333",
  },

  error: {
    fontSize: 18,
    marginBottom: 20,
    color: "red",
  },
});
