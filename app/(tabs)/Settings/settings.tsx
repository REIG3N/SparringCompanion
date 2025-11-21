import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View, Pressable, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, TEXT_STYLES, globalStyles, OPACITY } from '@/src/styles';
import i18n, { getCurrentLanguage, useLanguage } from '@/src/i18n';
import { Icons } from '@/constants/icons';
import { supabase } from '@/utils/supabase';
import { clearIdMappings } from '@/src/repositories/sessionDbMapper';

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
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
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
  
  async function handleLanguageChange(lang: 'fr' | 'en') {
    if (isChangingLanguage) return; // Prevent double clicks
    try {
      setIsChangingLanguage(true);
      await updateLanguage(lang);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      // Small delay to show loading state
      setTimeout(() => {
        setIsChangingLanguage(false);
      }, 300);
    }
  }

  async function performLogout() {
    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      
      // Clear session ID mappings
      clearIdMappings();
      
      // Clear localStorage on web (additional cleanup)
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          // Clear all Supabase-related keys
          const keys = Object.keys(window.localStorage);
          keys.forEach(key => {
            if (key.startsWith('sb-') || key.includes('supabase')) {
              window.localStorage.removeItem(key);
            }
          });
        } catch (e) {
          console.warn('Failed to clear localStorage:', e);
        }
      }
    } catch (e) {
      console.error('Logout error:', e);
      // Continue with navigation even if signOut fails
    }
    
    // Navigate to auth screen
    router.replace('/auth/authScreen' as any);
  }

  async function handleLogout() {
    const confirmMessage = i18n.t('settings.logout_confirm', { defaultValue: 'Are you sure you want to logout?' });
    
    // Sur le web, utiliser window.confirm
    if (Platform.OS === 'web' || (typeof window !== 'undefined' && typeof window.confirm === 'function')) {
      const confirmed = window.confirm(confirmMessage);
      if (confirmed) {
        await performLogout();
      }
    } else {
      // Sur mobile, utiliser Alert.alert
      Alert.alert(
        i18n.t('settings.logout') as string,
        confirmMessage,
        [
          { text: i18n.t('common.buttons.cancel') as string, style: 'cancel' },
          {
            text: i18n.t('settings.logout') as string,
            style: 'destructive',
            onPress: performLogout,
          },
        ]
      );
    }
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
          {isChangingLanguage && (
            <View style={{ alignItems: 'center', paddingVertical: SPACING.sm }}>
              <ActivityIndicator size="small" color={COLORS.secondary} />
              <Text style={{ color: COLORS.text, marginTop: SPACING.xs, fontSize: 14, opacity: 0.7 }}>
                {i18n.t('common.loading') as string}
              </Text>
            </View>
          )}
          <View style={{ flexDirection: 'row', gap: SPACING.sm, opacity: isChangingLanguage ? 0.5 : 1 }}>
            <Pressable 
              onPress={() => handleLanguageChange('fr')}
              disabled={isChangingLanguage}
            >
              <View style={[globalStyles.buttonOutline, language === 'fr' && { borderColor: COLORS.secondary }]}> 
                <Text style={[globalStyles.buttonOutlineText, language === 'fr' && { color: COLORS.secondary }]}>FR</Text>
              </View>
            </Pressable>
            <Pressable 
              onPress={() => handleLanguageChange('en')}
              disabled={isChangingLanguage}
            >
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
