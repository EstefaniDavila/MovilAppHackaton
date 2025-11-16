// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(citizen)" />
      <Stack.Screen name="(mesa-member)" />
      <Stack.Screen name="index" />
    </Stack>
  );
}