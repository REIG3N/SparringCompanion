import React from 'react';
import { View, Text } from 'react-native';
import { RadioPills } from '../../atomic/navigation/RadioPills';
import { SPACING, globalStyles } from '../../../styles';

export const EnvironmentSelector = ({ value, onChange }) => (
  <View style={{ marginBottom: SPACING.md }}>
    <Text style={globalStyles.labelText}>Environment</Text>
    <RadioPills options={['Solo', 'Group']} selected={value} onSelect={onChange} />
  </View>
);


