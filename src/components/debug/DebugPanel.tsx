import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { globalStyles, SPACING, TEXT_STYLES, COLORS } from '../../styles';

export type DebugPanelProps = {
  title?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
};

export default function DebugPanel({ title = 'Debug Panel', style, children }: DebugPanelProps) {
  return (
    <View style={[globalStyles.card, { marginTop: SPACING.md }, style]}>
      <View style={{ marginBottom: SPACING.sm }}>
        <Text style={[TEXT_STYLES.caption, { color: COLORS.secondary }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}
