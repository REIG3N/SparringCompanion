import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Icons } from '@/constants/icons';

export default function TabLayout() {

  return ( <Stack screenOptions={{ headerShown: false }} />
    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //   }}>
    //   <Tabs.Screen
    //     name="dashboard/DashboardScreen"
    //     options={{
    //       title: 'Dashboard',
    //       tabBarIcon: ({ color, size }) => (
    //         <Icons.Home size={size ?? 24} color={color as string} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="Settings/settings"
    //     options={{
    //       title: 'Settings',
    //       tabBarIcon: ({ color, size }) => (
    //         <Icons.Settings size={size ?? 24} color={color as string} />
    //       ),
    //     }}
    //   />
    // </Tabs>
  );
}
