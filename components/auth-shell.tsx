import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { palette } from '@/constants/auth-theme';

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({ eyebrow, title, description, children }: Props) {
  const { width } = useWindowDimensions();
  const desktop = width >= 860;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <View style={styles.frame}>
            <View style={styles.brandRow}>
              <View style={styles.brandIdentity}>
                <Text style={styles.brand}>pdm<Text style={styles.brandDot}>.</Text></Text>
                <View style={styles.brandDivider} />
                <Text style={styles.brandSubtitle}>IDENTIDADE DIGITAL</Text>
              </View>
              <Text style={styles.topEdition}>EDIÇÃO 2026.1</Text>
            </View>

            <View style={[styles.main, desktop ? styles.mainDesktop : styles.mainMobile]}>
              <View style={[styles.intro, desktop && styles.introDesktop]}>
                <View style={styles.eyebrowRow}>
                  <View style={styles.accentLine} />
                  <Text style={styles.eyebrow}>{eyebrow}</Text>
                </View>
                <Text style={[styles.title, desktop ? styles.titleDesktop : styles.titleMobile]}>
                  {title}
                </Text>
                <Text style={styles.description}>{description}</Text>
                {desktop ? (
                  <View style={styles.introFooter}>
                    <Text style={styles.introIndex}>01 — 03</Text>
                    <Text style={styles.introFootnote}>Cadastro, acesso e área pessoal.</Text>
                  </View>
                ) : null}
              </View>

              <View style={[styles.formPanel, desktop ? styles.formDesktop : styles.formMobile]}>
                <View style={styles.formHeader}>
                  <Text style={styles.formHeaderText}>PORTAL DE ACESSO</Text>
                  <Text style={styles.formHeaderNumber}>P / 01</Text>
                </View>
                {children}
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerPrimary}>PDM / PROGRAMAÇÃO PARA DISPOSITIVOS MÓVEIS</Text>
              <Text style={styles.footerSecondary}>BACK4APP · PARSE SERVER</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: palette.background },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 26, paddingBottom: 20 },
  frame: { width: '100%', maxWidth: 1180, alignSelf: 'center', flexGrow: 1 },
  brandRow: {
    minHeight: 55, paddingBottom: 17, borderBottomWidth: 1, borderBottomColor: palette.border,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  brandIdentity: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  brand: { fontSize: 31, fontWeight: '900', letterSpacing: -2.2, color: palette.ink, lineHeight: 35 },
  brandDot: { color: palette.accent },
  brandDivider: { height: 21, width: 1, backgroundColor: palette.border },
  brandSubtitle: { color: palette.muted, fontSize: 10, fontWeight: '700', letterSpacing: 1.15 },
  topEdition: { fontSize: 10, fontWeight: '800', color: palette.muted, letterSpacing: 1.1 },
  main: { flexGrow: 1 },
  mainDesktop: { flexDirection: 'row', alignItems: 'center', gap: 65, paddingVertical: 66 },
  mainMobile: { flexDirection: 'column', paddingVertical: 40 },
  intro: { flexShrink: 1 },
  introDesktop: { flex: 1, paddingRight: 10 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 25 },
  accentLine: { width: 22, height: 2, backgroundColor: palette.accent },
  eyebrow: { fontSize: 10, fontWeight: '800', color: palette.accent, letterSpacing: 1.8, textTransform: 'uppercase' },
  title: { color: palette.ink, fontWeight: '700', letterSpacing: -2.5 },
  titleDesktop: { fontSize: 66, lineHeight: 73, maxWidth: 565 },
  titleMobile: { fontSize: 42, lineHeight: 47, maxWidth: 480 },
  description: { marginTop: 25, maxWidth: 390, fontSize: 16, lineHeight: 27, color: palette.muted },
  introFooter: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 76 },
  introIndex: { fontSize: 12, fontWeight: '800', color: palette.ink, letterSpacing: 1.1 },
  introFootnote: { fontSize: 12, color: palette.muted },
  formPanel: { backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.border, width: '100%' },
  formDesktop: { flexBasis: 430, flexShrink: 0, paddingHorizontal: 40, paddingTop: 29, paddingBottom: 38 },
  formMobile: { marginTop: 35, paddingHorizontal: 23, paddingTop: 25, paddingBottom: 28 },
  formHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingBottom: 22, marginBottom: 25, borderBottomWidth: 1, borderBottomColor: palette.border,
  },
  formHeaderText: { fontSize: 11, fontWeight: '800', color: palette.ink, letterSpacing: 1.4 },
  formHeaderNumber: { color: palette.muted, fontSize: 11, letterSpacing: 0.8 },
  footer: {
    borderTopWidth: 1, borderTopColor: palette.border, paddingTop: 17,
    flexDirection: 'row', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
  },
  footerPrimary: { fontSize: 10, color: palette.muted, fontWeight: '700', letterSpacing: 0.45 },
  footerSecondary: { fontSize: 10, color: palette.muted, letterSpacing: 0.6 },
});
