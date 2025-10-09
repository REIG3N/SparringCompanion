import { Tabs } from 'expo-router';
import React from 'react';
import { Icons } from '@/constants/icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="dashboard/DashboardScreen"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icons.Home size={size ?? 24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="Goals/goalScreen"
        options={{
          title: 'Goals',
          tabBarIcon: ({ color, size }) => (
            <Icons.Target size={size ?? 24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings/settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icons.Settings size={size ?? 24} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
