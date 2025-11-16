// app/(citizen)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function CitizenTabLayout() {
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
        name="voting"
        options={{
          title: 'Votación',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <IconSymbol 
                size={24} 
                name="checkmark.square.fill"
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

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0, // Pegado al fondo
    left: 0, // Sin márgenes laterales
    right: 0,
    height: Platform.OS === 'ios' ? 85 : 70, // Altura ajustada para iOS/Android
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: Colors.night,
    shadowOffset: {
      width: 0,
      height: -4, // Sombra hacia arriba
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderBottomWidth: 0, // Sin borde inferior
    backgroundColor: Colors.pearl,
    paddingHorizontal: 8,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8, // Safe area para iOS
  },
  tabBarBackground: {
    flex: 1,
    overflow: 'hidden',
  },
  tabBarBlur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.pearl,
  },
  tabBarItem: {
    height: Platform.OS === 'ios' ? 70 : 60,
    paddingVertical: 8,
    borderRadius: 12,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});