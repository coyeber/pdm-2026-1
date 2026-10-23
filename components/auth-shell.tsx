import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/constants/auth-theme';

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({ eyebrow, title, description, children }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <View style={styles.wrap}>
            <View style={styles.brandRow}>
              <View style={styles.brandMark}><Text style={styles.brandLetter}>P</Text></View>
              <View>
                <Text style={styles.brandTitle}>PDM 2026.1</Text>
                <Text style={styles.brandCaption}>AUTENTICAÇÃO DE USUÁRIOS</Text>
              </View>
            </View>

            <View style={styles.header}>
              <Text style={styles.eyebrow}>{eyebrow}</Text>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>

            <View style={styles.card}>{children}</View>
            <Text style={styles.footer}>React Native + Expo  •  Back4App / Parse Server</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: palette.background },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 34 },
  wrap: { width: '100%', maxWidth: 440, alignSelf: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 42 },
  brandMark: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.ink },
  brandLetter: { color: '#FFFFFF', fontSize: 24, fontWeight: '800' },
  brandTitle: { fontSize: 15, fontWeight: '800', color: palette.ink, letterSpacing: -0.2 },
  brandCaption: { fontSize: 9, fontWeight: '700', color: palette.muted, letterSpacing: 1.1, marginTop: 3 },
  header: { marginBottom: 23 },
  eyebrow: { color: palette.accent, fontSize: 12, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 11 },
  title: { fontSize: 31, lineHeight: 38, fontWeight: '800', color: palette.ink, letterSpacing: -1 },
  description: { fontSize: 15, lineHeight: 23, color: palette.muted, marginTop: 9 },
  card: { backgroundColor: palette.surface, padding: 23, borderRadius: 22, borderColor: palette.border, borderWidth: 1 },
  footer: { marginTop: 27, fontSize: 11, textAlign: 'center', color: palette.muted },
});
