import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, OPACITY, RADIUS, SPACING } from '../../../styles';
import { ButtonPrimary } from '../buttons/ButtonPrimary';

export const EmptyState = ({ icon = '📭', title = 'Aucune donnée', message = 'Les données apparaîtront ici', actionLabel = null, onAction = null }) => (
  <View style={{ backgroundColor: `rgba(255,255,255,${OPACITY.o05})`, borderStyle: 'dashed', borderWidth: 1, borderColor: `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.md, padding: SPACING.xl, alignItems: 'center' }}>
    <Text style={{ fontSize: 48, marginBottom: SPACING.md }}>{icon}</Text>
    <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.xs }}>{title}</Text>
    <Text style={{ fontSize: 14, color: COLORS.accent, opacity: OPACITY.o80, textAlign: 'center', marginBottom: actionLabel ? SPACING.md : 0 }}>{message}</Text>
    {actionLabel ? <ButtonPrimary title={actionLabel} onPress={onAction} /> : null}
  </View>
);


