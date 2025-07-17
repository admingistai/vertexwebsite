/**
 * Utilities for automatically detecting website theme (light/dark) 
 * to set the widget theme accordingly.
 */

export type DetectedTheme = 'light' | 'dark';

/**
 * Convert RGB color string to RGB values
 */
function parseRgbColor(colorStr: string): [number, number, number] | null {
  // Handle rgb() and rgba() formats
  const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
  }
  
  // Handle hex colors
  if (colorStr.startsWith('#')) {
    const hex = colorStr.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16)
      ];
    } else if (hex.length === 6) {
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16)
      ];
    }
  }
  
  return null;
}

/**
 * Calculate perceived brightness of a color using the luminance formula
 */
function getColorBrightness(r: number, g: number, b: number): number {
  // Use the standard luminance formula
  return (0.299 * r + 0.587 * g + 0.114 * b);
}

/**
 * Get the computed background color of an element
 */
function getElementBackground(element: Element): string {
  const computed = window.getComputedStyle(element);
  return computed.backgroundColor;
}

/**
 * Check if a background color indicates a dark theme
 */
function isBackgroundDark(backgroundColor: string): boolean | null {
  // Handle transparent or inherit values
  if (backgroundColor === 'transparent' || backgroundColor === 'inherit' || backgroundColor === 'initial') {
    return null;
  }
  
  const rgb = parseRgbColor(backgroundColor);
  if (!rgb) return null;
  
  const brightness = getColorBrightness(rgb[0], rgb[1], rgb[2]);
  // Use 128 as threshold (50% of 255)
  return brightness < 128;
}

/**
 * Check for common dark mode classes on the document
 */
function checkDarkModeClasses(): boolean | null {
  const darkModeClasses = [
    'dark',
    'dark-mode',
    'theme-dark',
    'dark-theme',
    'night-mode',
    'night'
  ];
  
  const htmlElement = document.documentElement;
  const bodyElement = document.body;
  
  for (const className of darkModeClasses) {
    if (htmlElement.classList.contains(className) || bodyElement.classList.contains(className)) {
      return true;
    }
  }
  
  return null;
}

/**
 * Check CSS custom properties for dark mode indicators
 */
function checkCSSCustomProperties(): boolean | null {
  const root = document.documentElement;
  const computedStyle = window.getComputedStyle(root);
  
  // Common CSS custom properties that might indicate theme
  const darkModeVariables = [
    '--background-color',
    '--bg-color',
    '--primary-bg',
    '--theme-background'
  ];
  
  for (const varName of darkModeVariables) {
    const value = computedStyle.getPropertyValue(varName).trim();
    if (value) {
      const isDark = isBackgroundDark(value);
      if (isDark !== null) {
        return isDark;
      }
    }
  }
  
  return null;
}

/**
 * Check the browser's preferred color scheme
 */
function checkPreferredColorScheme(): boolean | null {
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return false;
    }
  }
  return null;
}

/**
 * Sample background colors from multiple elements to get the dominant theme
 */
function sampleElementBackgrounds(): boolean | null {
  const elementsToCheck = [
    document.body,
    document.documentElement,
    document.querySelector('main'),
    document.querySelector('article'),
    document.querySelector('.content'),
    document.querySelector('#content'),
    document.querySelector('header'),
    document.querySelector('.header')
  ].filter(Boolean) as Element[];
  
  const results: boolean[] = [];
  
  for (const element of elementsToCheck) {
    const bgColor = getElementBackground(element);
    const isDark = isBackgroundDark(bgColor);
    if (isDark !== null) {
      results.push(isDark);
    }
  }
  
  if (results.length === 0) return null;
  
  // Return the most common result
  const darkCount = results.filter(Boolean).length;
  const lightCount = results.length - darkCount;
  
  return darkCount > lightCount;
}

/**
 * Main function to detect the website's theme
 */
export function detectWebsiteTheme(): DetectedTheme {
  try {
    // Method 1: Check for explicit dark mode classes
    const classResult = checkDarkModeClasses();
    if (classResult !== null) {
      return classResult ? 'dark' : 'light';
    }
    
    // Method 2: Check CSS custom properties
    const cssVarResult = checkCSSCustomProperties();
    if (cssVarResult !== null) {
      return cssVarResult ? 'dark' : 'light';
    }
    
    // Method 3: Sample background colors from key elements
    const samplingResult = sampleElementBackgrounds();
    if (samplingResult !== null) {
      return samplingResult ? 'dark' : 'light';
    }
    
    // Method 4: Fall back to browser preference
    const preferenceResult = checkPreferredColorScheme();
    if (preferenceResult !== null) {
      return preferenceResult ? 'dark' : 'light';
    }
    
    // Final fallback: assume light theme
    return 'light';
    
  } catch (error) {
    console.warn('Theme detection failed:', error);
    return 'light';
  }
}

/**
 * Detect theme with caching to avoid repeated calculations
 */
let cachedTheme: DetectedTheme | null = null;

export function detectWebsiteThemeWithCache(): DetectedTheme {
  if (cachedTheme === null) {
    cachedTheme = detectWebsiteTheme();
  }
  return cachedTheme;
}

/**
 * Clear the theme detection cache (useful for testing or dynamic theme changes)
 */
export function clearThemeDetectionCache(): void {
  cachedTheme = null;
}