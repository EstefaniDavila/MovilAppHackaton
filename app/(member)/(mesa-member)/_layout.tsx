// app/(member)/mesa-member/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 

export default function MesaMemberLayout() {
  return (
    <Tabs>
      {/* 1. PESTAÑA ESPECÍFICA DEL ROL: Mis Deberes (homework.tsx) */}
      <Tabs.Screen 
        name="homework" 
        options={{
          title: 'Mis Deberes',
          headerShown: true,
          // Se usa 'book' o un icono relevante para manuales/instrucciones
          tabBarIcon: ({ color }) => <FontAwesome name="book" color={color} size={24} />,
        }}
      />

      {/* 2. PESTAÑAS COMPARTIDAS (MISMAS RUTAS RELATIVAS) */}
      
      <Tabs.Screen name="../(tabs)/index" options={{ title: 'Noticias', headerShown: true, tabBarIcon: ({ color }) => <FontAwesome name="newspaper-o" color={color} size={24} /> }} />
      <Tabs.Screen name="../(tabs)/candidates" options={{ title: 'Candidatos', headerShown: true, tabBarIcon: ({ color }) => <FontAwesome name="users" color={color} size={24} /> }} />
      <Tabs.Screen name="../(tabs)/calendar" options={{ title: 'Calendario', headerShown: true, tabBarIcon: ({ color }) => <FontAwesome name="calendar" color={color} size={24} /> }} />
      <Tabs.Screen name="../(tabs)/profile" options={{ title: 'Perfil', headerShown: true, tabBarIcon: ({ color }) => <FontAwesome name="user-circle" color={color} size={24} /> }} />
    </Tabs>
  );
}