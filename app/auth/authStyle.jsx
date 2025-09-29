import { StyleSheet } from 'react-native';

// Design tokens inspired by the provided HTML/CSS
const COLORS = {
  background: '#2a2e51',
  primary: '#fa2d2d',
  secondary: '#edaa18',
  accent: '#757575',
  text: '#ffffff',
};

const OPACITY = {
  o100: 1.0,
  o80: 0.8,
  o60: 0.6,
  o40: 0.4,
  o20: 0.2,
  o10: 0.1,
  o05: 0.05,
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
};

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  inner: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: SPACING.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    lineHeight: 38,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.secondary,
    opacity: OPACITY.o80,
    lineHeight: 20,
    textAlign: 'center',
  },
  radioPills: {
    flexDirection: 'row',
    backgroundColor: `rgba(255,255,255,${OPACITY.o05})`,
    borderRadius: RADIUS.sm,
    padding: 4,
    marginBottom: SPACING.xl,
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
  formSection: {
    marginBottom: SPACING.lg,
  },
  formGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'left',
  },
  input: {
    backgroundColor: `rgba(255,255,255,${OPACITY.o05})`,
    borderColor: `rgba(255,255,255,${OPACITY.o10})`,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    color: COLORS.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: SPACING.md,
  },
  buttonPrimaryText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomLinkContainer: {
    alignItems: 'center',
  },
  bottomLinkText: {
    color: COLORS.accent,
    fontSize: 14,
    textDecorationLine: 'underline',
    opacity: OPACITY.o80,
  },
});

export default authStyles;
