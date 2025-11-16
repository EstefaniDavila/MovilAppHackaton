// app/_layout.tsx
import { Stack, Redirect, router } from 'expo-router';
import { useUser } from '@/hooks/use-user';
import { ActivityIndicator, View } from 'react-native';
import { useEffect } from 'react';

export default function RootLayout() {
  const user = useUser();

  // Mostrar loading mientras verifica el usuario
  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Si NO hay usuario, mostrar auth */}
      {!user && (
        <>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Redirect href="/auth/login" />
        </>
      )}
      
      {/* Si hay usuario, mostrar las pantallas según rol */}
      {user && (
        <>
          <Stack.Screen name="(citizen)" />
          <Stack.Screen name="(mesa-member)" />
          <Stack.Screen name="(modooffline)" />
          
          {/* Redirigir automáticamente a citizen */}
          <Redirect href="/(citizen)" />
        </>
      )}
    </Stack>
  );
}