import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, OPACITY, RADIUS, SPACING } from '../../../styles';
import { ButtonOutline } from '../buttons/ButtonOutline';

export const ErrorState = ({ message = 'Une erreur est survenue', onRetry = null }) => (
  <View style={{ backgroundColor: `rgba(250,45,45,${OPACITY.o10})`, borderWidth: 1, borderColor: COLORS.primary, borderRadius: RADIUS.md, padding: SPACING.lg, alignItems: 'center' }}>
    <Text style={{ fontSize: 32, color: COLORS.primary, marginBottom: SPACING.sm }}>⚠</Text>
    <Text style={{ fontSize: 14, color: COLORS.text, textAlign: 'center', marginBottom: onRetry ? SPACING.md : 0 }}>{message}</Text>
    {onRetry ? <ButtonOutline title="Réessayer" onPress={onRetry} /> : null}
  </View>
);


