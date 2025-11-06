import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { spacing, radii } from '@styles/atomic/spacing';
import { colors } from '@styles/atomic/colors';

type ErrorBoxProps = ViewProps & {
  message?: string;
  mode?: 'light' | 'dark';
};

export default function ErrorBox({ message, children, style, mode = 'dark', ...rest }: PropsWithChildren<ErrorBoxProps>) {
  return (
    <View style={[styles.container, { borderColor: colors[mode].danger }, style]} {...rest}>
      {message ? <Text style={[styles.text, { color: colors[mode].text }]}>{message}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(250,45,45,0.10)',
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  text: {
    textAlign: 'center',
  },
});


