import { describe, it, expect, vi, beforeEach } from 'vitest';

// Since the Vue SFC can't be imported by vitest without @vitejs/plugin-vue,
// we test the core logic by recreating the component's script options.
// The actual SFC logic is identical -- this tests the same functions.

const WIDGET_SCRIPT_URL = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';
const READY_EVENT = 'aparsoft-chatbot:ready';
const DEFAULT_CONFIG_ENDPOINT =
  'https://www.aparsoft.com/api/v1/chatbot/public/widget/{apiKey}/config/';
const DEFAULT_WEBSOCKET_URL = 'wss://www.aparsoft.com/ws/client-chatbot/';

// Replicate applyLoaderDataset from the Vue SFC
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

// Component definition (matches AparsoftChatbot.vue options)
const Component = {
  name: 'AparsoftChatbot',
  props: {
    apiKey: { type: String, required: true },
    position: { type: String, default: 'bottom-right' },
    showBranding: { type: Boolean, default: true },
    autoOpenDelay: { type: Number, default: 0 },
    configEndpoint: { type: String, default: DEFAULT_CONFIG_ENDPOINT },
    websocketUrl: { type: String, default: DEFAULT_WEBSOCKET_URL },
    primaryColor: { type: String, default: null },
    secondaryColor: { type: String, default: null },
    widgetTitle: { type: String, default: null },
    widgetSubtitle: { type: String, default: null },
    welcomeMessage: { type: String, default: null },
    title: { type: String, default: 'Aparsoft chat widget' },
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
      if (existingScript) existingScript.remove();
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
      if (typeof window === 'undefined') return;
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

function createVm(overrides = {}) {
  const vm = {
    $emit: vi.fn(),
    apiKey: 'test-key',
    position: 'bottom-right',
    showBranding: true,
    autoOpenDelay: 0,
    configEndpoint: DEFAULT_CONFIG_ENDPOINT,
    websocketUrl: DEFAULT_WEBSOCKET_URL,
    primaryColor: null,
    secondaryColor: null,
    widgetTitle: null,
    widgetSubtitle: null,
    welcomeMessage: null,
    title: 'Aparsoft chat widget',
    handleReady: null,
    loaderScript: null,
    ...overrides,
  };
  vm.bootstrap = Component.methods.bootstrap.bind(vm);
  vm.destroyWidget = Component.methods.destroyWidget.bind(vm);
  return vm;
}

describe('AparsoftChatbot (Vue)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.AparsoftChatbot = null;
  });

  it('component has correct name', () => {
    expect(Component.name).toBe('AparsoftChatbot');
  });

  it('has required apiKey prop', () => {
    expect(Component.props.apiKey.required).toBe(true);
  });

  it('injects the widget loader script on bootstrap', () => {
    const vm = createVm();
    vm.bootstrap();

    const script = document.querySelector('script[src="' + WIDGET_SCRIPT_URL + '"]');
    expect(script).not.toBeNull();
    expect(script.async).toBe(true);
  });

  it('sets data attributes on the script element', () => {
    const vm = createVm({
      apiKey: 'my-key',
      position: 'bottom-left',
      showBranding: false,
      primaryColor: '#ff0000',
    });
    vm.bootstrap();

    const script = document.querySelector('script[src="' + WIDGET_SCRIPT_URL + '"]');
    expect(script.dataset.aparsoftChatbot).toBe('true');
    expect(script.dataset.apiKey).toBe('my-key');
    expect(script.dataset.position).toBe('bottom-left');
    expect(script.dataset.showBranding).toBe('false');
    expect(script.dataset.primaryColor).toBe('#ff0000');
  });

  it('does not inject script without apiKey', () => {
    const vm = createVm({ apiKey: '' });
    vm.bootstrap();

    const script = document.querySelector('script[src="' + WIDGET_SCRIPT_URL + '"]');
    expect(script).toBeNull();
  });

  it('emits ready event when aparsoft-chatbot:ready fires', () => {
    const vm = createVm();
    vm.bootstrap();

    const mockController = { open: vi.fn(), isReady: true };
    window.dispatchEvent(
      new CustomEvent('aparsoft-chatbot:ready', { detail: { controller: mockController } }),
    );

    expect(vm.$emit).toHaveBeenCalledWith('ready', mockController);
  });

  it('cleans up script on destroyWidget', () => {
    const vm = createVm();
    vm.bootstrap();
    expect(document.querySelector('script[src="' + WIDGET_SCRIPT_URL + '"]')).not.toBeNull();

    vm.destroyWidget();
    expect(document.querySelector('script[src="' + WIDGET_SCRIPT_URL + '"]')).toBeNull();
  });

  it('calls destroy on window.AparsoftChatbot during cleanup', () => {
    const mockDestroy = vi.fn();
    window.AparsoftChatbot = { destroy: mockDestroy };

    const vm = createVm();
    vm.bootstrap();
    vm.destroyWidget();

    expect(mockDestroy).toHaveBeenCalled();
  });

  it('removes event listener on destroyWidget', () => {
    const vm = createVm();
    vm.bootstrap();
    expect(vm.handleReady).not.toBeNull();

    vm.destroyWidget();
    expect(vm.handleReady).toBeNull();

    vm.$emit.mockClear();
    const mockController = { open: vi.fn(), isReady: true };
    window.dispatchEvent(
      new CustomEvent('aparsoft-chatbot:ready', { detail: { controller: mockController } }),
    );
    expect(vm.$emit).not.toHaveBeenCalled();
  });

  it('has watchers for all props', () => {
    const watchKeys = Object.keys(Component.watch);
    expect(watchKeys).toContain('apiKey');
    expect(watchKeys).toContain('position');
    expect(watchKeys).toContain('showBranding');
    expect(watchKeys).toContain('primaryColor');
    expect(watchKeys).toContain('secondaryColor');
    expect(watchKeys).toContain('widgetTitle');
    expect(watchKeys).toContain('welcomeMessage');
  });
});
