# ChatGPT Widget Architecture

## Overview
A simple embeddable AI chatbot widget that can be integrated into any website via a single script tag.

## MVP Scope
- Fixed bottom chat bar (like ChatGPT interface)
- React-based frontend bundled into single file
- Simple FastAPI backend that proxies to OpenAI or custom Railway API
- No authentication beyond API key validation
- Responsive design for desktop, tablet, and mobile

## File Structure
```
ChatGPTWidget/
├── widget/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBar.tsx      # Main chat bar component
│   │   │   ├── MessageInput.tsx # Input field component
│   │   │   └── MessageList.tsx  # Messages display
│   │   ├── services/
│   │   │   └── api.ts           # API calls
│   │   ├── App.tsx              # Root component
│   │   ├── index.tsx            # Entry point
│   │   ├── styles.css           # Global styles
│   │   └── types.ts             # TypeScript types
│   ├── public/
│   │   └── demo.html            # Test page
│   ├── dist/
│   │   └── widget.js            # Built output
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── main.py                  # FastAPI proxy server
│   ├── requirements.txt
│   └── .env.example
│
├── docs/
│   └── ARCHITECTURE.md          # This file
│
├── README.md
├── CLAUDE.md
└── .gitignore
```

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for bundling
- CSS Modules for style isolation
- Bundled into single `widget.js` file

### Backend
- FastAPI (Python)
- httpx for proxying requests
- Environment variables for configuration

## Integration Method
```html
<script src="https://cdn.com/widget.js" data-api-key="pk_xxx"></script>
```

## Core Features
1. Fixed chat bar at bottom of page
2. Dark theme (like ChatGPT)
3. Send messages and receive AI responses
4. Responsive design
5. No customization options - it just works

## API Endpoints
- `POST /api/chat` - Send message and get response
- `GET /health` - Health check

## Build & Deployment
- Frontend: Build with Vite, deploy to CDN
- Backend: Deploy to Vercel/Railway
- No database required for MVP

## Development Commands
```bash
# Frontend
cd widget && npm install && npm run dev

# Backend
cd backend && pip install -r requirements.txt && uvicorn main:app --reload
```

## Future Considerations
- Add message history/persistence
- Implement additional AI features (TTS, summarization)
- Add authentication system
- Analytics and usage tracking