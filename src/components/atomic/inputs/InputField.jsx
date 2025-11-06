import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { COLORS, OPACITY, SPACING, globalStyles } from '../../../styles';
import { Icons } from '../../../../constants/icons';

export const InputField = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  error = false,
  errorMessage = '',
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
      style={[
        globalStyles.inputField,
        error && { borderColor: COLORS.primary, borderWidth: 2 },
        !editable && { opacity: OPACITY.o40 },
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={`rgba(117,117,117,${OPACITY.o60})`}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      editable={editable}
    />
    {error && errorMessage ? (
      <Text style={{ color: COLORS.primary, fontSize: 12, marginTop: SPACING.xs }}>
        {errorMessage}
      </Text>
    ) : null}
  </View>
);


