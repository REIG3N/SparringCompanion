import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useEffect, useState } from 'react';

import { initI18n, LanguageProvider } from '@/src/i18n';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initI18n();
      setI18nReady(true);
    })();
  }, []);

  return (
    <>
      {i18nReady && (
      <LanguageProvider>
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="auth/authScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/dashboard/DashboardScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/Settings/settings" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="modals" options={{ headerShown: false }} />
        </Stack>
      </LanguageProvider>
      )}

    </>
  );
}
