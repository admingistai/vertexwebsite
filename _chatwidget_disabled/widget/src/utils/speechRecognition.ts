/**
 * Speech recognition utility using Web Speech API.
 * Provides cross-browser speech-to-text functionality with error handling.
 */

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  grammars: any; // SpeechGrammarList type not available in all environments
  start(): void;
  stop(): void;
  abort(): void;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionStatic {
  new(): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

export interface SpeechRecognitionConfig {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  timeout?: number;
}

export interface SpeechRecognitionCallbacks {
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
}

export class SpeechRecognitionManager {
  private recognition: SpeechRecognition | null = null;
  private isRecording = false;
  private timeoutId: number | null = null;
  private config: Required<SpeechRecognitionConfig>;
  private callbacks: SpeechRecognitionCallbacks;

  constructor(config: SpeechRecognitionConfig = {}, callbacks: SpeechRecognitionCallbacks = {}) {
    this.config = {
      language: config.language || this.getBrowserLanguage(),
      continuous: config.continuous ?? false,
      interimResults: config.interimResults ?? true,
      maxAlternatives: config.maxAlternatives ?? 1,
      timeout: config.timeout ?? 10000, // 10 seconds
    };
    this.callbacks = callbacks;
  }

  /**
   * Check if speech recognition is supported in the current browser.
   */
  static isSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  /**
   * Get the user's browser language for speech recognition.
   */
  private getBrowserLanguage(): string {
    return navigator.language || 'en-US';
  }

  /**
   * Initialize the speech recognition instance.
   */
  private initializeRecognition(): SpeechRecognition {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      throw new Error('Speech recognition not supported in this browser');
    }

    const recognition = new SpeechRecognition();
    
    // Configure recognition settings
    recognition.continuous = this.config.continuous;
    recognition.interimResults = this.config.interimResults;
    recognition.lang = this.config.language;
    recognition.maxAlternatives = this.config.maxAlternatives;

    // Set up event handlers
    recognition.onstart = () => {
      console.log('Speech recognition started');
      this.isRecording = true;
      this.callbacks.onStart?.();
      this.startTimeout();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      let isFinal = false;

      // Process all results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        transcript += result[0].transcript;
        if (result.isFinal) {
          isFinal = true;
        }
      }

      this.callbacks.onResult?.(transcript, isFinal);

      // Reset timeout on new results
      this.resetTimeout();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      this.isRecording = false;
      this.clearTimeout();
      
      let errorMessage = 'Speech recognition failed';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'network':
          errorMessage = 'Network error occurred. Please check your connection.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone access denied. Please allow microphone permissions.';
          break;
        case 'service-not-allowed':
          errorMessage = 'Speech recognition service not allowed.';
          break;
        case 'bad-grammar':
          errorMessage = 'Speech recognition grammar error.';
          break;
        case 'language-not-supported':
          errorMessage = 'Language not supported for speech recognition.';
          break;
        case 'audio-capture':
          errorMessage = 'Audio capture failed. Please check your microphone.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      this.callbacks.onError?.(errorMessage);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      this.isRecording = false;
      this.clearTimeout();
      this.callbacks.onEnd?.();
    };

    recognition.onspeechstart = () => {
      console.log('Speech detected');
      this.callbacks.onSpeechStart?.();
    };

    recognition.onspeechend = () => {
      console.log('Speech ended');
      this.callbacks.onSpeechEnd?.();
    };

    return recognition;
  }

  /**
   * Start speech recognition.
   */
  start(): void {
    if (!SpeechRecognitionManager.isSupported()) {
      this.callbacks.onError?.('Speech recognition is not supported in this browser');
      return;
    }

    if (this.isRecording) {
      console.warn('Speech recognition is already running');
      return;
    }

    try {
      this.recognition = this.initializeRecognition();
      this.recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      this.callbacks.onError?.(error instanceof Error ? error.message : 'Failed to start speech recognition');
    }
  }

  /**
   * Stop speech recognition.
   */
  stop(): void {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
    }
  }

  /**
   * Abort speech recognition immediately.
   */
  abort(): void {
    if (this.recognition && this.isRecording) {
      this.recognition.abort();
    }
  }

  /**
   * Check if currently recording.
   */
  getIsRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Start the timeout timer.
   */
  private startTimeout(): void {
    this.timeoutId = window.setTimeout(() => {
      console.log('Speech recognition timeout');
      this.stop();
    }, this.config.timeout);
  }

  /**
   * Reset the timeout timer.
   */
  private resetTimeout(): void {
    this.clearTimeout();
    this.startTimeout();
  }

  /**
   * Clear the timeout timer.
   */
  private clearTimeout(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Clean up resources.
   */
  destroy(): void {
    this.abort();
    this.clearTimeout();
    this.recognition = null;
  }
}

/**
 * Simple function to check speech recognition support.
 */
export function isSpeechRecognitionSupported(): boolean {
  return SpeechRecognitionManager.isSupported();
}

/**
 * Create a simple speech recognition instance with default settings.
 */
export function createSpeechRecognition(callbacks: SpeechRecognitionCallbacks): SpeechRecognitionManager {
  return new SpeechRecognitionManager({
    continuous: false,
    interimResults: true,
    timeout: 8000, // 8 seconds timeout
  }, callbacks);
}