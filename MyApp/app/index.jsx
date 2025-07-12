import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    AsyncStorage.getItem("authToken").then(setToken);
  }, []);

  if (token === undefined) return null; // loading state

  return <Redirect href={token ? "/home" : "/login"} />;
}
