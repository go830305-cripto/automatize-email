# Automatize Email - Next.js Demo

Este é um projeto de exemplo gerado para o seu site **Automatize Email**.
Ele inclui:
- Página principal em Next.js (React) com interface de upload, editor e dashboard fictício.
- Integração de backend para envio via **Brevo (Sendinblue)** através de rota API `/api/send-brevo`.
- Rota API `/api/chat` com um stub simples para o chatbot (deve ser melhorado para integração com Gemini/GPT).
- Estilos básicos em CSS (arquivo simples).

## Uso

1. Instale dependências:
```
npm install
```

2. Crie um arquivo `.env.local` na raiz com sua chave Brevo:
```
BREVO_API_KEY=your_brevo_api_key_here
```

3. Rode em modo de desenvolvimento:
```
npm run dev
```

A aplicação estará disponível em http://localhost:3000

> Nota: a integração com Brevo faz chamadas reais ao endpoint SMTP de Brevo. Use uma chave válida e contas de e-mail de teste para evitar envios indesejados.
