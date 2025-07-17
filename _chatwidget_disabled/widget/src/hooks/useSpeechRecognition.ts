/**
 * React hook for speech recognition functionality.
 * Provides a simple interface for managing speech-to-text in React components.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { SpeechRecognitionManager, isSpeechRecognitionSupported } from '../utils/speechRecognition';

export interface UseSpeechRecognitionOptions {
  /**
   * Language for speech recognition (default: browser language)
   */
  language?: string;
  
  /**
   * Timeout in milliseconds before stopping recognition (default: 8000ms)
   */
  timeout?: number;
  
  /**
   * Callback when final transcript is ready
   */
  onFinalTranscript?: (transcript: string) => void;
  
  /**
   * Callback when error occurs
   */
  onError?: (error: string) => void;
}

export interface UseSpeechRecognitionReturn {
  /**
   * Current transcript (including interim results)
   */
  transcript: string;
  
  /**
   * Whether speech recognition is currently active
   */
  isRecording: boolean;
  
  /**
   * Whether speech is currently being detected
   */
  isSpeaking: boolean;
  
  /**
   * Current error message (if any)
   */
  error: string | null;
  
  /**
   * Whether speech recognition is supported in this browser
   */
  isSupported: boolean;
  
  /**
   * Start speech recognition
   */
  startRecording: () => void;
  
  /**
   * Stop speech recognition
   */
  stopRecording: () => void;
  
  /**
   * Clear current transcript and error
   */
  clearTranscript: () => void;
}

/**
 * Hook for managing speech recognition in React components.
 */
export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported] = useState(() => isSpeechRecognitionSupported());
  
  const recognitionRef = useRef<SpeechRecognitionManager | null>(null);
  const interimTranscriptRef = useRef('');
  const finalTranscriptRef = useRef('');

  // Initialize speech recognition manager
  const initializeRecognition = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return null;
    }

    const recognition = new SpeechRecognitionManager(
      {
        language: options.language,
        continuous: false,
        interimResults: true,
        timeout: options.timeout || 8000,
      },
      {
        onStart: () => {
          console.log('Speech recognition started');
          setIsRecording(true);
          setError(null);
          interimTranscriptRef.current = '';
          finalTranscriptRef.current = '';
          setTranscript('');
        },

        onResult: (resultTranscript: string, isFinal: boolean) => {
          if (isFinal) {
            // Final result
            finalTranscriptRef.current = resultTranscript.trim();
            interimTranscriptRef.current = '';
            setTranscript(finalTranscriptRef.current);
            
            // Call the callback with final transcript
            if (finalTranscriptRef.current) {
              options.onFinalTranscript?.(finalTranscriptRef.current);
            }
          } else {
            // Interim result
            interimTranscriptRef.current = resultTranscript;
            setTranscript(finalTranscriptRef.current + interimTranscriptRef.current);
          }
        },

        onError: (errorMessage: string) => {
          console.error('Speech recognition error:', errorMessage);
          setError(errorMessage);
          setIsRecording(false);
          setIsSpeaking(false);
          options.onError?.(errorMessage);
        },

        onEnd: () => {
          console.log('Speech recognition ended');
          setIsRecording(false);
          setIsSpeaking(false);
        },

        onSpeechStart: () => {
          console.log('Speech detected');
          setIsSpeaking(true);
        },

        onSpeechEnd: () => {
          console.log('Speech ended');
          setIsSpeaking(false);
        },
      }
    );

    return recognition;
  }, [isSupported, options.language, options.timeout, options.onFinalTranscript, options.onError]);

  // Start recording
  const startRecording = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    if (isRecording) {
      console.warn('Speech recognition is already running');
      return;
    }

    try {
      // Clean up previous instance
      if (recognitionRef.current) {
        recognitionRef.current.destroy();
      }

      // Create new recognition instance
      recognitionRef.current = initializeRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start speech recognition';
      setError(errorMessage);
      console.error('Failed to start speech recognition:', err);
    }
  }, [isSupported, isRecording, initializeRecognition]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  }, [isRecording]);

  // Clear transcript and error
  const clearTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
    interimTranscriptRef.current = '';
    finalTranscriptRef.current = '';
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.destroy();
      }
    };
  }, []);

  return {
    transcript,
    isRecording,
    isSpeaking,
    error,
    isSupported,
    startRecording,
    stopRecording,
    clearTranscript,
  };
}