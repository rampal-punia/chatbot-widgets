import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Import the TSX version
import AparsoftChatbotTSX, { useAparsoftChatbot } from './index';

const WIDGET_SCRIPT_URL = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';

describe('AparsoftChatbot (React TSX)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.AparsoftChatbot = null;
  });

  it('exports AparsoftChatbot as default', () => {
    expect(AparsoftChatbotTSX).toBeTypeOf('function');
  });

  it('exports useAparsoftChatbot hook', () => {
    expect(useAparsoftChatbot).toBeTypeOf('function');
  });

  it('injects the widget loader script into the DOM', () => {
    render(React.createElement(AparsoftChatbotTSX, { apiKey: 'test-key' }));

    const script = document.querySelector(
      `script[src="${WIDGET_SCRIPT_URL}"]`,
    ) as HTMLScriptElement | null;
    expect(script).not.toBeNull();
    expect(script?.async).toBe(true);
  });

  it('sets data attributes on the script element', () => {
    render(
      React.createElement(AparsoftChatbotTSX, {
        apiKey: 'test-key',
        position: 'bottom-left',
        showBranding: false,
        primaryColor: '#ff0000',
      }),
    );

    const script = document.querySelector(
      `script[src="${WIDGET_SCRIPT_URL}"]`,
    ) as HTMLScriptElement;
    expect(script?.dataset.aparsoftChatbot).toBe('true');
    expect(script?.dataset.apiKey).toBe('test-key');
    expect(script?.dataset.position).toBe('bottom-left');
    expect(script?.dataset.showBranding).toBe('false');
    expect(script?.dataset.primaryColor).toBe('#ff0000');
  });

  it('returns null (renders nothing)', () => {
    const { container } = render(React.createElement(AparsoftChatbotTSX, { apiKey: 'test-key' }));
    expect(container.firstChild).toBeNull();
  });

  it('does not inject script without apiKey', () => {
    render(React.createElement(AparsoftChatbotTSX, { apiKey: '' }));

    const script = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
    expect(script).toBeNull();
  });

  it('removes existing script before injecting a new one', () => {
    const { rerender } = render(React.createElement(AparsoftChatbotTSX, { apiKey: 'key-1' }));

    expect(document.querySelectorAll(`script[src="${WIDGET_SCRIPT_URL}"]`).length).toBe(1);

    rerender(React.createElement(AparsoftChatbotTSX, { apiKey: 'key-2' }));

    expect(document.querySelectorAll(`script[src="${WIDGET_SCRIPT_URL}"]`).length).toBe(1);
    const script = document.querySelector(
      `script[src="${WIDGET_SCRIPT_URL}"]`,
    ) as HTMLScriptElement;
    expect(script?.dataset.apiKey).toBe('key-2');
  });

  it('calls onReady when aparsoft-chatbot:ready event fires', () => {
    const onReady = vi.fn();
    render(React.createElement(AparsoftChatbotTSX, { apiKey: 'test-key', onReady }));

    const mockController = { open: vi.fn(), isReady: true };
    const event = new CustomEvent('aparsoft-chatbot:ready', {
      detail: { controller: mockController },
    });
    window.dispatchEvent(event);

    expect(onReady).toHaveBeenCalledWith(mockController);
  });

  it('cleans up script and listener on unmount', () => {
    const { unmount } = render(React.createElement(AparsoftChatbotTSX, { apiKey: 'test-key' }));

    expect(document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`)).not.toBeNull();

    unmount();

    expect(document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`)).toBeNull();
  });
});

describe('useAparsoftChatbot', () => {
  beforeEach(() => {
    window.AparsoftChatbot = null;
  });

  it('returns null getWidget when no widget is loaded', () => {
    const { result } = renderHook(() => useAparsoftChatbot());
    expect(result.current.getWidget()).toBeNull();
  });

  it('returns widget controller when available', () => {
    const mockController = { open: vi.fn(), isReady: true };
    window.AparsoftChatbot = mockController as any;

    const { result } = renderHook(() => useAparsoftChatbot());
    expect(result.current.getWidget()).toBe(mockController);
  });

  it('calls openChat when widget is available', () => {
    const mockController = { open: vi.fn() };
    window.AparsoftChatbot = mockController as any;

    const { result } = renderHook(() => useAparsoftChatbot());
    result.current.openChat();
    expect(mockController.open).toHaveBeenCalled();
  });

  it('calls sendMessage when widget is available', () => {
    const mockController = { sendMessage: vi.fn() };
    window.AparsoftChatbot = mockController as any;

    const { result } = renderHook(() => useAparsoftChatbot());
    result.current.sendMessage('Hello');
    expect(mockController.sendMessage).toHaveBeenCalledWith('Hello');
  });

  it('does not throw when widget is null', () => {
    const { result } = renderHook(() => useAparsoftChatbot());
    expect(() => result.current.openChat()).not.toThrow();
    expect(() => result.current.closeChat()).not.toThrow();
    expect(() => result.current.sendMessage('test')).not.toThrow();
  });
});

// Helper to test hooks
function renderHook<T>(hook: () => T) {
  const result: { current: T } = { current: undefined as unknown as T };

  function TestComponent() {
    result.current = hook();
    return null;
  }

  const utils = render(React.createElement(TestComponent));
  return { result, ...utils };
}
