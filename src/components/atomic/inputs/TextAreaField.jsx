import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { OPACITY, SPACING, globalStyles, COLORS } from '../../../styles';
import { Icons } from '../../../../constants/icons';

export const TextAreaField = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
  editable = true,
  required = false,
  optional = false,
  isInvalid = false,
}) => (
  <View style={{ marginBottom: SPACING.md }}>
    {label && (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        {required && isInvalid && <Icons.AlertTriangle size={14} color={COLORS.primary} />}
        <Text style={globalStyles.labelText}>{label}{!required && optional ? ' (optional)' : ''}</Text>
      </View>
    )}
    <TextInput
      style={[globalStyles.inputField, { minHeight: 80, textAlignVertical: 'top' }, !editable && { opacity: OPACITY.o40 }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={`rgba(117,117,117,${OPACITY.o60})`}
      multiline
      numberOfLines={numberOfLines}
      editable={editable}
    />
  </View>
);


