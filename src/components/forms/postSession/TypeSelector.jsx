import React from 'react';
import { View, Text } from 'react-native';
import { RadioPills } from '../../atomic/navigation/RadioPills';
import { SPACING, globalStyles, COLORS } from '../../../styles';
import { Icons } from '../../../../constants/icons';
import i18n from '@/src/i18n';

export const TypeSelector = ({ value, onChange, disabled = false, required = false, optional = false, isInvalid = false }) => (
  <View style={{ marginBottom: SPACING.md }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
      {required && isInvalid && <Icons.AlertTriangle size={14} color={COLORS.primary} />}
      <Text style={globalStyles.labelText}>{i18n.t('session.form.type.label')}{!required && optional ? ' (optional)' : ''}</Text>
    </View>
    <RadioPills
      options={[i18n.t('session.form.type.practice'), i18n.t('session.form.type.sparring')]}
      selected={value}
      onSelect={onChange}
      disabled={disabled}
    />
  </View>
);


