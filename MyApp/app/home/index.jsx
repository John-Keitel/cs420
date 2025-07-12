import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (!storedToken) {
        Alert.alert("Session Expired", "Please log in again.");
        router.replace("/login");
      } else {
        setToken(storedToken);
      }
    };

    loadToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      {token && <Text style={styles.token}>Your token: {token.slice(0, 10)}...</Text>}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  token: { fontSize: 12, color: "#888", marginBottom: 20 },
});
