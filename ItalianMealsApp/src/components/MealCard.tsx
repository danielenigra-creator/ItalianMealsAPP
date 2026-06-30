import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
};

export default function MealCard({ meal }: Props) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Details", {
          idMeal: meal.idMeal,
        })
      }
    >
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{meal.strMeal}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: 100,
    height: 100,
  },

  info: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
