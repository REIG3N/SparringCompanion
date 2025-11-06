import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, SPACING } from '../../../styles';

export const FormSection = ({ title, children }) => (
  <View style={{ marginBottom: SPACING.lg }}>
    {title ? (
      <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.md }}>
        {title}
      </Text>
    ) : null}
    {children}
  </View>
);


