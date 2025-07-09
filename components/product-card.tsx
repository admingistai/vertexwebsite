"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  salePrice?: number
  colors: number
  images: string[]
  isNew?: boolean
  isBestSeller?: boolean
  isSale?: boolean
}

interface ProductCardProps {
  product: Product
  showQuickView?: boolean
}

export default function ProductCard({ product, showQuickView = true }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1)
    }
  }

  const handleMouseLeave = () => {
    setCurrentImageIndex(0)
  }

  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div
        className="group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.images[currentImageIndex] || "/images/products/placeholder.jpg"}
            alt={product.name}
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-white text-black px-2 py-1 text-xs font-medium rounded">
                Just In
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">
                Best Seller
              </span>
            )}
            {product.isSale && discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Quick shop button */}
          {showQuickView && (
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  addToCart({
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.salePrice || product.price,
                    colors: product.colors,
                    image: product.images[0] || "/images/products/placeholder.jpg",
                  })
                }}
                className="w-full bg-white text-black hover:bg-gray-100 rounded-full"
              >
                Quick Shop
              </Button>
            </div>
          )}

          {/* Image dots indicator */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm">{product.category}</p>
          <p className="text-gray-600 text-sm">{product.colors} Colors</p>
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <p className="font-medium text-red-500">${product.salePrice}</p>
                <p className="text-gray-500 line-through text-sm">${product.price}</p>
              </>
            ) : (
              <p className="font-medium text-gray-900">${product.price}</p>
            )}
          </div>
        </div>

        {/* Color swatches */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: Math.min(product.colors, 4) }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border border-gray-300 ${
                i === 0
                  ? "bg-black"
                  : i === 1
                  ? "bg-white"
                  : i === 2
                  ? "bg-gray-500"
                  : "bg-blue-500"
              }`}
            />
          ))}
          {product.colors > 4 && (
            <span className="text-xs text-gray-500 ml-1">+{product.colors - 4}</span>
          )}
        </div>
      </div>
    </Link>
  )
}