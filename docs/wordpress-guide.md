# WordPress Guide

Install the Aparsoft AI Chatbot on your WordPress site in under 2 minutes.

## Installation

### Method 1: Plugin Upload (Recommended)

1. Download the plugin `.zip` from [chatbot.aparsoft.com/downloads](https://chatbot.aparsoft.com/downloads/aparsoft-chatbot.zip)
2. In your WordPress admin, go to **Plugins > Add New > Upload Plugin**
3. Choose the downloaded `.zip` file and click **Install Now**
4. Click **Activate**

### Method 2: Manual Upload

1. Download and extract the `.zip` file
2. Upload the `aparsoft-chatbot` folder to `/wp-content/plugins/` via FTP or file manager
3. In WordPress admin, go to **Plugins** and click **Activate** under "Aparsoft AI Chatbot"

## Configuration

1. Go to **Settings > Aparsoft Chatbot**
2. Paste your **Widget API Key** from the [Aparsoft dashboard](https://chatbot.aparsoft.com)
3. Configure optional settings:
   - **Widget Position** -- Bottom Right or Bottom Left
   - **Show Branding** -- Toggle "Powered by Aparsoft" footer
   - **Primary Color** -- Main theme color (e.g. `#1d4ed8`)
   - **Secondary Color** -- Accent color (e.g. `#0f766e`)
   - **Enable Chatbot** -- Disable without losing settings
4. Click **Save & Connect Chatbot**

## Getting Your API Key

If you don't have an API key yet:

1. Sign up at [chatbot.aparsoft.com](https://chatbot.aparsoft.com) (free)
2. Register your website URL
3. Wait 3-5 minutes while your site is scraped and vectorized
4. Copy the **API Key** from the Integrations tab in the dashboard

## WooCommerce Integration

When WooCommerce is active, the plugin automatically passes context to the chatbot:

- **Cart count** -- "I see you have 2 items in your cart"
- **User name** -- "Hi John! How can I help you?"
- **Product pages** -- Detects when a visitor is viewing a product

No additional configuration is needed -- WooCommerce context is passed automatically.

## Performance

The chatbot widget does **not** slow down your site:

- The script loads **asynchronously** in the footer (no render blocking)
- The widget runs inside a **sandboxed iframe** on Aparsoft's infrastructure
- No PHP processing is required to render the chatbot -- only a `<script>` tag is injected
- Total footprint: **< 15 KB** for the loader script

## Troubleshooting

### Widget doesn't appear

- Verify your API Key is correct in **Settings > Aparsoft Chatbot**
- Ensure **Enable Chatbot** is checked
- Check the browser console for JavaScript errors
- Verify your site can reach `www.aparsoft.com` (check firewall/security plugins)

### Widget appears but doesn't respond

- Your chatbot may still be indexing. Check the Aparsoft dashboard for status
- Verify your free quota hasn't been exhausted (50 messages/month on the free tier)

### Conflicts with caching plugins

The widget uses `Cache-Control: no-cache` for the loader script, so most caching plugins will not cache it. If you use a aggressive page caching plugin, exclude the widget script URL from caching:

```
/www\.aparsoft\.com\/static\/chatbot-widget\/
```

### Conflicts with security plugins

If you use Wordfence, Sucuri, or similar security plugins, whitelist:

- Script domain: `www.aparsoft.com`
- Frame domain: `www.aparsoft.com`
- WebSocket domain: `www.aparsoft.com` (port 443)

## Uninstalling

1. Go to **Plugins** and deactivate "Aparsoft AI Chatbot"
2. Click **Delete** -- this removes all plugin files and settings cleanly

The plugin removes all WordPress options on uninstall. No data is left behind.

## Alternative: Manual Script Tag

If you prefer not to use the plugin, you can add the widget directly to your theme's `footer.php`:

```html
<script
  src="https://www.aparsoft.com/static/chatbot-widget/widget.loader.js"
  data-aparsoft-chatbot="true"
  data-api-key="YOUR_API_KEY"
></script>
```

Add this just before `</body>` in your theme's footer template.
