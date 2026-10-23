import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

import { AuthField, authStyles } from '@/components/auth-fields';
import { AuthShell } from '@/components/auth-shell';
import { useAuth } from '@/contexts/auth-context';
import { back4appConfigured } from '@/lib/parse-api';

export default function LoginScreen() {
  const { user, loading, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!loading && user) return <Redirect href="/perfil" />;

  async function submit() {
    if (busy) return;
    setError('');
    if (!username.trim() || !password) {
      setError('Preencha seu usuário e sua senha.');
      return;
    }
    setBusy(true);
    try {
      await login(username.trim(), password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível entrar.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      eyebrow="ACESSO / 01"
      title={"Bem-vindo\nnovamente."}
      description="Entre com seu usuário e senha para acessar suas informações.">
      {!back4appConfigured ? (
        <View style={authStyles.infoBox}>
          <Text style={authStyles.infoText}>Configure as variáveis do Back4App no arquivo .env para habilitar o acesso.</Text>
        </View>
      ) : null}
      {error ? <View style={authStyles.errorBox}><Text style={authStyles.errorText}>{error}</Text></View> : null}
      <AuthField
        label="Nome de usuário"
        icon="person-outline"
        placeholder="Digite seu usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
      />
      <AuthField
        label="Senha"
        icon="lock-closed-outline"
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!visible}
        onToggleVisibility={() => setVisible((v) => !v)}
        visible={visible}
        autoCapitalize="none"
        autoComplete="current-password"
        textContentType="password"
        onSubmitEditing={submit}
        returnKeyType="done"
      />
      <Pressable
        style={[authStyles.submit, busy && authStyles.submitDisabled]}
        disabled={busy}
        accessibilityRole="button"
        onPress={submit}>
        {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={authStyles.submitText}>Entrar na conta   ↗</Text>}
      </Pressable>
      <View style={authStyles.bottomRow}>
        <Text style={authStyles.secondary}>Ainda não tem uma conta?</Text>
        <Link href="/cadastro" style={authStyles.link}>Cadastre-se</Link>
      </View>
    </AuthShell>
  );
}
