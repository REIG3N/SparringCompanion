import { useState } from 'react';

export type Settings = Record<string, unknown>;

export default function useSettingsData() {
  const [settings, setSettings] = useState<Settings>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return { settings, setSettings, isLoading, error };
}


