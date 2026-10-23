import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/constants/auth-theme';
import { useAuth } from '@/contexts/auth-context';

function formattedDate(date?: string) {
  if (!date) return 'Não informado';
  const value = new Date(date);
  return Number.isNaN(value.getTime()) ? 'Não informado' : value.toLocaleDateString('pt-BR');
}

function Detail({ icon, label, value }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detail}>
      <View style={styles.detailIcon}><Ionicons name={icon} size={20} color={palette.accent} /></View>
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue} selectable>{value}</Text>
      </View>
    </View>
  );
}

export default function PerfilScreen() {
  const { user, loading, refresh, logout } = useAuth();
  const [busy, setBusy] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState('');

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={palette.accent} /></View>;
  }
  if (!user) return <Redirect href="/login" />;

  async function reload() {
    if (busy) return;
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
    if (signingOut) return;
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

  const initials = (user.name || user.username || 'U')
    .trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.wrap}>
          <View style={styles.topBar}>
            <Text style={styles.brand}>PDM <Text style={{ color: palette.accent }}>2026.1</Text></Text>
            <View style={styles.session}>
              <View style={styles.dot} /><Text style={styles.sessionText}>Sessão ativa</Text>
            </View>
          </View>

          <View style={styles.hero}>
            <View style={styles.avatar}><Text style={styles.initials}>{initials}</Text></View>
            <Text style={styles.welcome}>Meu perfil</Text>
            <Text style={styles.name}>{user.name || user.username}</Text>
            <Text style={styles.sub}>Você está autenticado pelo Parse Server.</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.section}>Dados da sua conta</Text>
              <Ionicons name="person-circle-outline" size={24} color={palette.muted} />
            </View>
            <Detail icon="at-outline" label="Nome de usuário" value={user.username || 'Não informado'} />
            <Detail icon="mail-outline" label="E-mail" value={user.email || 'Não informado'} />
            <Detail icon="finger-print-outline" label="ID no Parse (objectId)" value={user.objectId} />
            <Detail icon="calendar-outline" label="Cadastrado em" value={formattedDate(user.createdAt)} />
            <Detail
              icon="checkmark-circle-outline"
              label="Verificação do e-mail"
              value={user.emailVerified === undefined ? 'Não informado' : user.emailVerified ? 'Verificado' : 'Não verificado'}
            />
          </View>
          {error ? <View style={styles.error}><Text style={styles.errorText}>{error}</Text></View> : null}
          <Pressable style={styles.refresh} onPress={reload} disabled={busy || signingOut} accessibilityRole="button">
            {busy ? <ActivityIndicator color={palette.accent} /> : <Ionicons name="refresh-outline" size={20} color={palette.accent} />}
            <Text style={styles.refreshLabel}>{busy ? 'Atualizando...' : 'Atualizar dados'}</Text>
          </Pressable>
          <Pressable style={styles.logout} onPress={leave} disabled={signingOut || busy} accessibilityRole="button">
            {signingOut ? <ActivityIndicator color={palette.error} /> : <Ionicons name="log-out-outline" size={21} color={palette.error} />}
            <Text style={styles.logoutLabel}>{signingOut ? 'Saindo...' : 'Sair da conta'}</Text>
          </Pressable>
          <Text style={styles.footer}>As informações são carregadas diretamente da classe _User do Back4App.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { paddingHorizontal: 20, paddingVertical: 28 },
  wrap: { width: '100%', maxWidth: 530, alignSelf: 'center' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34 },
  brand: { fontSize: 17, fontWeight: '900', color: palette.ink },
  session: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E9F7EF', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 30, gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 5, backgroundColor: palette.success },
  sessionText: { fontSize: 11, fontWeight: '800', color: palette.success },
  hero: { alignItems: 'center', marginBottom: 28 },
  avatar: { width: 81, height: 81, backgroundColor: palette.accentSoft, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  initials: { color: palette.accent, fontWeight: '900', fontSize: 27 },
  welcome: { fontSize: 12, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase', color: palette.accent },
  name: { marginTop: 7, color: palette.ink, fontSize: 27, fontWeight: '800', textAlign: 'center' },
  sub: { color: palette.muted, fontSize: 14, marginTop: 7, textAlign: 'center' },
  card: { backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.border, borderRadius: 20, padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  section: { color: palette.ink, fontSize: 16, fontWeight: '800' },
  detail: { flexDirection: 'row', gap: 13, alignItems: 'center', paddingVertical: 15, borderBottomColor: palette.border, borderBottomWidth: StyleSheet.hairlineWidth },
  detailIcon: { height: 40, width: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.accentSoft, borderRadius: 12 },
  detailText: { flex: 1 },
  detailLabel: { fontSize: 11, color: palette.muted, fontWeight: '700', marginBottom: 5 },
  detailValue: { color: palette.ink, fontSize: 14, fontWeight: '700' },
  error: { marginTop: 16, backgroundColor: '#FFF0F1', borderRadius: 12, padding: 13 },
  errorText: { color: palette.error, fontSize: 13 },
  refresh: { borderColor: palette.border, borderWidth: 1, backgroundColor: palette.surface, marginTop: 18, minHeight: 52, borderRadius: 13, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  refreshLabel: { color: palette.accent, fontSize: 14, fontWeight: '800' },
  logout: { marginTop: 10, minHeight: 52, borderRadius: 13, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  logoutLabel: { color: palette.error, fontSize: 14, fontWeight: '800' },
  footer: { marginTop: 18, marginBottom: 20, textAlign: 'center', color: palette.muted, fontSize: 11, lineHeight: 18 },
});
