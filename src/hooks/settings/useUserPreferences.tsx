import { useState } from 'react';

export type UserPreferences = {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
};

export default function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({ theme: 'system' });

  return { preferences, setPreferences };
}


