interface Window {
  AparsoftChatbot:
    | {
        isReady?: boolean;
        state?: string;
        open?: () => void;
        close?: () => void;
        toggle?: () => void;
        sendMessage?: (message: string) => void;
        destroy?: () => void;
      }
    | null
    | undefined;
}
