# Configuration

All Aparsoft chatbot packages share the same configuration props. Props can be set via component attributes (framework packages) or `data-*` attributes (vanilla HTML).

## Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | *(required)* | Public widget API key from your [Aparsoft dashboard](https://chatbot.aparsoft.com) |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Where the chat launcher appears on the page |
| `showBranding` | `boolean` | `true` | Show "Powered by Aparsoft" in the widget footer |
| `autoOpenDelay` | `number` | `0` | Auto-open the chat widget after N milliseconds (0 = disabled) |
| `primaryColor` | `string` | Dashboard config | Override the primary theme color (hex, e.g. `#1d4ed8`) |
| `secondaryColor` | `string` | Dashboard config | Override the secondary theme color (hex, e.g. `#0f766e`) |
| `widgetTitle` | `string` | Dashboard config | Override the chat header title text |
| `widgetSubtitle` | `string` | Dashboard config | Override the chat header subtitle text |
| `welcomeMessage` | `string` | Dashboard config | Override the first message shown to visitors |
| `title` | `string` | `'Aparsoft chat widget'` | Accessible title for the widget iframe |
| `onReady` | `(widget) => void` | -- | Callback fired when the widget is mounted and ready |

## Per-Framework Usage

### React / Next.js

```jsx
<AparsoftChatbot
  apiKey="cb_your_api_key"
  position="bottom-left"
  showBranding={false}
  autoOpenDelay={3000}
  primaryColor="#1d4ed8"
  secondaryColor="#0f766e"
  widgetTitle="Support"
  welcomeMessage="Hi! How can I help?"
  onReady={(widget) => console.log('Widget ready', widget)}
/>
```

### Vue

Use kebab-case for prop names in templates:

```vue
<AparsoftChatbot
  api-key="cb_your_api_key"
  position="bottom-left"
  :show-branding="false"
  :auto-open-delay="3000"
  primary-color="#1d4ed8"
  widget-title="Support"
  @ready="onWidgetReady"
/>
```

### Angular

```html
<aparsoft-chatbot
  apiKey="cb_your_api_key"
  position="bottom-left"
  [showBranding]="false"
  [autoOpenDelay]="3000"
  primaryColor="#1d4ed8"
  widgetTitle="Support"
  (ready)="onWidgetReady($event)"
></aparsoft-chatbot>
```

### Vanilla HTML

Use `data-*` attributes on the script tag:

```html
<script
  src="https://www.aparsoft.com/static/chatbot-widget/widget.loader.js"
  data-aparsoft-chatbot="true"
  data-api-key="cb_your_api_key"
  data-position="bottom-left"
  data-show-branding="false"
  data-auto-open-delay-ms="3000"
  data-primary-color="#1d4ed8"
  data-secondary-color="#0f766e"
  data-widget-title="Support"
  data-welcome-message="Hi! How can I help?"
></script>
```

Note: In vanilla HTML, use kebab-case data attributes (e.g. `data-auto-open-delay-ms` instead of `data-autoOpenDelay`).

## Dashboard vs. Code Configuration

Most visual settings (colors, title, subtitle, welcome message, quick replies) can be configured in the [Aparsoft dashboard](https://chatbot.aparsoft.com). Dashboard settings apply to all installations using the same API key.

Props passed in code **override** dashboard settings. This lets you:
- Use different colors on different pages
- Change the welcome message per page context
- Disable branding on specific installations (paid plans)

## Priority Order

When the same setting is configured in multiple places:

1. **Component props** (highest priority)
2. **Dashboard configuration**
3. **Default values** (lowest priority)
