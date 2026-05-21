import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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

declare global {
  interface Window {
    AparsoftChatbot?: AparsoftChatbotInstance | null;
  }
}

const WIDGET_SCRIPT_URL = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';
const READY_EVENT = 'aparsoft-chatbot:ready';
const DEFAULT_CONFIG_ENDPOINT = 'https://www.aparsoft.com/api/v1/chatbot/public/widget/{apiKey}/config/';
const DEFAULT_WEBSOCKET_URL = 'wss://www.aparsoft.com/ws/client-chatbot/';

@Component({
  selector: 'aparsoft-chatbot',
  template: '',
  standalone: true,
})
export class AparsoftChatbotComponent implements OnInit, OnDestroy {
  @Input() apiKey = '';
  @Input() position: WidgetPosition = 'bottom-right';
  @Input() showBranding = true;
  @Input() autoOpenDelay = 0;
  @Input() configEndpoint = DEFAULT_CONFIG_ENDPOINT;
  @Input() websocketUrl = DEFAULT_WEBSOCKET_URL;
  @Input() primaryColor: string | null = null;
  @Input() secondaryColor: string | null = null;
  @Input() widgetTitle: string | null = null;
  @Input() widgetSubtitle: string | null = null;
  @Input() welcomeMessage: string | null = null;
  @Input() title: string | null = 'Aparsoft chat widget';

  @Output() ready = new EventEmitter<AparsoftChatbotInstance>();
  @Output() error = new EventEmitter<Error>();

  private loaderScript: HTMLScriptElement | null = null;
  private handleReady: ((event: Event) => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.bootstrap();
  }

  ngOnDestroy(): void {
    this.destroyWidget();
  }

  private bootstrap(): void {
    if (!isPlatformBrowser(this.platformId) || !this.apiKey) {
      return;
    }

    this.destroyWidget();

    const config: AparsoftChatbotConfig = {
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

    this.handleReady = (event: Event) => {
      const controller = (event as CustomEvent).detail?.controller || window.AparsoftChatbot || null;
      if (controller) {
        this.ready.emit(controller);
      }
    };

    window.addEventListener(READY_EVENT, this.handleReady);

    const existingScript = document.querySelector(
      'script[src="' + WIDGET_SCRIPT_URL + '"][data-aparsoft-chatbot]'
    ) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.remove();
    }

    window.AparsoftChatbot?.destroy?.();
    window.AparsoftChatbot = null;

    this.loaderScript = document.createElement('script');
    this.loaderScript.src = WIDGET_SCRIPT_URL;
    this.loaderScript.async = true;
    this.loaderScript.dataset.aparsoftChatbot = 'true';
    this.loaderScript.dataset.apiKey = config.apiKey;
    if (config.position) this.loaderScript.dataset.position = config.position;
    if (typeof config.showBranding === 'boolean') this.loaderScript.dataset.showBranding = String(config.showBranding);
    if (config.autoOpenDelayMs && config.autoOpenDelayMs > 0) this.loaderScript.dataset.autoOpenDelayMs = String(config.autoOpenDelayMs);
    if (config.configEndpoint) this.loaderScript.dataset.configEndpoint = config.configEndpoint;
    if (config.websocketUrl) this.loaderScript.dataset.websocketUrl = config.websocketUrl;
    if (config.primaryColor) this.loaderScript.dataset.primaryColor = config.primaryColor;
    if (config.secondaryColor) this.loaderScript.dataset.secondaryColor = config.secondaryColor;
    if (config.widgetTitle) this.loaderScript.dataset.widgetTitle = config.widgetTitle;
    if (config.widgetSubtitle) this.loaderScript.dataset.widgetSubtitle = config.widgetSubtitle;
    if (config.welcomeMessage) this.loaderScript.dataset.welcomeMessage = config.welcomeMessage;
    if (config.title) this.loaderScript.dataset.title = config.title;
    document.body.appendChild(this.loaderScript);

    if (window.AparsoftChatbot?.isReady) {
      this.handleReady(new CustomEvent(READY_EVENT, { detail: { controller: window.AparsoftChatbot } }));
    }
  }

  private destroyWidget(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.handleReady) {
      window.removeEventListener(READY_EVENT, this.handleReady);
      this.handleReady = null;
    }

    this.loaderScript?.remove();
    this.loaderScript = null;

    window.AparsoftChatbot?.destroy?.();
    window.AparsoftChatbot = null;
  }
}
