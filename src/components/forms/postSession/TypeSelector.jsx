import React from 'react';
import { View, Text } from 'react-native';
import { RadioPills } from '../../atomic/navigation/RadioPills';
import { SPACING, globalStyles } from '../../../styles';

export const TypeSelector = ({ value, onChange, disabled = false }) => (
  <View style={{ marginBottom: SPACING.md }}>
    <Text style={globalStyles.labelText}>Type</Text>
    <RadioPills options={['Practice', 'Sparring']} selected={value} onSelect={onChange} disabled={disabled} />
  </View>
);


