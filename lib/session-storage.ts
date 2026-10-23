import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const KEY = 'pdm_2026_parse_session';

/**
 * No celular, o token fica no armazenamento seguro do sistema.
 * Na web, usamos localStorage (semelhante a outras sessões web simples).
 * Não armazene senhas.
 */
export async function getSessionToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    try {
      return typeof window !== 'undefined' ? window.localStorage.getItem(KEY) : null;
    } catch {
      return null;
    }
  }
  return SecureStore.getItemAsync(KEY);
}

export async function saveSessionToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    window.localStorage.setItem(KEY, token);
    return;
  }
  await SecureStore.setItemAsync(KEY, token);
}

export async function clearSessionToken(): Promise<void> {
  if (Platform.OS === 'web') {
    window.localStorage.removeItem(KEY);
    return;
  }
  await SecureStore.deleteItemAsync(KEY);
}
