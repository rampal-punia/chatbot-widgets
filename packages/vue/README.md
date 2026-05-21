# @aparsoft/chatbot-vue

Vue component for the [Aparsoft AI Chatbot Widget](https://chatbot.aparsoft.com). Compatible with Vue 2.7+ and Vue 3.

## Install

```bash
npm install @aparsoft/chatbot-vue
```

## Usage

```vue
<template>
  <div>
    <main>Your page content</main>
    <AparsoftChatbot api-key="YOUR_PUBLIC_API_KEY" />
  </div>
</template>

<script>
import AparsoftChatbot from '@aparsoft/chatbot-vue';

export default {
  components: { AparsoftChatbot },
};
</script>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `String` | *(required)* | Public widget API key from dashboard |
| `position` | `String` | `'bottom-right'` | Launcher placement |
| `showBranding` | `Boolean` | `true` | Show "Powered by Aparsoft" footer |
| `autoOpenDelay` | `Number` | `0` | Auto-open after N ms |
| `primaryColor` | `String` | Dashboard config | Override primary theme color |
| `secondaryColor` | `String` | Dashboard config | Override secondary theme color |
| `widgetTitle` | `String` | Dashboard config | Override header title |
| `widgetSubtitle` | `String` | Dashboard config | Override header subtitle |
| `welcomeMessage` | `String` | Dashboard config | Override welcome message |

Note: In templates, use kebab-case: `api-key`, `auto-open-delay`, `widget-title`, etc.

## Events

| Event | Payload | Description |
|---|---|---|
| `ready` | `AparsoftChatbotInstance` | Emitted when widget is mounted and ready |

```vue
<AparsoftChatbot api-key="YOUR_KEY" @ready="onWidgetReady" />
```

## Get Your API Key

1. Sign up at [chatbot.aparsoft.com](https://chatbot.aparsoft.com)
2. Register your website URL
3. Copy the API key from the dashboard

Free tier: 50 messages/month. No credit card required.

## License

MIT
