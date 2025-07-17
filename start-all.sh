#!/bin/bash

# VERTEX Athletic Website + Chat Widget Launcher
# This script starts all services needed for the website and chat widget

echo "🚀 Starting VERTEX Athletic Website with Chat Widget..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to clean up existing processes on required ports
cleanup_ports() {
    echo -e "${YELLOW}🧹 Cleaning up existing processes...${NC}"
    
    # Kill any existing processes on our target ports
    PORTS=(3000 3001 5173 8000)
    for port in "${PORTS[@]}"; do
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo -e "${BLUE}   Killing process on port $port${NC}"
            lsof -ti:$port | xargs kill -9 2>/dev/null || true
        fi
    done
    
    # Also kill any remaining processes by name
    pkill -f "next dev" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    pkill -f "python.*main.py" 2>/dev/null || true
    
    # Wait a moment for processes to fully terminate
    sleep 2
    echo -e "${GREEN}✅ Cleanup completed${NC}"
    echo ""
}

# Function to clean up processes on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down all services...${NC}"
    
    # Kill all background jobs
    if [ ! -z "$WEBSITE_PID" ]; then
        echo -e "${BLUE}   Stopping website (PID: $WEBSITE_PID)${NC}"
        kill $WEBSITE_PID 2>/dev/null
    fi
    
    if [ ! -z "$WIDGET_PID" ]; then
        echo -e "${BLUE}   Stopping widget frontend (PID: $WIDGET_PID)${NC}"
        kill $WIDGET_PID 2>/dev/null
    fi
    
    if [ ! -z "$BACKEND_PID" ]; then
        echo -e "${BLUE}   Stopping widget backend (PID: $BACKEND_PID)${NC}"
        kill $BACKEND_PID 2>/dev/null
    fi
    
    # Wait a moment for graceful shutdown
    sleep 2
    
    # Force kill if still running
    pkill -f "next dev" 2>/dev/null
    pkill -f "vite" 2>/dev/null
    pkill -f "python.*main.py" 2>/dev/null
    
    echo -e "${GREEN}✅ All services stopped${NC}"
    exit 0
}

# Set up trap to call cleanup on exit
trap cleanup SIGINT SIGTERM EXIT

# Clean up any existing processes first
cleanup_ports

# Check if required directories exist
if [ ! -d "chatwidget/backend" ]; then
    echo -e "${RED}❌ Error: chatwidget/backend directory not found${NC}"
    echo -e "${YELLOW}   Please run the setup script first${NC}"
    exit 1
fi

if [ ! -d "chatwidget/widget" ]; then
    echo -e "${RED}❌ Error: chatwidget/widget directory not found${NC}"
    echo -e "${YELLOW}   Please run the setup script first${NC}"
    exit 1
fi

# Check if API keys are configured
if ! grep -q "your_openai_api_key_here" chatwidget/backend/.env && ! grep -q "your_elevenlabs_api_key_here" chatwidget/backend/.env; then
    echo -e "${GREEN}✅ API keys appear to be configured${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: API keys may not be configured in chatwidget/backend/.env${NC}"
    echo -e "${YELLOW}   The widget backend may not function properly${NC}"
    echo ""
fi

echo -e "${BLUE}📊 Starting services on the following ports:${NC}"
echo -e "${BLUE}   • Website:        http://localhost:3000${NC}"
echo -e "${BLUE}   • Widget:         http://localhost:5173${NC}"
echo -e "${BLUE}   • Widget API:     http://localhost:8000${NC}"
echo ""

# Start the main website (Next.js)
echo -e "${GREEN}🌐 Starting VERTEX Athletic website...${NC}"
npm run dev > website.log 2>&1 &
WEBSITE_PID=$!
echo -e "${BLUE}   Website PID: $WEBSITE_PID${NC}"

# Wait a moment for the website to start
sleep 3

# Start the widget backend (FastAPI)
echo -e "${GREEN}🔧 Starting chat widget backend...${NC}"
cd chatwidget/backend
python main.py > ../../backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${BLUE}   Backend PID: $BACKEND_PID${NC}"
cd ../..

# Wait a moment for the backend to start
sleep 3

# Start the widget frontend (Vite)
echo -e "${GREEN}💬 Starting chat widget frontend...${NC}"
cd chatwidget/widget
npm run dev > ../../widget.log 2>&1 &
WIDGET_PID=$!
echo -e "${BLUE}   Widget PID: $WIDGET_PID${NC}"
cd ../..

# Wait a moment for everything to start
sleep 5

echo ""
echo -e "${GREEN}🎉 All services started successfully!${NC}"
echo ""
echo -e "${YELLOW}📝 Access your services:${NC}"
echo -e "${BLUE}   • Main Website:   http://localhost:3000${NC}"
echo -e "${BLUE}   • Widget Demo:    http://localhost:5173${NC}"
echo -e "${BLUE}   • API Health:     http://localhost:8000/health${NC}"
echo ""
echo -e "${YELLOW}📋 Log files:${NC}"
echo -e "${BLUE}   • Website:        ./website.log${NC}"
echo -e "${BLUE}   • Widget:         ./widget.log${NC}"
echo -e "${BLUE}   • Backend:        ./backend.log${NC}"
echo ""
echo -e "${YELLOW}💡 To add the widget to your website, add this to your HTML:${NC}"
echo -e "${BLUE}   <script src=\"http://localhost:5173/src/main.tsx\" type=\"module\"></script>${NC}"
echo ""
echo -e "${YELLOW}⏹️  Press Ctrl+C to stop all services${NC}"
echo ""

# Monitor processes and wait
while true; do
    # Check if any process has died
    if ! kill -0 $WEBSITE_PID 2>/dev/null; then
        echo -e "${RED}❌ Website process died${NC}"
        break
    fi
    
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "${RED}❌ Backend process died${NC}"
        break
    fi
    
    if ! kill -0 $WIDGET_PID 2>/dev/null; then
        echo -e "${RED}❌ Widget process died${NC}"
        break
    fi
    
    sleep 5
done

# If we get here, something went wrong
echo -e "${RED}❌ One or more services stopped unexpectedly${NC}"
echo -e "${YELLOW}📋 Check the log files for more information${NC}"