import React, { useMemo } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { OPACITY, SPACING, globalStyles, COLORS } from '../../../styles';
import { Icons } from '../../../../constants/icons';

export const TextAreaField = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
  maxLength,
  showCounter = false,
  editable = true,
  required = false,
  optional = false,
  isInvalid = false,
}) => {
  const screenHeight = Dimensions.get('window').height || 800;
  const baseMinHeight = 80;
  const maxAutoHeight = useMemo(() => Math.max(140, Math.floor(screenHeight * 0.90)), [screenHeight]);

  return (
    <View style={{ marginBottom: SPACING.md }}>
      {label && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          {required && isInvalid && <Icons.AlertTriangle size={14} color={COLORS.primary} />}
          <Text style={globalStyles.labelText}>{label}</Text>
        </View>
      )}
      <TextInput
        style={[
          globalStyles.inputField,
          { minHeight: baseMinHeight, maxHeight: maxAutoHeight, textAlignVertical: 'top' },
          !editable && { opacity: OPACITY.o40 },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={`rgba(117,117,117,${OPACITY.o60})`}
        multiline
        numberOfLines={numberOfLines}
        editable={editable}
        maxLength={maxLength}
      />
      {showCounter && typeof value === 'string' && typeof maxLength === 'number' ? (
        <Text style={{ color: COLORS.accent, opacity: OPACITY.o60, fontSize: 12, marginTop: SPACING.xs, textAlign: 'right' }}>
          {value.length}/{maxLength}
        </Text>
      ) : null}
    </View>
  );
};


