# Getting Started

Get an AI chatbot running on your website in under 60 seconds.

## Prerequisites

- A website where you can add a `<script>` tag or install an NPM package
- An Aparsoft account with a configured chatbot ([sign up free](https://chatbot.aparsoft.com))

## Step 1: Get Your API Key

1. Sign up at [chatbot.aparsoft.com](https://chatbot.aparsoft.com)
2. Register your website URL in the dashboard
3. Wait 3-5 minutes while the platform scrapes and vectorizes your content
4. Copy your **API Key** from the Integrations tab

## Step 2: Install for Your Framework

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

For Pages Router, the `'use client'` directive is not needed -- just import and use the component in any page.

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

Add this snippet before the closing `</body>` tag:

```html
<script
  src="https://www.aparsoft.com/static/chatbot-widget/widget.loader.js"
  data-aparsoft-chatbot="true"
  data-api-key="YOUR_PUBLIC_API_KEY"
></script>
```

### WordPress

1. Download the [plugin .zip](https://chatbot.aparsoft.com/downloads/aparsoft-chatbot.zip)
2. Upload via **Plugins > Add New > Upload Plugin**
3. Go to **Settings > Aparsoft Chatbot** and paste your API Key

See the [WordPress Guide](./wordpress-guide.md) for detailed instructions.

## Step 3: Verify

Open your website in a browser. You should see the chatbot launcher in the bottom-right corner. Click it and ask a question about your website content.

## Try It Without an Account

Clone this repo and run the demo:

```bash
git clone https://github.com/aparsoft/chatbot-widgets.git
cd chatbot-widgets/examples/vanilla-html
# Open index.html in your browser
```

The demo uses a public API key so you can see the chatbot in action immediately.

## Next Steps

- [Configuration options](./configuration.md) -- customize position, colors, welcome message
- [Theming](./theming.md) -- match the widget to your brand
- [SSR Guide](./ssr-guide.md) -- Next.js, Nuxt, and Angular Universal caveats
- [API Reference](./api-reference.md) -- programmatic control via hooks and events
