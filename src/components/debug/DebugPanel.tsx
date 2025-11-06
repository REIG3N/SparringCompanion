import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { SPACING, TEXT_STYLES, COLORS } from '../../styles';
import Card from '@/src/components/ui/Card';
import CardHeader from '@/src/components/ui/CardHeader';

export type DebugPanelProps = {
  title?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
};

export default function DebugPanel({ title = 'Debug Panel', style, children }: DebugPanelProps) {
  return (
    <Card style={[{ marginTop: SPACING.md }, style]}>
      <CardHeader>
        <Text style={[TEXT_STYLES.caption, { color: COLORS.secondary }]}>{title}</Text>
      </CardHeader>
      {children}
    </Card>
  );
}
