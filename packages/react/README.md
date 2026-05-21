# @aparsoft/chatbot-react

React component for the [Aparsoft AI Chatbot Widget](https://chatbot.aparsoft.com).

## Install

```bash
npm install @aparsoft/chatbot-react
```

## Usage

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
| `onReady` | `(widget) => void` | -- | Callback when widget is mounted |

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

## Get Your API Key

1. Sign up at [chatbot.aparsoft.com](https://chatbot.aparsoft.com)
2. Register your website URL
3. Copy the API key from the dashboard

Free tier: 50 messages/month. No credit card required.

## License

MIT
