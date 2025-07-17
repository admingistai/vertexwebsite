/**
 * Utilities for extracting context from the current webpage.
 */

interface PageContext {
  url: string;
  title: string;
  description: string;
  mainContent: string;
  selectedText?: string;
}

/**
 * Get meta description from the page.
 */
function getMetaDescription(): string {
  const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
  return metaDesc?.content || ogDesc?.content || '';
}

/**
 * Extract main text content from the page.
 * Limits to reasonable length to avoid token limits.
 */
function getMainContent(maxLength: number = 2000): string {
  // Try to find main content areas
  const contentSelectors = [
    'main',
    'article',
    '[role="main"]',
    '.content',
    '#content',
    '.post',
    '.entry-content',
    'body'
  ];

  let content = '';
  
  for (const selector of contentSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      // Get text content, remove extra whitespace
      content = element.textContent?.trim().replace(/\s+/g, ' ') || '';
      if (content.length > 100) { // Found substantial content
        break;
      }
    }
  }

  // Limit content length
  if (content.length > maxLength) {
    content = content.substring(0, maxLength) + '...';
  }

  return content;
}

/**
 * Get currently selected text on the page.
 */
function getSelectedText(): string {
  return window.getSelection()?.toString().trim() || '';
}

/**
 * Extract comprehensive page context.
 */
export function extractPageContext(): PageContext {
  return {
    url: window.location.href,
    title: document.title,
    description: getMetaDescription(),
    mainContent: getMainContent(),
    selectedText: getSelectedText()
  };
}

/**
 * Format context for sending to the API.
 */
export function formatContextForAPI(context: PageContext): string {
  let formatted = `Page: ${context.title}\nURL: ${context.url}`;
  
  if (context.description) {
    formatted += `\nDescription: ${context.description}`;
  }
  
  if (context.selectedText) {
    formatted += `\n\nSelected text: "${context.selectedText}"`;
  } else if (context.mainContent) {
    formatted += `\n\nPage content preview: ${context.mainContent.substring(0, 1000)}...`;
  }
  
  return formatted;
}

/**
 * Get context specifically for summarization.
 */
export function getContentForSummarization(): string {
  const context = extractPageContext();
  
  // If there's selected text, summarize that
  if (context.selectedText && context.selectedText.length > 50) {
    return context.selectedText;
  }
  
  // Otherwise, use the main content
  return context.mainContent || `${context.title}\n${context.description}`;
}