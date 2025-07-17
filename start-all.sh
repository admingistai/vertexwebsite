#!/bin/bash

# VERTEX Athletic Website Launcher
# This script starts the main website with the pre-built chat widget

echo "🚀 Starting VERTEX Athletic Website..."
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
    
    # Kill any existing processes on port 3000
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${BLUE}   Killing process on port 3000${NC}"
        lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    fi
    
    # Also kill any remaining Next.js processes
    pkill -f "next dev" 2>/dev/null || true
    
    # Wait a moment for processes to fully terminate
    sleep 2
    echo -e "${GREEN}✅ Cleanup completed${NC}"
    echo ""
}

# Function to clean up processes on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down website...${NC}"
    
    # Kill the website process
    if [ ! -z "$WEBSITE_PID" ]; then
        echo -e "${BLUE}   Stopping website (PID: $WEBSITE_PID)${NC}"
        kill $WEBSITE_PID 2>/dev/null
    fi
    
    # Wait a moment for graceful shutdown
    sleep 2
    
    # Force kill if still running
    pkill -f "next dev" 2>/dev/null
    
    echo -e "${GREEN}✅ Website stopped${NC}"
    exit 0
}

# Set up trap to call cleanup on exit
trap cleanup SIGINT SIGTERM EXIT

# Clean up any existing processes first
cleanup_ports

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "app" ]; then
    echo -e "${RED}❌ Error: This script must be run from the ShoeStore_Example directory${NC}"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
    echo ""
fi

# Check if chat widget files exist in public directory
if [ -f "public/chat-widget.js" ] && [ -f "public/chat-widget.css" ]; then
    echo -e "${GREEN}✅ Chat widget files found in public directory${NC}"
    echo -e "${YELLOW}ℹ️  Note: The chat widget UI will load, but backend features are disabled${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: Chat widget files not found in public directory${NC}"
    echo -e "${YELLOW}   The chat widget may not appear on the website${NC}"
fi

echo ""
echo -e "${BLUE}📊 Starting website on:${NC}"
echo -e "${BLUE}   • URL: http://localhost:3000${NC}"
echo ""

# Start the main website (Next.js)
echo -e "${GREEN}🌐 Starting VERTEX Athletic website...${NC}"
npm run dev > website.log 2>&1 &
WEBSITE_PID=$!
echo -e "${BLUE}   Website PID: $WEBSITE_PID${NC}"

# Wait for the website to start
echo -e "${YELLOW}⏳ Waiting for website to start...${NC}"
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Website is ready!${NC}"
        break
    fi
    sleep 1
done

echo ""
echo -e "${GREEN}🎉 Website started successfully!${NC}"
echo ""
echo -e "${YELLOW}📝 Access your website:${NC}"
echo -e "${BLUE}   • Main Website:   http://localhost:3000${NC}"
echo -e "${BLUE}   • Vertex Watch:   http://localhost:3000/product/4001${NC}"
echo ""
echo -e "${YELLOW}📋 Features:${NC}"
echo -e "${GREEN}   ✅ Full product catalog with all pages${NC}"
echo -e "${GREEN}   ✅ Shopping cart functionality${NC}"
echo -e "${GREEN}   ✅ Vertex Watch product page with all images${NC}"
echo -e "${YELLOW}   ⚠️  Chat widget UI (backend features disabled)${NC}"
echo ""
echo -e "${YELLOW}📋 Log file:${NC}"
echo -e "${BLUE}   • Website: ./website.log${NC}"
echo ""
echo -e "${YELLOW}💡 Troubleshooting:${NC}"
echo -e "${BLUE}   • If the site doesn't load, check website.log for errors${NC}"
echo -e "${BLUE}   • Make sure port 3000 is not in use by another application${NC}"
echo ""
echo -e "${YELLOW}⏹️  Press Ctrl+C to stop the website${NC}"
echo ""

# Monitor the website process
while true; do
    # Check if the website process is still running
    if ! kill -0 $WEBSITE_PID 2>/dev/null; then
        echo -e "${RED}❌ Website process stopped unexpectedly${NC}"
        echo -e "${YELLOW}📋 Check website.log for error details${NC}"
        
        # Show last few lines of the log
        if [ -f "website.log" ]; then
            echo ""
            echo -e "${YELLOW}Last few lines from website.log:${NC}"
            tail -10 website.log
        fi
        
        exit 1
    fi
    
    sleep 5
done