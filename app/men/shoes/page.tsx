"use client"

import { useState } from "react"
import Header from "@/components/header"
import CategoryHero from "@/components/category-hero"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, X } from "lucide-react"

// Mock data for men's shoes
const menShoes = [
  {
    id: 1001,
    name: "Vertex Force One '07",
    category: "Men's Shoes",
    price: 110,
    salePrice: 88,
    colors: 12,
    images: ["/images/products/urban-forge.jpg"],
    isBestSeller: true,
    isSale: true,
  },
  {
    id: 1002,
    name: "Peak 90",
    category: "Men's Shoes",
    price: 130,
    colors: 15,
    images: ["/images/products/apex-runner.jpg"],
    isBestSeller: true,
  },
  {
    id: 1003,
    name: "Court Classic Low Retro",
    category: "Men's Shoes",
    price: 110,
    colors: 20,
    images: ["/images/products/dali.jpg"],
  },
  {
    id: 1004,
    name: "Swift Runner 40",
    category: "Men's Road Running Shoes",
    price: 130,
    colors: 10,
    images: ["/images/products/sky-dancer.jpg"],
    isNew: true,
  },
  {
    id: 1005,
    name: "Vertex Jump 1 Low",
    category: "Men's Shoes",
    price: 110,
    colors: 8,
    images: ["/images/products/van-gogh.jpg"],
  },
  {
    id: 1006,
    name: "CrossPeak 9",
    category: "Men's Training Shoes",
    price: 150,
    colors: 6,
    images: ["/images/products/summit-pro.jpg"],
  },
  {
    id: 1007,
    name: "Peak 270",
    category: "Men's Shoes",
    price: 160,
    colors: 9,
    images: ["/images/products/pink.jpg"],
  },
  {
    id: 1008,
    name: "Trail Blazer Mid '77 Vintage",
    category: "Men's Shoes",
    price: 105,
    colors: 7,
    images: ["/images/products/terra-guide.jpg"],
  },
  {
    id: 1009,
    name: "Infinity Stride FlexKnit 3",
    category: "Men's Road Running Shoes",
    price: 160,
    colors: 5,
    images: ["/images/products/sport.jpg"],
  },
]

const subcategories = [
  { label: "Shoes", href: "/men/shoes" },
  { label: "Clothing", href: "/men/clothing" },
  { label: "Accessories", href: "/men/accessories" },
]

const shoeTypes = [
  "Lifestyle",
  "Running",
  "Basketball",
  "Training & Gym",
  "Soccer",
  "Skateboarding",
  "Tennis",
  "Golf",
]

const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"]

export default function MenShoesPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  return (
    <>
      <Header currentSection="men" />
      <main>
        <CategoryHero
          title="Men"
          subcategories={subcategories}
          currentSubcategory="shoes"
        />

        <Breadcrumbs
          items={[
            { label: "Men", href: "/men" },
            { label: "Shoes" },
          ]}
        />

        <div className="px-4 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <h2 className="text-xl font-bold mb-6">Filter</h2>

              {/* Shoe Type */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Shoe Type</h3>
                <div className="space-y-3">
                  {shoeTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <Checkbox
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => handleTypeToggle(type)}
                      />
                      <span className="ml-2 text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`py-2 px-3 text-sm border rounded ${
                        selectedSizes.includes(size)
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Price</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Under $50</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">$50 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">$100 - $150</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Over $150</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Men&apos;s Shoes ({menShoes.length})</h1>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    Filters
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
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
              </div>

              {/* Active Filters */}
              {(selectedTypes.length > 0 || selectedSizes.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedTypes.map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {type}
                      <button onClick={() => handleTypeToggle(type)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedSizes.map((size) => (
                    <div
                      key={size}
                      className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      Size {size}
                      <button onClick={() => handleSizeToggle(size)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setSelectedTypes([])
                      setSelectedSizes([])
                    }}
                    className="text-sm underline"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menShoes.map((product) => (
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}