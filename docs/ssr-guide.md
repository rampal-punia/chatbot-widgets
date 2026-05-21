# SSR Guide: Server-Side Rendering

The Aparsoft chatbot widget is designed to work with SSR frameworks including Next.js App Router, Nuxt, and Angular Universal.

## How SSR Safety Works

All Aparsoft framework packages guard against server-side rendering by checking `typeof window` before any DOM operations. The widget script injection only happens in the browser:

```javascript
if (typeof window === 'undefined' || typeof document === 'undefined') {
  return; // Skip on server
}
```

Additionally:
- **Next.js** uses the `'use client'` directive so the component is only rendered on the client
- **Angular** uses `isPlatformBrowser(this.platformId)` for Angular Universal compatibility
- **Vue** uses the `mounted()` lifecycle hook which only fires in the browser
- **React** uses `useEffect()` which only runs client-side

## Next.js App Router

The `@aparsoft/chatbot-nextjs` package includes the `'use client'` directive. Use it directly in your page or layout:

```tsx
// app/layout.tsx or app/page.tsx
import AparsoftChatbot from '@aparsoft/chatbot-nextjs';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <AparsoftChatbot apiKey="cb_your_api_key" />
      </body>
    </html>
  );
}
```

No dynamic import or `next/dynamic` is needed -- the `'use client'` boundary handles it.

### Using with `next/dynamic` (optional)

If you want to defer loading the widget until after the page hydrates:

```tsx
import dynamic from 'next/dynamic';

const AparsoftChatbot = dynamic(
  () => import('@aparsoft/chatbot-nextjs'),
  { ssr: false }
);

export default function Page() {
  return <AparsoftChatbot apiKey="cb_your_api_key" />;
}
```

## Next.js Pages Router

The package works without any special handling in Pages Router:

```tsx
import AparsoftChatbot from '@aparsoft/chatbot-nextjs';

export default function Page() {
  return <AparsoftChatbot apiKey="cb_your_api_key" />;
}
```

## Nuxt (Vue)

```vue
<template>
  <ClientOnly>
    <AparsoftChatbot api-key="cb_your_api_key" />
  </ClientOnly>
</template>
```

Wrap the component in `<ClientOnly>` to prevent SSR rendering. The Vue component is also safe without the wrapper since it only bootstraps in `mounted()`.

## Angular Universal

The Angular component uses `isPlatformBrowser` internally:

```typescript
import { AparsoftChatbotComponent } from '@aparsoft/chatbot-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AparsoftChatbotComponent],
  template: `<aparsoft-chatbot apiKey="cb_your_api_key"></aparsoft-chatbot>`,
})
export class AppComponent {}
```

No additional SSR guards are needed -- the component skips DOM operations when running on the server.

## Common Issues

### Hydration Mismatch

If you see a hydration mismatch warning, ensure you're not conditionally rendering the component based on browser-only state (like `window.innerWidth`). The component returns `null` on the server, so it should not cause mismatches on its own.

### Widget Not Appearing

If the widget doesn't appear after SSR hydration:
1. Check the browser console for errors
2. Verify your `apiKey` is correct
3. Ensure the component is rendered inside the `<body>` (not `<head>`)
4. Check that your Content Security Policy allows scripts from `www.aparsoft.com`

### CSP Headers

If your site uses Content Security Policy headers, add these directives:

```
script-src: https://www.aparsoft.com
frame-src: https://www.aparsoft.com
connect-src: wss://www.aparsoft.com https://www.aparsoft.com
```
