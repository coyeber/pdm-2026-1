# PDM 2026.1 — Cadastro, login e perfil com Back4App

Aplicativo React Native + Expo Router + TypeScript que utiliza a classe `_User` do Parse Server hospedado no Back4App.

## Funcionalidades

- **Cadastro** com nome, usuário, e-mail e senha (`POST /users`).
- **Login** com nome de usuário e senha (`POST /login`).
- **Perfil autenticado** com os dados reais de `GET /users/me`, incluindo objectId e data do cadastro.
- **Sessão persistida** com `expo-secure-store` no Android/iOS e `localStorage` na web; a API valida o token na inicialização.
- **Logout** com `POST /logout`, limpeza do token local e retorno à tela de login.
- Estados de carregamento, validação e mensagens de erro em português.

## Como executar

1. Tenha o Node.js instalado. Dentro da pasta do projeto, execute `npm install`.
2. As variáveis públicas do aplicativo Back4App da atividade já estão preenchidas no arquivo `.env` deste repositório.
3. Inicie com `npx expo start -c` e abra no Expo Go ou no navegador (pressionando `w`).

Para usar outra aplicação Back4App, modifique apenas `EXPO_PUBLIC_BACK4APP_APP_ID` e `EXPO_PUBLIC_BACK4APP_CLIENT_KEY` no seu ambiente local.

**Importante:** Use a **Client Key**, e nunca a REST API Key nem a Master Key no código do aplicativo. As variáveis `EXPO_PUBLIC_*` são embutidas no aplicativo cliente e **não são segredos**. Neste exercício, `.env` contém somente Application ID, Client Key e a URL pública, e foi versionado conforme solicitado. **O repositório é público**, portanto qualquer pessoa pode ver esses valores. Nunca publique a REST API Key ou Master Key. Configure as permissões de classe (CLP), ACL e políticas de senha no Back4App.

## Roteamento

| Tela | Arquivo | Função |
| --- | --- | --- |
| Entrada | `app/index.tsx` | Redireciona com base na sessão |
| Login | `app/login.tsx` | Autentica usuário |
| Cadastro | `app/cadastro.tsx` | Cria usuário |
| Perfil | `app/perfil.tsx` | Mostra dados do usuário logado |

## Testes manuais recomendados

- Criar um usuário e conferir a classe `_User` no Dashboard do Back4App.
- Sair e entrar novamente com o usuário cadastrado.
- Fechar/abrir o aplicativo e confirmar a recuperação da sessão.
- Atualizar os dados do perfil.
- Conferir mensagens para senha incorreta, usuário/e-mail duplicado e campos inválidos.
- Sair da conta e verificar que não é possível abrir o perfil sem login.

Referência: [Parse REST API — Users](https://docs.parseplatform.org/rest/guide/#users).
