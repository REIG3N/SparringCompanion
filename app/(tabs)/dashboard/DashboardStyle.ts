import { StyleSheet } from 'react-native';
import { SPACING, COLORS } from '../../../src/styles';

export const styles = StyleSheet.create({
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  statsGridItem: {
    width: '48%',
    marginBottom: SPACING.md,
  },
  statCard: {
    backgroundColor: `rgba(255,255,255,0.05)`,
    borderColor: `rgba(255,255,255,0.10)`,
    borderWidth: 1,
    borderRadius: 12,
    padding: SPACING.md,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  errorBox: {
    backgroundColor: 'rgba(250,45,45,0.10)',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    padding: SPACING.md,
  },
  errorCard: {
    backgroundColor: 'rgba(250,45,45,0.10)',
    borderColor: COLORS.primary,
  },
  errorText: {
    color: COLORS.text,
    textAlign: 'center',
  },
  errorTextSmall: {
    color: COLORS.text,
  },
});


