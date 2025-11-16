// app/(mesa-member)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MesaMemberTabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <View style={styles.tabBarBlur} />
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <IconSymbol 
                size={24} 
                name="house.fill" 
                color={focused ? Colors.pearl : color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          title: 'Calendario',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <IconSymbol 
                size={24} 
                name="calendar" 
                color={focused ? Colors.pearl : color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="candidates"
        options={{
          title: 'Candidatos',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <IconSymbol 
                size={24} 
                name="person.3.fill" 
                color={focused ? Colors.pearl : color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="filtercandidates"
        options={{
          title: 'Búsqueda',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <IconSymbol 
                size={24} 
                name="magnifyingglass"
                color={focused ? Colors.pearl : color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="homework"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <IconSymbol 
                size={24} 
                name="list.bullet.clipboard.fill"
                color={focused ? Colors.pearl : color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <IconSymbol 
                size={24} 
                name="person.crop.circle.fill" 
                color={focused ? Colors.pearl : color} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

// Reutilizar los mismos estilos
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 20,
    backgroundColor: Colors.pearl,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: Colors.night,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 8,
    paddingBottom: 0,
  },
  tabBarBackground: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tabBarBlur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.pearl,
  },
  tabBarItem: {
    height: 70,
    paddingVertical: 8,
    borderRadius: 16,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});