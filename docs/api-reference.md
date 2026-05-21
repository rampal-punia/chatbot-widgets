# API Reference

Programmatic control of the Aparsoft chatbot widget via hooks, events, and the global controller.

## Controller API

When the widget loads, it registers `window.AparsoftChatbot` as the global controller instance.

### Methods

| Method | Signature | Description |
|---|---|---|
| `open()` | `() => void` | Open the chat panel |
| `close()` | `() => void` | Close the chat panel |
| `toggle()` | `() => void` | Toggle the chat panel open/closed |
| `sendMessage(message)` | `(message: string) => void` | Send a message and open the chat panel |
| `destroy()` | `() => void` | Remove the widget from the page and clean up |

### Properties

| Property | Type | Description |
|---|---|---|
| `isReady` | `boolean` | Whether the widget has finished initializing |
| `state` | `string` | Current widget state (`'open'`, `'closed'`) |

## React / Next.js Hook

```jsx
import { useAparsoftChatbot } from '@aparsoft/chatbot-react';
// or
import { useAparsoftChatbot } from '@aparsoft/chatbot-nextjs';
```

### Returns

| Property | Type | Description |
|---|---|---|
| `getWidget()` | `() => AparsoftChatbotInstance \| null` | Get the raw controller instance |
| `openChat()` | `() => void` | Open the chat panel |
| `closeChat()` | `() => void` | Close the chat panel |
| `toggleChat()` | `() => void` | Toggle the chat panel |
| `sendMessage(message)` | `(message: string) => void` | Programmatically send a message |

### Example: Custom Support Button

```jsx
import { useAparsoftChatbot } from '@aparsoft/chatbot-react';

function SupportButton() {
  const { openChat, sendMessage } = useAparsoftChatbot();

  return (
    <button onClick={() => {
      sendMessage('I need help with my order');
      openChat();
    }}>
      Get Support
    </button>
  );
}
```

### Example: Conditional Prompt

```jsx
import { useAparsoftChatbot } from '@aparsoft/chatbot-react';

function PricingPage() {
  const { openChat, sendMessage } = useAparsoftChatbot();

  return (
    <div>
      <h1>Pricing</h1>
      <button onClick={() => {
        sendMessage('Can you explain the Pro plan benefits?');
        openChat();
      }}>
        Ask about Pro Plan
      </button>
    </div>
  );
}
```

## Vue Events

The Vue component emits a `ready` event with the controller instance:

```vue
<template>
  <AparsoftChatbot
    api-key="cb_your_api_key"
    @ready="onWidgetReady"
  />
</template>

<script>
export default {
  methods: {
    onWidgetReady(controller) {
      controller.open();
      controller.sendMessage('Welcome from Vue!');
    }
  }
};
</script>
```

## Angular Events

The Angular component emits `ready` and `error` outputs:

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AparsoftChatbotComponent],
  template: `
    <aparsoft-chatbot
      apiKey="cb_your_api_key"
      (ready)="onReady($event)"
      (error)="onError($event)"
    ></aparsoft-chatbot>
  `,
})
export class AppComponent {
  onReady(controller: AparsoftChatbotInstance) {
    controller.open();
  }

  onError(error: Error) {
    console.error('Chatbot error:', error);
  }
}
```

## Custom Events (All Frameworks)

The widget dispatches browser custom events that you can listen to from any context:

### `aparsoft-chatbot:ready`

Fired when the widget finishes initializing.

```javascript
window.addEventListener('aparsoft-chatbot:ready', (event) => {
  const controller = event.detail.controller;
  console.log('Widget ready', controller);
});
```

### `aparsoft-chatbot:state`

Fired when the widget state changes (open/closed).

```javascript
window.addEventListener('aparsoft-chatbot:state', (event) => {
  console.log('Widget state:', event.detail.state);
});
```

## TypeScript Types

The Next.js and React packages export TypeScript interfaces:

```typescript
import type { AparsoftChatbotConfig, AparsoftChatbotInstance } from '@aparsoft/chatbot-nextjs';
```

### `AparsoftChatbotConfig`

```typescript
interface AparsoftChatbotConfig {
  apiKey: string;
  position?: 'bottom-right' | 'bottom-left';
  showBranding?: boolean;
  autoOpenDelayMs?: number;
  configEndpoint?: string;
  websocketUrl?: string;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  widgetTitle?: string | null;
  widgetSubtitle?: string | null;
  welcomeMessage?: string | null;
  title?: string | null;
}
```

### `AparsoftChatbotInstance`

```typescript
interface AparsoftChatbotInstance {
  isReady?: boolean;
  state?: string;
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
  sendMessage?: (message: string) => void;
  destroy?: () => void;
}
```
