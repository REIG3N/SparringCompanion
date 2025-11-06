import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, TEXT_STYLES, globalStyles } from '@/src/styles';
import i18n from '@/src/i18n';
import { InputField } from '@/src/components/atomic/inputs/InputField';
import Button from '@/src/components/ui/Button';
import { supabase } from '@/utils/supabase';
import { Icons } from '@/constants/icons';

export default function ChangePasswordModal() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isValid = !!email && !!currentPassword && !!newPassword && !!confirmPassword && newPassword.length >= 8 && newPassword === confirmPassword;

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? '');
    })();
  }, []);

  async function handleSubmit() {
    setErrorMessage(null);
    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage(i18n.t('common.errors.required_field') as string);
      return;
    }
    if (newPassword.length < 8) {
      setErrorMessage(i18n.t('settings.change_password_fields.min_length') as string);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage(i18n.t('settings.change_password_fields.mismatch') as string);
      return;
    }

    try {
      setSubmitting(true);
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: currentPassword });
      if (signInError) {
        setErrorMessage(i18n.t('settings.change_password_fields.current_invalid') as string);
        setSubmitting(false);
        return;
      }
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) {
        setErrorMessage(i18n.t('settings.change_password_fields.update_failed') as string);
        setSubmitting(false);
        return;
      }
      Alert.alert(i18n.t('settings.change_password_fields.success_title') as string, i18n.t('settings.change_password_fields.success_msg') as string, [
        { text: i18n.t('common.buttons.close') as string, onPress: () => router.back() },
      ]);
    } catch (e) {
      setErrorMessage(i18n.t('common.errors.generic') as string);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView style={globalStyles.appScreen} contentContainerStyle={{ paddingBottom: SPACING.xl }}>
      <View style={[globalStyles.card, { marginTop: SPACING.xl }]}> 
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg }}>
          <Pressable onPress={() => router.back()} style={{ position: 'absolute', left: SPACING.md, padding: SPACING.sm }}>
            <Icons.ArrowLeft size={16} color={COLORS.text} />
          </Pressable>
          <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text }]}>{i18n.t('settings.change_password') as string}</Text>
        </View>

        <InputField
          label={i18n.t('settings.email') as string}
          value={email}
          onChangeText={setEmail}
          placeholder={i18n.t('auth.email_placeholder') as string}
          editable={false}
        />
        <InputField
          label={i18n.t('settings.change_password_fields.current') as string}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder={i18n.t('settings.change_password_fields.current_placeholder') as string}
          secureTextEntry
        />
        <InputField
          label={i18n.t('settings.change_password_fields.new') as string}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder={i18n.t('settings.change_password_fields.new_placeholder') as string}
          secureTextEntry
        />
        <InputField
          label={i18n.t('settings.change_password_fields.confirm') as string}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder={i18n.t('settings.change_password_fields.confirm_placeholder') as string}
          secureTextEntry
        />

        {errorMessage ? (
          <Text style={{ color: COLORS.primary, marginBottom: SPACING.sm }}>{errorMessage}</Text>
        ) : null}

        <Button
          title={submitting ? (i18n.t('settings.change_password_fields.updating') as string) : (i18n.t('common.buttons.save') as string)}
          disabled={submitting || !isValid}
          onPress={handleSubmit}
          variant="primary"
          size="md"
        />
      </View>
    </ScrollView>
  );
}


