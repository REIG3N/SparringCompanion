import { StyleSheet } from 'react-native';
export const COLORS = {
  background: '#2a2e51',
  primary: '#fa2d2d',
  secondary: '#edaa18',
  accent: '#757575',
  text: '#ffffff',
  success: '#00d084',
};

export const OPACITY = {
  o100: 1.0,
  o80: 0.8,
  o60: 0.6,
  o40: 0.4,
  o20: 0.2,
  o10: 0.1,
  o05: 0.05,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 50,
};

// Typography presets
export const TEXT_STYLES = StyleSheet.create({
  headerXL: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    lineHeight: 34,
  },
  headerLG: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.secondary,
    lineHeight: 28,
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    color: COLORS.text,
    lineHeight: 22,
  },
  data: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 28,
  },
  dataSmall: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.accent,
    opacity: OPACITY.o80,
    lineHeight: 20,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.accent,
    opacity: OPACITY.o60,
    lineHeight: 18,
  },
});

export const globalStyles = StyleSheet.create({
  appScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },

  card: {
    backgroundColor: `rgba(255,255,255,${OPACITY.o05})`,
    borderColor: `rgba(255,255,255,${OPACITY.o10})`,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  statCardTitle: {
    fontSize: 14,
    color: COLORS.text,
    opacity: OPACITY.o80,
    marginBottom: SPACING.xs,
  },
  statCardTitleAlt: {
    fontSize: 14,
    color: COLORS.accent,
    marginBottom: SPACING.xs,
  },
  statCardTitleBright: {
    fontSize: 14,
    color: COLORS.secondary,
    opacity: OPACITY.o80,
    marginBottom: SPACING.xs,
  },
  statCardValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 34,
  },
  statCardChangePositive: {
    marginTop: SPACING.xs,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.success,
  },
  statCardChangeNegative: {
    marginTop: SPACING.xs,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  statScorePoor: { borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  statScoreAverage: { borderLeftWidth: 4, borderLeftColor: COLORS.secondary },
  statScoreExcellent: { borderLeftWidth: 4, borderLeftColor: COLORS.success },

  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonPrimaryText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonSecondaryText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: `rgba(255,255,255,${OPACITY.o20})`,
    borderWidth: 2,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonOutlineText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },

  radioPills: {
    flexDirection: 'row',
    backgroundColor: `rgba(255,255,255,${OPACITY.o05})`,
    borderRadius: RADIUS.sm,
    padding: 4,
  },
  radioPill: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.xs,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  radioPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.accent,
  },
  radioPillSelected: {
    backgroundColor: COLORS.primary,
  },
  radioPillTextSelected: {
    color: COLORS.text,
  },

  inputField: {
    backgroundColor: `rgba(255,255,255,${OPACITY.o05})`,
    borderColor: `rgba(255,255,255,${OPACITY.o10})`,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    color: COLORS.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: `rgba(255,255,255,${OPACITY.o05})`,
    borderRadius: RADIUS.sm,
    padding: 4,
  },
  tabItem: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    borderRadius: RADIUS.xs,
  },
  tabItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.accent,
  },
  tabItemActive: {
    backgroundColor: COLORS.primary,
  },
  tabItemTextActive: {
    color: COLORS.text,
  },

  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: `rgba(255,255,255,${OPACITY.o10})`,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFillLow: { height: '100%', backgroundColor: COLORS.primary },
  progressFillMedium: { height: '100%', backgroundColor: COLORS.secondary },
  progressFillHigh: { height: '100%', backgroundColor: COLORS.success },

  sessionItem: {
    backgroundColor: `rgba(255,255,255,${OPACITY.o05})`,
    borderColor: `rgba(255,255,255,${OPACITY.o10})`,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionInfo: { flex: 1 },
  sessionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  sessionSubtitle: { fontSize: 14, color: COLORS.accent, opacity: OPACITY.o80 },
  sessionMeta: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },

  calendarWeek: { flexDirection: 'row', gap: SPACING.xs },
  calendarDay: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgba(255,255,255,${OPACITY.o05})`,
  },
  calendarDaySelected: { backgroundColor: COLORS.primary },
  calendarDayHasSession: { borderWidth: 2, borderColor: COLORS.secondary },

  swotSection: {
    backgroundColor: `rgba(255,255,255,${OPACITY.o05})`,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 4,
  },
  swotStrengths: { borderLeftColor: COLORS.primary },
  swotWeaknesses: { borderLeftColor: COLORS.secondary },
  swotOpportunities: { borderLeftColor: COLORS.primary },
  swotThreats: { borderLeftColor: COLORS.secondary },
});


