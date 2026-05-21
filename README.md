# Aparsoft AI Chatbot Widget

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Deploy in 3 mins](https://img.shields.io/badge/Deploy%20in-3%20minutes-blue)](https://chatbot.aparsoft.com)

> Add an AI-powered chatbot to your website in under 60 seconds.
> Trained on **your** content. No coding required beyond a single component.

---

## Quick Start

### React

```bash
npm install @aparsoft/chatbot-react
```

```jsx
import AparsoftChatbot from '@aparsoft/chatbot-react';

export default function App() {
  return (
    <>
      <main>Your page content</main>
      <AparsoftChatbot apiKey="YOUR_PUBLIC_API_KEY" />
    </>
  );
}
```

### Next.js (App Router)

```bash
npm install @aparsoft/chatbot-nextjs
```

```tsx
'use client';
import AparsoftChatbot from '@aparsoft/chatbot-nextjs';

export default function Page() {
  return <AparsoftChatbot apiKey="YOUR_PUBLIC_API_KEY" />;
}
```

### Vue 2 / Vue 3

```bash
npm install @aparsoft/chatbot-vue
```

```vue
<template>
  <AparsoftChatbot api-key="YOUR_PUBLIC_API_KEY" />
</template>

<script>
import AparsoftChatbot from '@aparsoft/chatbot-vue';

export default {
  components: { AparsoftChatbot },
};
</script>
```

### Angular

```bash
npm install @aparsoft/chatbot-angular
```

```typescript
import { AparsoftChatbotComponent } from '@aparsoft/chatbot-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AparsoftChatbotComponent],
  template: `
    <main>Your page content</main>
    <aparsoft-chatbot apiKey="YOUR_PUBLIC_API_KEY"></aparsoft-chatbot>
  `,
})
export class AppComponent {}
```

### Vanilla HTML (any website)

```html
<script
  src="https://www.aparsoft.com/static/chatbot-widget/widget.loader.js"
  data-aparsoft-chatbot="true"
  data-api-key="YOUR_PUBLIC_API_KEY"
></script>
```

---

## Get Your API Key

1. Sign up at [chatbot.aparsoft.com](https://chatbot.aparsoft.com) -- Free tier: 50 messages/month
2. Register your website URL
3. The platform scrapes, vectorizes, and deploys your chatbot in 3-5 minutes
4. Copy the API key from the dashboard into the component

[Get 50 Free Messages per Website](https://chatbot.aparsoft.com)

---

## Features

- **Zero-config RAG** -- Scrapes your site, builds a vector index, answers from YOUR content
- **Real-time WebSocket streaming** -- Token-by-token responses
- **SSR-safe** -- Works with Next.js App Router, Nuxt, Angular Universal
- **Fully customizable** -- Colors, position, welcome message via dashboard
- **Analytics dashboard** -- Track conversations, top questions, content gaps
- **Multi-tenant** -- Each website gets isolated vector storage
- **WhatsApp integration** -- Same knowledge base, WhatsApp channel (paid plans)
- **Lightweight** -- Zero dependencies. Widget runtime hosted on Aparsoft CDN.

---

## Configuration

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | *(required)* | Public widget API key from dashboard |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Launcher placement |
| `showBranding` | `boolean` | `true` | Show "Powered by Aparsoft" footer |
| `autoOpenDelay` | `number` | `0` | Auto-open after N milliseconds |
| `primaryColor` | `string` | Dashboard config | Override primary theme color |
| `secondaryColor` | `string` | Dashboard config | Override secondary theme color |
| `widgetTitle` | `string` | Dashboard config | Override header title |
| `widgetSubtitle` | `string` | Dashboard config | Override header subtitle |
| `welcomeMessage` | `string` | Dashboard config | Override welcome message |
| `onReady` | `(widget) => void` | -- | Callback when widget is mounted |

---

## Programmatic Control

```jsx
import { useAparsoftChatbot } from '@aparsoft/chatbot-react';

function SupportButton() {
  const { openChat, closeChat, sendMessage } = useAparsoftChatbot();

  return (
    <button onClick={() => { sendMessage('I need help'); openChat(); }}>
      Get Help
    </button>
  );
}
```

---

## Framework Packages

| Framework | Package | Install |
|---|---|---|
| React | `@aparsoft/chatbot-react` | `npm i @aparsoft/chatbot-react` |
| Next.js | `@aparsoft/chatbot-nextjs` | `npm i @aparsoft/chatbot-nextjs` |
| Vue 2/3 | `@aparsoft/chatbot-vue` | `npm i @aparsoft/chatbot-vue` |
| Angular | `@aparsoft/chatbot-angular` | `npm i @aparsoft/chatbot-angular` |
| Vanilla JS | Hosted loader | `<script src="...widget.loader.js">` |

---

## How It Works

These packages are thin wrappers. They inject the hosted `widget.loader.js` from Aparsoft's CDN into your page. The widget runtime itself (UI, WebSocket connection, chat logic) stays on Aparsoft's infrastructure -- so there are zero dependencies to install and zero bundle-size impact beyond the wrapper.

---

## Pricing

| Plan | Credits/mo | Price (INR/mo) | Key Limits |
|---|---|---|---|
| Free | 50 | 0 | 1 website, 1 MB KB |
| Standard | 1,000 | 999 | 1 website, 20 MB KB, WhatsApp |
| Pro | 4,000 | 2,499 | 3 websites, 50 MB KB, WhatsApp |
| Enterprise | Unlimited | Custom | Unlimited everything |

[View full pricing](https://chatbot.aparsoft.com/pricing)

---

## License

MIT &copy; [Aparsoft Private Limited](https://aparsoft.com)
