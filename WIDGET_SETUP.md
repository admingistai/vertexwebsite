# VERTEX Athletic Website + Chat Widget Setup

This project combines the VERTEX Athletic e-commerce website with an AI-powered chat widget.

## 🚀 Quick Start

### 1. Configure API Keys

Edit `chatwidget/backend/.env` and add your API keys:

```bash
# OpenAI API Key for chat functionality
OPENAI_API_KEY=sk-your-actual-openai-key-here

# ElevenLabs API Key for text-to-speech functionality
ELEVENLABS_API_KEY=your-actual-elevenlabs-key-here
```

### 2. Launch Everything

Run the unified launch script:

```bash
./start-all.sh
```

This will start:
- **Main Website**: http://localhost:3001
- **Chat Widget**: http://localhost:5173  
- **Widget API**: http://localhost:8000

### 3. Access Your Services

- **VERTEX Athletic Website**: http://localhost:3001
- **Chat Widget Demo**: http://localhost:5173
- **API Health Check**: http://localhost:8000/health

## 🔧 Manual Setup (Alternative)

If you prefer to run services individually:

### Start the Main Website
```bash
npm run dev
```

### Start the Chat Widget Backend
```bash
cd chatwidget/backend
python main.py
```

### Start the Chat Widget Frontend
```bash
cd chatwidget/widget
npm run dev
```

## 🎯 Chat Widget Features

- **AI Chat**: Powered by OpenAI GPT
- **Text Summarization**: Get 3-bullet summaries of any content
- **Detailed Analysis**: Comprehensive text analysis
- **Text-to-Speech**: Convert summaries to audio using ElevenLabs
- **Speech Recognition**: Voice input support
- **Theme Detection**: Automatic light/dark mode

## 🔗 Integrating Widget into Website

To add the chat widget to your website pages, include:

```html
<script src="http://localhost:5173/src/main.tsx" type="module"></script>
```

## 📋 Log Files

When using `./start-all.sh`, logs are saved to:
- `website.log` - Next.js website logs
- `widget.log` - Chat widget frontend logs  
- `backend.log` - Chat widget backend logs

## ⏹️ Stopping Services

Press `Ctrl+C` in the terminal running `./start-all.sh` to stop all services.

## 🔑 Required API Keys

1. **OpenAI API Key**: Get from https://platform.openai.com/api-keys
2. **ElevenLabs API Key**: Get from https://elevenlabs.io/app/settings/api-keys

## 🛠️ Troubleshooting

### Port Already in Use
If ports are already in use, the services will try alternative ports:
- Website: 3001 (instead of 3000)
- Widget: 5173 (default for Vite)
- Backend: 8000 (default for FastAPI)

### Missing Dependencies
If you get dependency errors:
```bash
# For website
npm install

# For widget
cd chatwidget/widget && npm install

# For backend
cd chatwidget/backend && pip install -r requirements.txt
```

### API Key Issues
- Make sure API keys are properly set in `chatwidget/backend/.env`
- Remove "your_openai_api_key_here" and "your_elevenlabs_api_key_here" placeholders
- API keys should start with "sk-" for OpenAI

## 📁 Project Structure

```
store_website/
├── app/                    # Next.js app directory
├── components/             # React components
├── chatwidget/            # Chat widget integration
│   ├── backend/           # FastAPI backend
│   │   ├── main.py        # API server
│   │   ├── requirements.txt
│   │   └── .env           # API keys
│   └── widget/            # React widget frontend
│       ├── src/           # Widget source code
│       ├── package.json
│       └── demo.html      # Widget demo page
├── start-all.sh           # Unified launch script
└── package.json           # Main website dependencies
```