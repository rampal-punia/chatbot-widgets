'use strict';

var WIDGET_SCRIPT_URL = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';
var READY_EVENT = 'aparsoft-chatbot:ready';
var DEFAULT_CONFIG_ENDPOINT =
  'https://www.aparsoft.com/api/v1/chatbot/public/widget/{apiKey}/config/';
var DEFAULT_WEBSOCKET_URL = 'wss://www.aparsoft.com/ws/client-chatbot/';

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

function AparsoftChatbot(_ref) {
  var apiKey = _ref.apiKey,
    _ref$position = _ref.position,
    position = _ref$position === undefined ? 'bottom-right' : _ref$position,
    _ref$showBranding = _ref.showBranding,
    showBranding = _ref$showBranding === undefined ? true : _ref$showBranding,
    _ref$autoOpenDelay = _ref.autoOpenDelay,
    autoOpenDelay = _ref$autoOpenDelay === undefined ? 0 : _ref$autoOpenDelay,
    _ref$configEndpoint = _ref.configEndpoint,
    configEndpoint =
      _ref$configEndpoint === undefined ? DEFAULT_CONFIG_ENDPOINT : _ref$configEndpoint,
    _ref$websocketUrl = _ref.websocketUrl,
    websocketUrl = _ref$websocketUrl === undefined ? DEFAULT_WEBSOCKET_URL : _ref$websocketUrl,
    _ref$primaryColor = _ref.primaryColor,
    primaryColor = _ref$primaryColor === undefined ? null : _ref$primaryColor,
    _ref$secondaryColor = _ref.secondaryColor,
    secondaryColor = _ref$secondaryColor === undefined ? null : _ref$secondaryColor,
    _ref$widgetTitle = _ref.widgetTitle,
    widgetTitle = _ref$widgetTitle === undefined ? null : _ref$widgetTitle,
    _ref$widgetSubtitle = _ref.widgetSubtitle,
    widgetSubtitle = _ref$widgetSubtitle === undefined ? null : _ref$widgetSubtitle,
    _ref$welcomeMessage = _ref.welcomeMessage,
    welcomeMessage = _ref$welcomeMessage === undefined ? null : _ref$welcomeMessage,
    _ref$title = _ref.title,
    title = _ref$title === undefined ? 'Aparsoft chat widget' : _ref$title,
    _ref$onReady = _ref.onReady,
    onReady = _ref$onReady === undefined ? null : _ref$onReady;

  var React = require('react');
  var useEffect = React.useEffect;

  useEffect(
    function () {
      if (typeof window === 'undefined' || typeof document === 'undefined' || !apiKey) {
        return undefined;
      }

      var loaderConfig = {
        apiKey: apiKey,
        position: position,
        showBranding: showBranding,
        autoOpenDelayMs: autoOpenDelay,
        configEndpoint: configEndpoint,
        websocketUrl: websocketUrl,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        widgetTitle: widgetTitle,
        widgetSubtitle: widgetSubtitle,
        welcomeMessage: welcomeMessage,
        title: title,
      };

      var handleReady = function (event) {
        var controller =
          (event && event.detail ? event.detail.controller : null) ||
          window.AparsoftChatbot ||
          null;
        if (controller && typeof onReady === 'function') {
          onReady(controller);
        }
      };

      window.addEventListener(READY_EVENT, handleReady);

      var existingScript = document.querySelector(
        'script[src="' + WIDGET_SCRIPT_URL + '"][data-aparsoft-chatbot]',
      );
      if (existingScript) {
        existingScript.remove();
      }

      if (window.AparsoftChatbot && typeof window.AparsoftChatbot.destroy === 'function') {
        window.AparsoftChatbot.destroy();
      }
      window.AparsoftChatbot = null;

      var script = document.createElement('script');
      script.src = WIDGET_SCRIPT_URL;
      script.async = true;
      applyLoaderDataset(script, loaderConfig);
      document.body.appendChild(script);

      if (window.AparsoftChatbot && window.AparsoftChatbot.isReady) {
        handleReady({ detail: { controller: window.AparsoftChatbot } });
      }

      return function () {
        window.removeEventListener(READY_EVENT, handleReady);
        script.remove();
        if (window.AparsoftChatbot && typeof window.AparsoftChatbot.destroy === 'function') {
          window.AparsoftChatbot.destroy();
        }
        window.AparsoftChatbot = null;
      };
    },
    [
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
    ],
  );

  return null;
}

function useAparsoftChatbot() {
  var getWidget = function () {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.AparsoftChatbot || null;
  };

  return {
    getWidget: getWidget,
    openChat: function () {
      return getWidget() && getWidget().open ? getWidget().open() : undefined;
    },
    closeChat: function () {
      return getWidget() && getWidget().close ? getWidget().close() : undefined;
    },
    toggleChat: function () {
      return getWidget() && getWidget().toggle ? getWidget().toggle() : undefined;
    },
    sendMessage: function (message) {
      return getWidget() && getWidget().sendMessage ? getWidget().sendMessage(message) : undefined;
    },
  };
}

// ESM export
exports.AparsoftChatbot = AparsoftChatbot;
exports.useAparsoftChatbot = useAparsoftChatbot;
exports.default = AparsoftChatbot;
