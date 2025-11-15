import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync("access_token");
      const rawUser = await SecureStore.getItemAsync("user");

      if (!token) {
        setInitialRoute("auth/login");
        return;
      }
      if (!rawUser) {
        setInitialRoute("auth/login");
        return;
      }
      const user = JSON.parse(rawUser);

      if (user.role_type === "ADMIN") {
        setInitialRoute("(admin)");
      } else {
        setInitialRoute("(tabs)");
      }
    }
    checkAuth();
  }, []);

  if (!initialRoute) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName={initialRoute}>
        {/* Auth Screens */}
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
        <Stack.Screen
          name="auth/change-password"
          options={{ title: 'Cambiar contraseña', headerShown: false }}
        />

        {/* Admin Layout */}
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />

        {/* Member Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Modals */}
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
