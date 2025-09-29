import React from 'react';
import { View, Text } from 'react-native';
import { RadioPills } from '../../atomic/navigation/RadioPills';
import { RatingSelector } from '../../atomic/inputs/RatingSelector';
import { COLORS, OPACITY, RADIUS, SPACING, globalStyles } from '../../../styles';

export const GoalProgress = ({ 
  executionSuccess,
  oppositionLevel,
  consistency,
  confidence,
  onExecutionChange,
  onOppositionChange,
  onConsistencyChange,
  onConfidenceChange,
  isGroupSession = true,
}) => (
  <View style={{ backgroundColor: `rgba(255,255,255,${OPACITY.o05})`, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md }}>
    <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.md }}>Goal Progress</Text>
    {isGroupSession ? (
      <>
        <RatingSelector label="Execution Success" value={executionSuccess} onChange={onExecutionChange} />
        <View style={{ marginBottom: SPACING.md }}>
          <Text style={globalStyles.labelText}>Opposition Level</Text>
          <RadioPills options={['Less', 'Similar', 'More']} selected={oppositionLevel} onSelect={onOppositionChange} />
        </View>
        <View style={{ marginBottom: SPACING.md }}>
          <Text style={globalStyles.labelText}>Consistency</Text>
          <RadioPills options={['Difficult', 'Often', 'On Demand']} selected={consistency} onSelect={onConsistencyChange} />
        </View>
      </>
    ) : (
      <View style={{ marginBottom: SPACING.md }}>
        <Text style={globalStyles.labelText}>Confidence</Text>
        <RadioPills options={['Unnatural', 'Natural', 'Ready for Sparring']} selected={confidence} onSelect={onConfidenceChange} />
      </View>
    )}
  </View>
);


