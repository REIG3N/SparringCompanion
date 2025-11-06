import { Fonts } from '@/constants/theme';

export const typography = {
  families: {
    sans: Fonts.sans,
    serif: Fonts.serif,
    rounded: Fonts.rounded,
    mono: Fonts.mono,
  },
  scale: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
  lineHeights: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.4,
    relaxed: 1.6,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export type FontSizeKey = keyof typeof typography.scale;


