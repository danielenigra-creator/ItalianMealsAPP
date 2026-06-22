import React from "react";
import { Text, View, Pressable, StyleSheet, TextInput } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";
export const MOCK_USERS = [
  {
    email: "mario.rossi@student.it",
    password: "React2026!",
    name: "Mario Rossi",
    avatarUri: "https://picsum.photos/seed/mario-rossi/128",
  },
  {
    email: "giulia.bianchi@student.it",
    password: "Expo2026!",
    name: "Giulia Bianchi",
    avatarUri: "https://picsum.photos/seed/giulia-bianchi/128",
  },
  {
    email: "luca.verdi@student.it",
    password: "Mobile2026!",
    name: "Luca Verdi",
    avatarUri: "https://picsum.photos/seed/luca-verdi/128",
  },
];

export function validateLogin(email: string, password: string) {
  return MOCK_USERS.find(
    (u) => u.email === email.trim() && u.password === password,
  );
}
export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("ready");
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const emailOk = /\S+@\S+\.\S+/.test(email);
  const passwordOk = password.length >= 6;
  const allOk = emailOk && passwordOk;

  React.useEffect(() => {
    console.log("APP STARTED");
  }, []);

  function handleClick() {
    setSubmitted(true);

    if (allOk) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {submitted && !emailOk && (
          <Text style={styles.error}>Please enter a valid email</Text>
        )}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!showPassword}
          />

          <Pressable
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#888"
            />
          </Pressable>
        </View>

        {submitted && !passwordOk && (
          <Text style={styles.error}>
            Password must contain at least 6 characters
          </Text>
        )}

        <Pressable style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>

        <Text style={styles.status}>Status: {status}</Text>

        {status === "success" && (
          <Text style={styles.success}>You are logged in!</Text>
        )}

        {status === "error" && <Text style={styles.error}>Login failed</Text>}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  passwordContainer: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 10,
  },

  passwordInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 45,
  },

  icon: {
    position: "absolute",
    right: 12,
  },

  button: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  status: {
    marginTop: 20,
    fontSize: 16,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },

  success: {
    color: "green",
    marginTop: 10,
    fontWeight: "bold",
  },
});
