import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, OPACITY, RADIUS, SPACING, globalStyles } from '../../../styles';
import { Icons } from '../../../../constants/icons';
import { TextAreaField } from '../../atomic/inputs/TextAreaField';
import i18n from '@/src/i18n';

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
      {type === 'success' ? (i18n.t('session.focus_input.success.title') ) : (i18n.t('session.focus_input.difficulty.title') )}
    </Text>

    <View style={{ marginBottom: SPACING.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.xs }}>
        {requiredType && isInvalidType && <Icons.AlertTriangle size={14} color={COLORS.primary} />}
        <Text style={{ fontSize: 14, color: COLORS.accent }}>
          {i18n.t('session.focus_input.type.label')}{!requiredType && optionalType ? ' (optional)' : ''}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: SPACING.xs }}>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: focusType === 0 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: focusType === 0 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => { if (!disabled) { onTypeChange(0); } }}
          disabled={disabled}
        >
          <Text style={{ fontSize: 12, color: focusType === 0 ? COLORS.text : COLORS.accent }}>{i18n.t('session.focus_input.type.proaction')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: focusType === 1 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: focusType === 1 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => { if (!disabled) { onTypeChange(1); } }}
          disabled={disabled}
        >
          <Text style={{ fontSize: 12, color: focusType === 1 ? COLORS.text : COLORS.accent }}>{i18n.t('session.focus_input.type.reaction')}</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={{ marginBottom: SPACING.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: SPACING.xs }}>
        {requiredDomain && isInvalidDomain && <Icons.AlertTriangle size={14} color={COLORS.primary} />}
        <Text style={{ fontSize: 14, color: COLORS.accent }}>
          {i18n.t('session.focus_input.domain.label')}{!requiredDomain && optionalDomain ? ' (optional)' : ''}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: SPACING.xs }}>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: domain === 0 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: domain === 0 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => { if (!disabled) { onDomainChange(0); } }}
          disabled={disabled}
        >
          <Text style={{ fontSize: 12, color: domain === 0 ? COLORS.text : COLORS.accent }}>{i18n.t('session.focus_input.domain.technical')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, padding: SPACING.sm, backgroundColor: domain === 1 ? COLORS.primary : 'transparent', borderWidth: 1, borderColor: domain === 1 ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`, borderRadius: RADIUS.xs, alignItems: 'center' }}
          onPress={() => { if (!disabled) { onDomainChange(1); } }}
          disabled={disabled}
        >
          <Text style={{ fontSize: 12, color: domain === 1 ? COLORS.text : COLORS.accent }}>{i18n.t('session.focus_input.domain.tactical')}</Text>
        </TouchableOpacity>
      </View>
    </View>

    <TextAreaField
      value={description}
      onChangeText={onDescriptionChange}
      placeholder={type === 'success' ? (i18n.t('session.focus_input.placeholder_success') ) : (i18n.t('session.focus_input.placeholder_difficulty') )}
      numberOfLines={4}
      maxLength={400}
      showCounter
      editable={!disabled}
    />
  </View>
);


