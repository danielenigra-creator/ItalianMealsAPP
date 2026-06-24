import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./src/screens/HomeScreen";
import { useEffect, useState } from "react";
import { fetchItalianMeals } from "./src/services/mealsApi";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import MealDetailScreen from "./src/screens/MealDetailScreen";

const stack = createNativeStackNavigator();

import * as Linking from "expo-linking";

const linking = {
  prefixes: [Linking.createURL("/"), "myapp://"],
  config: {
    screens: {
      Login: "login",
      Home: "home",
      Details: "details/:id",
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={MealDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
