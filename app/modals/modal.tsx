import { Link, useLocalSearchParams , useRouter } from 'expo-router';
import i18n from '@/src/i18n';
import { Text, View, Pressable, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { PostSessionForm } from '@/src/components/forms/PostSessionForm';
import { COLORS, globalStyles, SPACING, TEXT_STYLES } from '@/src/styles';
import { Icons } from '@/constants/icons';
import Button from '@/src/components/ui/Button';
import { createSession, fetchSessions, fetchSessionById, updateSession, deleteSession } from '@/src/repositories/sessionsRepository';


export type ModalScreenProps = {
  mode?: 'empty' | 'edit' | 'error';
};

export default function ModalScreen(props: ModalScreenProps) {
  const params = useLocalSearchParams();
  const mode = props.mode ?? (typeof params.mode === 'string' ? params.mode : 'empty');
  const [isAllTabsComplete, setIsAllTabsComplete] = useState(false);
  const [selected, setSelected] = useState<'view' | 'edit'>('view');
  const router = useRouter();

  const [pendingData, setPendingData] = useState<any | null>(null);
  const [initialData, setInitialData] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const idParam = typeof params.id === 'string' ? Number(params.id) : undefined;

  useEffect(() => {
    const load = async () => {
      if (mode === 'edit' && typeof idParam === 'number' && !Number.isNaN(idParam)) {
        try {
          setIsLoadingSession(true);
          setError(null);
          const s = await fetchSessionById(idParam);
          if (s) {
            setInitialData(s);
          } else {
            setError(i18n.t('session.delete.error_invalid') as string);
          }
        } catch (e) {
          console.error('Failed to load session:', e);
          setError(i18n.t('common.errors.generic') as string);
        } finally {
          setIsLoadingSession(false);
        }
      }
    };
    load();
  }, [mode, idParam]);

  function CompletedForm(isAllTabsComplete: boolean) {
    setIsAllTabsComplete(isAllTabsComplete);
  }

  async function handleSave(sessionData: any) {
    if (isSaving) return; // Prevent double submission
    
    try {
      setIsSaving(true);
      setError(null);
      
      if (mode === 'edit' && typeof idParam === 'number' && !Number.isNaN(idParam)) {
        await updateSession(idParam, { ...sessionData, id: idParam });
        console.log('Updated session:', idParam);
      } else {
        const created = await createSession(sessionData);
        console.log('Created session:', created);
      }
      router.replace('/(tabs)/dashboard/DashboardScreen');
    } catch (e: any) {
      console.error('Save failed:', e);
      // Determine error message based on error type
      let errorMessage = i18n.t('session.save.error_update') as string;
      if (mode !== 'edit') {
        errorMessage = i18n.t('session.save.error_create') as string;
      }
      if (e?.message?.includes('authenticated') || e?.message?.includes('auth')) {
        errorMessage = i18n.t('session.save.error_auth') as string;
      } else if (e?.message?.includes('network') || e?.code === 'ECONNABORTED') {
        errorMessage = i18n.t('session.save.error_network') as string;
      }
      setError(errorMessage);
      Alert.alert(
        i18n.t('common.errors.generic') as string,
        errorMessage
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!(mode === 'edit' && typeof idParam === 'number' && !Number.isNaN(idParam))) {
      Alert.alert(i18n.t('common.errors.generic') as string, i18n.t('session.delete.error_invalid') as string);
      return;
    }

    if (isDeleting) return; // Prevent double submission

    Alert.alert(
      i18n.t('session.delete.title') as string,
      i18n.t('session.delete.message') as string,
      [
        { text: i18n.t('common.buttons.cancel') as string, style: 'cancel' },
        {
          text: i18n.t('common.buttons.delete') as string,
          style: 'destructive',
          onPress: async () => {
            try {
              setIsDeleting(true);
              setError(null);
              const ok = await deleteSession(idParam);
              if (ok) {
                console.log('Session deleted successfully:', idParam);
                router.replace('/(tabs)/dashboard/DashboardScreen');
              } else {
                Alert.alert(i18n.t('common.errors.generic') as string, i18n.t('session.delete.failed') as string);
              }
            } catch (e) {
              console.error('Delete failed:', e);
              Alert.alert(i18n.t('common.errors.generic') as string, i18n.t('session.delete.failed') as string);
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  }

  const headerTitle = mode === 'edit' ? ( i18n.t('session.edit_title') as string) : (i18n.t('session.new_title') as string);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, marginTop: 50, padding: SPACING.lg }}>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16 }}>
        <Text style={[TEXT_STYLES.headerLG]}>{headerTitle}</Text>

        <View>
          {mode === "empty" && (
            <Link href={{ pathname: '/(tabs)/dashboard/DashboardScreen' }} asChild>
              <Pressable style={globalStyles.buttonOutline}>
                <Icons.X size={16} color={COLORS.text} />
              </Pressable>
            </Link>
          )
          }
          {
            mode === "edit" && (
              <View style={globalStyles.radioPills}>
                <Pressable
                  style={[
                    globalStyles.radioPill,
                    { marginRight: 8 },
                    selected === 'view' && { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary, borderWidth: 1 }
                  ]}
                  onPress={() => setSelected('view')}
                >
                  <Icons.FileText size={16} color={selected === 'view' ? COLORS.background : COLORS.text} />
                </Pressable>
                <Pressable
                  style={[
                    globalStyles.radioPill,
                    { marginRight: 8 },
                    selected === 'edit' && { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary, borderWidth: 1 }
                  ]}
                  onPress={() => setSelected('edit')}
                >
                  <Icons.Edit size={16} color={selected === 'edit' ? COLORS.background : COLORS.text} />
                </Pressable>
                <Pressable style={globalStyles.radioPill} onPress={handleDelete}>
                  <Icons.Trash2 size={16} color={COLORS.primary} />
                </Pressable>
                <Link href={{ pathname: '/(tabs)/dashboard/DashboardScreen' }} asChild>
                  <Pressable style={globalStyles.radioPill}>
                    <Icons.X size={16} color={COLORS.text} />
                  </Pressable>
                </Link>
              </View>
            )
          }

        </View>
      </View>
      <PostSessionForm
        onCompletionChange={CompletedForm}
        onFormDataChange={setPendingData}
        initialData={initialData ?? {}}
        readOnly={mode === 'edit' && selected === 'view'}
      />
      {!isAllTabsComplete && (
        <Text style={{ color: COLORS.primary, marginTop: 8, marginBottom: 8 }}>{i18n.t('session.form.missing_required', { defaultValue: 'Some required data is missing.' }) as string}</Text>
      )}
      {(isLoadingSession || isSaving || isDeleting) && (
        <Text style={{ color: COLORS.text, marginTop: 8, marginBottom: 8, textAlign: 'center' }}>
          {i18n.t('common.loading') as string}
        </Text>
      )}
      {error && (
        <Text style={{ color: COLORS.primary, marginTop: 8, marginBottom: 8, textAlign: 'center' }}>
          {error}
        </Text>
      )}
      <Button
        title={mode === 'edit' ? (i18n.t('common.buttons.save', { defaultValue: 'Save' }) as string) : (i18n.t('session.form.title', { defaultValue: 'Record a Session' }) as string)}
        disabled={!isAllTabsComplete || (mode === 'edit' && selected === 'view') || isSaving || isDeleting || isLoadingSession}
        onPress={() => { if (pendingData) handleSave(pendingData); }}
        variant="primary"
        size="md"
        mode = 'dark'
      />


    </View>
  );
}
