/**
 * Utilities for sharing content across different platforms and methods.
 */

export interface ShareData {
  url: string;
  title: string;
  text?: string;
}

/**
 * Copy text to clipboard with fallback support
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get current page sharing data
 */
export function getCurrentPageData(): ShareData {
  return {
    url: window.location.href,
    title: document.title || 'Check out this page',
    text: document.querySelector('meta[name="description"]')?.getAttribute('content') || 
          'I found this interesting content'
  };
}

/**
 * Copy current page link to clipboard
 */
export async function copyPageLink(): Promise<boolean> {
  const pageData = getCurrentPageData();
  return await copyToClipboard(pageData.url);
}

/**
 * Share via email
 */
export function shareViaEmail(data?: ShareData): void {
  const shareData = data || getCurrentPageData();
  const subject = encodeURIComponent(`Check out: ${shareData.title}`);
  const body = encodeURIComponent(
    `I thought you might find this interesting:\n\n${shareData.title}\n${shareData.url}\n\n${shareData.text || ''}`
  );
  
  const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
  window.open(mailtoUrl, '_self');
}

/**
 * Share on Facebook
 */
export function shareOnFacebook(data?: ShareData): void {
  const shareData = data || getCurrentPageData();
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
  
  window.open(
    facebookUrl,
    'facebook-share',
    'width=600,height=400,scrollbars=yes,resizable=yes'
  );
}

/**
 * Share on X (Twitter)
 */
export function shareOnX(data?: ShareData): void {
  const shareData = data || getCurrentPageData();
  const text = encodeURIComponent(`${shareData.title} ${shareData.url}`);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
  
  window.open(
    twitterUrl,
    'twitter-share',
    'width=600,height=400,scrollbars=yes,resizable=yes'
  );
}

/**
 * Share on Snapchat
 */
export function shareOnSnapchat(data?: ShareData): void {
  const shareData = data || getCurrentPageData();
  const snapchatUrl = `https://www.snapchat.com/share?url=${encodeURIComponent(shareData.url)}`;
  
  window.open(
    snapchatUrl,
    'snapchat-share',
    'width=600,height=400,scrollbars=yes,resizable=yes'
  );
}

/**
 * Show Instagram sharing instructions (Instagram doesn't support direct web sharing)
 */
export function showInstagramInstructions(): string {
  return 'To share on Instagram:\n1. Copy the link\n2. Open Instagram app\n3. Create a story or post\n4. Paste the link in your content';
}

/**
 * Handle Instagram "sharing" by copying link and showing instructions
 */
export async function shareOnInstagram(): Promise<boolean> {
  const copied = await copyPageLink();
  if (copied) {
    alert(showInstagramInstructions());
    return true;
  }
  return false;
}

/**
 * Generic share function that handles different platforms
 */
export async function shareOn(platform: string, data?: ShareData): Promise<boolean> {
  try {
    switch (platform.toLowerCase()) {
      case 'copy':
      case 'link':
        return await copyPageLink();
        
      case 'email':
        shareViaEmail(data);
        return true;
        
      case 'facebook':
        shareOnFacebook(data);
        return true;
        
      case 'x':
      case 'twitter':
        shareOnX(data);
        return true;
        
      case 'snapchat':
        shareOnSnapchat(data);
        return true;
        
      case 'instagram':
        return await shareOnInstagram();
        
      default:
        console.warn(`Unsupported sharing platform: ${platform}`);
        return false;
    }
  } catch (error) {
    console.error(`Failed to share on ${platform}:`, error);
    return false;
  }
}

/**
 * Check if a sharing platform is supported
 */
export function isPlatformSupported(platform: string): boolean {
  const supportedPlatforms = ['copy', 'link', 'email', 'facebook', 'x', 'twitter', 'snapchat', 'instagram'];
  return supportedPlatforms.includes(platform.toLowerCase());
}