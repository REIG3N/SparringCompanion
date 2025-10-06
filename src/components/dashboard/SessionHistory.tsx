import { Text, View } from 'react-native'
import React from 'react'
import { styles } from '@/src/screens/dashboard/DashboardStyle'
import { globalStyles, SPACING, TEXT_STYLES, COLORS } from '@/utils/globalStyles'
import SessionItem from './SessionItem'

import type { SessionItemProps } from './SessionItem'

export type SessionHistoryProps = {
  mode: 'normal' | 'loading' | 'empty' | 'error';
  sessions?: SessionItemProps[];
};


export default function SessionHistory({ mode, sessions }: SessionHistoryProps) {
  return (
    <View style={[globalStyles.card, { marginTop: SPACING.lg }]}>
      <View style={styles.cardHeaderRow}>
        <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text }]}>Recent Sessions</Text>
        <Text style={{ color: COLORS.secondary, fontSize: 18 }}>☰</Text>
      </View>
      {mode === 'error' && (
        <View style={[styles.errorBox, { marginTop: SPACING.sm }]}>
          <Text style={styles.errorText}>Échec de chargement des sessions. Vérifiez votre connexion.</Text>
        </View>
      )}
      {mode === 'loading' && (
        <>
          <SessionItem mode="loading" />
          <SessionItem mode="loading" />
        </>
      )}
      {mode === 'empty' && (
        <View style={{ paddingVertical: SPACING.xl, alignItems: 'center' }}>
          <Text style={TEXT_STYLES.caption}>Aucune session enregistrée. Commencez votre premier entraînement pour voir votre progression.</Text>
        </View>
      )}
      {mode === 'normal' && (
        (sessions ?? []).slice(0, 2).map((s, i) => (
          <SessionItem key={i} title={s.title} subtitle={s.subtitle} duration={s.duration} />
        ))
      )}
    </View>
  )
}


