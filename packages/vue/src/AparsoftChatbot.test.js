import { describe, it, expect, vi, beforeEach } from 'vitest';

// Import the component options object directly from the SFC script export
// We test the logic by simulating the Vue lifecycle manually
import Component from './AparsoftChatbot.vue?script';

const WIDGET_SCRIPT_URL = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';

function createVm(overrides = {}) {
  const vm = {
    $emit: vi.fn(),
    apiKey: 'test-key',
    position: 'bottom-right',
    showBranding: true,
    autoOpenDelay: 0,
    configEndpoint: 'https://www.aparsoft.com/api/v1/chatbot/public/widget/{apiKey}/config/',
    websocketUrl: 'wss://www.aparsoft.com/ws/client-chatbot/',
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

  // Bind methods from the component options
  vm.bootstrap = Component.methods.bootstrap.bind(vm);
  vm.destroyWidget = Component.methods.destroyWidget.bind(vm);

  return vm;
}

describe('AparsoftChatbot (Vue)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.AparsoftChatbot = null;
  });

  it('exports a component with name AparsoftChatbot', () => {
    expect(Component.name).toBe('AparsoftChatbot');
  });

  it('has required apiKey prop', () => {
    expect(Component.props.apiKey.required).toBe(true);
  });

  it('injects the widget loader script on bootstrap', () => {
    const vm = createVm();
    vm.bootstrap();

    const script = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
    expect(script).not.toBeNull();
    expect(script?.async).toBe(true);
  });

  it('sets data attributes on the script element', () => {
    const vm = createVm({
      apiKey: 'my-key',
      position: 'bottom-left',
      showBranding: false,
      primaryColor: '#ff0000',
    });
    vm.bootstrap();

    const script = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
    expect(script.dataset.aparsoftChatbot).toBe('true');
    expect(script.dataset.apiKey).toBe('my-key');
    expect(script.dataset.position).toBe('bottom-left');
    expect(script.dataset.showBranding).toBe('false');
    expect(script.dataset.primaryColor).toBe('#ff0000');
  });

  it('does not inject script without apiKey', () => {
    const vm = createVm({ apiKey: '' });
    vm.bootstrap();

    const script = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
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
    expect(document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`)).not.toBeNull();

    vm.destroyWidget();
    expect(document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`)).toBeNull();
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

    // Emitting after destroy should NOT trigger $emit
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
