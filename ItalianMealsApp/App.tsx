import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import { useEffect, useState } from "react";
import { fetchItalianMeals } from "./src/services/mealsApi";

const Stack = createNativeStackNavigator();

export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
