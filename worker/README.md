# API do Assistente do Portfólio

API serverless para o widget de chat do GitHub Pages. A chave da OpenAI fica como secret no Cloudflare Worker e nunca é enviada ao navegador.

## 1. Pré-requisitos

- Conta Cloudflare com Workers habilitado.
- Chave de API da OpenAI com faturamento/configuração de API ativos.
- Node.js e Wrangler instalados localmente.

## 2. Configurar e publicar

Na pasta `worker/`:

```powershell
npm install -g wrangler
wrangler login
wrangler secret put OPENAI_API_KEY
wrangler deploy
```

Cole a chave no prompt interativo do Wrangler. Não coloque a chave em arquivos do repositório, no chat do portfólio ou no código do navegador.

O modelo pode ser alterado pela variável `OPENAI_MODEL` no `wrangler.toml` ou nas configurações do Worker. O valor inicial é `gpt-5.5`; confirme no painel da API se o modelo está habilitado no projeto.

## 3. Conectar o widget

Depois do deploy, copie a URL pública do Worker e substitua a constante `ASSISTANT_ENDPOINT` em `src/js/assistant.js` por:

```js
const ASSISTANT_ENDPOINT = "https://SEU-WORKER.workers.dev/api/chat";
```

Faça commit e publique o GitHub Pages.

## 4. Teste local

Execute o Worker com Wrangler:

```powershell
wrangler dev
```

O widget aceita apenas a origem publicada do portfólio e localhost:8787. Se usar outro endereço local, ajuste a lista `ALLOWED_ORIGINS` em `src/index.js`.

## Segurança e limites do MVP

- A chave é lida exclusivamente de `env.OPENAI_API_KEY`.
- A API limita o tamanho de mensagens e histórico.
- CORS restringe origens de navegador, mas **não substitui autenticação nem proteção contra abuso**.
- Antes de divulgar amplamente, configure rate limiting/limites de uso e alertas de custo no provedor.
- O histórico fica apenas na memória da página e não é persistido pelo widget.
