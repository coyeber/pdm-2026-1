# Sérgio Cruz — Portfólio Mobile | Coyeber

Aplicativo criado para a atividade **Currículo / Portfólio (individual)** com **React Native + Expo e Expo Router**.

## Funcionalidades

- **Início**: apresentação pessoal, acesso rápido às seções, cards e métricas.
- **Sobre**: tecnologias/módulos do app, descrição da funcionalidade extra e estado da conexão do back-end.
- **Formação acadêmica**: trajetória, cursos e tecnologias.
- **Experiência profissional**: posições, empresas e competências.
- **Projetos**: cards com categorias, tecnologias e links.
- **Extras**: pesquisa dinâmica, filtros, favoritos salvos via AsyncStorage e compartilhamento nativo.
- **Back-end**: consulta à classe `Portfolio` do Back4App por API REST autenticada com Client Key; modo local para contingência.

> Os dados em `data/portfolio.json` são o conteúdo inicial do portfólio e podem ser editados. O aplicativo já aponta para o Back4App existente `atividade-expo-back4app`, reutilizando suas chaves públicas do repositório `coyeber/pdm-2026-1`. **É necessário executar o seed uma vez e validar o status conectado**; sem o registro da classe, usa dados locais.

## 1. Rodar no celular (Windows, macOS ou Linux)

Instale Node.js LTS e VS Code. Dentro da pasta do projeto, rode:

```bash
npm install
npx expo install --fix
npx expo start --tunnel
```

No celular, instale **Expo Go** compatível com SDK 58 e escaneie o QR Code. O computador precisa ter internet. Caso `--tunnel` solicite o pacote `@expo/ngrok`, aceite a instalação. Para testar no emulador Android, use `npx expo start --android` com emulador configurado.

Se aparecer incompatibilidade de versão, rode `npx expo-doctor@latest` e `npx expo install --fix`. **Não use web para gravar o vídeo:** a tarefa exige execução no celular ou emulador.

## 2. Reaproveitar o Back4App existente

- O aplicativo já contém Application ID e **Client Key públicos** da sua atividade anterior (`atividade-expo-back4app`), sem expor senha, Master Key ou REST API Key.
- Mantenha a classe `_User` intacta. A classe nova `Portfolio` conterá o currículo e será lida por `/classes/Portfolio`.
- **Para popular o banco uma vez**, execute `npm run seed` dentro desta pasta. O script tenta criar ou atualizar o registro usando a Client Key, caso as permissões de classe aceitem escrita.
- Caso o Back4App bloqueie a criação/escrita pela Client Key, encontre a REST API Key no painel **App Settings → Security & Keys**, configure-a **apenas no terminal local** e execute novamente. Não inclua essa chave no aplicativo nem no GitHub.

**PowerShell para escrita com permissão de API REST (somente se necessário):**

```powershell
$env:BACK4APP_REST_KEY="SUA_REST_API_KEY"
npm run seed
Remove-Item Env:\BACK4APP_REST_KEY
```

- No painel, configure a classe `Portfolio` para permitir leitura pública (`find` e `get`) e bloquear escrita por clientes após o seed. As classes de cadastro/login existentes não devem ser modificadas.
- Abra a tela **Sobre** no celular e pressione **Atualizar dados**. Somente o status `Back4App conectado` confirma que o app recebeu os dados do banco.

## 3. Código no GitHub (publicado na pasta desta atividade)

Repositório original: https://github.com/coyeber/pdm-2026-1

Projeto do portfólio: https://github.com/coyeber/pdm-2026-1/tree/main/portfolio-mobile

Os arquivos antigos de login/cadastro permanecem na raiz do repositório. No computador:

```bash
git clone https://github.com/coyeber/pdm-2026-1.git
cd pdm-2026-1/portfolio-mobile
npm install
npx expo install --fix
npm run seed
npx expo start --tunnel
```

## 4. Publicação Expo / QR Code

> Exigência do professor: link do app **publicado no Expo** para abrir no **Expo Go**, não apenas QR de desenvolvimento local.

1. Execute `npx eas-cli@latest login` e entre na **organização Expo indicada pelo professor**. Se recebeu convite, aceite no site do Expo.
2. Execute `npx eas-cli@latest init` e associe o projeto à organização correta. Esse comando configura o `projectId` do seu projeto no `app.json`.
3. Configure a atualização: `npx eas-cli@latest update:configure`.
4. No painel do **expo.dev**, em **Environment Variables → production**, cadastre `EXPO_PUBLIC_BACK4APP_APP_ID` e `EXPO_PUBLIC_BACK4APP_CLIENT_KEY` com as mesmas chaves cliente do seu `.env` (não cadastre a REST API Key).
5. Publique: `npx eas-cli@latest update --branch preview --message "Entrega portfolio UNICAP" --environment production`.
6. Abra a atualização no **expo.dev**, use o botão **Preview**, valide se o QR Code abre no Expo Go e copie o URL de compartilhamento correspondente. Dependendo das configurações atuais do SDK/Expo, um EAS Update pode exigir um development build; nesse caso confirme no Expo dashboard se existe preview compatível com Expo Go e siga o mecanismo de compartilhamento exigido pela turma. **Não envie QR local `exp://192.168...` como se fosse publicado**.

## 5. Vídeo YouTube (máximo 60 segundos)

Grave a tela do celular **ou do emulador**, com o aplicativo aberto, mostrando:

- 0–8s: Início e identidade visual.
- 8–17s: Sobre, tecnologias e status **Back4App conectado**.
- 17–26s: Formação acadêmica.
- 26–35s: Experiência profissional.
- 35–52s: Projetos, **busca e filtros**, clicar em **coração** (extra).
- 52–60s: Compartilhar portfólio ou retornar aos favoritos.

Publique no YouTube como **Público** ou **Não listado**, nunca Privado. Copie o link do vídeo.

## 6. Texto pronto para entrega

```text
1. Repositório GitHub: [COLE O LINK]
2. Aplicativo publicado no Expo / QR Code: [COLE O LINK]
3. Vídeo YouTube (até 1 minuto): [COLE O LINK]

Funcionalidades extras: pesquisa de projetos, filtro por categoria, favoritos persistidos localmente e compartilhamento nativo.
Tecnologias: React Native, Expo, Expo Router, TypeScript, API REST do Parse, Back4App, AsyncStorage, Ionicons e Expo Linear Gradient.
```

## Organização

`app/(tabs)/` = telas pelo Expo Router · `context/` = estado e favoritos · `services/back4app.ts` = leitura da API REST com Client Key · `data/portfolio.json` = conteúdo inicial · `scripts/seed-back4app.mjs` = população do Back4App.

## Sobre a autoria

Projeto acadêmico individual. Dados biográficos e projetos devem ser revisados pelo aluno antes de submeter. Não copie ou submeta chaves privadas.

## Corrigir Metro transformFile (SDK 58)
Pare o Expo com Ctrl+C. No Windows execute `corrigir-metro.bat`. Alternativamente rode `npm install`, `npx expo install --fix` e `npx expo start --clear --tunnel`. A versão atual declara `babel-preset-expo` e fixa `expo-linear-gradient` e AsyncStorage. Caso continue, procure no terminal a mensagem `Failed to construct transformer` antes de `transformFile`.

## Corrigir npm ERESOLVE / Babel / Metro
O Expo SDK 58 usa React 19.3.0. O projeto deve manter `react` e `react-dom` em **19.3.0** para evitar que npm resolva `react-dom@19.3.1` (que exige React 19.3.1). Se o `npm install` falhar, `babel-preset-expo` fica ausente e gera o erro secundário `transformFile`.

No Windows, pare o Expo com `Ctrl+C` e execute `corrigir-metro.bat` na pasta do projeto. Ou faça manualmente:

```powershell
npm pkg set dependencies.react=19.3.0 dependencies.react-dom=19.3.0
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npx expo install --fix
npx expo start --clear --tunnel
```

Evite `--force` ou `--legacy-peer-deps`; o correto é resolver o conflito. Se houver outro erro, envie as primeiras linhas do terminal, não só a tela do iPhone.
