"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"

interface ProductGridProps {
  onViewAll: () => void
}

const featuredProducts = [
  {
    id: 1,
    name: "Summit Pro",
    category: "Premium Trail Running Shoe",
    price: 185,
    colors: 4,
    image: "/images/products/summit-pro.jpg",
    isNew: true,
    isBestSeller: false,
    isEco: true,
  },
  {
    id: 2,
    name: "Urban Forge",
    category: "Street-Style Sneaker",
    price: 120,
    colors: 6,
    image: "/images/products/urban-forge.jpg",
    isNew: false,
    isBestSeller: true,
    isEco: true,
  },
  {
    id: 3,
    name: "Luna Rise",
    category: "Women's Cushioned Runner",
    price: 145,
    colors: 5,
    image: "/images/products/luna-rise.jpg",
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Apex Runner",
    category: "Elite Marathon Racing Flat",
    price: 200,
    colors: 3,
    image: "/images/products/apex-runner.jpg",
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 5,
    name: "Sky Dancer",
    category: "Women's Performance Trainer",
    price: 135,
    colors: 7,
    image: "/images/products/sky-dancer.jpg",
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 6,
    name: "Terra Guide",
    category: "All-Terrain Hiking Shoe",
    price: 165,
    colors: 4,
    image: "/images/products/terra-guide.jpg",
    isNew: true,
    isBestSeller: false,
  },
]

export default function ProductGrid({ onViewAll }: ProductGridProps) {
  const { addToCart } = useCart()

  return (
    <section className="px-4 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        <Button variant="outline" onClick={onViewAll} className="hover:bg-gray-50 bg-transparent">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <img
                src={product.image || "/images/products/placeholder.jpg"}
                alt={product.name}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-white text-black px-2 py-1 text-xs font-medium rounded">Just In</span>
                )}
                {product.isBestSeller && (
                  <span className="bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">Best Seller</span>
                )}
                {product.isEco && (
                  <span className="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">Eco Line</span>
                )}
              </div>

              {/* Quick shop button */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={() => addToCart(product)}
                  className="w-full bg-white text-black hover:bg-gray-100 rounded-full"
                >
                  Quick Shop
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-gray-600 text-sm">{product.colors} Colors</p>
              <p className="font-medium text-gray-900">${product.price}</p>
            </div>

            {/* Color swatches */}
            <div className="flex gap-1 mt-2">
              {Array.from({ length: Math.min(product.colors, 4) }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border border-gray-300 ${
                    i === 0 ? "bg-black" : i === 1 ? "bg-white" : i === 2 ? "bg-gray-500" : "bg-blue-500"
                  }`}
                />
              ))}
              {product.colors > 4 && <span className="text-xs text-gray-500 ml-1">+{product.colors - 4}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Promotional banner */}
      <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-lg p-8 text-center shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-primary-foreground">VERTEX Performance Finder</h3>
        <p className="text-primary-foreground/80 mb-6">Discover gear that helps you reach your peak</p>
        <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3 rounded-full shadow-md">Find Your Gear</Button>
      </div>
    </section>
  )
}
