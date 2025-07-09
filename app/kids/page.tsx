"use client"

import { useState } from "react"
import Header from "@/components/header"
import CategoryHero from "@/components/category-hero"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Mock data for kids products
const kidsProducts = [
  {
    id: 401,
    name: "Vertex Force One LE",
    category: "Big Kids' Shoes",
    price: 90,
    colors: 8,
    images: ["/images/products/urban-forge.jpg"],
    isBestSeller: true,
  },
  {
    id: 402,
    name: "Vertex Tee",
    category: "Big Kids' T-Shirt",
    price: 25,
    colors: 6,
    images: ["/images/products/sport.jpg"],
  },
  {
    id: 403,
    name: "Flex Stride 2",
    category: "Little Kids' Shoes",
    price: 45,
    colors: 5,
    images: ["/images/products/sky-dancer.jpg"],
    isNew: true,
  },
  {
    id: 404,
    name: "DryTech Multi+",
    category: "Toddler 2-Piece Set",
    price: 40,
    colors: 4,
    images: ["/images/products/pink.jpg"],
  },
  {
    id: 405,
    name: "Revolt 6",
    category: "Baby/Toddler Shoes",
    price: 35,
    colors: 6,
    images: ["/images/products/apex-runner.jpg"],
  },
  {
    id: 406,
    name: "Vertex Club Comfort",
    category: "Big Kids' Hoodie",
    price: 45,
    colors: 7,
    images: ["/images/products/van-gogh.jpg"],
  },
  {
    id: 407,
    name: "Court Classic Low",
    category: "Big Kids' Shoes",
    price: 85,
    colors: 10,
    images: ["/images/products/dali.jpg"],
    isBestSeller: true,
  },
  {
    id: 408,
    name: "Vertex Pro",
    category: "Big Kids' Leggings",
    price: 35,
    colors: 5,
    images: ["/images/products/terra-guide.jpg"],
  },
  {
    id: 409,
    name: "Vertex Court Borough Low 2",
    category: "Little Kids' Shoes",
    price: 40,
    colors: 4,
    images: ["/images/products/summit-pro.jpg"],
  },
]


export default function KidsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <>
      <Header currentSection="kids" />
      <main>
        <CategoryHero
          title="Little Feet, Big Adventures"
          description="Durable gear for tomorrow's explorers"
          backgroundImage="/images/hero/child-hero.jpg"
          ctaText="Shop Kids' Collection"
          ctaLink="/kids"
        />

        <div className="px-4 lg:px-8 py-8">
          {/* Age Groups */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="outline" className="rounded-full">
              Baby & Toddler (0-3)
            </Button>
            <Button variant="outline" className="rounded-full">
              Little Kids (4-7)
            </Button>
            <Button variant="outline" className="rounded-full">
              Big Kids (8-14)
            </Button>
          </div>

          {/* Filters and Sort */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                Filters
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-gray-600">
                {kidsProducts.length} Results
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-none bg-transparent font-medium cursor-pointer focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Featured Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kidsProducts
                .filter((p) => p.isBestSeller)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>

          {/* All Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Shop All Kids&apos;</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kidsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="outline" className="px-8">
              Load More
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}