import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { COLORS, SPACING } from "../../styles";
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

// Mock data for testing
export const mockSessionData = {
  date: "2024-06-01",
  duration: "60",
  environment: 1, // 0: Solo, 1: Group
  type: 1, // 0: Practice, 1: Sparring
  fatigue: 4,
  fun: 5,
  successType: 2,
  successDomain: 1,
  successDescription: "Great takedown defense and quick transitions.",
  difficultyType: 1,
  difficultyDomain: 0,
  difficultyDescription:
    "Struggled with guard passing against heavier opponents.",
  notes: "Felt strong today, but need to work on breathing under pressure.",
  executionSuccess: 1,
  oppositionLevel: 3,
  consistency: 2,
  confidence: 4,
};

export const PostSessionForm = ({ onSubmit, onCompletionChange, initialData = {} }) => {
  const [activeTab, setActiveTab] = useState(0);
  // const [isAllTabsComplete, setIsAllTabsComplete] = useState(false);
  const [formData, setFormData] = useState({
    date: initialData.date || new Date().toISOString().split("T")[0],
    duration: initialData.duration || "60",
    environment: initialData.environment || null,

    groupProgress: {
      executionSuccess: initialData.groupProgress?.executionSuccess ?? 1,
      oppositionLevel: initialData.groupProgress?.oppositionLevel ?? 0,
      consistency: initialData.groupProgress?.consistency ?? 0,
    },
    soloProgress: {
      confidence: initialData.soloProgress?.confidence ?? 0,
    },
    
    type: initialData.type || null,
    fatigue: initialData.fatigue || null,
    fun: initialData.fun || null,
    successType: initialData.successType || null,
    successDomain: initialData.successDomain || null,
    successDescription: initialData.successDescription || "",
    difficultyType: initialData.difficultyType || null,
    difficultyDomain: initialData.difficultyDomain || null,
    difficultyDescription: initialData.difficultyDescription || "",
    notes: initialData.notes || "",
    executionSuccess: initialData.executionSuccess || 1,
    oppositionLevel: initialData.oppositionLevel || 0,
    consistency: initialData.consistency || 0,
    confidence: initialData.confidence || 0,

  });

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

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
              />
              <InputField
                label="Duration (minutes)"
                value={formData.duration}
                onChangeText={(text) =>
                  setFormData({ ...formData, duration: text })
                }
                placeholder="45"
                keyboardType="numeric"
              />
              <EnvironmentSelector
                value={formData.environment}
                onChange={(value) =>
                  setFormData({ ...formData, environment: value })
                }
              />
              <TypeSelector
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
              />
              <RatingSelector
                label="Fatigue (1-5)"
                value={formData.fatigue}
                onChange={(value) =>
                  setFormData({ ...formData, fatigue: value })
                }
              />
              <RatingSelector
                label="Fun (1-5)"
                value={formData.fun}
                onChange={(value) => setFormData({ ...formData, fun: value })}
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
              />
            </FormSection>
          )}
        </View>

        {/* Submit button removed from child; parent renders and controls it. */}
      </View>
    </ScrollView>
  );
};
