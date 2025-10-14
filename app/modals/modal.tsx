import { Link, useLocalSearchParams } from 'expo-router';
import { Text, View, Pressable, ScrollView } from 'react-native';
import React,{useState} from 'react';
import { PostSessionForm } from '@/src/components/forms/PostSessionForm';
import { COLORS, globalStyles, SPACING, TEXT_STYLES } from '@/src/styles';
import { Icons } from '@/constants/icons';
import { ButtonPrimary } from '@/src/components/atomic/buttons/ButtonPrimary';

export type ModalScreenProps = {
  mode?: 'empty' | 'edit' | 'error';
};

export default function ModalScreen(props: ModalScreenProps) {
  const params = useLocalSearchParams();
  const mode = props.mode ?? (typeof params.mode === 'string' ? params.mode : 'empty');
  const [isAllTabsComplete, setIsAllTabsComplete] = useState(false);
  const [selected, setSelected] = useState<'view' | 'edit'>('edit');
  
  function CompletedForm(isAllTabsComplete: boolean) {
    setIsAllTabsComplete(isAllTabsComplete);
  }

  const handleViewState = () => {
    
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
                <Link href={{ pathname: '/(tabs)/dashboard/DashboardScreen' }} asChild>
                  <Pressable style={globalStyles.radioPill}>
                    <Icons.Trash2 size={16} color={COLORS.primary} />
                  </Pressable>
                </Link>
              </View>
            )
          }
          
        </View>
      </View>
      <PostSessionForm 
        onCompletionChange={CompletedForm}
        onSubmit={(data: any) => { console.log('Submitted session:', data); }}
        readOnly={mode === 'edit' && selected === 'view'}
      />

      <ButtonPrimary title="Enregistrer Session" disabled={!isAllTabsComplete} onPress={undefined}          // onPress={handleSubmit} 
      />
    </View>
  );
}
