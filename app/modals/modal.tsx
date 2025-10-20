import { Link, useLocalSearchParams } from 'expo-router';
import { Text, View, Pressable, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { PostSessionForm } from '@/src/components/forms/PostSessionForm';
import { COLORS, globalStyles, SPACING, TEXT_STYLES } from '@/src/styles';
import { Icons } from '@/constants/icons';
import { ButtonPrimary } from '@/src/components/atomic/buttons/ButtonPrimary';
import { createSession, fetchSessions, fetchSessionById, updateSession, deleteSession } from '@/src/repositories/sessionsRepository';
import { useRouter } from 'expo-router';

export type ModalScreenProps = {
  mode?: 'empty' | 'edit' | 'error';
};

export default function ModalScreen(props: ModalScreenProps) {
  const params = useLocalSearchParams();
  const mode = props.mode ?? (typeof params.mode === 'string' ? params.mode : 'empty');
  const [isAllTabsComplete, setIsAllTabsComplete] = useState(false);
  const [selected, setSelected] = useState<'view' | 'edit'>('edit');
  const router = useRouter();

  const [pendingData, setPendingData] = useState<any | null>(null);
  const [initialData, setInitialData] = useState<any | null>(null);

  const idParam = typeof params.id === 'string' ? Number(params.id) : undefined;

  useEffect(() => {
    const load = async () => {
      if (mode === 'edit' && typeof idParam === 'number' && !Number.isNaN(idParam)) {
        const s = await fetchSessionById(idParam);
        if (s) setInitialData(s);
      }
    };
    load();
  }, [mode, idParam]);

  function CompletedForm(isAllTabsComplete: boolean) {
    setIsAllTabsComplete(isAllTabsComplete);
  }

  async function handleSave(sessionData: any) {
    try {
      if (mode === 'edit' && typeof idParam === 'number' && !Number.isNaN(idParam)) {
        await updateSession(idParam, { ...sessionData, id: idParam });
        console.log('Updated session:', idParam);
      } else {
        const created = await createSession(sessionData);
        console.log('Created session:', created);
      }
      router.replace('/(tabs)/dashboard/DashboardScreen');
    } catch (e) {
      console.log('Save failed:', e);
    }
  }

  async function handleDelete() {
    if (!(mode === 'edit' && typeof idParam === 'number' && !Number.isNaN(idParam))) {
      Alert.alert('Error', 'Cannot delete session: invalid session ID.');
      return;
    }

    Alert.alert(
      'Delete Session',
      'Are you sure you want to delete this session? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const ok = await deleteSession(idParam);
              if (ok) {
                console.log('Session deleted successfully:', idParam);
                router.replace('/(tabs)/dashboard/DashboardScreen');
              } else {
                Alert.alert('Error', 'Failed to delete session.');
              }
            } catch (e) {
              console.log('Delete failed:', e);
              Alert.alert('Error', 'An error occurred while deleting the session.');
            }
          },
        },
      ]
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, marginTop: 50, padding: SPACING.lg }}>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16 }}>
        <Text style={[TEXT_STYLES.headerLG]}>New Session</Text>

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
        <Text style={{ color: COLORS.primary, marginTop: 8, marginBottom: 8 }}>Certaines données requises sont manquantes.</Text>
      )}
      <ButtonPrimary
        title={mode === 'edit' ? "Mettre à jour" : "Enregistrer Session"}
        disabled={!isAllTabsComplete || (mode === 'edit' && selected === 'view')}
        onPress={() => { if (pendingData) handleSave(pendingData); }}
      />


    </View>
  );
}
