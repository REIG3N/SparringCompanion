import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, TEXT_STYLES, globalStyles, OPACITY } from '@/src/styles';
import { Icons } from '@/constants/icons';

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
          <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text }]}>À Propos</Text>
        </View>

        <AccordionItem title="🎯 Notre Vision" defaultOpen>
          <Text style={{ color: COLORS.text }}>
            <Text style={{ fontWeight: '600' }}>SparringCompanion n'est pas un coach, c'est un compagnon.{'\n'}</Text>
            L'application accompagne les pratiquants dans leur développement autonome, en servant de miroir réflectif plutôt que de prescripteur externe.
          </Text>
        </AccordionItem>

        <AccordionItem title="🧠 Philosophie d'Apprentissage">
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>Développe Ton Autonomie</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            L'autonomisation est au cœur de notre approche. Chaque pratiquant possède un contexte unique; l'application t'aide à observer, analyser et adapter ta pratique.
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>L'Erreur Comme Source d'Apprentissage</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            Nous encourageons l'expérimentation et l'échec rapide. Chaque session difficile apporte des informations précieuses pour ajuster tes hypothèses.
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>Approche Écologique & Individualisation</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80 }}>
            Inspirée par la Constraints-Led Approach: l'apprentissage émerge des contraintes individuelles, environnementales et de la tâche. L'app rend visibles tes difficultés et patterns afin de favoriser une individualisation réelle. Elle facilite aussi le passage du Système 1 (intuitif) au Système 2 (réflexif).
          </Text>
        </AccordionItem>

        <AccordionItem title="📱 Ce Que Propose l'App (Version Actuelle)">
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>Journal de Sparring Intelligent</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            Formulaire post-session centré sur l'observation et le ressenti; l'historique devient un miroir de tes patterns.
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>Tableau de Bord Personnalisé</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            Fréquence, tendances, calendrier – des statistiques qui informent sans juger.
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>Réflexion Guidée</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80 }}>
            Questions d'exploration plutôt que de jugement; l'app te pose des questions, tu trouves tes réponses.
          </Text>
        </AccordionItem>

        <AccordionItem title="🔬 Pourquoi un Journal d'Entraînement ?">
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>Métacognition : Apprendre à Apprendre</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            Les journaux renforcent les compétences métacognitives, différenciant experts et novices.
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>Approche Écologique</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80, marginBottom: SPACING.md }}>
            La variabilité n'est pas une erreur; elle permet l'adaptation. Documenter tes sessions révèle tes solutions personnelles.
          </Text>
          <Text style={{ color: COLORS.text, marginBottom: SPACING.sm, fontWeight: '600' }}>Consolidation & Patterns</Text>
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80 }}>
            La réflexion post-session aide la mémoire longue durée et l'identification de patterns actionnables.
          </Text>
        </AccordionItem>

        <AccordionItem title="📚 Références Scientifiques Clés">
          <Text style={{ color: COLORS.text, opacity: OPACITY.o80 }}>
            1. Davids et al. (2008) – Dynamics of Skill Acquisition{ '\n' }
            2. Schraw & Moshman (1995) – Metacognitive theories{ '\n' }
            3. Bashan & Holsblat (2017) – Reflective journals{ '\n' }
            4. Renshaw & Chow (2019) – Constraint-led approach{ '\n' }
            5. MacIntyre & Moran (2010) – Metacognition in elite athletes{ '\n' }
            6. Kahneman (2011) – Thinking, Fast and Slow
          </Text>
        </AccordionItem>

      </View>
    </ScrollView>
  );
}


