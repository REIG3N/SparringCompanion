import { Colors } from '@/constants/theme';

export type ThemeMode = 'light' | 'dark';

export const colors = {
  light: {
    text: Colors.light.text,
    background: Colors.light.background,
    tint: Colors.light.tint,
    icon: Colors.light.icon,
    border: '#E6E8EB',
    mutedText: '#687076',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    card: '#FFFFFF',
  },
  dark: {
    text: Colors.dark.text,
    background: Colors.dark.background,
    tint: Colors.dark.tint,
    icon: Colors.dark.icon,
    border: '#2A2E33',
    mutedText: '#9BA1A6',
    success: '#16A34A',
    warning: '#D97706',
    danger: '#DC2626',
    card: '#1B1F23',
  },
} as const;

export type SemanticColor = keyof typeof colors.light;


