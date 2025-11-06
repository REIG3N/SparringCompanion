import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { createFormStyles } from '@styles/components/forms';
import { spacing } from '@styles/atomic/spacing';
import { colors } from '@styles/atomic/colors';

type Props = ViewProps & {
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  mode?: 'light' | 'dark';
};

export default function FormField({
  label,
  helperText,
  errorText,
  required,
  mode = 'dark',
  style,
  children,
  ...rest
}: PropsWithChildren<Props>) {
  const styles = React.useMemo(() => createFormStyles(mode), [mode]);
  return (
    <View style={[{ marginBottom: spacing.lg }, style]} {...rest}>
      {!!label && (
        <Text style={[styles.label, { color: colors[mode].text }]}>
          {label}
        </Text>
      )}
      {children}
      {!!helperText && !errorText && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
      {!!errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
    </View>
  );
}


