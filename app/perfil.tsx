import { useState } from 'react';
import { Redirect } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { palette } from '@/constants/auth-theme';
import { useAuth } from '@/contexts/auth-context';

function formattedDate(date?: string) {
  if (!date) return 'Não informado';
  const value = new Date(date);
  return Number.isNaN(value.getTime()) ? 'Não informado' : value.toLocaleDateString('pt-BR');
}

function Detail({ label, value, index }: { label: string; value: string; index: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailIndex}>{index}</Text>
      <View style={styles.detailBody}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue} selectable>{value}</Text>
      </View>
    </View>
  );
}

export default function PerfilScreen() {
  const { width } = useWindowDimensions();
  const desktop = width >= 860;
  const { user, loading, refresh, logout } = useAuth();
  const [busy, setBusy] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState('');

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={palette.accent} /></View>;
  }
  if (!user) return <Redirect href="/login" />;

  async function reload() {
    if (busy || signingOut) return;
    setBusy(true);
    setError('');
    try {
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Falha ao atualizar os dados.');
    } finally {
      setBusy(false);
    }
  }

  async function leave() {
    if (signingOut || busy) return;
    setSigningOut(true);
    setError('');
    try {
      await logout();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível sair da conta.');
    } finally {
      setSigningOut(false);
    }
  }

  const name = user.name || user.username || 'Usuário';
  const firstName = name.trim().split(/\s+/)[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.frame}>
          <View style={styles.nav}>
            <Text style={styles.brand}>pdm<Text style={styles.brandDot}>.</Text></Text>
            <View style={styles.navRight}>
              <View style={styles.statusDot} />
              <Text style={styles.navMeta}>SESSÃO ATIVA</Text>
              <View style={styles.navDivider} />
              <Text style={styles.navMeta}>2026.1</Text>
            </View>
          </View>

          <View style={[styles.main, desktop ? styles.mainDesktop : styles.mainMobile]}>
            <View style={[styles.intro, desktop && styles.introDesktop]}>
              <Text style={styles.overline}>ÁREA PESSOAL  /  01</Text>
              <Text
                style={[styles.greeting, desktop ? styles.greetingDesktop : styles.greetingMobile]}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.65}>
                {'Olá,\n' + firstName + '.'}
              </Text>
              <Text style={styles.summary}>
                Consulte as informações vinculadas à sua conta. Tudo em um só lugar.
              </Text>
              <View style={styles.introRule} />
              <Text style={styles.smallLabel}>IDENTIFICAÇÃO</Text>
              <Text style={styles.smallValue} selectable>@{user.username}</Text>
            </View>

            <View style={styles.sheet}>
              <View style={styles.sheetHeader}>
                <View>
                  <Text style={styles.sheetEyebrow}>MINHA CONTA</Text>
                  <Text style={styles.sheetTitle}>Informações pessoais</Text>
                </View>
                <Text style={styles.sheetIndex}>01 / 01</Text>
              </View>
              <Detail index="01" label="Nome completo" value={name} />
              <Detail index="02" label="Nome de usuário" value={user.username || 'Não informado'} />
              <Detail index="03" label="E-mail" value={user.email || 'Não informado'} />
              <Detail index="04" label="Identificador da conta" value={user.objectId} />
              <Detail index="05" label="Data de cadastro" value={formattedDate(user.createdAt)} />
              <Detail
                index="06"
                label="E-mail verificado"
                value={user.emailVerified === undefined
                  ? 'Não informado'
                  : user.emailVerified ? 'Sim' : 'Não'}
              />
              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
              <View style={[styles.actions, !desktop && styles.actionsMobile]}>
                <Pressable
                  style={styles.refresh}
                  onPress={reload}
                  disabled={busy || signingOut}
                  accessibilityRole="button">
                  {busy ? <ActivityIndicator color={palette.ink} /> : null}
                  <Text style={styles.refreshText}>{busy ? 'Atualizando...' : '↻  Atualizar dados'}</Text>
                </Pressable>
                <Pressable
                  style={styles.leave}
                  onPress={leave}
                  disabled={signingOut || busy}
                  accessibilityRole="button">
                  {signingOut ? <ActivityIndicator color="#FFFFFF" /> : null}
                  <Text style={styles.leaveText}>{signingOut ? 'Saindo...' : 'Sair da conta  ↗'}</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>PDM / IDENTIDADE DIGITAL</Text>
            <Text style={styles.footerText}>DADOS FORNECIDOS PELO PARSE SERVER</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: palette.background },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 26, paddingBottom: 20 },
  frame: { width: '100%', maxWidth: 1180, alignSelf: 'center', flexGrow: 1 },
  nav: {
    minHeight: 55, paddingBottom: 17, flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', borderBottomWidth: 1, borderBottomColor: palette.border,
  },
  brand: { color: palette.ink, fontSize: 31, lineHeight: 35, letterSpacing: -2.2, fontWeight: '900' },
  brandDot: { color: palette.accent },
  navRight: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: palette.success },
  navMeta: { fontSize: 10, letterSpacing: 0.9, color: palette.muted, fontWeight: '700' },
  navDivider: { width: 1, height: 15, backgroundColor: palette.border, marginHorizontal: 5 },
  main: { flexGrow: 1 },
  mainDesktop: { flexDirection: 'row', alignItems: 'flex-start', gap: 64, paddingVertical: 72 },
  mainMobile: { flexDirection: 'column', paddingVertical: 36 },
  intro: { flexShrink: 1 },
  introDesktop: { flex: 1, paddingTop: 24 },
  overline: { color: palette.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  greeting: { color: palette.ink, letterSpacing: -2.5, fontWeight: '700' },
  greetingDesktop: { fontSize: 69, lineHeight: 75, marginTop: 32 },
  greetingMobile: { fontSize: 43, lineHeight: 49, marginTop: 23 },
  summary: { marginTop: 22, color: palette.muted, fontSize: 16, lineHeight: 26, maxWidth: 360 },
  introRule: { marginTop: 38, marginBottom: 20, height: 1, maxWidth: 330, backgroundColor: palette.border },
  smallLabel: { color: palette.muted, fontSize: 10, letterSpacing: 1.4, fontWeight: '800' },
  smallValue: { color: palette.ink, fontSize: 15, marginTop: 7, fontWeight: '700' },
  sheet: {
    width: '100%', flexBasis: 590, flexShrink: 1, backgroundColor: palette.surface,
    borderWidth: 1, borderColor: palette.border, paddingHorizontal: 27, paddingVertical: 28,
  },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    borderBottomWidth: 1, borderColor: palette.border, paddingBottom: 21, marginBottom: 5,
  },
  sheetEyebrow: { color: palette.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  sheetTitle: { color: palette.ink, marginTop: 10, fontSize: 23, letterSpacing: -0.6, fontWeight: '700' },
  sheetIndex: { color: palette.muted, fontSize: 11 },
  detail: { flexDirection: 'row', gap: 18, paddingVertical: 17, borderBottomWidth: 1, borderColor: palette.border },
  detailIndex: { width: 18, color: palette.accent, fontSize: 10, fontWeight: '800', paddingTop: 3 },
  detailBody: { flex: 1 },
  detailLabel: { color: palette.muted, fontSize: 12, marginBottom: 7 },
  detailValue: { color: palette.ink, fontWeight: '700', fontSize: 14, lineHeight: 20 },
  errorBox: { marginTop: 19, backgroundColor: '#FAEEEB', padding: 13, borderLeftWidth: 3, borderLeftColor: palette.error },
  errorText: { color: palette.error, fontSize: 13, lineHeight: 20 },
  actions: { flexDirection: 'row', gap: 11, marginTop: 25 },
  actionsMobile: { flexWrap: 'wrap' },
  refresh: {
    flex: 1, borderWidth: 1, borderColor: palette.border, minHeight: 51,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, gap: 7,
  },
  refreshText: { color: palette.ink, fontSize: 13, fontWeight: '700' },
  leave: {
    flex: 1, backgroundColor: palette.ink, minHeight: 51, alignItems: 'center',
    justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 10, gap: 7,
  },
  leaveText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  footer: {
    borderTopWidth: 1, borderTopColor: palette.border, paddingTop: 17,
    flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
  },
  footerText: { color: palette.muted, fontSize: 10, letterSpacing: 0.5, fontWeight: '700' },
});
