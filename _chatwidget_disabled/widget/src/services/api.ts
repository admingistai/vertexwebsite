/**
 * API service for communicating with the backend.
 * Handles all API calls to the ChatGPT Widget backend.
 */

// Get backend URL from environment or default to current domain for Next.js API routes
const API_BASE_URL = import.meta.env.VITE_API_URL || window.location.origin;

// Types
interface ChatRequest {
  message: string;
  context?: string;
  model?: string;
}

interface ChatResponse {
  data?: {
    message: string;
    model?: string;
    type?: string;
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
  error?: {
    message: string;
    code: string;
  };
}

interface HealthResponse {
  status: string;
  version: string;
}

// API error class
export class APIError extends Error {
  public code: string;
  
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'APIError';
  }
}

/**
 * Check if the backend is healthy.
 */
export async function checkHealth(): Promise<HealthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new APIError('HEALTH_CHECK_FAILED', 'Unable to connect to backend');
  }
}

/**
 * Send a chat message to the backend.
 */
export async function sendChatMessage(
  message: string,
  context?: string,
  model: string = 'gpt-3.5-turbo'
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        context,
        model
      } as ChatRequest),
    });

    const data: ChatResponse = await response.json();

    if (!response.ok || data.error) {
      throw new APIError(
        data.error?.code || 'CHAT_ERROR',
        data.error?.message || 'Failed to get response'
      );
    }

    if (!data.data?.message) {
      throw new APIError('INVALID_RESPONSE', 'Invalid response from server');
    }

    return data.data.message;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('NETWORK_ERROR', 'Failed to connect to server');
  }
}

/**
 * Request a summary of the provided text.
 */
export async function summarizeText(
  text: string,
  model: string = 'gpt-3.5-turbo'
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: text,
        model
      } as ChatRequest),
    });

    const data: ChatResponse = await response.json();

    if (!response.ok || data.error) {
      throw new APIError(
        data.error?.code || 'SUMMARY_ERROR',
        data.error?.message || 'Failed to generate summary'
      );
    }

    if (!data.data?.message) {
      throw new APIError('INVALID_RESPONSE', 'Invalid response from server');
    }

    return data.data.message;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('NETWORK_ERROR', 'Failed to connect to server');
  }
}

/**
 * Request a detailed analysis of the provided text.
 */
export async function analyzeDetails(
  text: string,
  model: string = 'gpt-3.5-turbo'
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: text,
        model
      } as ChatRequest),
    });

    const data: ChatResponse = await response.json();

    if (!response.ok || data.error) {
      throw new APIError(
        data.error?.code || 'DETAILS_ERROR',
        data.error?.message || 'Failed to generate detailed analysis'
      );
    }

    if (!data.data?.message) {
      throw new APIError('INVALID_RESPONSE', 'Invalid response from server');
    }

    return data.data.message;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('NETWORK_ERROR', 'Failed to connect to server');
  }
}

/**
 * Generate audio from text using text-to-speech.
 */
export async function generateAudio(
  text: string,
  voiceId: string = 'JBFqnCBsd6RMkjVDRZzb',
  modelId: string = 'eleven_multilingual_v2'
): Promise<Blob> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/listen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: text,
        voice_id: voiceId,
        model_id: modelId
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.error?.code || 'AUDIO_ERROR',
        errorData.error?.message || 'Failed to generate audio'
      );
    }

    const audioBlob = await response.blob();
    return audioBlob;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('NETWORK_ERROR', 'Failed to connect to audio service');
  }
}

/**
 * Generic feature handler for future AI features.
 * This can be extended for different feature types.
 */
export async function handleFeature(
  feature: string,
  content: string,
  options?: any
): Promise<string> {
  switch (feature.toLowerCase()) {
    case 'summarize':
      return summarizeText(content, options?.model);
    
    case 'details':
      // Provide detailed analysis of the content
      return analyzeDetails(content, options?.model);
    
    case 'listen':
      // Generate audio and return a placeholder message
      // The actual audio handling is done separately via generateAudio()
      return 'Audio generated successfully';
    
    case 'avatar':
      // Placeholder for avatar functionality
      throw new APIError('NOT_IMPLEMENTED', 'Avatar responses coming soon!');
    
    case 'remix':
      // Rewrite/rephrase the content
      return sendChatMessage(
        `Please rephrase or rewrite the following in a different style: ${content}`,
        undefined,
        options?.model
      );
    
    case 'share':
      // Placeholder for sharing functionality
      throw new APIError('NOT_IMPLEMENTED', 'Sharing functionality coming soon!');
    
    default:
      throw new APIError('UNKNOWN_FEATURE', `Unknown feature: ${feature}`);
  }
}