// app/(member)/citizen/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 

export default function CitizenLayout() {
  return (
    <Tabs>
      {/* 1. PESTAÑA ESPECÍFICA DEL ROL: Mi Votación (voting.tsx) */}
      <Tabs.Screen 
        name="voting" 
        options={{
          title: 'Mi Votación',
          headerShown: true,
          // Se usa 'map-marker' o un icono relevante para la ubicación/voto
          tabBarIcon: ({ color }) => <FontAwesome name="map-marker" color={color} size={24} />,
        }}
      />

      {/* 2. PESTAÑAS COMPARTIDAS */}
      
      <Tabs.Screen 
        name="../(tabs)/index" 
        options={{
          title: 'Noticias',
          headerShown: true,
          tabBarIcon: ({ color }) => <FontAwesome name="newspaper-o" color={color} size={24} />,
        }}
      />
      
      <Tabs.Screen 
        name="../(tabs)/candidates" 
        options={{
          title: 'Candidatos',
          headerShown: true,
          tabBarIcon: ({ color }) => <FontAwesome name="users" color={color} size={24} />,
        }}
      />
      
      <Tabs.Screen 
        name="../(tabs)/calendar" 
        options={{
          title: 'Calendario',
          headerShown: true,
          tabBarIcon: ({ color }) => <FontAwesome name="calendar" color={color} size={24} />,
        }}
      />
      
      <Tabs.Screen 
        name="../(tabs)/profile" 
        options={{
          title: 'Perfil',
          headerShown: true,
          tabBarIcon: ({ color }) => <FontAwesome name="user-circle" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}