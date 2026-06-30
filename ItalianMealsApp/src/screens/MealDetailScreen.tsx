import React, { useEffect, useState } from "react";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
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
  const id = route.params?.idMeal;
  console.log("PARAMS:", route.params);

  const [state, setState] = useState({
    status: "loading",
    meal: null as MealDetail | null,
    message: "",
  });

  async function loadMealDetail() {
    try {
      setState({
        status: "loading",
        meal: null,
        message: "",
      });

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();
      const meal = json.meals?.[0];

      if (!meal) {
        setState({
          status: "error",
          meal: null,
          message: "Pasto non trovato",
        });
        return;
      }

      setState({
        status: "success",
        meal,
        message: "",
      });
    } catch (error) {
      setState({
        status: "error",
        meal: null,
        message: "Errore di rete",
      });
    }
  }

  useEffect(() => {
    if (id) {
      loadMealDetail();
    }
  }, [id]);

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Invalid route param</Text>
        <Button title="Go Back" onPress={() => navigation.navigate("Login")} />
      </View>
    );
  }

  if (state.status === "loading") {
    return <LoadingView />;
  }

  if (state.status === "error") {
    return <ErrorView message={state.message} onRetry={loadMealDetail} />;
  }

  if (!state.meal) {
    return null;
  }

  const meal = state.meal;

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
