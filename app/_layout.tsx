import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="auth/authScreen" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal', animation: 'slide_from_bottom' }}
        />
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        </Stack>

    </>
  );
}
