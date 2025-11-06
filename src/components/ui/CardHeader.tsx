import React, { PropsWithChildren, ReactNode } from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { spacing } from '@styles/atomic/spacing';
import { typography } from '@styles/atomic/typography';
import { colors } from '@styles/atomic/colors';

type CardHeaderProps = ViewProps & {
  title?: string;
  right?: ReactNode;
  mode?: 'light' | 'dark';
};

export default function CardHeader({ title, right, mode = 'dark', style, children, ...rest }: PropsWithChildren<CardHeaderProps>) {
  return (
    <View style={[styles.row, style]} {...rest}>
      {title ? (
        <Text style={[styles.title, { color: colors[mode].text }]}>{title}</Text>
      ) : children}
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.scale.lg,
    fontWeight: typography.weights.semibold,
  },
});


