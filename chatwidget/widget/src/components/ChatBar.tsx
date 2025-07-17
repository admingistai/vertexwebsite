import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage, handleFeature, generateAudio, APIError } from '../services/api';
import { extractPageContext, formatContextForAPI, getContentForSummarization } from '../utils/pageContext';
import { detectWebsiteThemeWithCache } from '../utils/themeDetection';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import ShareMenu from './ShareMenu';
import AudioPlayer from './AudioPlayer';
import ProductCarouselV2 from './ProductCarouselV2';
import CartSidebar from './CartSidebar';
import { useCart } from '../hooks/useCart';

console.log('🎠 ChatBar.tsx loaded with ProductCarouselV2 import');

// Chat message interface for history
interface ChatMessage {
  id: string;
  userMessage: string;
  response: string;
  responseType: string;
  timestamp: Date;
  showCarousel?: boolean;
  carouselExpanded?: boolean;
  carouselId?: string;
  audioUrl?: string;
}

// Maximum number of messages to keep in history
const MAX_HISTORY_SIZE = 10;

// Light icons (for dark mode)
import summarizeIconLight from '../../assets/light/summarize.svg';
import detailsIconLight from '../../assets/light/details.svg';
import listenIconLight from '../../assets/light/listen.svg';
import avatarIconLight from '../../assets/light/avatar.svg';
import remixIconLight from '../../assets/light/remix.svg';
import shareIconLight from '../../assets/light/share.svg';
import microphoneIconLight from '../../assets/light/microphone.svg';
import submitIconLight from '../../assets/light/submit.svg';
import themeToggleIconLight from '../../assets/light/theme-toggle.svg';

// Dark icons (for light mode)
import summarizeIconDark from '../../assets/dark/summarize.svg';
import detailsIconDark from '../../assets/dark/details.svg';
import listenIconDark from '../../assets/dark/listen.svg';
import avatarIconDark from '../../assets/dark/avatar.svg';
import remixIconDark from '../../assets/dark/remix.svg';
import shareIconDark from '../../assets/dark/share.svg';
import microphoneIconDark from '../../assets/dark/microphone.svg';
import submitIconDark from '../../assets/dark/submit.svg';
import themeToggleIconDark from '../../assets/dark/theme-toggle.svg';

const ChatBar: React.FC = () => {
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isAnswerBoxClosing, setIsAnswerBoxClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  // Remove individual state variables as they're now part of ChatMessage
  // const [audioUrl, setAudioUrl] = useState<string | null>(null);
  // const [responseType, setResponseType] = useState<string>('text');
  // const [showCarouselInAnswer, setShowCarouselInAnswer] = useState(false);
  // Audio caching for instant playback
  const [cachedAudioUrl, setCachedAudioUrl] = useState<string | null>(null);
  const [isPreparingAudio, setIsPreparingAudio] = useState(false);
  const [audioCacheError, setAudioCacheError] = useState<string | null>(null);
  // Suppress unused variable warning - error is used for internal state tracking
  void error;
  const widgetRef = useRef<HTMLDivElement>(null);
  const answerBoxRef = useRef<HTMLDivElement>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const wasCarouselToggledRef = useRef<string | null>(null);
  const cartSidebarRef = useRef<HTMLDivElement>(null);
  
  // Get cart state to check if cart is open
  const { state: cartState } = useCart();

  // Speech recognition hook
  const {
    transcript,
    isRecording,
    isSpeaking,
    error: _speechError,
    isSupported: speechSupported,
    startRecording,
    stopRecording,
    clearTranscript,
  } = useSpeechRecognition({
    onFinalTranscript: (finalTranscript) => {
      // Set the message to the transcribed text
      setMessage(finalTranscript);
      clearTranscript();
    },
    onError: (errorMessage) => {
      console.error('Speech recognition error:', errorMessage);
      setError(errorMessage);
    },
  });

  // Debug speech recognition support
  useEffect(() => {
    console.log('Speech recognition supported:', speechSupported);
    console.log('SpeechRecognition available:', !!(window.SpeechRecognition || window.webkitSpeechRecognition));
  }, [speechSupported]);

  // Load theme from localStorage or auto-detect on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('widget-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      // User has manually set a theme preference
      setTheme(savedTheme);
    } else {
      // No saved preference, auto-detect website theme
      try {
        const detectedTheme = detectWebsiteThemeWithCache();
        setTheme(detectedTheme);
        console.log(`Widget theme auto-detected as: ${detectedTheme}`);
      } catch (err) {
        console.warn('Failed to auto-detect theme, using default dark theme:', err);
        setTheme('dark');
      }
    }
  }, []);

  // Pre-generate audio for instant playback
  useEffect(() => {
    const prepareAudio = async () => {
      // Wait a bit for page to fully load
      setTimeout(async () => {
        try {
          setIsPreparingAudio(true);
          setAudioCacheError(null);
          
          // Get page content for summarization
          const content = getContentForSummarization();
          
          // Only proceed if we have meaningful content
          if (content && content.length > 100) {
            console.log('Pre-generating audio for instant Listen experience...');
            
            // Generate audio in background
            const audioBlob = await generateAudio(content);
            const audioObjectUrl = URL.createObjectURL(audioBlob);
            
            setCachedAudioUrl(audioObjectUrl);
            console.log('Audio pre-generation completed successfully');
          } else {
            console.log('Insufficient content for audio pre-generation');
          }
        } catch (err) {
          console.warn('Audio pre-generation failed:', err);
          setAudioCacheError(err instanceof Error ? err.message : 'Audio preparation failed');
        } finally {
          setIsPreparingAudio(false);
        }
      }, 2000); // Wait 2 seconds for page to stabilize
    };

    prepareAudio();
  }, []); // Only run once on mount


  // Cleanup cached audio URL on unmount
  useEffect(() => {
    return () => {
      if (cachedAudioUrl) {
        URL.revokeObjectURL(cachedAudioUrl);
      }
    };
  }, [cachedAudioUrl]);

  // Handle click outside to hide answer box only
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if clicked outside widget, answer box, and cart sidebar
      const clickedOutsideWidget = widgetRef.current && !widgetRef.current.contains(target);
      const clickedOutsideAnswerBox = !answerBoxRef.current || !answerBoxRef.current.contains(target);
      const clickedOutsideCartSidebar = !cartSidebarRef.current || !cartSidebarRef.current.contains(target);
      
      // Only close if clicked outside all components and cart is not open
      if (clickedOutsideWidget && clickedOutsideAnswerBox && clickedOutsideCartSidebar && showAnswerBox && !cartState.isOpen) {
        console.log('🖱️ Clicked outside widget and answer box, closing');
        setIsAnswerBoxClosing(true);
        setIsMinimized(true); // Minimize the widget to prevent auto-show
        setTimeout(() => {
          setShowAnswerBox(false);
          setIsAnswerBoxClosing(false);
        }, 300); // Match the animation duration
      }
    };

    // Use 'click' instead of 'mousedown' to ensure proper event handling
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showAnswerBox, cartState.isOpen]);

  // Message management functions
  const addChatMessage = (userMsg: string, response: string, responseType: string, showCarousel?: boolean, audioUrl?: string, carouselId?: string) => {
    const messageId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newMessage: ChatMessage = {
      id: messageId,
      userMessage: userMsg,
      response: response,
      responseType: responseType,
      timestamp: new Date(),
      showCarousel: showCarousel,
      carouselExpanded: showCarousel ? true : undefined, // New carousels start expanded
      carouselId: carouselId || (showCarousel ? `carousel-${messageId}` : undefined),
      audioUrl: audioUrl
    };

    console.log('🔄 addChatMessage called with:', {
      userMsg,
      response,
      responseType,
      showCarousel,
      audioUrl,
      messageId: newMessage.id
    });

    setChatHistory(prev => {
      // Keep existing carousels in their current state
      const newHistory = [...prev, newMessage];
      console.log('📚 Chat history updated:', {
        previousLength: prev.length,
        newLength: newHistory.length,
        latestMessage: newMessage
      });
      // Trim history if it exceeds maximum size
      if (newHistory.length > MAX_HISTORY_SIZE) {
        const trimmedHistory = newHistory.slice(-MAX_HISTORY_SIZE);
        console.log('✂️ History trimmed from', newHistory.length, 'to', trimmedHistory.length);
        return trimmedHistory;
      }
      return newHistory;
    });
  };

  const clearChatHistory = () => {
    setChatHistory([]);
  };
  // Suppress unused variable warning - function is available for future use
  void clearChatHistory;

  // Note: toggleCarousel removed as V2 carousel doesn't need expanded/collapsed states

  const collapseAllCarousels = () => {
    console.log('🎠 Collapsing all carousels');
    setChatHistory(prev => 
      prev.map(msg => 
        msg.showCarousel ? { ...msg, carouselExpanded: false } : msg
      )
    );
  };
  // Suppress unused variable warning - function is available for future use
  void collapseAllCarousels;

  // Smart scroll positioning to show last user message at top or keep carousel in view
  useEffect(() => {
    console.log('📜 Chat history changed, length:', chatHistory.length);
    if (chatHistoryRef.current && chatHistory.length > 0) {
      // Use setTimeout to ensure DOM is updated after state change
      setTimeout(() => {
        if (chatHistoryRef.current) {
          // Check if a carousel was just toggled
          if (wasCarouselToggledRef.current) {
            console.log('🎠 Carousel was toggled, keeping it in view:', wasCarouselToggledRef.current);
            
            // Find the message with the toggled carousel
            const chatMessages = chatHistoryRef.current.querySelectorAll('.chat-message');
            for (const messageElement of chatMessages) {
              // Check if this message contains the toggled carousel
              const carousel = messageElement.querySelector('.product-carousel');
              if (carousel) {
                // Find the corresponding message data
                const messageIndex = Array.from(chatMessages).indexOf(messageElement);
                if (messageIndex >= 0 && messageIndex < chatHistory.length) {
                  const message = chatHistory[messageIndex];
                  if (message.id === wasCarouselToggledRef.current) {
                    // Scroll the carousel into view at the top
                    const carouselTop = (carousel as HTMLElement).offsetTop;
                    const targetScrollTop = Math.max(0, carouselTop - 20);
                    
                    chatHistoryRef.current.scrollTo({
                      top: targetScrollTop,
                      behavior: 'smooth'
                    });
                    
                    console.log('🔄 Scrolled to keep carousel in view at top');
                    break;
                  }
                }
              }
            }
            
            // Clear the ref after handling
            wasCarouselToggledRef.current = null;
          } else {
            // Normal scroll behavior - show last user message at top
            const chatMessages = chatHistoryRef.current.querySelectorAll('.chat-message');
            const lastMessageContainer = chatMessages[chatMessages.length - 1];
            
            if (lastMessageContainer) {
              // Find the user message within the last message container
              const userMessage = lastMessageContainer.querySelector('.user-message');
              
              if (userMessage) {
                // Position to show the user message near the top
                const messageTop = (userMessage as HTMLElement).offsetTop;
                const targetScrollTop = Math.max(0, messageTop - 20);
                
                // Smooth scroll to the target position
                chatHistoryRef.current.scrollTo({
                  top: targetScrollTop,
                  behavior: 'smooth'
                });
                
                console.log('🔄 Smart positioned to show user message at top, scrollTop:', targetScrollTop);
              } else {
                // Fallback: position the entire last message container
                const messageTop = (lastMessageContainer as HTMLElement).offsetTop;
                const targetScrollTop = Math.max(0, messageTop - 20);
                
                chatHistoryRef.current.scrollTo({
                  top: targetScrollTop,
                  behavior: 'smooth'
                });
                
                console.log('🔄 Fallback positioned to show last message at top');
              }
            }
          }
        }
      }, 100); // Small delay to ensure DOM updates
    }
  }, [chatHistory]);

  // Debug effect to track showAnswerBox state changes
  useEffect(() => {
    console.log('👁️ showAnswerBox state changed to:', showAnswerBox);
  }, [showAnswerBox]);

  // Auto-show answer box when chat history is not empty
  useEffect(() => {
    if (chatHistory.length > 0 && !showAnswerBox && !isMinimized) {
      console.log('🔄 Auto-showing answer box due to chat history');
      setShowAnswerBox(true);
    }
  }, [chatHistory, showAnswerBox, isMinimized]);

  // Handle click outside to hide share menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close share menu if clicking within the widget or share menu itself
      const clickedInWidget = widgetRef.current && widgetRef.current.contains(event.target as Node);
      const clickedInShareMenu = shareMenuRef.current && shareMenuRef.current.contains(event.target as Node);
      
      if (showShareMenu && !clickedInWidget && !clickedInShareMenu) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('widget-theme', newTheme);
  };

  // Select icons based on theme
  const icons = theme === 'dark' ? {
    summarize: summarizeIconLight,
    details: detailsIconLight,
    listen: listenIconLight,
    avatar: avatarIconLight,
    remix: remixIconLight,
    share: shareIconLight,
    microphone: microphoneIconLight,
    submit: submitIconLight,
    themeToggle: themeToggleIconLight
  } : {
    summarize: summarizeIconDark,
    details: detailsIconDark,
    listen: listenIconDark,
    avatar: avatarIconDark,
    remix: remixIconDark,
    share: shareIconDark,
    microphone: microphoneIconDark,
    submit: submitIconDark,
    themeToggle: themeToggleIconDark
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Close share menu when submitting a message
      setShowShareMenu(false);
      setIsLoading(true);
      setError(null);
      setIsMinimized(false);
      
      // Collapse all existing carousels before processing new message
      setChatHistory(prev => prev.map(msg => 
        msg.showCarousel ? { ...msg, carouselExpanded: false } : msg
      ));
      
      // Store the current message before clearing
      const currentMessage = message.trim();
      setMessage('');
      
      // Check for carousel triggers
      const mensTriggerTexts = [
        'mens hiking shoes',
        'men\'s hiking shoes'
      ];
      const womensTriggerTexts = [
        'womens hiking shoes',
        'women\'s hiking shoes'
      ];
      const messageToCheck = currentMessage.toLowerCase();
      const isMensCarousel = mensTriggerTexts.some(trigger => 
        messageToCheck.includes(trigger.toLowerCase())
      );
      const isWomensCarousel = womensTriggerTexts.some(trigger => 
        messageToCheck.includes(trigger.toLowerCase())
      );
      const shouldShowCarousel = isMensCarousel || isWomensCarousel;
      
      try {
        let response: string;
        let responseType: string;
        let carouselId: string | undefined;
        
        if (shouldShowCarousel) {
          // Handle carousel + text response
          console.log('🎠 Carousel triggered on submit for:', currentMessage);
          responseType = 'carousel+text';
          
          // Set carousel ID and response based on gender
          if (isWomensCarousel) {
            carouselId = 'womens-hiking';
            response = "Here are our top women's hiking shoes! Designed specifically for women's feet, these boots offer exceptional comfort, support, and performance on any terrain. Each model features waterproof construction, superior grip, and stylish designs. Find the perfect pair for your outdoor adventures.";
          } else {
            carouselId = 'mens-hiking';
            response = "Here are our top men's hiking shoes! These boots are designed for durability, comfort, and performance on any terrain. Each model features waterproof construction, superior grip, and long-lasting materials. Browse through our selection to find the perfect pair for your next adventure.";
          }
        } else {
          // Normal chat response
          responseType = 'text';
          
          // Extract page context
          const pageContext = extractPageContext();
          const contextString = formatContextForAPI(pageContext);
          
          // Send message to API with context
          response = await sendChatMessage(currentMessage, contextString);
        }
        
        // Add message to chat history
        addChatMessage(currentMessage, response, responseType, shouldShowCarousel, undefined, carouselId);
        console.log('💬 Message added to chat history, auto-show effect will handle display');
        // Remove explicit setShowAnswerBox - let useEffect handle it
      } catch (err) {
        // Handle errors
        let errorMessage: string;
        if (err instanceof APIError) {
          setError(err.message);
          errorMessage = `Error: ${err.message}`;
        } else {
          setError('An unexpected error occurred');
          errorMessage = 'Error: Failed to get response. Please try again.';
        }
        
        // Add error message to chat history
        addChatMessage(currentMessage, errorMessage, 'text', false, undefined, undefined);
        console.log('❌ Error message added to chat history, auto-show effect will handle display');
        // Remove explicit setShowAnswerBox - let useEffect handle it
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFeatureClick = async (feature: string) => {
    setIsLoading(true);
    setError(null);
    setIsMinimized(false);
    
    // Collapse all existing carousels before processing new feature
    setChatHistory(prev => prev.map(msg => 
      msg.showCarousel ? { ...msg, carouselExpanded: false } : msg
    ));
    
    try {
      let response: string;
      let responseType: string;
      let audioUrl: string | undefined;
      
      if (feature.toLowerCase() === 'listen') {
        // Special handling for listen feature with caching
        if (cachedAudioUrl) {
          // Use cached audio for instant playback
          console.log('Using cached audio for instant playback');
          response = 'Audio summary ready';
          responseType = 'audio';
          audioUrl = cachedAudioUrl;
        } else if (isPreparingAudio) {
          // Audio is still being prepared
          response = 'Audio is being prepared, please wait...';
          responseType = 'text';
        } else if (audioCacheError) {
          // Audio preparation failed, show error and fallback to real-time
          console.log('Audio cache failed, falling back to real-time generation');
          response = `Audio preparation failed: ${audioCacheError}. Generating audio now...`;
          responseType = 'text';
          
          // Try real-time generation as fallback
          const content = getContentForSummarization();
          const audioBlob = await generateAudio(content);
          const audioObjectUrl = URL.createObjectURL(audioBlob);
          
          response = 'Audio summary generated';
          responseType = 'audio';
          audioUrl = audioObjectUrl;
        } else {
          // Fallback to real-time generation
          console.log('No cached audio available, generating in real-time...');
          const content = getContentForSummarization();
          
          // Generate audio in real-time
          const audioBlob = await generateAudio(content);
          const audioObjectUrl = URL.createObjectURL(audioBlob);
          
          response = 'Audio summary generated';
          responseType = 'audio';
          audioUrl = audioObjectUrl;
        }
      } else if (feature.toLowerCase() === 'summarize') {
        // Get content to summarize
        const content = getContentForSummarization();
        response = await handleFeature('summarize', content);
        responseType = 'text';
      } else if (feature.toLowerCase() === 'details') {
        // Get full content for detailed analysis
        const content = getContentForSummarization();
        response = await handleFeature('details', content);
        responseType = 'text';
      } else if (feature.toLowerCase() === 'remix') {
        // Show coming soon message for remix feature
        response = 'Remix feature coming soon! 🎨\n\nThis feature will allow you to rephrase and rewrite content in different styles.';
        responseType = 'text';
      } else {
        // Other features
        response = await handleFeature(feature.toLowerCase(), '');
        responseType = 'text';
      }
      
      // Add feature response to chat history
      addChatMessage(`[${feature}]`, response, responseType, false, audioUrl, undefined);
      console.log('🎯 Feature response added to chat history, auto-show effect will handle display');
      // Remove explicit setShowAnswerBox - let useEffect handle it
    } catch (err) {
      // Handle errors
      let errorMessage: string;
      if (err instanceof APIError) {
        setError(err.message);
        errorMessage = `${feature}: ${err.message}`;
      } else {
        setError('An unexpected error occurred');
        errorMessage = `${feature}: Failed to activate. Please try again.`;
      }
      
      // Add error message to chat history
      addChatMessage(`[${feature}]`, errorMessage, 'text', false, undefined, undefined);
      console.log('❌ Feature error added to chat history, auto-show effect will handle display');
      // Remove explicit setShowAnswerBox - let useEffect handle it
    } finally {
      setIsLoading(false);
    }
  };

  const handleWidgetInteraction = (event?: React.MouseEvent) => {
    // Prevent event bubbling to avoid conflicts with click-outside handler
    event?.stopPropagation();
    console.log('🖱️ Widget interaction triggered, isMinimized:', isMinimized, 'chatHistory length:', chatHistory.length);
    if (isMinimized) {
      setIsMinimized(false);
      // Show answer box if there's chat history
      if (chatHistory.length > 0) {
        console.log('📂 Showing answer box due to existing chat history');
        setShowAnswerBox(true);
      }
    }
  };

  const handleShareClick = () => {
    // Close answer box first if it's open
    if (showAnswerBox) {
      setIsAnswerBoxClosing(true);
      setTimeout(() => {
        setShowAnswerBox(false);
        setIsAnswerBoxClosing(false);
        // Then show share menu
        setShowShareMenu(!showShareMenu);
      }, 300); // Match the animation duration
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleShareMenuClose = () => {
    setShowShareMenu(false);
  };

  const handleShareSuccess = (platform: string) => {
    console.log(`Successfully shared on ${platform}`);
    // You could show a toast notification here
  };

  const handleShareError = (platform: string, error: string) => {
    console.error(`Failed to share on ${platform}:`, error);
    // You could show an error notification here
  };

  // Handle microphone button click
  const handleMicrophoneClick = () => {
    console.log('Microphone button clicked');
    console.log('Speech supported:', speechSupported);
    
    if (!speechSupported) {
      console.log('Speech recognition not supported, showing error');
      setError('Speech recognition is not supported in your browser. Please use Chrome, Safari, or Edge.');
      addChatMessage('[Voice Input]', 'Speech recognition is not supported in your browser. Please use Chrome, Safari, or Edge.', 'text', false, undefined, undefined);
      setShowAnswerBox(true);
      return;
    }

    if (isRecording) {
      console.log('Stopping recording');
      stopRecording();
    } else {
      console.log('Starting recording');
      clearTranscript();
      setError(null);
      startRecording();
    }
  };

  return (
    <>
      {showAnswerBox && (
        <div ref={answerBoxRef} className={`answer-box ${theme} ${isAnswerBoxClosing ? 'closing' : ''}`}>
          <div className="answer-content" ref={chatHistoryRef}>
            {/* Chat History */}
            {chatHistory.map((chatMsg, index) => {
              console.log('🎨 Rendering message:', chatMsg.id, 'User:', chatMsg.userMessage);
              return (
              <div key={`${chatMsg.id}-${index}`} className="chat-message">
                {/* User Message */}
                <div className="user-message">
                  <div className="message-bubble user-bubble">
                    {chatMsg.userMessage}
                  </div>
                </div>
                
                {/* Full-width Carousel (outside bubble) */}
                {chatMsg.showCarousel && (
                  <div className="carousel-full-width">
                    <ProductCarouselV2 
                      theme={theme} 
                      isVisible={true}
                      carouselId={chatMsg.carouselId}
                    />
                  </div>
                )}
                
                {/* Bot Response (only if there's text content) */}
                {chatMsg.response && (
                  <div className="bot-message">
                    <div className="message-bubble bot-bubble">
                      <div className="response-section">
                        {chatMsg.responseType === 'audio' && chatMsg.audioUrl ? (
                          <AudioPlayer 
                            audioUrl={chatMsg.audioUrl} 
                            theme={theme}
                            onError={(error) => {
                              setError(error);
                              console.error('Audio player error:', error);
                            }}
                          />
                        ) : (
                          <p>{chatMsg.response}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              );
            })}
            
            {/* Loading indicator for new messages */}
            {isLoading && (
              <div className="chat-message">
                <div className="bot-message">
                  <div className="message-bubble bot-bubble">
                    <p className="loading-text">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div 
        ref={widgetRef} 
        className={`widget-container ${theme} ${isMinimized ? 'minimized' : 'expanded'}`}
        onClick={handleWidgetInteraction}
      >
        {/* Minimized content */}
        <div className="minimized-content">
          <span className="minimized-text">Ask anything</span>
        </div>

        {/* Expanded content */}
        <form className="chat-bar" onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              className="chat-input"
              placeholder={isRecording ? 'Listening...' : 'Ask anything'}
              value={isRecording ? transcript || message : message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
              disabled={isLoading || isRecording}
            />
          </div>
        
        <div className="function-buttons">
          <div className="buttons-left">
            <button type="button" className="icon-button" aria-label="Summarize" onClick={() => handleFeatureClick('Summarize')} disabled={isLoading}>
              <img src={icons.summarize} alt="Summarize" width="18" height="18" />
            </button>
            
            <button type="button" className="icon-button" aria-label="Details" onClick={() => handleFeatureClick('Details')} disabled={isLoading}>
              <img src={icons.details} alt="Details" width="18" height="18" />
            </button>
            
            <button 
              type="button" 
              className="icon-button" 
              aria-label="Listen" 
              onClick={() => handleFeatureClick('Listen')} 
              disabled={isLoading}
              title="Listen to summary"
            >
              <img src={icons.listen} alt="Listen" width="18" height="18" />
            </button>
            
            <button type="button" className="icon-button" aria-label="Avatar" onClick={() => handleFeatureClick('Avatar')} disabled={isLoading}>
              <img src={icons.avatar} alt="Avatar" width="18" height="18" />
            </button>
            
            <button type="button" className="icon-button" aria-label="Remix" onClick={() => handleFeatureClick('Remix')} disabled={isLoading}>
              <img src={icons.remix} alt="Remix" width="18" height="18" />
            </button>
            
            <button type="button" className="icon-button" aria-label="Share" onClick={handleShareClick} disabled={isLoading}>
              <img src={icons.share} alt="Share" width="18" height="18" />
            </button>
          </div>
          
          <div className="buttons-right">
            <button type="button" className="icon-button" aria-label="Toggle theme" onClick={toggleTheme}>
              <img src={icons.themeToggle} alt="Theme" width="18" height="18" />
            </button>
            
            <button 
              type="button" 
              className={`icon-button ${isRecording ? 'recording' : ''} ${isSpeaking ? 'speaking' : ''} ${!speechSupported ? 'disabled' : ''}`}
              aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
              onClick={handleMicrophoneClick}
              disabled={isLoading}
              title={
                !speechSupported 
                  ? 'Speech recognition not supported - click to see error' 
                  : isRecording 
                    ? 'Click to stop recording' 
                    : 'Click to start voice input'
              }
            >
              <img src={icons.microphone} alt="Microphone" width="18" height="18" />
              {isRecording && <div className="recording-indicator"></div>}
            </button>
            
            <button type="submit" className="send-button" aria-label="Send message" disabled={isLoading}>
              <img src={icons.submit} alt="Send" width="18" height="18" />
            </button>
          </div>
        </div>
      </form>
    </div>
    
    {/* Share Menu */}
    <div ref={shareMenuRef}>
      <ShareMenu 
        isVisible={showShareMenu}
        onClose={handleShareMenuClose}
        onSuccess={handleShareSuccess}
        onError={handleShareError}
        theme={theme}
      />
    </div>
    
    {/* Cart Sidebar */}
    <CartSidebar theme={theme} ref={cartSidebarRef} />
    </>
  );
};

export default ChatBar;