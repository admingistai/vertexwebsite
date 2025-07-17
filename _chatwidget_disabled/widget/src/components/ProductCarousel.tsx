//product carousel
import React, { useRef, useState, useEffect, useCallback } from 'react';

console.log('🎠 ProductCarousel.tsx file loaded!');

// Color mapping utility
const getColorValue = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    // Basic colors
    'Black': '#000000',
    'White': '#FFFFFF',
    'Brown': '#8B4513',
    'Grey': '#808080',
    'Gray': '#808080',
    
    // Brand/Fashion colors
    'Navy': '#000080',
    'Charcoal': '#36454F',
    'Olive': '#808000',
    
    // Nature colors
    'Forest Green': '#228B22',
    'Desert Tan': '#EDC9AF',
    'Sage Green': '#9CAF88',
    'Moss Green': '#8A9A5B',
    
    // Vibrant colors
    'Rose Gold': '#E8B4B8',
    'Lavender': '#E6E6FA',
    'Coral': '#FF7F50',
    'Teal': '#008080',
    'Plum': '#DDA0DD',
    'Pink': '#FFC0CB',
    'Turquoise': '#40E0D0',
    'Dusty Rose': '#DCAE96',
    'Sky Blue': '#87CEEB',
    'Mint': '#98FB98',
    'Mauve': '#E0B0FF',
    'Pearl Grey': '#C0C0C0',
    'Blush': '#DE5D83',
    'Lavender Grey': '#C4C3D0',
    'Berry': '#8E4585',
    'Stone Grey': '#928E85',
    'Copper': '#B87333',
    'Burnt Orange': '#CC5500',
    'Khaki': '#F0E68C',
    'Slate Grey': '#708090',
    'Tan': '#D2B48C',
    
    // Additional colors
    'Red': '#DC143C',
    'Blue': '#0000FF',
    
    // Multi-color combinations (using first color)
    'Black/Red': '#000000',
    'Grey/Blue': '#808080',
    'Pink/Grey': '#FFC0CB',
    'Turquoise/White': '#40E0D0',
  };
  
  return colorMap[colorName] || '#CCCCCC'; // Default gray if color not found
};

// Check if color is a combination
const isMultiColor = (colorName: string): boolean => {
  return colorName.includes('/');
};

// Get gradient for multi-colors
const getMultiColorStyle = (colorName: string): React.CSSProperties => {
  const colors = colorName.split('/').map(c => c.trim());
  if (colors.length === 2) {
    return {
      background: `linear-gradient(45deg, ${getColorValue(colors[0])} 50%, ${getColorValue(colors[1])} 50%)`
    };
  }
  return { backgroundColor: getColorValue(colorName) };
};

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  colors: string[];
  image: string;
}

interface ProductCarouselProps {
  theme: 'light' | 'dark';
  isVisible: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  carouselId?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  theme, 
  isVisible, 
  isExpanded = true, 
  onToggle, 
  carouselId 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Scroll states - not currently used but kept for future use
  // const [canScrollLeft, setCanScrollLeft] = useState(false);
  // const [canScrollRight, setCanScrollRight] = useState(true);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  
  // Debug logging
  console.log('🎠 ProductCarousel render:', { theme, isVisible, isExpanded, carouselId });

  // Men's hiking shoes product data
  const mensHikingProducts: Product[] = [
    {
      id: 6, // Terra Guide ID in main database
      name: 'Terra Guide All-Terrain',
      price: 165,
      description: 'Rugged hiking boots built for any terrain',
      colors: ['Black', 'Desert Tan', 'Forest Green'],
      image: '/images/products/terra-guide.jpg'
    },
    {
      id: 1, // Summit Pro ID in main database
      name: 'Summit Pro GTX',
      price: 189,
      description: 'Waterproof hiking boots for serious adventurers',
      colors: ['Charcoal', 'Navy', 'Brown'],
      image: '/images/products/summit-pro.jpg'
    },
    {
      id: 3, // Apex Runner ID
      name: 'Trail Runner XT',
      price: 145,
      description: 'Lightweight trail running shoes for speed',
      colors: ['Black/Red', 'Grey/Blue'],
      image: '/images/products/apex-runner.jpg'
    },
    {
      id: 9, // Storm Shield ID
      name: 'Alpine Explorer',
      price: 175,
      description: 'Technical hiking boots for mountain adventures',
      colors: ['Brown', 'Black'],
      image: '/images/products/storm-shield.jpg'
    },
    {
      id: 11, // Urban Forge ID
      name: 'Vertex Peak Master',
      price: 195,
      description: 'Premium hiking boots for peak performance',
      colors: ['Black', 'Olive', 'Grey'],
      image: '/images/products/urban-forge.jpg'
    },
    {
      id: 7, // Sky Dancer ID
      name: 'Ridge Walker Pro',
      price: 159,
      description: 'Versatile hiking shoes for all-day comfort',
      colors: ['Tan', 'Slate Grey', 'Moss Green'],
      image: '/images/products/sky-dancer.jpg'
    },
    {
      id: 10, // Using an available ID for sport.jpg
      name: 'Canyon Trekker Elite',
      price: 199,
      description: 'Ultra-durable boots for extreme conditions',
      colors: ['Burnt Orange', 'Charcoal', 'Khaki'],
      image: '/images/products/sport.jpg'
    }
  ];

  // Women's hiking shoes product data
  const womensHikingProducts: Product[] = [
    {
      id: 301, // Women's product ID
      name: 'Terra Trail Women\'s',
      price: 155,
      description: 'Lightweight women\'s hiking boots with superior comfort',
      colors: ['Rose Gold', 'Lavender', 'Sage Green'],
      image: '/images/products/womans1.jpg'
    },
    {
      id: 302, // Women's product ID
      name: 'Summit Lady GTX',
      price: 179,
      description: 'Waterproof women\'s hiking boots for all weather',
      colors: ['Coral', 'Teal', 'Plum'],
      image: '/images/products/womans2.jpg'
    },
    {
      id: 303, // Women's product ID
      name: 'Trail Blazer Women\'s',
      price: 139,
      description: 'Fast and light women\'s trail running shoes',
      colors: ['Pink/Grey', 'Turquoise/White'],
      image: '/images/products/womans3.jpg'
    },
    {
      id: 304, // Women's product ID
      name: 'Alpine Rose Explorer',
      price: 169,
      description: 'Technical women\'s boots for mountain hiking',
      colors: ['Dusty Rose', 'Sky Blue', 'Mint'],
      image: '/images/products/luna-rise.jpg'
    },
    {
      id: 305, // Women's product ID
      name: 'Vertex Lady Peak',
      price: 185,
      description: 'Premium women\'s hiking boots with ankle support',
      colors: ['Mauve', 'Pearl Grey', 'Forest Green'],
      image: '/images/products/sky-dancer.jpg'
    },
    {
      id: 306, // Women's product ID
      name: 'Ridge Walker Women\'s',
      price: 149,
      description: 'Versatile women\'s hiking shoes for day hikes',
      colors: ['Blush', 'Lavender Grey', 'Olive'],
      image: '/images/products/pink.jpg'
    },
    {
      id: 307, // Women's product ID
      name: 'Canyon Queen Elite',
      price: 189,
      description: 'Women\'s boots for extreme terrain and conditions',
      colors: ['Berry', 'Stone Grey', 'Copper'],
      image: '/images/products/dali.jpg'
    }
  ];

  // Select products based on carouselId
  const products = carouselId?.includes('women') ? womensHikingProducts : mensHikingProducts;
  
  // Dynamic carousel title based on carouselId
  const carouselTitle = carouselId?.includes('women') ? "Women's Hiking Shoes" : "Men's Hiking Shoes";

  // Constants for carousel calculations - make responsive
  // const getCardDimensions = () => {
  //   if (typeof window !== 'undefined') {
  //     if (window.innerWidth <= 480) {
  //       return { width: 140, gap: 16 }; // Mobile
  //     } else if (window.innerWidth <= 768) {
  //       return { width: 160, gap: 16 }; // Tablet
  //     }
  //   }
  //   return { width: 180, gap: 16 }; // Desktop
  // };
  
  // const { width: CARD_WIDTH, gap: CARD_GAP } = getCardDimensions();
  // const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;

  // Update navigation state based on scroll position
  const updateNavigationState = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    
    // Update button states - commented out as not currently used
    // setCanScrollLeft(scrollLeft > 0);
    // setCanScrollRight(scrollLeft < maxScroll - 10); // Small buffer for rounding
    
    console.log('🎠 Scroll position:', { scrollLeft, maxScroll });
  }, []);

  // Add scroll event listener and reset state when view changes
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Reset scroll position when switching views
    scrollElement.scrollLeft = 0;
    
    // Initial state check
    updateNavigationState();

    // Add scroll listener
    scrollElement.addEventListener('scroll', updateNavigationState);
    
    // Also update on resize
    const resizeObserver = new ResizeObserver(updateNavigationState);
    resizeObserver.observe(scrollElement);

    return () => {
      scrollElement.removeEventListener('scroll', updateNavigationState);
      resizeObserver.disconnect();
    };
  }, [isExpanded, updateNavigationState]); // Re-run when expanded state changes

  // Scroll functions - not currently used but kept for future use
  // const scrollLeft = () => {
  //   if (scrollRef.current && canScrollLeft) {
  //     scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollRef.current && canScrollRight) {
  //     scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  //   }
  // };

  // Handle card flip
  const handleCardFlip = (productId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setFlippedCards(prev => {
      const newFlipped = new Set(prev);
      if (newFlipped.has(productId)) {
        newFlipped.delete(productId);
      } else {
        newFlipped.add(productId);
      }
      return newFlipped;
    });
  };

  // Handle product click navigation
  const handleProductClick = (productId: number, event?: React.MouseEvent) => {
    // Prevent event from bubbling to carousel click handler
    event?.stopPropagation();
    console.log('🛍️ Navigating to product:', productId);
    // Open product page in new tab to preserve chat context
    window.open(`/product/${productId}`, '_blank');
  };

  // Handle add to cart functionality
  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    
    console.log('🛒 Adding to cart:', product);
    
    // Send message to parent window to add to cart
    if (window.parent) {
      window.parent.postMessage({
        type: 'ADD_TO_CART',
        product: {
          id: product.id,
          name: product.name,
          category: product.description,
          price: product.price,
          colors: product.colors.length,
          image: product.image
        }
      }, '*');
    }
  };

  // Handle card click (separate from flip and product navigation)
  const handleCardClick = (productId: number, event: React.MouseEvent) => {
    // Check if click was on flip indicator or view details button
    const target = event.target as HTMLElement;
    const isFlipControl = target.closest('.flip-indicator') || target.closest('.view-details-btn') || target.closest('.flip-back-btn');
    
    if (!isFlipControl) {
      handleProductClick(productId, event);
    }
  };

  if (!isVisible) {
    console.log('🎠 ProductCarousel hidden - isVisible is false');
    return null;
  }
  
  console.log('🎠 ProductCarousel rendering - isVisible is true');

  // Handle click on collapsed carousel
  const handleCollapsedClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('🎠 Collapsed carousel clicked, expanding...');
    onToggle?.();
  };

  // Render collapsed view - Show 3 full product cards
  if (!isExpanded) {
    // Show only first 3 products in collapsed view
    const collapsedProducts = products.slice(0, 3);
    
    return (
      <div 
        className={`product-carousel ${theme} collapsed`} 
        onClick={(e) => handleCollapsedClick(e)}
      >
        <div className="carousel-header">
          <h3 className="carousel-title">{carouselTitle}</h3>
          <span className="expand-hint">Click to see all</span>
        </div>
        
        <div className="carousel-container">
          <div className="carousel-track">
            {collapsedProducts.map((product) => {
              const isFlipped = flippedCards.has(product.id);
              return (
              <div 
                key={product.id} 
                className={`product-card ${isFlipped ? 'flipped' : ''}`}
                onClick={(e) => handleCardClick(product.id, e)}
              >
                <div className="product-card-inner">
                  {/* Front of card */}
                  <div className="product-card-front">
                    <div 
                      className="flip-indicator"
                      onClick={(e) => handleCardFlip(product.id, e)}
                      title="View details"
                    >
                      ↻
                    </div>
                    
                    <div className="product-image">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/180x120/666666/ffffff?text=${encodeURIComponent(product.name.split(' ')[0])}`;
                        }}
                      />
                      
                      {/* Shopping Cart Icon */}
                      <div 
                        className="cart-icon"
                        onClick={(e) => handleAddToCart(product, e)}
                        title="Add to cart"
                      >
                        🛒
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-description">{product.description}</p>
                      <div className="product-price">${product.price}</div>
                      
                      <div className="color-options">
                        <span className="color-label">Colors:</span>
                        <div className="color-list">
                          {product.colors.map((color, index) => (
                            <div 
                              key={index} 
                              className="color-swatch"
                              style={isMultiColor(color) ? getMultiColorStyle(color) : { backgroundColor: getColorValue(color) }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        className="view-details-btn"
                        onClick={(e) => handleCardFlip(product.id, e)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="product-card-back">
                    <div className="product-details">
                      <div className="detail-section">
                        <h5>Technical Specs</h5>
                        <p>• Waterproof Gore-Tex construction</p>
                        <p>• Vibram outsole for superior grip</p>
                        <p>• EVA midsole cushioning</p>
                        <p>• Reinforced toe and heel</p>
                      </div>
                      
                      <div className="detail-section">
                        <h5>Available Colors</h5>
                        <div className="color-list">
                          {product.colors.map((color, index) => (
                            <div 
                              key={index} 
                              className="color-swatch"
                              style={isMultiColor(color) ? getMultiColorStyle(color) : { backgroundColor: getColorValue(color) }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="detail-section">
                        <h5>Customer Rating</h5>
                        <div className="rating-stars">★★★★☆</div>
                        <p>4.2/5 based on 1,247 reviews</p>
                      </div>
                    </div>
                    
                    <button 
                      className="flip-back-btn"
                      onClick={(e) => handleCardFlip(product.id, e)}
                    >
                      ← Back to Product
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Render expanded view - Show all products as thumbnails
  return (
    <div className={`product-carousel ${theme} expanded`}>
      <div className="carousel-header expanded">
        <h4 className="carousel-title">{carouselTitle}</h4>
        <span className="expand-hint">Click to collapse</span>
      </div>
      
      <div className="product-thumbnails">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-thumbnail"
            onClick={(e) => handleProductClick(product.id, e)}
            style={{ cursor: 'pointer' }}
          >
            <div className="thumbnail-image-container">
              <img 
                className="thumbnail-image"
                src={product.image} 
                alt={product.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/60x60/666666/ffffff?text=${encodeURIComponent(product.name.split(' ')[0])}`;
                }}
              />
              <div 
                className="thumbnail-cart-icon"
                onClick={(e) => handleAddToCart(product, e)}
                title="Add to cart"
              >
                🛒
              </div>
            </div>
            <span className="thumbnail-name">{product.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;