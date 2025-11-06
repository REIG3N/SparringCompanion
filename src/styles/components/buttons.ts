import { StyleSheet } from 'react-native';
import { colors } from '../atomic/colors';
import { spacing, radii } from '../atomic/spacing';
import { typography } from '../atomic/typography';

export const createButtonStyles = (mode: 'light' | 'dark' = 'light') =>
  StyleSheet.create({
    base: {
      minHeight: 44,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      backgroundColor: colors[mode].tint,
    },
    secondary: {
      backgroundColor: colors[mode].card,
      borderWidth: 1,
      borderColor: colors[mode].border,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    label: {
      color: mode === 'light' ? '#fff' : '#000',
      fontFamily: typography.families.sans,
      fontSize: typography.scale.md,
      fontWeight: typography.weights.semibold,
    },
    labelSecondary: {
      color: colors[mode].text,
    },
    labelGhost: {
      color: colors[mode].tint,
    },
    sizeSm: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
    },
    sizeLg: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing['2xl'],
    },
  });


