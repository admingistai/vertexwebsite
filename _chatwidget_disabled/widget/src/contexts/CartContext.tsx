import React, { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartState, CartAction, CartContextType, Product, CartItem } from '../types/cart';

// Initial cart state
const initialCartState: CartState = {
  items: [],
  isOpen: false,
  itemCount: 0,
  subtotal: 0,
};

// Cart reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, selectedColor } = action.payload;
      const cartItemId = `${product.id}-${selectedColor || 'default'}`;
      
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(item => item.id === cartItemId);
      
      let updatedItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: cartItemId,
          product,
          quantity: 1,
          selectedColor,
          addedAt: new Date(),
        };
        updatedItems = [...state.items, newItem];
      }
      
      // Calculate totals
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
      const subtotal = updatedItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      
      return {
        ...state,
        items: updatedItems,
        itemCount,
        subtotal,
        isOpen: true, // Auto-open cart when item is added
      };
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
      const subtotal = updatedItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      
      return {
        ...state,
        items: updatedItems,
        itemCount,
        subtotal,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
      const subtotal = updatedItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      
      return {
        ...state,
        items: updatedItems,
        itemCount,
        subtotal,
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        itemCount: 0,
        subtotal: 0,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };
    
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };
    
    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
}

// Create cart context
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('widget-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Ensure dates are properly restored
        const restoredCart = {
          ...parsedCart,
          items: parsedCart.items.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt),
          })),
        };
        dispatch({ type: 'LOAD_CART', payload: restoredCart });
      } catch (error) {
        console.warn('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('widget-cart', JSON.stringify(state));
  }, [state]);

  // Helper functions
  const addItem = (product: Product, selectedColor?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, selectedColor } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const contextValue: CartContextType = {
    state,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};