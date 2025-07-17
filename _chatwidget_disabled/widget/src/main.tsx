import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Function to initialize the widget
function initializeWidget() {
  // Look for widget container first, fallback to 'root' for standalone demo
  const container = document.getElementById('chat-widget-root') || document.getElementById('root')
  
  if (!container) {
    console.warn('Chat widget: No container found (looking for #chat-widget-root or #root)')
    return
  }

  // Only initialize if not already initialized
  if (container.hasChildNodes()) {
    console.log('Chat widget: Already initialized')
    return
  }

  console.log('Chat widget: Initializing in container:', container.id)
  
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// Initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWidget)
} else {
  initializeWidget()
}

// Also expose a global function for manual initialization
(window as any).initChatWidget = initializeWidget
