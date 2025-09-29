import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { COLORS, OPACITY, SPACING } from '../../../styles';

export const LoadingState = ({ message = 'Chargement...' }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl }}>
    <ActivityIndicator size="large" color={COLORS.primary} />
    <Text style={{ marginTop: SPACING.md, fontSize: 14, color: COLORS.accent, opacity: OPACITY.o60 }}>{message}</Text>
  </View>
);


