import portfolio from '../data/portfolio.json';

/** Reutiliza as chaves públicas CLIENT do aplicativo Back4App que já existe.
 * A segurança depende das permissões CLP/ACL no painel, nunca dessas chaves. */
const APP_ID = process.env.EXPO_PUBLIC_BACK4APP_APP_ID?.trim() || '4hrZhWr86hv7ZLo4AoygghL0DWPwBo7yZ7V7LBxA';
const CLIENT_KEY = process.env.EXPO_PUBLIC_BACK4APP_CLIENT_KEY?.trim() || 'qLqn8tnyWr56PWL2iR4rZmo1OHMU1YUOd5nm08Ww';
const BASE_URL = (process.env.EXPO_PUBLIC_BACK4APP_SERVER_URL?.trim() || 'https://parseapi.back4app.com').replace(/\/+$/, '');

export type Portfolio = typeof portfolio;
export const isBackendConfigured = () => Boolean(APP_ID && CLIENT_KEY);

export async function loadPortfolio(): Promise<{ content: Portfolio; source: 'back4app' | 'local'; notice: string }> {
  if (!isBackendConfigured()) {
    return { content: portfolio, source: 'local', notice: 'Chaves públicas de conexão não configuradas.' };
  }
  try {
    const where = encodeURIComponent(JSON.stringify({ slug: 'sergio-coyeber' }));
    const response = await fetch(`${BASE_URL}/classes/Portfolio?where=${where}&limit=1`, {
      headers: {
        'X-Parse-Application-Id': APP_ID,
        'X-Parse-Client-Key': CLIENT_KEY,
        'Content-Type': 'application/json',
      },
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `Erro HTTP ${response.status}`);
    const data = payload.results?.[0]?.content;
    if (!data || !Array.isArray(data.projects) || !Array.isArray(data.experience) || !Array.isArray(data.education)) {
      throw new Error('A classe Portfolio ainda não contém o registro sergio-coyeber. Execute npm run seed.');
    }
    return { content: data as Portfolio, source: 'back4app', notice: 'Dados de currículo e projetos recebidos do Back4App existente.' };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return { content: portfolio, source: 'local', notice: `O Back4App está configurado, mas os dados remotos ainda não foram carregados: ${detail}. Exibindo conteúdo local.` };
  }
}
