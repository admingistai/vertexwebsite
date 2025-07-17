import React, { useEffect, useRef, forwardRef } from 'react';
import { useCart } from '../hooks/useCart';

interface CartSidebarProps {
  theme: 'light' | 'dark';
}

const CartSidebar = forwardRef<HTMLDivElement, CartSidebarProps>(({ theme }, ref) => {
  const { state, removeItem, updateQuantity, clearCart, closeCart } = useCart();
  const backdropRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close cart
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if clicked outside sidebar but inside backdrop
      const sidebarElement = (ref as React.RefObject<HTMLDivElement>)?.current;
      const clickedOutsideSidebar = sidebarElement && !sidebarElement.contains(target);
      const clickedInsideBackdrop = backdropRef.current && backdropRef.current.contains(target);
      
      if (state.isOpen && clickedOutsideSidebar && clickedInsideBackdrop) {
        closeCart();
      }
    };

    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state.isOpen, closeCart]);

  // Handle escape key to close cart
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state.isOpen) {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [state.isOpen, closeCart]);

  // Handle quantity change
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  // Handle remove item
  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (!state.isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className={`cart-backdrop ${theme}`}
      />
      
      {/* Cart Sidebar */}
      <div 
        ref={ref}
        className={`cart-sidebar ${theme}`}
      >
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">CART</h2>
          <button 
            className="cart-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              closeCart();
            }}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-content">
          {state.items.length === 0 ? (
            /* Empty Cart */
            <div className="cart-empty">
              <div className="empty-cart-icon">🛒</div>
              <h3 className="empty-cart-title">Your cart is empty</h3>
              <p className="empty-cart-text">Add some items to get started!</p>
            </div>
          ) : (
            /* Cart Items */
            <>
              <div className="cart-items">
                {state.items.map((item) => (
                  <div key={item.id} className="cart-item-compact">
                    {/* Product Image */}
                    <div className="cart-item-image-compact">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/60x60/666666/ffffff?text=${encodeURIComponent(item.product.name.split(' ')[0])}`;
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="cart-item-info-compact">
                      <h4 className="cart-item-name-compact">{item.product.name}</h4>
                      <div className="cart-item-meta">
                        <span className="cart-item-price-compact">{formatPrice(item.product.price)}</span>
                      </div>
                    </div>

                    {/* Quantity and Controls */}
                    <div className="cart-item-actions-compact">
                      <div className="quantity-controls-compact">
                        <button 
                          className="quantity-btn-compact"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="quantity-display-compact">{item.quantity}</span>
                        <button 
                          className="quantity-btn-compact"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="cart-item-total-compact">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      
                      <button 
                        className="remove-item-btn-compact"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove item"
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary-compact">
                <div className="summary-row-compact">
                  <span className="summary-label-compact">Subtotal:</span>
                  <span className="summary-value-compact">{formatPrice(state.subtotal)}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="cart-actions-compact">
                  <button 
                    className="clear-cart-btn-compact"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                  <button 
                    className="checkout-btn-compact"
                    onClick={() => {
                      // Placeholder for checkout functionality
                      alert('Checkout functionality would be implemented here!');
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
});

CartSidebar.displayName = 'CartSidebar';

export default CartSidebar;