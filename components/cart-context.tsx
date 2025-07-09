"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  colors: number
  image: string
  isNew?: boolean
  isBestSeller?: boolean
  brand?: string
}

interface CartContextType {
  cartCount: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product])
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.length

  return (
    <CartContext.Provider value={{ cartCount, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
