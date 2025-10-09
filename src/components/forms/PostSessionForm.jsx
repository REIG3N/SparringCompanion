import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { COLORS, SPACING } from '../../styles';
import { ButtonPrimary } from '../atomic/buttons/ButtonPrimary';
import { TabNavigation } from '../atomic/navigation/TabNavigation';
import { InputField } from '../atomic/inputs/InputField';
import { TextAreaField } from '../atomic/inputs/TextAreaField';
import { RadioPills } from '../atomic/navigation/RadioPills';
import { RatingSelector } from '../atomic/inputs/RatingSelector';
import { FormSection } from './postSession/FormSection';
import { EnvironmentSelector } from './postSession/EnvironmentSelector';
import { TypeSelector } from './postSession/TypeSelector';
import { FocusInput } from './postSession/FocusInput';
import { GoalProgress } from './postSession/GoalProgress';

export const PostSessionForm = ({ onSubmit, initialData = {} }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    date: initialData.date || new Date().toISOString().split('T')[0],
    duration: initialData.duration || '',
    environment: initialData.environment || 0,
    type: initialData.type || 0,
    fatigue: initialData.fatigue || null,
    fun: initialData.fun || null,
    successType: initialData.successType || 0,
    successDomain: initialData.successDomain || 0,
    successDescription: initialData.successDescription || '',
    difficultyType: initialData.difficultyType || 0,
    difficultyDomain: initialData.difficultyDomain || 0,
    difficultyDescription: initialData.difficultyDescription || '',
    notes: initialData.notes || '',
    executionSuccess: initialData.executionSuccess || null,
    oppositionLevel: initialData.oppositionLevel || 1,
    consistency: initialData.consistency || 0,
    confidence: initialData.confidence || 0,
  });

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={{ padding: SPACING.lg }}>
        <TabNavigation tabs={['Basic', 'Focus', 'Notes']} activeTab={activeTab} onTabPress={setActiveTab} />

        <View style={{ marginTop: SPACING.lg }}>
          {activeTab === 0 && (
            <FormSection>
              <InputField label="Date" value={formData.date} onChangeText={(text) => setFormData({ ...formData, date: text })} placeholder="YYYY-MM-DD" />
              <InputField label="Duration (minutes)" value={formData.duration} onChangeText={(text) => setFormData({ ...formData, duration: text })} placeholder="45" keyboardType="numeric" />
              <EnvironmentSelector value={formData.environment} onChange={(value) => setFormData({ ...formData, environment: value })} />
              <TypeSelector value={formData.type} onChange={(value) => setFormData({ ...formData, type: value })} />
              <RatingSelector label="Fatigue (1-5)" value={formData.fatigue} onChange={(value) => setFormData({ ...formData, fatigue: value })} />
              <RatingSelector label="Fun (1-5)" value={formData.fun} onChange={(value) => setFormData({ ...formData, fun: value })} />
            </FormSection>
          )}

          {activeTab === 1 && (
            <FormSection>
              <FocusInput type="success" focusType={formData.successType} domain={formData.successDomain} description={formData.successDescription} onTypeChange={(value) => setFormData({ ...formData, successType: value })} onDomainChange={(value) => setFormData({ ...formData, successDomain: value })} onDescriptionChange={(text) => setFormData({ ...formData, successDescription: text })} />
              <FocusInput type="difficulty" focusType={formData.difficultyType} domain={formData.difficultyDomain} description={formData.difficultyDescription} onTypeChange={(value) => setFormData({ ...formData, difficultyType: value })} onDomainChange={(value) => setFormData({ ...formData, difficultyDomain: value })} onDescriptionChange={(text) => setFormData({ ...formData, difficultyDescription: text })} />
              <GoalProgress executionSuccess={formData.executionSuccess} oppositionLevel={formData.oppositionLevel} consistency={formData.consistency} confidence={formData.confidence} onExecutionChange={(value) => setFormData({ ...formData, executionSuccess: value })} onOppositionChange={(value) => setFormData({ ...formData, oppositionLevel: value })} onConsistencyChange={(value) => setFormData({ ...formData, consistency: value })} onConfidenceChange={(value) => setFormData({ ...formData, confidence: value })} isGroupSession={formData.environment === 1} />
            </FormSection>
          )}

          {activeTab === 2 && (
            <FormSection>
              <TextAreaField label="Session Notes" value={formData.notes} onChangeText={(text) => setFormData({ ...formData, notes: text })} placeholder="Observations sur votre performance, points à retenir..." numberOfLines={6} />
            </FormSection>
          )}
        </View>

        <ButtonPrimary title="Enregistrer Session" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};
