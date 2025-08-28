import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7dd3fc',
        tabBarInactiveTintColor: '#cccccc',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#00494c',
          borderTopColor: 'rgba(255,255,255,0.1)',
          borderTopWidth: 1,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <FontAwesome name="lightbulb-o" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}