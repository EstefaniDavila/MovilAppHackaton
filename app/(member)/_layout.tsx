// app/(member)/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function MemberLayout() {
  return (
    // Usa un Stack para que las rutas dentro de (member) se naveguen 
    // sin añadir pestañas aquí, dejando que los layouts internos las definan.
    <Stack>
      {/* Ocultamos el encabezado por defecto, ya que cada layout de rol 
        (ej., citizen/_layout.tsx) ya define si el encabezado debe mostrarse 
        en sus propias pestañas.
      */}
      <Stack.Screen name="(citizen)" options={{ headerShown: false }} />
      <Stack.Screen name="(mesa-member)" options={{ headerShown: false }} />
      <Stack.Screen name="(party-representative)" options={{ headerShown: false }} />
      
      {/* Cualquier otra ruta dentro de (member) que no esté en una subcarpeta
        será manejada aquí.
      */}
    </Stack>
  );
}