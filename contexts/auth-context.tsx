import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  ParseApiError,
  registerUser,
  type ParseUser,
} from '@/lib/parse-api';
import { clearSessionToken, getSessionToken, saveSessionToken } from '@/lib/session-storage';

type Registration = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: ParseUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (fields: Registration) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ParseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = await getSessionToken();
        if (!token) return;
        const profile = await getCurrentUser(token);
        if (mounted) setUser(profile);
      } catch (error) {
        // Só apague sessões comprovadamente inválidas, não em erros de rede.
        if (error instanceof ParseApiError && error.code === 209) {
          await clearSessionToken().catch(() => {});
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const login = async (username: string, password: string) => {
    const response = await loginUser(username, password);
    if (!response.sessionToken) throw new Error('A API não retornou uma sessão.');
    await saveSessionToken(response.sessionToken);
    setUser(response);
  };

  const signup = async (fields: Registration) => {
    const response = await registerUser(fields);
    if (!response.sessionToken) {
      throw new Error('Cadastro realizado, mas nenhuma sessão foi retornada. Tente entrar.');
    }
    await saveSessionToken(response.sessionToken);
    // Cadastro retorna principalmente objectId; buscar os dados completos do User.
    try {
      const profile = await getCurrentUser(response.sessionToken);
      setUser(profile);
    } catch {
      setUser({
        objectId: response.objectId,
        username: fields.username,
        name: fields.name,
        email: fields.email,
        createdAt: response.createdAt,
      });
    }
  };

  const refresh = async () => {
    const token = await getSessionToken();
    if (!token) throw new ParseApiError('Sua sessão expirou. Entre novamente.', 209);
    try {
      setUser(await getCurrentUser(token));
    } catch (error) {
      if (error instanceof ParseApiError && error.code === 209) {
        await clearSessionToken().catch(() => {});
        setUser(null);
      }
      throw error;
    }
  };

  const logout = async () => {
    const token = await getSessionToken();
    try {
      if (token) await logoutUser(token);
    } catch {
      // A saída local continua mesmo sem acesso à rede.
    } finally {
      await clearSessionToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return context;
}
