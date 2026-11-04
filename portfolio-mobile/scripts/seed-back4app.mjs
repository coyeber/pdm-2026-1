import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appId = process.env.BACK4APP_APP_ID || '4hrZhWr86hv7ZLo4AoygghL0DWPwBo7yZ7V7LBxA';
const clientKey = process.env.BACK4APP_CLIENT_KEY || 'qLqn8tnyWr56PWL2iR4rZmo1OHMU1YUOd5nm08Ww';
const restKey = process.env.BACK4APP_REST_KEY;
const endpoint = 'https://parseapi.back4app.com/classes/Portfolio';
const headers = {
  'X-Parse-Application-Id': appId,
  [restKey ? 'X-Parse-REST-API-Key' : 'X-Parse-Client-Key']: restKey || clientKey,
  'Content-Type': 'application/json',
};
async function req(url, method = 'GET', body) {
  const response = await fetch(url, {
    method, headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`${response.status}: ${data.error || JSON.stringify(data)}`);
  return data;
}
try {
  const content = JSON.parse(readFileSync(resolve(root, 'data/portfolio.json'), 'utf8'));
  const slug = 'sergio-coyeber';
  const url = `${endpoint}?where=${encodeURIComponent(JSON.stringify({ slug }))}`;
  let existing;
  try { existing = await req(url); }
  catch (error) {
    // Se a classe ainda não existir, o Parse pode permitir sua criação pelo POST;
    // caso a permissão esteja restrita, use BACK4APP_REST_KEY temporariamente.
    if (!String(error).includes('Class Portfolio does not exist')) throw error;
    existing = { results: [] };
  }
  const record = existing.results?.[0];
  if (record) {
    await req(`${endpoint}/${record.objectId}`, 'PUT', { content });
    console.log(`Portfólio atualizado no Back4App: ${record.objectId}`);
  } else {
    const created = await req(endpoint, 'POST', { slug, content });
    console.log(`Portfólio criado no Back4App: ${created.objectId}`);
  }
  console.log('Se necessário, ajuste CLP da classe Portfolio: leitura pública, escrita apenas por administrador.');
} catch (error) {
  console.error('Não foi possível popular a classe Portfolio:', error.message);
  console.error('Confira as permissões do painel. Você pode executar com BACK4APP_REST_KEY no computador, mas nunca publique essa chave.');
  process.exitCode = 1;
}
