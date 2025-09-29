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
  buttonPrimaryText: globalStyles.buttonPrimaryTextAlt,
  bottomLinkContainer: { alignItems: 'center' },
  bottomLinkText: {
    fontSize: 14,
    color: COLORS.accent,
    textDecorationLine: 'underline',
  },
});

export default authStyles;
