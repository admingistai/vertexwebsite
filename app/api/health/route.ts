import { NextResponse } from 'next/server';

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    // Check if OpenAI API key is configured
    const apiKeyConfigured = !!process.env.OPENAI_API_KEY;
    
    // Get timestamp
    const timestamp = new Date().toISOString();
    
    // Health check response
    const healthResponse = {
      status: 'ok',
      timestamp,
      service: 'chat-api',
      version: '1.0.0',
      checks: {
        api: true,
        openai_configured: apiKeyConfigured
      }
    };

    return NextResponse.json(healthResponse, { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error) {
    console.error('Health check error:', error);
    
    const errorResponse = {
      status: 'error',
      timestamp: new Date().toISOString(),
      service: 'chat-api',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    
    return NextResponse.json(errorResponse, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}