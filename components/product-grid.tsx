"use client"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import Link from "next/link"

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
    images: ["/images/products/summit-pro.jpg"],
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
    images: ["/images/products/urban-forge.jpg"],
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
    images: ["/images/products/luna-rise.jpg"],
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Apex Runner",
    category: "Elite Marathon Racing Flat",
    price: 200,
    colors: 3,
    images: ["/images/products/apex-runner.jpg"],
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 5,
    name: "Sky Dancer",
    category: "Women's Performance Trainer",
    price: 135,
    colors: 7,
    images: ["/images/products/sky-dancer.jpg"],
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 6,
    name: "Terra Guide",
    category: "All-Terrain Hiking Shoe",
    price: 165,
    colors: 4,
    images: ["/images/products/terra-guide.jpg"],
    isNew: true,
    isBestSeller: false,
  },
]

export default function ProductGrid({ onViewAll }: ProductGridProps) {
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Promotional banner */}
      <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-lg p-8 text-center shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-primary-foreground">VERTEX Performance Finder</h3>
        <p className="text-primary-foreground/80 mb-6">Discover gear that helps you reach your peak</p>
        <Link href="/info">
          <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3 rounded-full shadow-md">Find Your Gear</Button>
        </Link>
      </div>
    </section>
  )
}
