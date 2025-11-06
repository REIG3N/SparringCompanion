import { Pressable, Text } from 'react-native'
import React from 'react'
import { SPACING, TEXT_STYLES, COLORS } from '@/utils/globalStyles'
import Card from '@/src/components/ui/Card'
import CardHeader from '@/src/components/ui/CardHeader'
import ErrorBox from '@/src/components/ui/ErrorBox'
import type { SessionItemProps } from './SessionItem'
import SessionList from './SessionList'
import { Link } from 'expo-router'
import i18n from '@/src/i18n'

export type SessionHistoryProps = {
  mode: 'normal' | 'loading' | 'empty' | 'error';
  sessions?: SessionItemProps[];
};


export default function SessionHistory({ mode, sessions }: SessionHistoryProps) {
  return (
    <Card style={{ marginTop: SPACING.md }}>
      <CardHeader
        title={i18n.t('dashboard.recent_sessions') as string}
        right={(
          <Link href={{ pathname: "/modals/sessionHistoryModal", params: { mode } }} asChild>
            <Pressable>
              <Text style={{ color: COLORS.secondary, fontSize: 18 }}>☰</Text>
            </Pressable>
          </Link>
        )}
      />

      {mode === 'error' && (
        <ErrorBox style={{ marginTop: SPACING.sm }} message={'Échec de chargement des sessions. Vérifiez votre connexion.'} />
      )}
      <SessionList mode={mode} sessions={sessions} limit={2} />
    </Card>
  )
}


