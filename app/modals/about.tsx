import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, TEXT_STYLES, globalStyles, OPACITY } from '@/src/styles';
import { Icons } from '@/constants/icons';
import i18n from '@/src/i18n';

function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <View style={{ marginBottom: SPACING.md }}>
      <Pressable onPress={() => setOpen(v => !v)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: SPACING.sm }}>
        <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '600' }}>{title}</Text>
        {open ? <Icons.ChevronUp size={18} color={COLORS.accent} /> : <Icons.ChevronDown size={18} color={COLORS.accent} />}
      </Pressable>
      {open && (
        <View style={{ backgroundColor: `rgba(255,255,255,${OPACITY.o05})`, borderColor: `rgba(255,255,255,${OPACITY.o10})`, borderWidth: 1, borderRadius: 12, padding: SPACING.md }}>
          {children}
        </View>
      )}
    </View>
  );
}

export default function AboutModal() {
  const router = useRouter();
  return (
    <ScrollView style={globalStyles.appScreen} contentContainerStyle={{ paddingBottom: SPACING.xl }}>
      <View style={[globalStyles.card, { marginTop: SPACING.xl }]}> 
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg }}>
          <Pressable onPress={() => router.back()} style={{ position: 'absolute', left: SPACING.md, padding: SPACING.sm }}> 
            <Icons.ArrowLeft size={16} color={COLORS.text} />
          </Pressable>
          <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text }]}>{i18n.t('about.title') as string}</Text>
        </View>

        <AccordionItem title={i18n.t('about.sections.vision.title') as string} defaultOpen>
          <Text style={{ color: COLORS.text }}>
            {i18n.t('about.sections.vision.body') as string}
          </Text>
        </AccordionItem>

        <AccordionItem title={i18n.t('about.sections.philosophy.title') as string}>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>{i18n.t('about.sections.philosophy.autonomy_title') as string}</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            {i18n.t('about.sections.philosophy.autonomy_body') as string}
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>{i18n.t('about.sections.philosophy.failfast_title') as string}</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            {i18n.t('about.sections.philosophy.failfast_body') as string}
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>{i18n.t('about.sections.philosophy.ecological_title') as string}</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80 }}>
            {i18n.t('about.sections.philosophy.ecological_body') as string}
          </Text>
        </AccordionItem>

        <AccordionItem title={i18n.t('about.sections.features.title') as string}>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>{i18n.t('about.sections.features.journal_title') as string}</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            {i18n.t('about.sections.features.journal_body') as string}
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>{i18n.t('about.sections.features.dashboard_title') as string}</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            {i18n.t('about.sections.features.dashboard_body') as string}
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>{i18n.t('about.sections.features.reflection_title') as string}</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80 }}>
            {i18n.t('about.sections.features.reflection_body') as string}
          </Text>
        </AccordionItem>

        <AccordionItem title={i18n.t('about.sections.whyJournal.title') as string}>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>{i18n.t('about.sections.whyJournal.metacog_title') as string}</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            {i18n.t('about.sections.whyJournal.metacog_body') as string}
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>{i18n.t('about.sections.whyJournal.ecodynamics_title') as string}</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            {i18n.t('about.sections.whyJournal.ecodynamics_body') as string}
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>{i18n.t('about.sections.whyJournal.consolidation_title') as string}</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80 }}>
            {i18n.t('about.sections.whyJournal.consolidation_body') as string}
          </Text>
        </AccordionItem>

        <AccordionItem title={i18n.t('about.sections.references.title') as string}>
          <View>
            {(i18n.t('about.sections.references.list') as unknown as string[]).map((ref, idx) => (
              <Text key={idx} style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: 6 }}>{ref}</Text>
            ))}
          </View>
        </AccordionItem>

      </View>
    </ScrollView>
  );
}


