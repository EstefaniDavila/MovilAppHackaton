// app/(member)/party-representative/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 

export default function PartyRepresentativeLayout() {
  return (
    <Tabs>
      {/* 1. PESTAÑA ESPECÍFICA DEL ROL: Mi Partido (political.tsx) */}
      <Tabs.Screen 
        name="political" 
        options={{
          title: 'Mi Partido',
          headerShown: true,
          // Se usa 'gavel' o un icono relevante para política/ley
          tabBarIcon: ({ color }) => <FontAwesome name="gavel" color={color} size={24} />,
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