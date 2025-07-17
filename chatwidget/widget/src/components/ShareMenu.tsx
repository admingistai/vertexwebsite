import React from 'react';
import { shareOn } from '../utils/sharing';

interface ShareOption {
  id: string;
  label: string;
  icon: string;
  color: string;
}

interface ShareMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess?: (platform: string) => void;
  onError?: (platform: string, error: string) => void;
  theme: 'light' | 'dark';
}

const shareOptions: ShareOption[] = [
  {
    id: 'copy',
    label: 'Copy Link',
    icon: '🔗',
    color: '#6b7280'
  },
  {
    id: 'email',
    label: 'Share with Email',
    icon: '📧',
    color: '#3b82f6'
  },
  {
    id: 'facebook',
    label: 'Share with Facebook',
    icon: '📘',
    color: '#1877f2'
  },
  {
    id: 'x',
    label: 'Share with X',
    icon: '🐦',
    color: '#000000'
  },
  {
    id: 'snapchat',
    label: 'Share with Snapchat',
    icon: '👻',
    color: '#fffc00'
  },
  {
    id: 'instagram',
    label: 'Share with Instagram',
    icon: '📷',
    color: '#e4405f'
  }
];

const ShareMenu: React.FC<ShareMenuProps> = ({
  isVisible,
  onClose,
  onSuccess,
  onError,
  theme
}) => {
  const handleOptionClick = async (option: ShareOption) => {
    try {
      const success = await shareOn(option.id);
      
      if (success) {
        onSuccess?.(option.label);
        
        // Show brief success feedback for copy operations
        if (option.id === 'copy') {
          // You could show a toast notification here
          console.log('Link copied to clipboard!');
        }
      } else {
        onError?.(option.label, 'Failed to share');
      }
    } catch (error) {
      onError?.(option.label, error instanceof Error ? error.message : 'Unknown error');
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`share-menu ${theme}`}>
      <div className="share-menu-header">
        <span className="share-menu-title">Share this page</span>
        <button 
          className="share-menu-close"
          onClick={onClose}
          aria-label="Close share menu"
        >
          ✕
        </button>
      </div>
      
      <div className="share-options">
        {shareOptions.map((option) => (
          <button
            key={option.id}
            className="share-option"
            onClick={() => handleOptionClick(option)}
            style={{ '--option-color': option.color } as React.CSSProperties}
          >
            <span className="share-option-icon">{option.icon}</span>
            <span className="share-option-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShareMenu;