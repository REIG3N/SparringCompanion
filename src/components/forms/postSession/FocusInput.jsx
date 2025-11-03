import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, OPACITY, RADIUS, SPACING, globalStyles } from '../../../styles';
import { Icons } from '../../../../constants/icons';
import { TextAreaField } from '../../atomic/inputs/TextAreaField';

export const FocusInput = ({ 
  type = 'success',
  focusType,
  domain,
  description,
  onTypeChange,
  onDomainChange,
  onDescriptionChange,
  disabled = false,
  required = false,
  optional = false,
  isInvalid = false,
  requiredType = false,
  optionalType = false,
  isInvalidType = false,
  requiredDomain = false,
  optionalDomain = false,
  isInvalidDomain = false,
}) => (
  <View style={{ backgroundColor: `rgba(255,255,255,${OPACITY.o05})`, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md }}>
    <Text style={{ fontSize: 16, fontWeight: '600', color: type === 'success' ? COLORS.success : COLORS.secondary, marginBottom: SPACING.sm }}>
      {type === 'success' ? 'Success' : 'Difficulty'}
    </Text>

    <View style={{ marginBottom: SPACING.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.xs }}>
        {requiredType && isInvalidType && <Icons.AlertTriangle size={14} color={COLORS.primary} />}
        <Text style={{ fontSize: 14, color: COLORS.accent }}>Type{!requiredType && optionalType ? ' (optional)' : ''}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: SPACING.xs }}>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: focusType === 0 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: focusType === 0 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => { if (!disabled) { onTypeChange(0); } }}
          disabled={disabled}
        >
          <Text style={{ fontSize: 12, color: focusType === 0 ? COLORS.text : COLORS.accent }}>Proaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: focusType === 1 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: focusType === 1 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => { if (!disabled) { onTypeChange(1); } }}
          disabled={disabled}
        >
          <Text style={{ fontSize: 12, color: focusType === 1 ? COLORS.text : COLORS.accent }}>Reaction</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={{ marginBottom: SPACING.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.xs }}>
        {requiredDomain && isInvalidDomain && <Icons.AlertTriangle size={14} color={COLORS.primary} />}
        <Text style={{ fontSize: 14, color: COLORS.accent }}>Domain{!requiredDomain && optionalDomain ? ' (optional)' : ''}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: SPACING.xs }}>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: domain === 0 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: domain === 0 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => { if (!disabled) { onDomainChange(0); } }}
          disabled={disabled}
        >
          <Text style={{ fontSize: 12, color: domain === 0 ? COLORS.text : COLORS.accent }}>Technique</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: domain === 1 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: domain === 1 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => { if (!disabled) { onDomainChange(1); } }}
          disabled={disabled}
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
      maxLength={400}
      showCounter
      editable={!disabled}
    />
  </View>
);


