import { StyleSheet } from 'react-native';
import { spacing } from '@styles/atomic/spacing';
import { colors } from '@styles/atomic/colors';

export const styles = StyleSheet.create({
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statsGridItem: {
    width: '48%',
    marginBottom: spacing.md,
  },
  statCard: {
    backgroundColor: `rgba(255,255,255,0.05)`,
    borderColor: `rgba(255,255,255,0.10)`,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  errorBox: {
    backgroundColor: 'rgba(250,45,45,0.10)',
    borderColor: colors.light.danger,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
  },
  errorCard: {
    backgroundColor: 'rgba(250,45,45,0.10)',
    borderColor: colors.light.danger,
  },
  errorText: {
    color: colors.light.text,
    textAlign: 'center',
  },
  errorTextSmall: {
    color: colors.light.text,
  },
});



