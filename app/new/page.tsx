"use client"

import { useState } from "react"
import Header from "@/components/header"
import CategoryHero from "@/components/category-hero"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Mock data for new arrivals
const newProducts = [
  {
    id: 101,
    name: "Peak 270 GO",
    category: "Easy On/Off Shoes",
    price: 160,
    colors: 4,
    images: ["/images/products/pink.jpg"],
    isNew: true,
  },
  {
    id: 102,
    name: "Trail Blazer Mid '77 Vintage",
    category: "Men's Shoes",
    price: 105,
    colors: 6,
    images: ["/images/products/terra-guide.jpg"],
    isNew: true,
  },
  {
    id: 103,
    name: "Court Classic Low Retro",
    category: "Men's Shoes",
    price: 110,
    colors: 8,
    images: ["/images/products/dali.jpg"],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 104,
    name: "ThermoFlex Storm Runner",
    category: "Men's Full-Zip Hoodie",
    price: 130,
    colors: 5,
    images: ["/images/products/storm-shield.jpg"],
    isNew: true,
  },
  {
    id: 105,
    name: "Vertex Phoenix Flex",
    category: "Women's Oversized Crew",
    price: 70,
    colors: 7,
    images: ["/images/products/van-gogh.jpg"],
    isNew: true,
  },
  {
    id: 106,
    name: "CloudMax 2023 FlexKnit",
    category: "Men's Shoes",
    price: 210,
    colors: 3,
    images: ["/images/products/sky-dancer.jpg"],
    isNew: true,
  },
  {
    id: 107,
    name: "Swift Trail 4",
    category: "Men's Trail Running Shoes",
    price: 140,
    colors: 4,
    images: ["/images/products/apex-runner.jpg"],
    isNew: true,
  },
  {
    id: 108,
    name: "Vertex Pro DryTech",
    category: "Women's Long-Sleeve Top",
    price: 35,
    colors: 6,
    images: ["/images/products/sport.jpg"],
    isNew: true,
  },
  {
    id: 109,
    name: "CrossPeak 9",
    category: "Training Shoes",
    price: 150,
    colors: 5,
    images: ["/images/products/summit-pro.jpg"],
    isNew: true,
  },
]

export default function NewPage() {
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <>
      <Header currentSection="new" />
      <main>
        <CategoryHero
          title="New & Featured"
          subtitle="Just In"
          description="Shop the latest arrivals from Vertex"
          backgroundImage="/images/hero/vertex-hero.jpg"
          ctaText="Shop All New Arrivals"
          ctaLink="/new"
        />

        <div className="px-4 lg:px-8 py-8">
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
                {newProducts.length} Results
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-none bg-transparent font-medium cursor-pointer focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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