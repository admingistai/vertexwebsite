import React, { useState, useEffect, useRef } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  colors: string[];
  image: string;
}

interface AddToCartPopupProps {
  isVisible: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  product: Product | null;
  unfurlDuration?: number;
}

const AddToCartPopup = React.forwardRef<HTMLDivElement, AddToCartPopupProps>(
  ({ isVisible, onClose, theme, product, unfurlDuration = 3000 }, ref) => {
    const [isUnfurled, setIsUnfurled] = useState(true);
    const [unfurledHeight, setUnfurledHeight] = useState<number>(200);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    // Calculate unfurled height based on image dimensions
    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      const container = imageContainerRef.current;
      
      if (img && container) {
        const containerWidth = 200;
        const imageAspectRatio = img.naturalHeight / img.naturalWidth;
        const calculatedHeight = containerWidth * imageAspectRatio;
        
        // Respect max-height of 300px
        const finalHeight = Math.min(calculatedHeight, 300);
        setUnfurledHeight(finalHeight);
      }
    };

    // Auto-transition from unfurled to compact state
    useEffect(() => {
      if (!isVisible) {
        setIsUnfurled(true); // Reset to unfurled when hidden
        return;
      }

      const timer = setTimeout(() => {
        setIsUnfurled(false);
      }, unfurlDuration);

      return () => clearTimeout(timer);
    }, [isVisible, unfurlDuration]);

    if (!isVisible || !product) return null;

    return (
      <div 
        ref={ref} 
        className={`add-to-cart-popup-container ${theme}`}
        style={{ '--unfurled-height': `${unfurledHeight}px` } as React.CSSProperties}
      >
        <div className="add-to-cart-popup-content">
          <button 
            className="add-to-cart-popup-close"
            onClick={onClose}
            aria-label="Close popup"
          >
            ×
          </button>
          
          <div 
            ref={imageContainerRef}
            className={`add-to-cart-popup-image ${isUnfurled ? 'unfurled' : 'compact'}`}
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="add-to-cart-image"
              onLoad={handleImageLoad}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/200x200/666666/ffffff?text=${encodeURIComponent(product.name.split(' ')[0])}`;
              }}
            />
          </div>
          
          <div className="add-to-cart-popup-body">
            <div>
              <div className="add-to-cart-success">
                <span className="success-icon">✓</span>
                <span className="success-text">Added to Cart!</span>
              </div>
              
              <h3 className="add-to-cart-title">{product.name}</h3>
              <p className="add-to-cart-description">{product.description}</p>
              
              <div className="add-to-cart-details">
                <div className="add-to-cart-detail">✓ Color: {product.colors[0] || 'Default'}</div>
                <div className="add-to-cart-detail">✓ Quantity: 1</div>
                <div className="add-to-cart-detail">✓ Size: One Size</div>
              </div>
            </div>
            
            <div>
              <div className="add-to-cart-pricing">
                <span className="add-to-cart-price-label">Price:</span>
                <span className="add-to-cart-price">${product.price}</span>
              </div>
              
              <div className="add-to-cart-buttons">
                <button 
                  className="add-to-cart-view-cart"
                  onClick={() => {
                    // Navigate to cart page or open cart drawer
                    console.log('View cart clicked');
                  }}
                >
                  View Cart
                </button>
                
                <button 
                  className="add-to-cart-continue"
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AddToCartPopup.displayName = 'AddToCartPopup';

export default AddToCartPopup;