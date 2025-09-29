import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, OPACITY, RADIUS, SPACING, globalStyles } from '../../../styles';
import { TextAreaField } from '../../atomic/inputs/TextAreaField';

export const FocusInput = ({ 
  type = 'success',
  focusType,
  domain,
  description,
  onTypeChange,
  onDomainChange,
  onDescriptionChange,
}) => (
  <View style={{ backgroundColor: `rgba(255,255,255,${OPACITY.o05})`, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md }}>
    <Text style={{ fontSize: 16, fontWeight: '600', color: type === 'success' ? COLORS.success : COLORS.secondary, marginBottom: SPACING.sm }}>
      {type === 'success' ? 'Success' : 'Difficulty'}
    </Text>

    <View style={{ marginBottom: SPACING.sm }}>
      <Text style={{ fontSize: 14, color: COLORS.accent, marginBottom: SPACING.xs }}>Type</Text>
      <View style={{ flexDirection: 'row', gap: SPACING.xs }}>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: focusType === 0 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: focusType === 0 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => onTypeChange(0)}
        >
          <Text style={{ fontSize: 12, color: focusType === 0 ? COLORS.text : COLORS.accent }}>Proaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: focusType === 1 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: focusType === 1 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => onTypeChange(1)}
        >
          <Text style={{ fontSize: 12, color: focusType === 1 ? COLORS.text : COLORS.accent }}>Reaction</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={{ marginBottom: SPACING.sm }}>
      <Text style={{ fontSize: 14, color: COLORS.accent, marginBottom: SPACING.xs }}>Domain</Text>
      <View style={{ flexDirection: 'row', gap: SPACING.xs }}>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: domain === 0 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: domain === 0 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => onDomainChange(0)}
        >
          <Text style={{ fontSize: 12, color: domain === 0 ? COLORS.text : COLORS.accent }}>Technique</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: domain === 1 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: domain === 1 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => onDomainChange(1)}
        >
          <Text style={{ fontSize: 12, color: domain === 1 ? COLORS.text : COLORS.accent }}>Tactique</Text>
        </TouchableOpacity>
      </View>
    </View>

    <TextAreaField
      value={description}
      onChangeText={onDescriptionChange}
      placeholder={`Describe ${type}...`}
      numberOfLines={4}
    />
  </View>
);


