"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/components/cart-context"

const allProducts = [
  {
    id: 1,
    name: 'Air Jordan 3 Retro "Pure Money"',
    category: "Men's Shoes",
    price: 205,
    colors: 2,
    image: "/images/products/apex-runner.jpg",
    isNew: true,
    isBestSeller: false,
    brand: "Jordan",
  },
  {
    id: 2,
    name: "Air Jordan 4 RM",
    category: "Men's Shoes",
    price: 155,
    colors: 7,
    image: "/images/products/urban-forge.jpg",
    isNew: false,
    isBestSeller: true,
    brand: "Jordan",
  },
  {
    id: 3,
    name: "VERTEX Air Max Uptempo '95",
    category: "Men's Shoes",
    price: 170,
    colors: 2,
    image: "/images/products/sky-dancer.jpg",
    isNew: true,
    isBestSeller: false,
    brand: "VERTEX",
  },
  {
    id: 4,
    name: "VERTEX Air Max 90",
    category: "Men's Shoes",
    price: 100,
    colors: 12,
    image: "/images/products/pink.jpg",
    isNew: false,
    isBestSeller: true,
    brand: "VERTEX",
  },
  {
    id: 5,
    name: "VERTEX Air Force 1 '07",
    category: "Men's Shoes",
    price: 90,
    colors: 15,
    image: "/images/products/dali.jpg",
    isNew: false,
    isBestSeller: true,
    brand: "VERTEX",
  },
  {
    id: 6,
    name: "VERTEX Zoom Freak 4",
    category: "Men's Basketball Shoes",
    price: 130,
    colors: 5,
    image: "/images/products/van-gogh.jpg",
    isNew: true,
    isBestSeller: false,
    brand: "VERTEX",
  },
  {
    id: 7,
    name: "VERTEX Air Zoom Pegasus 40",
    category: "Men's Road Running Shoes",
    price: 130,
    colors: 8,
    image: "/images/products/sport.jpg",
    isNew: false,
    isBestSeller: true,
    brand: "VERTEX",
  },
  {
    id: 8,
    name: "VERTEX Metcon 8",
    category: "Men's Training Shoes",
    price: 150,
    colors: 6,
    image: "/images/products/summit-pro.jpg",
    isNew: false,
    isBestSeller: false,
    brand: "VERTEX",
  },
]

const categories = [
  "Jordan",
  "Lifestyle",
  "Running",
  "Training & Gym",
  "Basketball",
  "Soccer",
  "Golf",
  "Tennis",
  "Track & Field",
  "Volleyball",
  "Walking",
  "Sandals & Slides",
  "Skateboarding",
  "VERTEX By You",
]

const colors = [
  { name: "Black", value: "black" },
  { name: "White", value: "white" },
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Gray", value: "gray" },
]

const priceRanges = [
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
  { label: "$150+", min: 150, max: 1000 },
]

export default function ProductListing() {
  const [showFilters, setShowFilters] = useState(true)
  const [pickupToday, setPickupToday] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("")
  const [sortBy, setSortBy] = useState("featured")
  const { addToCart } = useCart()

  const filteredProducts = allProducts.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.brand || product.category)) {
      return false
    }
    if (selectedPriceRange) {
      const range = priceRanges.find((r) => r.label === selectedPriceRange)
      if (range && (product.price < range.min || product.price > range.max)) {
        return false
      }
    }
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return a.isNew ? -1 : 1
      default:
        return 0
    }
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedPriceRange("")
    setPickupToday(false)
  }

  return (
    <div className="px-4 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="space-y-6">
            {/* Pick Up Today */}
            <div className="flex items-center justify-between">
              <Label htmlFor="pickup-today" className="font-medium">
                Pick Up Today
              </Label>
              <Switch id="pickup-today" checked={pickupToday} onCheckedChange={setPickupToday} />
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={category} className="text-sm cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-medium mb-4">Color</h3>
              <div className="grid grid-cols-6 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColors.includes(color.value) ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value === "white" ? "#ffffff" : color.value }}
                    onClick={() => {
                      setSelectedColors((prev) =>
                        prev.includes(color.value) ? prev.filter((c) => c !== color.value) : [...prev, color.value],
                      )
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-4">Shop by Price</h3>
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <div key={range.label} className="flex items-center space-x-2">
                    <Checkbox
                      id={range.label}
                      checked={selectedPriceRange === range.label}
                      onCheckedChange={() =>
                        setSelectedPriceRange(selectedPriceRange === range.label ? "" : range.label)
                      }
                    />
                    <Label htmlFor={range.label} className="text-sm cursor-pointer">
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Men&apos;s Shoes & Sneakers ({sortedProducts.length})</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedPriceRange || pickupToday) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                  <button onClick={() => toggleCategory(category)} className="hover:text-gray-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedPriceRange && (
                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {selectedPriceRange}
                  <button onClick={() => setSelectedPriceRange("")} className="hover:text-gray-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {pickupToday && (
                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Pick Up Today
                  <button onClick={() => setPickupToday(false)} className="hover:text-gray-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-white text-black px-2 py-1 text-xs font-medium rounded">Just In</span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">
                        Best Seller
                      </span>
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
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>
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

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="px-8 py-3 bg-transparent">
              Load More Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
