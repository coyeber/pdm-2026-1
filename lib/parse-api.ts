/**
 * Cliente REST do Parse para Back4App.
 * Nunca coloque REST API Key ou Master Key no aplicativo.
 * A Client Key e o Application ID identificam o cliente; as regras de
 * acesso (CLP/ACL) devem ser configuradas no Back4App.
 */
const APP_ID = process.env.EXPO_PUBLIC_BACK4APP_APP_ID?.trim();
const CLIENT_KEY = process.env.EXPO_PUBLIC_BACK4APP_CLIENT_KEY?.trim();
const BASE_URL = (process.env.EXPO_PUBLIC_BACK4APP_SERVER_URL?.trim() ||
  'https://parseapi.back4app.com').replace(/\/+$/, '');

export const back4appConfigured = Boolean(APP_ID && CLIENT_KEY);

export type ParseUser = {
  objectId: string;
  username: string;
  email?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  emailVerified?: boolean;
  sessionToken?: string;
};

type ParseErrorBody = { code?: number; error?: string };
type ApiResponse = ParseUser & { sessionToken?: string };

export class ParseApiError extends Error {
  constructor(message: string, public readonly code?: number) {
    super(message);
    this.name = 'ParseApiError';
  }
}

function readableError(body: ParseErrorBody): string {
  switch (body.code) {
    case 101:
      return 'Usuário ou senha incorretos.';
    case 202:
      return 'Este nome de usuário já está em uso.';
    case 203:
      return 'Este e-mail já está cadastrado.';
    case 209:
      return 'Sua sessão expirou. Entre novamente.';
    case 200:
      return 'Informe um nome de usuário válido.';
    case 201:
      return 'Informe uma senha válida.';
    case 125:
      return 'O endereço de e-mail é inválido.';
    default:
      return body.error || 'Não foi possível concluir a operação.';
  }
}

async function request<T>(
  route: string,
  options: { method?: 'GET' | 'POST'; body?: object; token?: string } = {},
): Promise<T> {
  if (!back4appConfigured) {
    throw new ParseApiError(
      'Back4App não configurado. Preencha EXPO_PUBLIC_BACK4APP_APP_ID e EXPO_PUBLIC_BACK4APP_CLIENT_KEY no arquivo .env.',
    );
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': APP_ID!,
    'X-Parse-Client-Key': CLIENT_KEY!,
    'X-Parse-Revocable-Session': '1',
  };

  if (options.token) headers['X-Parse-Session-Token'] = options.token;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${route}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ParseApiError('Não foi possível conectar ao Back4App. Confira sua internet.');
  }

  const data = (await response.json().catch(() => ({}))) as ParseErrorBody & T;
  if (!response.ok) {
    throw new ParseApiError(readableError(data), data.code);
  }
  return data;
}

export function registerUser(fields: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  return request<ApiResponse>('/users', { method: 'POST', body: fields });
}

export function loginUser(username: string, password: string) {
  return request<ApiResponse>('/login', {
    method: 'POST',
    body: { username, password },
  });
}

export function getCurrentUser(token: string) {
  return request<ParseUser>('/users/me', { token });
}

export function logoutUser(token: string) {
  return request<Record<string, never>>('/logout', { method: 'POST', token });
}
