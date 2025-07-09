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

// Mock data for men's accessories
const menAccessories = [
  {
    id: 3001,
    name: "Legacy",
    category: "Hip Pack (3L)",
    price: 30,
    colors: 5,
    images: ["/images/products/urban-forge.jpg"],
  },
  {
    id: 3002,
    name: "Vertex Sport Legacy86",
    category: "Cap",
    price: 28,
    colors: 8,
    images: ["/images/products/sport.jpg"],
    isBestSeller: true,
  },
  {
    id: 3003,
    name: "Elite Pro",
    category: "Basketball Crew Socks",
    price: 18,
    colors: 6,
    images: ["/images/products/dali.jpg"],
  },
  {
    id: 3004,
    name: "Summit 9.5",
    category: "Training Backpack (24L)",
    price: 45,
    colors: 4,
    images: ["/images/products/summit-pro.jpg"],
  },
  {
    id: 3005,
    name: "Essential",
    category: "Speed Rope",
    price: 25,
    colors: 2,
    images: ["/images/products/apex-runner.jpg"],
  },
  {
    id: 3006,
    name: "HydroFuel",
    category: "Water Bottle (32oz)",
    price: 20,
    colors: 7,
    images: ["/images/products/sky-dancer.jpg"],
  },
  {
    id: 3007,
    name: "Everyday Plus Cushioned",
    category: "Training Crew Socks (3 Pairs)",
    price: 16,
    colors: 5,
    images: ["/images/products/terra-guide.jpg"],
    isBestSeller: true,
  },
  {
    id: 3008,
    name: "Vertex Sport",
    category: "Sunglasses",
    price: 120,
    salePrice: 84,
    colors: 3,
    images: ["/images/products/van-gogh.jpg"],
    isSale: true,
  },
  {
    id: 3009,
    name: "Essential Premium",
    category: "Backpack (21L)",
    price: 75,
    colors: 4,
    images: ["/images/products/pink.jpg"],
    isNew: true,
  },
]

const subcategories = [
  { label: "Shoes", href: "/men/shoes" },
  { label: "Clothing", href: "/men/clothing" },
  { label: "Accessories", href: "/men/accessories" },
]

const accessoryTypes = [
  "Bags & Backpacks",
  "Hats & Headwear",
  "Socks",
  "Sunglasses",
  "Equipment",
  "Gloves",
  "Belts",
  "Face Coverings",
]

export default function MenAccessoriesPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  return (
    <>
      <Header currentSection="men" />
      <main>
        <CategoryHero
          title="Men"
          subcategories={subcategories}
          currentSubcategory="accessories"
        />

        <Breadcrumbs
          items={[
            { label: "Men", href: "/men" },
            { label: "Accessories" },
          ]}
        />

        <div className="px-4 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <h2 className="text-xl font-bold mb-6">Filter</h2>

              {/* Accessory Type */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Product Type</h3>
                <div className="space-y-3">
                  {accessoryTypes.map((type) => (
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

              {/* Sport */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Sport</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Running</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Training & Gym</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Basketball</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Lifestyle</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Price</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Under $25</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">$25 - $50</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">$50 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Over $100</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Men&apos;s Accessories ({menAccessories.length})</h1>
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
              {selectedTypes.length > 0 && (
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
                  <button
                    onClick={() => setSelectedTypes([])}
                    className="text-sm underline"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menAccessories.map((product) => (
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