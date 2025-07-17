import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import type { CartContextType } from '../types/cart';

/**
 * Custom hook to access cart context
 * Provides easy access to cart state and actions
 * 
 * @returns CartContextType with state and actions
 * @throws Error if used outside CartProvider
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

export default useCart;