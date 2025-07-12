import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        setToken(storedToken);
      } catch (error) {
        console.error("Error reading token", error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Redirect href={token ? "/home" : "/login"} />;
}
