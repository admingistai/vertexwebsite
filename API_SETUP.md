# API Setup Guide

This guide explains how to set up and use the Next.js API routes for the chat widget.

## Prerequisites

1. Node.js installed
2. OpenAI API key

## Setup Steps

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 2. Start the Next.js Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- **URL**: `http://localhost:3000/api/health`
- **Method**: `GET`
- **Response**: 
```json
{
  "status": "ok",
  "timestamp": "2024-01-17T12:00:00.000Z",
  "service": "chat-api",
  "version": "1.0.0",
  "checks": {
    "api": true,
    "openai_configured": true
  }
}
```

### Chat Endpoint
- **URL**: `http://localhost:3000/api/chat`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "message": "What are your most popular running shoes?",
  "context": "Optional context for the assistant",
  "model": "gpt-3.5-turbo"
}
```
- **Success Response**:
```json
{
  "data": {
    "message": "Our most popular running shoes include..."
  }
}
```
- **Error Response**:
```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

## Widget Configuration

To use these endpoints with the chat widget, update the widget's environment variable:

For the widget in `_chatwidget_disabled/widget/`:
```bash
VITE_API_URL=http://localhost:3000
```

Or if using the built widget in `public/`:
- The widget will need to be configured to use `http://localhost:3000` as the API base URL

## CORS

The API routes are configured with permissive CORS headers to allow the widget to work from any origin. In production, you should restrict the `Access-Control-Allow-Origin` header to your specific domains.

## Testing

Test the health endpoint:
```bash
curl http://localhost:3000/api/health
```

Test the chat endpoint:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help finding shoes"}'
```

## Production Considerations

1. Set restrictive CORS policies
2. Add rate limiting
3. Implement authentication if needed
4. Use environment-specific OpenAI API keys
5. Consider implementing response caching
6. Add request validation and sanitization
7. Implement proper error logging and monitoring