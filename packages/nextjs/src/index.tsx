'use client';

import { useEffect } from 'react';

type WidgetPosition = 'bottom-right' | 'bottom-left';

export interface AparsoftChatbotConfig {
  apiKey: string;
  position?: WidgetPosition;
  showBranding?: boolean;
  autoOpenDelayMs?: number;
  configEndpoint?: string;
  websocketUrl?: string;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  widgetTitle?: string | null;
  widgetSubtitle?: string | null;
  welcomeMessage?: string | null;
  title?: string | null;
}

export interface AparsoftChatbotInstance {
  isReady?: boolean;
  state?: string;
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
  sendMessage?: (message: string) => void;
  destroy?: () => void;
}

const WIDGET_SCRIPT_URL = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';
const READY_EVENT = 'aparsoft-chatbot:ready';
const DEFAULT_CONFIG_ENDPOINT =
  'https://www.aparsoft.com/api/v1/chatbot/public/widget/{apiKey}/config/';
const DEFAULT_WEBSOCKET_URL = 'wss://www.aparsoft.com/ws/client-chatbot/';

function applyLoaderDataset(script: HTMLScriptElement, config: AparsoftChatbotConfig): void {
  script.dataset.aparsoftChatbot = 'true';
  script.dataset.apiKey = config.apiKey;

  if (config.position) script.dataset.position = config.position;
  if (typeof config.showBranding === 'boolean')
    script.dataset.showBranding = String(config.showBranding);
  if (config.autoOpenDelayMs && config.autoOpenDelayMs > 0)
    script.dataset.autoOpenDelayMs = String(config.autoOpenDelayMs);
  if (config.configEndpoint) script.dataset.configEndpoint = config.configEndpoint;
  if (config.websocketUrl) script.dataset.websocketUrl = config.websocketUrl;
  if (config.primaryColor) script.dataset.primaryColor = config.primaryColor;
  if (config.secondaryColor) script.dataset.secondaryColor = config.secondaryColor;
  if (config.widgetTitle) script.dataset.widgetTitle = config.widgetTitle;
  if (config.widgetSubtitle) script.dataset.widgetSubtitle = config.widgetSubtitle;
  if (config.welcomeMessage) script.dataset.welcomeMessage = config.welcomeMessage;
  if (config.title) script.dataset.title = config.title;
}

interface AparsoftChatbotProps {
  apiKey: string;
  position?: WidgetPosition;
  showBranding?: boolean;
  autoOpenDelay?: number;
  configEndpoint?: string;
  websocketUrl?: string;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  widgetTitle?: string | null;
  widgetSubtitle?: string | null;
  welcomeMessage?: string | null;
  title?: string | null;
  onReady?: (widget: AparsoftChatbotInstance) => void;
}

export default function AparsoftChatbot({
  apiKey,
  position = 'bottom-right',
  showBranding = true,
  autoOpenDelay = 0,
  configEndpoint = DEFAULT_CONFIG_ENDPOINT,
  websocketUrl = DEFAULT_WEBSOCKET_URL,
  primaryColor = null,
  secondaryColor = null,
  widgetTitle = null,
  widgetSubtitle = null,
  welcomeMessage = null,
  title = 'Aparsoft chat widget',
  onReady,
}: AparsoftChatbotProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || !apiKey) {
      return undefined;
    }

    const config: AparsoftChatbotConfig = {
      apiKey,
      position,
      showBranding,
      autoOpenDelayMs: autoOpenDelay,
      configEndpoint,
      websocketUrl,
      primaryColor,
      secondaryColor,
      widgetTitle,
      widgetSubtitle,
      welcomeMessage,
      title,
    };

    const handleReady = (event: Event) => {
      const controller =
        (event as CustomEvent).detail?.controller || window.AparsoftChatbot || null;
      if (controller && onReady) {
        onReady(controller);
      }
    };

    window.addEventListener(READY_EVENT, handleReady as EventListener);

    const existingScript = document.querySelector(
      'script[src="' + WIDGET_SCRIPT_URL + '"][data-aparsoft-chatbot]',
    ) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.remove();
    }

    window.AparsoftChatbot?.destroy?.();
    window.AparsoftChatbot = null;

    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    applyLoaderDataset(script, config);
    document.body.appendChild(script);

    return () => {
      window.removeEventListener(READY_EVENT, handleReady as EventListener);
      script.remove();
      window.AparsoftChatbot?.destroy?.();
      window.AparsoftChatbot = null;
    };
  }, [
    apiKey,
    position,
    showBranding,
    autoOpenDelay,
    configEndpoint,
    websocketUrl,
    primaryColor,
    secondaryColor,
    widgetTitle,
    widgetSubtitle,
    welcomeMessage,
    title,
    onReady,
  ]);

  return null;
}

export function useAparsoftChatbot() {
  const getWidget = (): AparsoftChatbotInstance | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.AparsoftChatbot || null;
  };

  return {
    getWidget,
    openChat: () => getWidget()?.open?.(),
    closeChat: () => getWidget()?.close?.(),
    toggleChat: () => getWidget()?.toggle?.(),
    sendMessage: (message: string) => getWidget()?.sendMessage?.(message),
  };
}
