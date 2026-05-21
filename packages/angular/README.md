# @aparsoft/chatbot-angular

Angular standalone component for the [Aparsoft AI Chatbot Widget](https://chatbot.aparsoft.com). SSR-safe via `isPlatformBrowser`.

## Install

```bash
npm install @aparsoft/chatbot-angular
```

## Usage

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

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | `''` | Public widget API key from dashboard |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Launcher placement |
| `showBranding` | `boolean` | `true` | Show "Powered by Aparsoft" footer |
| `autoOpenDelay` | `number` | `0` | Auto-open after N ms |
| `primaryColor` | `string \| null` | Dashboard config | Override primary theme color |
| `secondaryColor` | `string \| null` | Dashboard config | Override secondary theme color |
| `widgetTitle` | `string \| null` | Dashboard config | Override header title |
| `widgetSubtitle` | `string \| null` | Dashboard config | Override header subtitle |
| `welcomeMessage` | `string \| null` | Dashboard config | Override welcome message |

## Outputs

| Output | Payload | Description |
|---|---|---|
| `ready` | `AparsoftChatbotInstance` | Emitted when widget is mounted |
| `error` | `Error` | Emitted on load failure |

```html
<aparsoft-chatbot
  apiKey="YOUR_KEY"
  (ready)="onWidgetReady($event)"
></aparsoft-chatbot>
```

## Exports

- `AparsoftChatbotComponent` -- The standalone Angular component
- `AparsoftChatbotConfig` -- TypeScript config interface
- `AparsoftChatbotInstance` -- TypeScript widget instance interface

## Get Your API Key

1. Sign up at [chatbot.aparsoft.com](https://chatbot.aparsoft.com)
2. Register your website URL
3. Copy the API key from the dashboard

Free tier: 50 messages/month. No credit card required.

## License

MIT
