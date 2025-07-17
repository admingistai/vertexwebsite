'use client'

import { useEffect, useState } from 'react'
import { useCart } from './cart-context'
import AddToCartPopup from './add-to-cart-popup'
import '../components/add-to-cart-popup.css'

interface CartProduct {
  id: number
  name: string
  price: number
  description: string
  colors: string[]
  image: string
}

export default function CartMessageHandler() {
  const { addToCart } = useCart()
  const [showPopup, setShowPopup] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<CartProduct | null>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only handle messages from the widget
      if (event.data.type === 'ADD_TO_CART') {
        const product = event.data.product
        
        // Convert widget product format to cart format
        const cartProduct = {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          colors: product.colors,
          image: product.image
        }
        
        // Add to cart
        addToCart(cartProduct)
        
        // Prepare popup product format
        const popupProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.category,
          colors: [product.colors > 0 ? 'Available' : 'Default'],
          image: product.image
        }
        
        // Show popup
        setCurrentProduct(popupProduct)
        setShowPopup(true)
      }
    }

    window.addEventListener('message', handleMessage)
    
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [addToCart])

  const handleClosePopup = () => {
    setShowPopup(false)
    setCurrentProduct(null)
  }

  return (
    <AddToCartPopup
      isVisible={showPopup}
      onClose={handleClosePopup}
      theme="light"
      product={currentProduct}
      unfurlDuration={3000}
    />
  )
}