import { StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, globalStyles, TEXT_STYLES } from '../../utils/globalStyles';

const authStyles = StyleSheet.create({
  container: {
    ...globalStyles.appScreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: SPACING.md,
  },
  card: {
    ...globalStyles.card,
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    ...TEXT_STYLES.headerXL,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    ...TEXT_STYLES.body,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  radioPills: {
    ...globalStyles.radioPills,
    marginBottom: SPACING.xl,
  },
  radioPill: globalStyles.radioPill,
  radioPillText: globalStyles.radioPillText,
  radioPillSelected: globalStyles.radioPillSelected,
  radioPillTextSelected: globalStyles.radioPillTextSelected,
  formSection: { marginBottom: SPACING.lg },
  formGroup: { marginBottom: SPACING.md },
  label: globalStyles.labelText,
  input: globalStyles.inputField,
  buttonPrimary: {
    ...globalStyles.buttonPrimary,
    marginBottom: SPACING.md,
  },
  buttonPrimaryText: globalStyles.buttonPrimaryText,
  bottomLinkContainer: { alignItems: 'center' },
  bottomLinkText: {
    fontSize: 14,
    color: COLORS.accent,
    textDecorationLine: 'underline',
  },
  // Outline button reused here for language pills with flags only
  buttonOutline: {
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minWidth: 80,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    overflow: 'hidden',
    position: 'relative',
  },
  buttonOutlineText: {
    color: COLORS.accent,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  flagText: {
    fontSize: 28,
    textAlign: 'center',
  },
});

export default authStyles;
