import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

import { AuthField, authStyles } from '@/components/auth-fields';
import { AuthShell } from '@/components/auth-shell';
import { useAuth } from '@/contexts/auth-context';

export default function CadastroScreen() {
  const { user, loading, signup } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!loading && user) return <Redirect href="/perfil" />;

  async function submit() {
    if (busy) return;
    setError('');
    if (!name.trim() || !username.trim() || !email.trim() || !password || !confirmation) {
      setError('Preencha todos os campos para continuar.');
      return;
    }
    if (username.trim().length < 3) {
      setError('O nome de usuário deve ter pelo menos 3 caracteres.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Digite um e-mail válido.');
      return;
    }
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    if (password !== confirmation) {
      setError('As senhas não coincidem.');
      return;
    }

    setBusy(true);
    try {
      await signup({
        name: name.trim(),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível criar a conta.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Primeiro acesso"
      title="Crie sua conta."
      description="Seus dados serão cadastrados na classe User do Parse Server.">
      {error ? <View style={authStyles.errorBox}><Text style={authStyles.errorText}>{error}</Text></View> : null}
      <AuthField
        label="Nome completo"
        icon="id-card-outline"
        placeholder="Seu nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
      />
      <AuthField
        label="Nome de usuário"
        icon="person-outline"
        placeholder="Como deseja ser identificado"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username-new"
      />
      <AuthField
        label="E-mail"
        icon="mail-outline"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
      />
      <AuthField
        label="Senha"
        icon="lock-closed-outline"
        placeholder="Mínimo de 8 caracteres"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!visible}
        onToggleVisibility={() => setVisible((v) => !v)}
        visible={visible}
        autoCapitalize="none"
        autoComplete="new-password"
      />
      <AuthField
        label="Confirmar senha"
        icon="shield-checkmark-outline"
        placeholder="Repita sua senha"
        value={confirmation}
        onChangeText={setConfirmation}
        secureTextEntry={!visible}
        autoCapitalize="none"
        autoComplete="new-password"
        onSubmitEditing={submit}
        returnKeyType="done"
      />
      <Pressable
        style={[authStyles.submit, busy && authStyles.submitDisabled]}
        onPress={submit}
        disabled={busy}
        accessibilityRole="button">
        {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={authStyles.submitText}>Criar minha conta  →</Text>}
      </Pressable>
      <View style={authStyles.bottomRow}>
        <Text style={authStyles.secondary}>Já tem cadastro?</Text>
        <Link href="/login" style={authStyles.link}>Fazer login</Link>
      </View>
    </AuthShell>
  );
}
