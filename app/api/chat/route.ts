import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiting store (in production, use Redis or a proper rate limiting service)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_REQUESTS = 10; // 10 requests per minute

// Define request body type
interface ChatRequestBody {
  message: string;
  context?: string;
  model?: string;
}

// Define response types
interface ChatSuccessResponse {
  data: {
    message: string;
  };
}

interface ChatErrorResponse {
  error: {
    message: string;
    code: string;
  };
}

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = rateLimit.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    // Reset or initialize rate limit
    rateLimit.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (clientData.count >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  clientData.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(clientId)) {
      const errorResponse: ChatErrorResponse = {
        error: {
          message: 'Rate limit exceeded. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        }
      };
      return NextResponse.json(errorResponse, { 
        status: 429,
        headers: corsHeaders 
      });
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const errorResponse: ChatErrorResponse = {
        error: {
          message: 'OpenAI API key not configured',
          code: 'CONFIG_ERROR'
        }
      };
      return NextResponse.json(errorResponse, { 
        status: 500,
        headers: corsHeaders 
      });
    }

    // Parse request body
    const body: ChatRequestBody = await request.json();
    const { message, context, model = 'gpt-3.5-turbo' } = body;

    // Validate message
    if (!message || typeof message !== 'string') {
      const errorResponse: ChatErrorResponse = {
        error: {
          message: 'Message is required and must be a string',
          code: 'VALIDATION_ERROR'
        }
      };
      return NextResponse.json(errorResponse, { 
        status: 400,
        headers: corsHeaders 
      });
    }

    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: context || 'You are a helpful assistant for an online shoe store. Help customers find the perfect footwear, answer questions about products, and provide recommendations based on their needs.'
      },
      {
        role: 'user',
        content: message
      }
    ];

    // Make request to OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      
      const errorResponse: ChatErrorResponse = {
        error: {
          message: errorData.error?.message || 'Failed to get response from OpenAI',
          code: 'OPENAI_ERROR'
        }
      };
      return NextResponse.json(errorResponse, { 
        status: openAIResponse.status,
        headers: corsHeaders 
      });
    }

    const data = await openAIResponse.json();
    const assistantMessage = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.';

    const successResponse: ChatSuccessResponse = {
      data: {
        message: assistantMessage
      }
    };

    return NextResponse.json(successResponse, { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    const errorResponse: ChatErrorResponse = {
      error: {
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        code: 'INTERNAL_ERROR'
      }
    };
    
    return NextResponse.json(errorResponse, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}