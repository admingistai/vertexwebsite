# ShoeStore Example Setup Guide

## Overview
This is a Next.js e-commerce website (VERTEX Athletic) with an integrated AI-powered chat widget.

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Python 3.8+
- pip

## Quick Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/admingistai/ShoeStore_Example.git
cd ShoeStore_Example

# Install main website dependencies
npm install

# Install chat widget frontend dependencies
cd chatwidget/widget
npm install

# Go back to project root
cd ../..

# Install Python dependencies for chat widget backend
pip install -r chatwidget/backend/requirements.txt
```

### 2. Configure API Keys

Edit `chatwidget/backend/.env` and add your actual API keys:

```bash
# OpenAI API Key for chat functionality
OPENAI_API_KEY=sk-your-actual-openai-key-here

# ElevenLabs API Key for text-to-speech functionality
ELEVENLABS_API_KEY=your-actual-elevenlabs-key-here
```

**Note**: You need to obtain these API keys from:
- OpenAI: https://platform.openai.com/api-keys
- ElevenLabs: https://elevenlabs.io/app/settings/api-keys

### 3. Run the Application

#### Option A: Use the Unified Launch Script (Recommended)

```bash
# Make the script executable
chmod +x start-all.sh

# Run all services
./start-all.sh
```

This will start:
- Main Website: http://localhost:3000
- Chat Widget Demo: http://localhost:5173
- Widget API: http://localhost:8000

#### Option B: Run Services Individually

In separate terminal windows:

**Terminal 1 - Main Website:**
```bash
npm run dev
```

**Terminal 2 - Chat Widget Backend:**
```bash
cd chatwidget/backend
python main.py
```

**Terminal 3 - Chat Widget Frontend:**
```bash
cd chatwidget/widget
npm run dev
```

## Accessing the Application

- **Main E-commerce Website**: http://localhost:3000
- **Chat Widget Demo Page**: http://localhost:5173
- **API Health Check**: http://localhost:8000/health

## Features

### E-commerce Website
- Modern shoe store interface
- Product catalog
- Shopping experience
- Built with Next.js 15 and React 19

### AI Chat Widget
- AI-powered chat assistance
- Text summarization (3-bullet summaries)
- Detailed text analysis
- Text-to-speech conversion
- Voice input support
- Automatic light/dark mode

## Troubleshooting

### Port Already in Use
If you get port conflicts, the services will automatically try alternative ports:
- Website: 3001 (instead of 3000)
- Widget: 5173 (Vite default)
- Backend: 8000 (FastAPI default)

### Missing Dependencies
```bash
# For main website
npm install

# For widget frontend
cd chatwidget/widget && npm install

# For Python backend
pip install -r chatwidget/backend/requirements.txt
```

### API Key Issues
- Ensure API keys are properly set in `chatwidget/backend/.env`
- OpenAI keys should start with "sk-"
- Remove placeholder text and use actual keys

### Check Logs
When using `./start-all.sh`, logs are saved to:
- `website.log` - Next.js website logs
- `widget.log` - Chat widget frontend logs
- `backend.log` - Chat widget backend logs

## Integrating Chat Widget into Other Pages

To add the chat widget to any HTML page:

```html
<script src="http://localhost:5173/src/main.tsx" type="module"></script>
```

## Stopping the Application

- If using `./start-all.sh`: Press `Ctrl+C`
- If running individually: Press `Ctrl+C` in each terminal

## Development

The project structure:
```
ShoeStore_Example/
├── app/                    # Next.js app directory
├── components/             # React components
├── public/                 # Static assets
├── chatwidget/            
│   ├── backend/           # FastAPI backend
│   │   ├── main.py        
│   │   ├── requirements.txt
│   │   └── .env           # API keys (create this)
│   └── widget/            # React widget frontend
│       ├── src/           
│       └── package.json
├── start-all.sh           # Unified launch script
└── package.json           # Main website dependencies
```