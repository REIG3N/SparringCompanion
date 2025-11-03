import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, TEXT_STYLES, globalStyles } from '@/src/styles';
import { InputField } from '@/src/components/atomic/inputs/InputField';
import { ButtonPrimary } from '@/src/components/atomic/buttons/ButtonPrimary';
import { supabase } from '@/utils/supabase';

export default function ChangePasswordModal() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? '');
    })();
  }, []);

  async function handleSubmit() {
    setErrorMessage(null);
    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Merci de remplir tous les champs.');
      return;
    }
    if (newPassword.length < 8) {
      setErrorMessage('Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Le nouveau mot de passe et la confirmation ne correspondent pas.');
      return;
    }

    try {
      setSubmitting(true);
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: currentPassword });
      if (signInError) {
        setErrorMessage('Mot de passe actuel invalide.');
        setSubmitting(false);
        return;
      }
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) {
        setErrorMessage('Échec de la mise à jour du mot de passe.');
        setSubmitting(false);
        return;
      }
      Alert.alert('Succès', 'Mot de passe mis à jour.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (e) {
      setErrorMessage('Une erreur est survenue.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView style={globalStyles.appScreen} contentContainerStyle={{ paddingBottom: SPACING.xl }}>
      <View style={[globalStyles.card, { marginTop: SPACING.xl }]}> 
        <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text, marginBottom: SPACING.md }]}>Changer le mot de passe</Text>

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="email"
          editable={false}
        />
        <InputField
          label="Mot de passe actuel"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="********"
          secureTextEntry
        />
        <InputField
          label="Nouveau mot de passe"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="********"
          secureTextEntry
        />
        <InputField
          label="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="********"
          secureTextEntry
        />

        {errorMessage ? (
          <Text style={{ color: COLORS.primary, marginBottom: SPACING.sm }}>{errorMessage}</Text>
        ) : null}

        <ButtonPrimary
          title={submitting ? 'Mise à jour...' : 'Mettre à jour'}
          disabled={submitting}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}


