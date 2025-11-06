import { StyleSheet } from 'react-native';
import { colors } from '../atomic/colors';
import { spacing, radii } from '../atomic/spacing';

export const createCardStyles = (mode: 'light' | 'dark' = 'light') =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[mode].card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors[mode].border,
    },
    header: {
      marginBottom: spacing.md,
    },
    footer: {
      marginTop: spacing.md,
    },
    elevated: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
  });


