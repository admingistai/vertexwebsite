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

// Mock data for men's clothing
const menClothing = [
  {
    id: 2001,
    name: "Vertex Sport ThermoFlex",
    category: "Men's Full-Zip Hoodie",
    price: 130,
    colors: 8,
    images: ["/images/products/van-gogh.jpg"],
    isBestSeller: true,
  },
  {
    id: 2002,
    name: "DryTech ADV TechWeave Ultra",
    category: "Men's Short-Sleeve Running Top",
    price: 80,
    colors: 6,
    images: ["/images/products/sport.jpg"],
  },
  {
    id: 2003,
    name: "Vertex Sport Club",
    category: "Men's T-Shirt",
    price: 30,
    colors: 12,
    images: ["/images/products/sport.jpg"],
  },
  {
    id: 2004,
    name: "ThermoFlex",
    category: "Men's Joggers",
    price: 120,
    colors: 7,
    images: ["/images/products/van-gogh.jpg"],
    isBestSeller: true,
  },
  {
    id: 2005,
    name: "Pro DryTech",
    category: "Men's Tight Shorts",
    price: 35,
    colors: 5,
    images: ["/images/products/sport.jpg"],
  },
  {
    id: 2006,
    name: "Storm Runner",
    category: "Men's Jacket",
    price: 100,
    colors: 4,
    images: ["/images/products/storm-shield.jpg"],
    isNew: true,
  },
  {
    id: 2007,
    name: "Vertex Sport Essential",
    category: "Men's Long-Sleeve T-Shirt",
    price: 40,
    colors: 8,
    images: ["/images/products/pink.jpg"],
  },
  {
    id: 2008,
    name: "Flex",
    category: "Men's Training Shorts",
    price: 45,
    colors: 6,
    images: ["/images/products/dali.jpg"],
  },
  {
    id: 2009,
    name: "ThermaShield ADV",
    category: "Men's Running Vest",
    price: 150,
    salePrice: 105,
    colors: 3,
    images: ["/images/products/van-gogh.jpg"],
    isSale: true,
  },
]

const subcategories = [
  { label: "Shoes", href: "/men/shoes" },
  { label: "Clothing", href: "/men/clothing" },
  { label: "Accessories", href: "/men/accessories" },
]

const clothingTypes = [
  "Hoodies & Sweatshirts",
  "Jackets & Vests",
  "Pants & Tights",
  "Shorts",
  "Tops & T-Shirts",
  "Tracksuits",
  "Compression & Base Layer",
  "Swimwear",
]

const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"]

export default function MenClothingPage() {
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
          currentSubcategory="clothing"
        />

        <Breadcrumbs
          items={[
            { label: "Men", href: "/men" },
            { label: "Clothing" },
          ]}
        />

        <div className="px-4 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <h2 className="text-xl font-bold mb-6">Filter</h2>

              {/* Clothing Type */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Product Type</h3>
                <div className="space-y-3">
                  {clothingTypes.map((type) => (
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

              {/* Technology */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Technology</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Dri-FIT</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Tech Fleece</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Therma-FIT</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox />
                    <span className="ml-2 text-sm">Storm-FIT</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Men&apos;s Clothing ({menClothing.length})</h1>
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
                {menClothing.map((product) => (
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