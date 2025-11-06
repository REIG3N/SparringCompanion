import React, { PropsWithChildren } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { spacing, radii } from '@styles/atomic/spacing';

type CardProps = ViewProps & {
  elevated?: boolean;
};

export default function Card({ children, style, elevated, ...rest }: PropsWithChildren<CardProps>) {
  return (
    <View
      style={[styles.card, elevated && styles.elevated, style]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  elevated: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});


