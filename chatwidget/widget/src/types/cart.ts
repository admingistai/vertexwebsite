// Cart-related TypeScript interfaces and types

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  colors: string[];
  image: string;
}

export interface CartItem {
  id: string; // Unique cart item ID (product.id + selected options)
  product: Product;
  quantity: number;
  selectedColor?: string;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; selectedColor?: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

export interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product, selectedColor?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}