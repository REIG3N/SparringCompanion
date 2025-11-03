import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, TEXT_STYLES, globalStyles, OPACITY } from '@/src/styles';
import { Icons } from '@/constants/icons';
import { supabase } from '@/utils/supabase';

function SettingsItem({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ marginTop: SPACING.sm }}>
      <View style={[globalStyles.sessionItem, { backgroundColor: 'transparent', borderColor: `rgba(255,255,255,${OPACITY.o10})` }]}> 
        <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '600' }}>{title}</Text>
        <Icons.ArrowRight size={18} color={COLORS.accent} />
      </View>
    </Pressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUserEmail(data.user?.email ?? null);
      } catch {
        setUserEmail(null);
      }
    })();
  }, []);

  async function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await supabase.auth.signOut();
          } catch (e) {
            // ignore for now; navigation still proceeds
          }
          router.replace('/auth/authScreen' as any);
        },
      },
    ]);
  }

  return (
    <ScrollView style={globalStyles.appScreen} contentContainerStyle={{ paddingBottom: SPACING.xl }}>
      <View style={[globalStyles.card, { marginTop: SPACING.xl }]}> 
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg }}>
          <Pressable onPress={() => router.back()} style={[{ position: 'absolute', left: SPACING.xs, padding: SPACING.sm }]}> 
            <Icons.ArrowLeft size={16} color={COLORS.text} />
          </Pressable>
          <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text }]}>Options</Text>
        </View>

        {/* Profile section */}
        <View style={{ marginBottom: SPACING.md }}>
          <Text style={{ color: COLORS.secondary, marginBottom: SPACING.xs, paddingHorizontal: SPACING.md, fontSize: 16, fontWeight: '600' }}>Profile</Text>
          <View style={[globalStyles.sessionItem, { backgroundColor: 'transparent', borderColor: `rgba(255,255,255,${OPACITY.o10})`, marginBottom: SPACING.sm }]}> 
            <Text style={{ color: COLORS.text, fontSize: 14 }}>Email</Text>
            <Text style={{ color: COLORS.text, opacity: 0.9 }}>{userEmail ?? '—'}</Text>
          </View>
          <View style={[globalStyles.sessionItem, { backgroundColor: 'transparent', borderColor: `rgba(255,255,255,${OPACITY.o10})` }]}> 
            <Text style={{ color: COLORS.text, fontSize: 14 }}>Password</Text>
            <Text style={{ color: COLORS.text, opacity: 0.9 }}>••••••••</Text>
          </View>
        </View>

        {/* Contact section */}
        <View style={{ marginBottom: SPACING.md }}>
          <Text style={{ color: COLORS.secondary, marginBottom: SPACING.xs, paddingHorizontal: SPACING.md, fontSize: 16, fontWeight: '600' }}>Contact</Text>
          <View style={[globalStyles.sessionItem, { backgroundColor: 'transparent', borderColor: `rgba(255,255,255,${OPACITY.o10})` }]}> 
            <Text style={{ color: COLORS.text, flex: 1 }}>Questions or feedback? Reach out from the Contact modal (coming soon).</Text>
          </View>
        </View>

        {/* About link */}
        <SettingsItem title="About" onPress={() => router.push('/modals/about' as any)} />

        {/* Change password button (orange outline) */}
        <Pressable onPress={() => router.push('/modals/changePassword' as any)} style={{ marginTop: SPACING.md }}>
          <View style={[globalStyles.buttonOutline, { borderColor: COLORS.secondary }]}> 
            <Text style={[globalStyles.buttonOutlineText, { color: COLORS.secondary }]}>Changer le mot de passe</Text>
          </View>
        </Pressable>

        <Pressable onPress={handleLogout} style={{ marginTop: SPACING.md }}>
          <View style={[globalStyles.buttonOutline, { borderColor: COLORS.primary }]}> 
            <Text style={[globalStyles.buttonOutlineText, { color: COLORS.primary }]}>Logout</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
