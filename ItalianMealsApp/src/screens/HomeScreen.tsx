import React from "react";
import { useEffect, useState } from "react";
 
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchItalianMeals } from "../services/mealsApi";

const DATA = [
  { id: "1", name: "Alpha" },
  { id: "2", name: "Beta" },
  { id: "3", name: "Gamma" },
];

export default function HomeScreen({ navigation }: any) {
    const [meals, setMeals] = useState([]);
    async function loadMeals() {
      const data=await fetchItalianMeals();
      setMeals(data);
      console.log(data);
    }
    useEffect(() => {
      loadMeals();
    }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.mealId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Details", {
                id: item.mealId,
              })
            }
          >
            <Text style={styles.text}>{item.name}</Text>
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
  },
});
