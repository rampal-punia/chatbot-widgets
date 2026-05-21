<template>
  <span aria-hidden="true" style="display: none"></span>
</template>

<script>
const WIDGET_SCRIPT_URL = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';
const READY_EVENT = 'aparsoft-chatbot:ready';
const DEFAULT_CONFIG_ENDPOINT =
  'https://www.aparsoft.com/api/v1/chatbot/public/widget/{apiKey}/config/';
const DEFAULT_WEBSOCKET_URL = 'wss://www.aparsoft.com/ws/client-chatbot/';

function applyLoaderDataset(script, config) {
  script.dataset.aparsoftChatbot = 'true';
  script.dataset.apiKey = config.apiKey;

  if (config.position) script.dataset.position = config.position;
  if (typeof config.showBranding === 'boolean')
    script.dataset.showBranding = String(config.showBranding);
  if (config.autoOpenDelayMs > 0) script.dataset.autoOpenDelayMs = String(config.autoOpenDelayMs);
  if (config.configEndpoint) script.dataset.configEndpoint = config.configEndpoint;
  if (config.websocketUrl) script.dataset.websocketUrl = config.websocketUrl;
  if (config.primaryColor) script.dataset.primaryColor = config.primaryColor;
  if (config.secondaryColor) script.dataset.secondaryColor = config.secondaryColor;
  if (config.widgetTitle) script.dataset.widgetTitle = config.widgetTitle;
  if (config.widgetSubtitle) script.dataset.widgetSubtitle = config.widgetSubtitle;
  if (config.welcomeMessage) script.dataset.welcomeMessage = config.welcomeMessage;
  if (config.title) script.dataset.title = config.title;
}

export default {
  name: 'AparsoftChatbot',

  props: {
    apiKey: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: 'bottom-right',
    },
    showBranding: {
      type: Boolean,
      default: true,
    },
    autoOpenDelay: {
      type: Number,
      default: 0,
    },
    configEndpoint: {
      type: String,
      default: DEFAULT_CONFIG_ENDPOINT,
    },
    websocketUrl: {
      type: String,
      default: DEFAULT_WEBSOCKET_URL,
    },
    primaryColor: {
      type: String,
      default: null,
    },
    secondaryColor: {
      type: String,
      default: null,
    },
    widgetTitle: {
      type: String,
      default: null,
    },
    widgetSubtitle: {
      type: String,
      default: null,
    },
    welcomeMessage: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: 'Aparsoft chat widget',
    },
  },

  data() {
    return {
      handleReady: null,
      loaderScript: null,
    };
  },

  mounted() {
    this.bootstrap();
  },

  beforeUnmount() {
    this.destroyWidget();
  },

  beforeDestroy() {
    this.destroyWidget();
  },

  watch: {
    apiKey: 'bootstrap',
    position: 'bootstrap',
    showBranding: 'bootstrap',
    autoOpenDelay: 'bootstrap',
    configEndpoint: 'bootstrap',
    websocketUrl: 'bootstrap',
    primaryColor: 'bootstrap',
    secondaryColor: 'bootstrap',
    widgetTitle: 'bootstrap',
    widgetSubtitle: 'bootstrap',
    welcomeMessage: 'bootstrap',
    title: 'bootstrap',
  },

  methods: {
    bootstrap() {
      if (typeof window === 'undefined' || typeof document === 'undefined' || !this.apiKey) {
        return;
      }

      this.destroyWidget();

      const config = {
        apiKey: this.apiKey,
        position: this.position,
        showBranding: this.showBranding,
        autoOpenDelayMs: this.autoOpenDelay,
        configEndpoint: this.configEndpoint,
        websocketUrl: this.websocketUrl,
        primaryColor: this.primaryColor,
        secondaryColor: this.secondaryColor,
        widgetTitle: this.widgetTitle,
        widgetSubtitle: this.widgetSubtitle,
        welcomeMessage: this.welcomeMessage,
        title: this.title,
      };

      this.handleReady = (event) => {
        const controller =
          (event && event.detail ? event.detail.controller : null) ||
          window.AparsoftChatbot ||
          null;
        if (controller) {
          this.$emit('ready', controller);
        }
      };

      window.addEventListener(READY_EVENT, this.handleReady);

      const existingScript = document.querySelector(
        'script[src="' + WIDGET_SCRIPT_URL + '"][data-aparsoft-chatbot]',
      );
      if (existingScript) {
        existingScript.remove();
      }

      if (window.AparsoftChatbot && typeof window.AparsoftChatbot.destroy === 'function') {
        window.AparsoftChatbot.destroy();
      }
      window.AparsoftChatbot = null;

      this.loaderScript = document.createElement('script');
      this.loaderScript.src = WIDGET_SCRIPT_URL;
      this.loaderScript.async = true;
      applyLoaderDataset(this.loaderScript, config);
      document.body.appendChild(this.loaderScript);

      if (window.AparsoftChatbot && window.AparsoftChatbot.isReady) {
        this.handleReady({ detail: { controller: window.AparsoftChatbot } });
      }
    },

    destroyWidget() {
      if (typeof window === 'undefined') {
        return;
      }

      if (this.handleReady) {
        window.removeEventListener(READY_EVENT, this.handleReady);
        this.handleReady = null;
      }

      if (this.loaderScript) {
        this.loaderScript.remove();
        this.loaderScript = null;
      }

      if (window.AparsoftChatbot && typeof window.AparsoftChatbot.destroy === 'function') {
        window.AparsoftChatbot.destroy();
        window.AparsoftChatbot = null;
      }
    },
  },
};
</script>
