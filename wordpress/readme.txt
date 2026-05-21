=== Aparsoft AI Chatbot ===
Contributors: aparsoft
Tags: chatbot, ai, chat, live-chat, customer-support, woocommerce-chatbot, rag
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add an AI-powered chatbot to your WordPress site. Trained on YOUR content.
Answers visitor questions 24/7. 50 free messages per month.

== Description ==

Aparsoft AI Chatbot adds a smart, embeddable chatbot widget to your WordPress
website. The chatbot is powered by your own website content -- it scrapes your
pages, builds a vector knowledge base, and answers visitor questions accurately
using GPT.

**Key Features:**

* **Zero-config AI** -- Enter your URL, the platform scrapes and trains in 3-5 minutes
* **RAG-powered answers** -- Responses are grounded in YOUR website content
* **Real-time streaming** -- Token-by-token responses via WebSocket
* **Fully customizable** -- Colors, position, welcome message via settings
* **Analytics dashboard** -- Track conversations, top questions, satisfaction
* **WooCommerce-aware** -- Passes cart and user context for personalized responses
* **SSR-safe** -- Script loaded in footer, no render-blocking
* **Lightweight** -- < 15 KB widget, runs in a sandboxed iframe

**How it works:**

1. Sign up at [chatbot.aparsoft.com](https://chatbot.aparsoft.com) (free)
2. Register your website URL
3. The platform scrapes, vectorizes, and deploys your chatbot
4. Copy the API Key from your dashboard
5. Paste it in Settings -> Aparsoft Chatbot
6. The chatbot appears on your site immediately

**Free tier includes:**

* 50 AI messages per month
* 1 website
* 1 MB knowledge base
* Full analytics dashboard

Upgrade plans start at INR 999/month (Standard: 1,000 messages, WhatsApp integration).

== Installation ==

1. Upload the `aparsoft-chatbot` folder to `/wp-content/plugins/`
2. Activate through the Plugins menu
3. Go to Settings -> Aparsoft Chatbot
4. Paste your API Key from [chatbot.aparsoft.com](https://chatbot.aparsoft.com)
5. Click "Save & Connect Chatbot"

Alternatively, install via Plugins -> Add New -> Upload Plugin -> choose the .zip.

== Frequently Asked Questions ==

= Does it work with WooCommerce? =

Yes. The plugin detects WooCommerce and can pass cart context to the chatbot.

= Does it slow down my site? =

No. The widget script loads asynchronously in the footer and runs inside a
sandboxed iframe. It does not block page rendering.

= Is the chatbot available 24/7? =

Yes. The chatbot runs on Aparsoft's cloud infrastructure and responds to
visitors automatically, even when you're offline.

= Can I customize the chatbot's appearance? =

Yes. Colors, position, welcome message, and quick replies are configurable
from your Aparsoft dashboard. The WordPress settings page also allows
color overrides.

= What happens when I run out of free messages? =

The chatbot gracefully informs visitors it has reached its monthly limit.
You receive an email notification with an upgrade link. Upgrade plans
start at INR 999/month for 1,000 messages.

== Screenshots ==

1. Chatbot widget on a WordPress site (bottom-right launcher)
2. Admin settings page (API key, colors, position)
3. Chatbot conversation in action
4. Analytics dashboard in Aparsoft

== Changelog ==

= 1.0.0 =
* Initial release
* Widget API key configuration
* Position selection (bottom-right / bottom-left)
* Color customization (primary + secondary)
* Branding toggle
* WooCommerce context detection
* Enable/disable toggle
* Clean uninstall (removes all options)

== Upgrade Notice ==

= 1.0.0 =
Initial release. Welcome to Aparsoft AI Chatbot!
