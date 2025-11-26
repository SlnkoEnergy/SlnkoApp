
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export type AuthUser = {
  name?: string;
  email?: string;
  phone?: string;
  emp_id?: string;
  role?: string;
  createdAt?: string;
  userID?: string;
  about?: string;
  location?: string;
  attachment_url?: string;
};

export function useAuthUser() {
  const [user, setUser] = React.useState<AuthUser | null>(null);

  const load = React.useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem("userData");
      if (!raw) return setUser(null);
      const parsed = JSON.parse(raw);
      setUser(parsed || null);
    } catch {
      setUser(null);
    }
  }, []);

  // load once
  React.useEffect(() => { load(); }, [load]);

  useFocusEffect(
    React.useCallback(() => {
      load();
      return undefined;
    }, [load])
  );

  return user;
}
