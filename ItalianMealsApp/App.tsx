import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import MealsListScreen from "./src/screens/MealsListScreen";
import MealDetailScreen from "./src/screens/MealDetailScreen";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [Linking.createURL("/"), "mymealsapp://"],
  config: {
    screens: {
      Login :"login",
      Home: "home",
      Details: "details/:idMeal",
    },
  },
};

export default function App() {
  return (
   // <AuthProvider>
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={MealsListScreen} />
        <Stack.Screen name="Details" component={MealDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
