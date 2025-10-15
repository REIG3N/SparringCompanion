import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { COLORS, SPACING, TEXT_STYLES } from "../../styles";
import { Icons } from "@/constants/icons";
import { ButtonPrimary } from "../atomic/buttons/ButtonPrimary";
import { TabNavigation } from "../atomic/navigation/TabNavigation";
import { InputField } from "../atomic/inputs/InputField";
import { TextAreaField } from "../atomic/inputs/TextAreaField";
import { RadioPills } from "../atomic/navigation/RadioPills";
import { RatingSelector } from "../atomic/inputs/RatingSelector";
import { FormSection } from "./postSession/FormSection";
import { EnvironmentSelector } from "./postSession/EnvironmentSelector";
import { TypeSelector } from "./postSession/TypeSelector";
import { FocusInput } from "./postSession/FocusInput";
import { GoalProgress } from "./postSession/GoalProgress";
import { getEmptySession } from '@/src/repositories/sessionsRepository';

export const PostSessionForm = ({ onCompletionChange,onFormDataChange, initialData = {}, readOnly = false }) => {
  const [activeTab, setActiveTab] = useState(0);
  // const [isAllTabsComplete, setIsAllTabsComplete] = useState(false);
  const [formData, setFormData] = useState(() => {
    const emptySession = getEmptySession();
    return {
      date: initialData.date || emptySession.date,
      duration: initialData.duration || emptySession.duration,
      environment: initialData.environment ?? emptySession.environment,
      groupProgress: {
        executionSuccess: initialData.groupProgress?.executionSuccess ?? emptySession.executionSuccess,
        oppositionLevel: initialData.groupProgress?.oppositionLevel ?? emptySession.oppositionLevel,
        consistency: initialData.groupProgress?.consistency ?? emptySession.consistency,
      },
      soloProgress: {
        confidence: initialData.soloProgress?.confidence ?? emptySession.confidence,
      },
      type: initialData.type ?? emptySession.type,
      fatigue: initialData.fatigue ?? emptySession.fatigue,
      fun: initialData.fun ?? emptySession.fun,
      successType: initialData.successType ?? emptySession.successType,
      successDomain: initialData.successDomain ?? emptySession.successDomain,
      successDescription: initialData.successDescription || emptySession.successDescription,
      difficultyType: initialData.difficultyType ?? emptySession.difficultyType,
      difficultyDomain: initialData.difficultyDomain ?? emptySession.difficultyDomain,
      difficultyDescription: initialData.difficultyDescription || emptySession.difficultyDescription,
      notes: initialData.notes || emptySession.notes,
      executionSuccess: initialData.executionSuccess ?? emptySession.executionSuccess,
      oppositionLevel: initialData.oppositionLevel ?? emptySession.oppositionLevel,
      consistency: initialData.consistency ?? emptySession.consistency,
      confidence: initialData.confidence ?? emptySession.confidence,
    };
  });

  // When initialData changes (e.g., after fetch by id), repopulate the form
  useEffect(() => {
    const emptySession = getEmptySession();
    const next = {
      date: initialData.date || emptySession.date,
      duration: initialData.duration || emptySession.duration,
      environment: initialData.environment ?? emptySession.environment,
      groupProgress: {
        executionSuccess: initialData.groupProgress?.executionSuccess ?? emptySession.executionSuccess,
        oppositionLevel: initialData.groupProgress?.oppositionLevel ?? emptySession.oppositionLevel,
        consistency: initialData.groupProgress?.consistency ?? emptySession.consistency,
      },
      soloProgress: {
        confidence: initialData.soloProgress?.confidence ?? emptySession.confidence,
      },
      type: initialData.type ?? emptySession.type,
      fatigue: initialData.fatigue ?? emptySession.fatigue,
      fun: initialData.fun ?? emptySession.fun,
      successType: initialData.successType ?? emptySession.successType,
      successDomain: initialData.successDomain ?? emptySession.successDomain,
      successDescription: initialData.successDescription || emptySession.successDescription,
      difficultyType: initialData.difficultyType ?? emptySession.difficultyType,
      difficultyDomain: initialData.difficultyDomain ?? emptySession.difficultyDomain,
      difficultyDescription: initialData.difficultyDescription || emptySession.difficultyDescription,
      notes: initialData.notes || emptySession.notes,
      executionSuccess: initialData.executionSuccess ?? emptySession.executionSuccess,
      oppositionLevel: initialData.oppositionLevel ?? emptySession.oppositionLevel,
      consistency: initialData.consistency ?? emptySession.consistency,
      confidence: initialData.confidence ?? emptySession.confidence,
    };
    setFormData(next);
  }, [initialData]);

  useEffect(() => {
    onCompletionChange?.(isAllTabsComplete);
  }, [formData]);

  useEffect(() => {
    onFormDataChange?.(formData);
  }, [formData]);


  const isBasicTabComplete = () => {
    return (
      formData.date !== null &&
      typeof formData.date === "string" && formData.date.trim().length > 0 &&
      formData.duration !== null &&
      typeof formData.duration === "string" && formData.duration.trim().length > 0 &&
      formData.environment !== null &&
      formData.environment !== undefined &&
      formData.type !== null &&
      formData.type !== undefined &&
      formData.fatigue !== null &&
      formData.fun !== null
    );
  }
  const isFocusTabComplete = () => {
    const baseComplete = 
      formData.successType !== null  &&
      formData.successDomain !== null  &&
      formData.difficultyType !== null  &&
      formData.difficultyDomain !== null;
    
    if (formData.environment === null) {
      return false;
    }
    
    if (formData.environment === 0) {
      return baseComplete &&
        formData.executionSuccess !== null &&
        formData.consistency !== null &&
        formData.confidence !== null;
    }
    
    if (formData.environment === 1) {
      return baseComplete &&
        formData.executionSuccess !== null &&
        formData.oppositionLevel !== null &&
        formData.consistency !== null &&
        formData.confidence !== null;
    }
    
    return false;
  };

  const isAllTabsComplete = isBasicTabComplete() && isFocusTabComplete();

  const requiredMap = {
    date: true,
    duration: true,
    environment: true,
    type: true,
    fatigue: true,
    fun: true,
    successType: true,
    successDomain: true,
    difficultyType: true,
    difficultyDomain: true,
    executionSuccess: true,
    oppositionLevel: formData.environment === 1,
    consistency: true,
    confidence: true,
    notes: false,
  };

  const invalidMap = {
    date: !(typeof formData.date === 'string' && formData.date.trim().length > 0),
    duration: !(typeof formData.duration === 'string' && formData.duration.trim().length > 0),
    environment: formData.environment === null || formData.environment === undefined,
    type: formData.type === null || formData.type === undefined,
    fatigue: formData.fatigue === null,
    fun: formData.fun === null,
    successType: formData.successType === null,
    successDomain: formData.successDomain === null,
    difficultyType: formData.difficultyType === null,
    difficultyDomain: formData.difficultyDomain === null,
    executionSuccess: formData.executionSuccess === null,
    oppositionLevel: formData.environment === 1 ? formData.oppositionLevel === null : false,
    consistency: formData.consistency === null,
    confidence: formData.confidence === null,
    notes: false,
  };

  console.log("isBasicTabComplete:", isBasicTabComplete());
  console.log("isFocusTabComplete:", isFocusTabComplete());
  console.log("isAllTabsComplete:", isAllTabsComplete);
  console.log(formData);

  useEffect(() => {
    onCompletionChange?.(isAllTabsComplete);
  }, [formData])
  


  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{}}>
        <TabNavigation
          tabs={["Basic", "Focus", "Notes"]}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />

        <View style={{ marginTop: SPACING.lg }}>
          {activeTab === 0 && (
            <FormSection>
              <InputField
                label="Date"
                value={formData.date}
                onChangeText={(text) =>
                  setFormData({ ...formData, date: text })
                }
                placeholder="YYYY-MM-DD"
                editable={!readOnly}
                required={requiredMap.date}
                optional={!requiredMap.date}
                isInvalid={invalidMap.date}
              />
              <InputField
                label="Duration (minutes)"
                value={formData.duration}
                onChangeText={(text) =>
                  setFormData({ ...formData, duration: text })
                }
                placeholder="45"
                keyboardType="numeric"
                editable={!readOnly}
                required={requiredMap.duration}
                optional={!requiredMap.duration}
                isInvalid={invalidMap.duration}
              />
              <EnvironmentSelector
                value={formData.environment}
                onChange={(value) =>
                  setFormData({ ...formData, environment: value })
                }
                disabled={readOnly}
                required={requiredMap.environment}
                optional={!requiredMap.environment}
                isInvalid={invalidMap.environment}
              />
              <TypeSelector
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
                disabled={readOnly}
                required={requiredMap.type}
                optional={!requiredMap.type}
                isInvalid={invalidMap.type}
              />
              <RatingSelector
                label="Fatigue (1-5)"
                value={formData.fatigue}
                onChange={(value) =>
                  setFormData({ ...formData, fatigue: value })
                }
                disabled={readOnly}
                required={requiredMap.fatigue}
                optional={!requiredMap.fatigue}
                isInvalid={invalidMap.fatigue}
              />
              <RatingSelector
                label="Fun (1-5)"
                value={formData.fun}
                onChange={(value) => setFormData({ ...formData, fun: value })}
                disabled={readOnly}
                required={requiredMap.fun}
                optional={!requiredMap.fun}
                isInvalid={invalidMap.fun}
              />
            </FormSection>
          )}

          {activeTab === 1 && (
            <FormSection>
              <FocusInput
                type="success"
                focusType={formData.successType}
                domain={formData.successDomain}
                description={formData.successDescription}
                onTypeChange={(value) =>
                  setFormData({ ...formData, successType: value })
                }
                onDomainChange={(value) =>
                  setFormData({ ...formData, successDomain: value })
                }
                onDescriptionChange={(text) =>
                  setFormData({ ...formData, successDescription: text })
                }
                disabled={readOnly}
                required={requiredMap.successType || requiredMap.successDomain}
                optional={!(requiredMap.successType || requiredMap.successDomain)}
                isInvalid={invalidMap.successType || invalidMap.successDomain}
                requiredType={requiredMap.successType}
                optionalType={!requiredMap.successType}
                isInvalidType={invalidMap.successType}
                requiredDomain={requiredMap.successDomain}
                optionalDomain={!requiredMap.successDomain}
                isInvalidDomain={invalidMap.successDomain}
              />
              <FocusInput
                type="difficulty"
                focusType={formData.difficultyType}
                domain={formData.difficultyDomain}
                description={formData.difficultyDescription}
                onTypeChange={(value) =>
                  setFormData({ ...formData, difficultyType: value })
                }
                onDomainChange={(value) =>
                  setFormData({ ...formData, difficultyDomain: value })
                }
                onDescriptionChange={(text) =>
                  setFormData({ ...formData, difficultyDescription: text })
                }
                disabled={readOnly}
                required={requiredMap.difficultyType || requiredMap.difficultyDomain}
                optional={!(requiredMap.difficultyType || requiredMap.difficultyDomain)}
                isInvalid={invalidMap.difficultyType || invalidMap.difficultyDomain}
                requiredType={requiredMap.difficultyType}
                optionalType={!requiredMap.difficultyType}
                isInvalidType={invalidMap.difficultyType}
                requiredDomain={requiredMap.difficultyDomain}
                optionalDomain={!requiredMap.difficultyDomain}
                isInvalidDomain={invalidMap.difficultyDomain}
              />
              <GoalProgress
                executionSuccess={formData.executionSuccess}
                oppositionLevel={formData.oppositionLevel}
                consistency={formData.consistency}
                confidence={formData.confidence}
                onExecutionChange={(value) =>
                  setFormData({ ...formData, executionSuccess: value })
                }
                onOppositionChange={(value) =>
                  setFormData({ ...formData, oppositionLevel: value })
                }
                onConsistencyChange={(value) =>
                  setFormData({ ...formData, consistency: value })
                }
                onConfidenceChange={(value) =>
                  setFormData({ ...formData, confidence: value })
                }
                isGroupSession={formData.environment === 1}
                disabled={readOnly}
              />
            </FormSection>
          )}

          {activeTab === 2 && (
            <FormSection>
              <TextAreaField
                label="Session Notes"
                value={formData.notes}
                onChangeText={(text) =>
                  setFormData({ ...formData, notes: text })
                }
                placeholder="Observations sur votre performance, points à retenir..."
                numberOfLines={6}
                editable={!readOnly}
                required={requiredMap.notes}
                optional={!requiredMap.notes}
                isInvalid={false}
              />
            </FormSection>
          )}
        </View>

      </View>
    </ScrollView>
  );
};
