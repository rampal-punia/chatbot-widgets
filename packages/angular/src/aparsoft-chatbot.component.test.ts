import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Angular decorators and platform check
vi.mock('@angular/core', () => ({
  Component: (_opts: any) => (_cls: any) => {},
  EventEmitter: class {
    handlers: Array<(val: any) => void> = [];
    emit(val: any) { this.handlers.forEach((h) => h(val)); }
    subscribe(handler: (val: any) => void) { this.handlers.push(handler); }
  },
  Inject: (_token: any) => (_target: any, _key: string, _index: number) => {},
  Input: () => (_target: any, _key: string) => {},
  Output: () => (_target: any, _key: string) => {},
  PLATFORM_ID: 'platformId',
}));

vi.mock('@angular/common', () => ({
  isPlatformBrowser: () => true,
}));

import { AparsoftChatbotComponent } from './aparsoft-chatbot.component';

const WIDGET_SCRIPT_URL = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';

describe('AparsoftChatbotComponent (Angular)', () => {
  let component: AparsoftChatbotComponent;

  beforeEach(() => {
    document.body.innerHTML = '';
    window.AparsoftChatbot = null;
    component = new AparsoftChatbotComponent('browser');
    component.apiKey = 'test-key';
  });

  it('exports AparsoftChatbotComponent', () => {
    expect(AparsoftChatbotComponent).toBeTypeOf('function');
  });

  it('injects the widget loader script on ngOnInit', () => {
    component.ngOnInit();

    const script = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
    expect(script).not.toBeNull();
    expect(script?.async).toBe(true);
  });

  it('sets data attributes on the script element', () => {
    component.apiKey = 'my-api-key';
    component.position = 'bottom-left';
    component.showBranding = false;
    component.primaryColor = '#1d4ed8';

    component.ngOnInit();

    const script = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`) as HTMLScriptElement;
    expect(script?.dataset.aparsoftChatbot).toBe('true');
    expect(script?.dataset.apiKey).toBe('my-api-key');
    expect(script?.dataset.position).toBe('bottom-left');
    expect(script?.dataset.showBranding).toBe('false');
    expect(script?.dataset.primaryColor).toBe('#1d4ed8');
  });

  it('does not inject script without apiKey', () => {
    component.apiKey = '';
    component.ngOnInit();

    const script = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
    expect(script).toBeNull();
  });

  it('emits ready event when widget fires aparsoft-chatbot:ready', () => {
    const readyHandler = vi.fn();
    component.ready.subscribe(readyHandler);
    component.ngOnInit();

    const mockController = { open: vi.fn(), isReady: true };
    window.dispatchEvent(
      new CustomEvent('aparsoft-chatbot:ready', { detail: { controller: mockController } }),
    );

    expect(readyHandler).toHaveBeenCalledWith(mockController);
  });

  it('cleans up script on ngOnDestroy', () => {
    component.ngOnInit();
    expect(document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`)).not.toBeNull();

    component.ngOnDestroy();
    expect(document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`)).toBeNull();
  });

  it('calls destroy on window.AparsoftChatbot during cleanup', () => {
    const mockDestroy = vi.fn();
    window.AparsoftChatbot = { destroy: mockDestroy } as any;

    component.ngOnInit();
    component.ngOnDestroy();

    expect(mockDestroy).toHaveBeenCalled();
  });

  it('removes only one script even if ngOnInit called twice', () => {
    component.ngOnInit();
    component.ngOnInit();

    expect(document.querySelectorAll(`script[src="${WIDGET_SCRIPT_URL}"]`).length).toBe(1);
  });
});
