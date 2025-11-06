import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, TEXT_STYLES, globalStyles, OPACITY } from '@/src/styles';
import i18n, { getCurrentLanguage, useLanguage } from '@/src/i18n';
import { Icons } from '@/constants/icons';
import { supabase } from '@/utils/supabase';

function SettingsItem({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ marginTop: SPACING.sm }}>
      <View style={[globalStyles.sessionItem, { backgroundColor: 'transparent', borderColor: `rgba(255,255,255,${OPACITY.o10})` }]}> 
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: COLORS.text, fontSize: 16, fontWeight: '600' }}>{title}</Text>
        <Icons.ArrowRight size={18} color={COLORS.accent} />
      </View>
    </Pressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { language, updateLanguage } = useLanguage();
  

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
    Alert.alert(i18n.t('settings.logout') as string, i18n.t('settings.logout_confirm', { defaultValue: 'Are you sure you want to logout?' }) as string, [
      { text: i18n.t('common.buttons.cancel') as string, style: 'cancel' },
      {
        text: i18n.t('settings.logout') as string,
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
          <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text }]}>{i18n.t('settings.title') as string}</Text>
        </View>

        {/* Profile section */}
        <View style={{ marginBottom: SPACING.md }}>
          <Text style={{ color: COLORS.secondary, marginBottom: SPACING.xs, paddingHorizontal: SPACING.md, fontSize: 16, fontWeight: '600' }}>{i18n.t('settings.profile') as string}</Text>
          <View style={[globalStyles.sessionItem, { backgroundColor: 'transparent', borderColor: `rgba(255,255,255,${OPACITY.o10})`, marginBottom: SPACING.sm }]}> 
            <Text style={{ color: COLORS.text, fontSize: 14 }}>{i18n.t('settings.email') as string}</Text>
            <Text style={{ color: COLORS.text, opacity: 0.9 }}>{userEmail ?? '—'}</Text>
          </View>
          <View style={[globalStyles.sessionItem, { backgroundColor: 'transparent', borderColor: `rgba(255,255,255,${OPACITY.o10})` }]}> 
            <Text style={{ color: COLORS.text, fontSize: 14 }}>{i18n.t('settings.password') as string}</Text>
            <Text style={{ color: COLORS.text, opacity: 0.9 }}>••••••••</Text>
          </View>
        </View>

        {/* Contact section */}
        <View style={{ marginBottom: SPACING.md }}>
          <Text style={{ color: COLORS.secondary, marginBottom: SPACING.xs, paddingHorizontal: SPACING.md, fontSize: 16, fontWeight: '600' }}>{i18n.t('settings.contact') as string}</Text>
          <View style={[globalStyles.sessionItem, { backgroundColor: 'transparent', borderColor: `rgba(255,255,255,${OPACITY.o10})` }]}> 
            <Text style={{ color: COLORS.text, flex: 1 }}>{i18n.t('settings.contact_text') as string}</Text>
          </View>
        </View>

        {/* About link */}
        <SettingsItem title={i18n.t('settings.about') as string} onPress={() => router.push('/modals/about' as any)} />

        {/* Language toggle */}
        <View style={{ marginTop: SPACING.md, paddingHorizontal: SPACING.md }}>
          <Text style={{ color: COLORS.secondary, marginBottom: SPACING.xs, fontSize: 16, fontWeight: '600' }}>{i18n.t('settings.language') as string}</Text>
          <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
            <Pressable onPress={async () => { await updateLanguage('fr'); }}>
              <View style={[globalStyles.buttonOutline, language === 'fr' && { borderColor: COLORS.secondary }]}> 
                <Text style={[globalStyles.buttonOutlineText, language === 'fr' && { color: COLORS.secondary }]}>FR</Text>
              </View>
            </Pressable>
            <Pressable onPress={async () => { await updateLanguage('en'); }}>
              <View style={[globalStyles.buttonOutline, language === 'en' && { borderColor: COLORS.secondary }]}> 
                <Text style={[globalStyles.buttonOutlineText, language === 'en' && { color: COLORS.secondary }]}>EN</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <Pressable onPress={() => router.push('/modals/changePassword' as any)} style={{ marginTop: SPACING.md }}>
          <View style={[globalStyles.buttonOutline, { borderColor: COLORS.secondary }]}> 
            <Text style={[globalStyles.buttonOutlineText, { color: COLORS.secondary }]}>{i18n.t('settings.change_password') as string}</Text>
          </View>
        </Pressable>

        <Pressable onPress={handleLogout} style={{ marginTop: SPACING.md }}>
          <View style={[globalStyles.buttonOutline, { borderColor: COLORS.primary }]}> 
            <Text style={[globalStyles.buttonOutlineText, { color: COLORS.primary }]}>{i18n.t('settings.logout') as string}</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
