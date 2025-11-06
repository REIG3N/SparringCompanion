import { StyleSheet } from 'react-native';
import { colors } from '../atomic/colors';
import { spacing, radii } from '../atomic/spacing';
import { typography } from '../atomic/typography';

export const createFormStyles = (mode: 'light' | 'dark' = 'light') =>
  StyleSheet.create({
    label: {
      marginBottom: spacing.xs,
      color: colors[mode].mutedText,
      fontFamily: typography.families.sans,
      fontSize: typography.scale.sm,
    },
    input: {
      minHeight: 44,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors[mode].border,
      color: colors[mode].text,
      backgroundColor: mode === 'light' ? '#FFFFFF' : '#0F1316',
    },
    helperText: {
      marginTop: spacing.xs,
      color: colors[mode].mutedText,
      fontSize: typography.scale.xs,
    },
    errorText: {
      marginTop: spacing.xs,
      color: colors[mode].danger,
      fontSize: typography.scale.xs,
    },
  });


