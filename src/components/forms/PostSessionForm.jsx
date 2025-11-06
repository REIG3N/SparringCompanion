import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert, Switch } from "react-native";
import { COLORS, SPACING, TEXT_STYLES, globalStyles } from "../../styles";
import i18n from "@/src/i18n";
import { Icons } from "@/constants/icons";
import { ButtonPrimary } from "../atomic/buttons/ButtonPrimary";
import { TabNavigation } from "../atomic/navigation/TabNavigation";
import { InputField } from "../atomic/inputs/InputField";
import { TextAreaField } from "../atomic/inputs/TextAreaField";
import { RadioPills } from "../atomic/navigation/RadioPills";
import { RatingSelector } from "../atomic/inputs/RatingSelector";
import { FormSection } from "./postSession/FormSection";
import { EnvironmentSelector } from "./postSession/EnvironmentSelector";
import { FocusInput } from "./postSession/FocusInput";
import { getEmptySession } from '@/src/repositories/sessionsRepository';

export const PostSessionForm = ({ onCompletionChange, onFormDataChange, initialData = {}, readOnly = false }) => {
  const [activeTab, setActiveTab] = useState(0);
  // const [isAllTabsComplete, setIsAllTabsComplete] = useState(false);
  const [formData, setFormData] = useState(() => {
    const emptySession = getEmptySession();
    return {
      date: initialData.date || emptySession.date,
      duration: initialData.duration || emptySession.duration,
      environment: initialData.environment ?? emptySession.environment,
      fatigue: initialData.fatigue ?? emptySession.fatigue,
      fun: initialData.fun ?? emptySession.fun,
      successType: initialData.successType ?? emptySession.successType,
      successDomain: initialData.successDomain ?? emptySession.successDomain,
      successDescription: initialData.successDescription || emptySession.successDescription,
      difficultyType: initialData.difficultyType ?? emptySession.difficultyType,
      difficultyDomain: initialData.difficultyDomain ?? emptySession.difficultyDomain,
      difficultyDescription: initialData.difficultyDescription || emptySession.difficultyDescription,
      notes: initialData.notes || emptySession.notes,
      oppositionLevel: initialData.oppositionLevel ?? emptySession.oppositionLevel,
      confidence: initialData.confidence ?? emptySession.confidence,
    };
  });

  // Toggle for sparring/confrontation presence
  const [hadSparring, setHadSparring] = useState(() => {
    if (typeof initialData?.environment === 'number') return initialData.environment === 1;
    return false;
  });

  useEffect(() => {
    if (!initialData || Object.keys(initialData).length === 0) return;

    const emptySession = getEmptySession();
    const next = {
      date: initialData.date || emptySession.date,
      duration: initialData.duration || emptySession.duration,
      environment: initialData.environment ?? emptySession.environment,
      fatigue: initialData.fatigue ?? emptySession.fatigue,
      fun: initialData.fun ?? emptySession.fun,
      successType: initialData.successType ?? emptySession.successType,
      successDomain: initialData.successDomain ?? emptySession.successDomain,
      successDescription: initialData.successDescription || emptySession.successDescription,
      difficultyType: initialData.difficultyType ?? emptySession.difficultyType,
      difficultyDomain: initialData.difficultyDomain ?? emptySession.difficultyDomain,
      difficultyDescription: initialData.difficultyDescription || emptySession.difficultyDescription,
      notes: initialData.notes || emptySession.notes,
      oppositionLevel: initialData.oppositionLevel ?? emptySession.oppositionLevel,
      confidence: initialData.confidence ?? emptySession.confidence,
    };
    setFormData(next);
    if (typeof initialData?.environment === 'number') {
      setHadSparring(initialData.environment === 1);
    }
  }, [initialData?.id, initialData?.date]);

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
      formData.confidence !== null &&
      formData.fatigue !== null &&
      formData.fun !== null
    );
  }
  const isFocusTabComplete = () => {
    if (!hadSparring) {
      return true; // nothing required
    }

    if (hadSparring) {
      const baseComplete =
        formData.successType !== null &&
        formData.successDomain !== null &&
        formData.difficultyType !== null &&
        formData.difficultyDomain !== null;
      return baseComplete && formData.oppositionLevel !== null;
    }

    return false;
  };

  const isAllTabsComplete = isBasicTabComplete() && isFocusTabComplete();

  const requiredMap = {
    date: true,
    duration: true,
    environment: false,
    fatigue: true,
    fun: true,
    successType: hadSparring,
    successDomain: hadSparring,
    difficultyType: hadSparring,
    difficultyDomain: hadSparring,
    oppositionLevel: hadSparring,
    confidence: true,
    notes: false,
  };

  const invalidMap = {
    date: !(typeof formData.date === 'string' && formData.date.trim().length > 0),
    duration: !(typeof formData.duration === 'string' && formData.duration.trim().length > 0),
    environment: false,
    fatigue: formData.fatigue === null,
    fun: formData.fun === null,
    successType: hadSparring ? formData.successType === null : false,
    successDomain: hadSparring ? formData.successDomain === null : false,
    difficultyType: hadSparring ? formData.difficultyType === null : false,
    difficultyDomain: hadSparring ? formData.difficultyDomain === null : false,
    oppositionLevel: hadSparring ? formData.oppositionLevel === null : false,
    confidence: formData.confidence === null,
    notes: false,
  };
  useEffect(() => {
    onCompletionChange?.(isAllTabsComplete);
  }, [formData])



  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{}}>
        <TabNavigation
          tabs={i18n.t('session.tabs', { defaultValue: ["Basic","Focus","Notes"] })}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />

        <View style={{ marginTop: SPACING.lg }}>
          {activeTab === 0 && (
            <FormSection>
              <InputField
                label={i18n.t('session.form.date')}
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
                label={i18n.t('session.form.duration')}
                value={formData.duration}
                onChangeText={(text) => {
                  const sanitized = (text || '').replace(/\D/g, '').slice(0, 3);
                  setFormData({ ...formData, duration: sanitized });
                }}
                placeholder="45"
                keyboardType="numeric"
                editable={!readOnly}
                required={requiredMap.duration}
                optional={!requiredMap.duration}
                isInvalid={invalidMap.duration}
              />
              <RatingSelector
                label={i18n.t('session.form.fatigue', { defaultValue: 'Fatigue (1-5)' }) }
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
                label={i18n.t('session.form.fun', { defaultValue: 'Fun (1-5)' }) }
                value={formData.fun}
                onChange={(value) => setFormData({ ...formData, fun: value })}
                disabled={readOnly}
                required={requiredMap.fun}
                optional={!requiredMap.fun}
                isInvalid={invalidMap.fun}
              />
              <RatingSelector
                label={i18n.t('session.form.confidence', { defaultValue: 'Confidence (1-5)' }) }
                value={formData.confidence}
                onChange={(value) =>
                  setFormData({ ...formData, confidence: value })
                }
                disabled={readOnly}
                required={requiredMap.confidence}
                optional={!requiredMap.confidence}
                isInvalid={invalidMap.confidence}
              />
            </FormSection>
          )}

          {activeTab === 1 && (
            <FormSection>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md }}>
                <Text style={{ color: COLORS.text, marginRight: SPACING.sm }}>{i18n.t('session.focus_tab.sparring_with_others', { defaultValue: 'Sparring with others?' }) }</Text>
                <Switch
                  value={hadSparring}
                  onValueChange={(val) => {
                    setHadSparring(val);
                    setFormData(prev => ({ ...prev, environment: val ? 1 : 0 }));
                  }}
                  disabled={readOnly}
                />
              </View>
              {!hadSparring ? (
                <View>
                  <Text style={{ color: COLORS.accent }}>
                    {i18n.t('session.focus_tab.sparring_hint', { defaultValue: 'To progress on goals, practice against other people. Focus inputs are available when sparring is on.' }) }
                  </Text>
                </View>
              ) : (
                <>
                  <View style={[globalStyles.card, { marginBottom: SPACING.md }]}>
                    <Text style={[TEXT_STYLES.label, { marginBottom: SPACING.sm }]}>{i18n.t('session.focus_tab.opposition_level.label') }</Text>
                    <RadioPills
                      options={i18n.t('session.focus_tab.opposition_options', { defaultValue: ['Less','Similar','More'] })}
                      selected={formData.oppositionLevel}
                      onSelect={(value) => setFormData({ ...formData, oppositionLevel: value })}
                      disabled={readOnly}
                    />
                  </View>
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


                </>
              )}
            </FormSection>
          )}

          {activeTab === 2 && (
            <FormSection>
              <TextAreaField
                label={i18n.t('session.notes.label') }
                value={formData.notes}
                onChangeText={(text) =>
                  setFormData({ ...formData, notes: text })
                }
                placeholder={i18n.t('session.notes.placeholder') }
                numberOfLines={6}
                maxLength={800}
                showCounter
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
