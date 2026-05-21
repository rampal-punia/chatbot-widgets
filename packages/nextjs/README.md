# @aparsoft/chatbot-nextjs

Next.js (App Router) component for the [Aparsoft AI Chatbot Widget](https://chatbot.aparsoft.com). Written in TypeScript.

## Install

```bash
npm install @aparsoft/chatbot-nextjs
```

## Usage

```tsx
'use client';
import AparsoftChatbot from '@aparsoft/chatbot-nextjs';

export default function Page() {
  return (
    <>
      <main>Your page content</main>
      <AparsoftChatbot apiKey="YOUR_PUBLIC_API_KEY" />
    </>
  );
}
```

The `'use client'` directive is included in the package -- you do not need to add it yourself.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | *(required)* | Public widget API key from dashboard |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Launcher placement |
| `showBranding` | `boolean` | `true` | Show "Powered by Aparsoft" footer |
| `autoOpenDelay` | `number` | `0` | Auto-open after N ms |
| `primaryColor` | `string` | Dashboard config | Override primary theme color |
| `secondaryColor` | `string` | Dashboard config | Override secondary theme color |
| `widgetTitle` | `string` | Dashboard config | Override header title |
| `widgetSubtitle` | `string` | Dashboard config | Override header subtitle |
| `welcomeMessage` | `string` | Dashboard config | Override welcome message |
| `onReady` | `(widget: AparsoftChatbotInstance) => void` | -- | Callback when widget is mounted |

## Programmatic Control

```tsx
'use client';
import { useAparsoftChatbot } from '@aparsoft/chatbot-nextjs';

function SupportButton() {
  const { openChat, closeChat, sendMessage } = useAparsoftChatbot();
  return (
    <button onClick={() => { sendMessage('I need help'); openChat(); }}>
      Get Help
    </button>
  );
}
```

## Exports

- `AparsoftChatbot` (default) -- The component
- `useAparsoftChatbot` -- Hook for programmatic control
- `AparsoftChatbotConfig` -- TypeScript config interface
- `AparsoftChatbotInstance` -- TypeScript widget instance interface

## Get Your API Key

1. Sign up at [chatbot.aparsoft.com](https://chatbot.aparsoft.com)
2. Register your website URL
3. Copy the API key from the dashboard

Free tier: 50 messages/month. No credit card required.

## License

MIT
