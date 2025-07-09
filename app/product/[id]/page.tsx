"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { Heart, ChevronLeft, ChevronRight, Star, Truck, Shield, RefreshCw, ChevronDown, ChevronUp } from "lucide-react"

// Complete product database - matches all products from all pages
const allProducts = {
  // Featured Products (from product-grid.tsx)
  1: {
    id: 1,
    name: "Summit Pro",
    category: "Premium Trail Running Shoe",
    price: 185,
    description: "Conquer any terrain with the Summit Pro. Featuring a carbon fiber plate for explosive energy return and sustainable materials that perform without compromise. Built for athletes who demand peak performance and environmental responsibility.",
    images: ["/images/products/summit-pro.jpg"],
    colors: [
      { name: "White/Black", value: "white" },
      { name: "Black/White", value: "black" },
      { name: "Triple White", value: "all-white" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: false },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.9,
    reviewCount: 2090,
    details: {
      style: "SP-001",
      colorShown: "White/Black",
      material: "Recycled mesh upper with carbon fiber plate",
      sole: "Vertex Air technology with rubber outsole",
    },
    features: [
      "Carbon fiber plate for explosive energy return",
      "Sustainable recycled materials",
      "Vertex Air technology cushioning",
      "Aggressive trail grip outsole",
      "Lightweight breathable upper",
    ],
  },
  2: {
    id: 2,
    name: "Urban Forge",
    category: "Street-Style Sneaker",
    price: 120,
    description: "Urban style meets athletic performance. The Urban Forge combines sleek street aesthetics with cutting-edge comfort technology for all-day wear.",
    images: ["/images/products/urban-forge.jpg"],
    colors: [
      { name: "Black/White", value: "black" },
      { name: "White/Black", value: "white" },
      { name: "All Black", value: "all-black" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
    ],
    rating: 4.7,
    reviewCount: 1456,
    details: {
      style: "UF-002",
      colorShown: "Black/White",
      material: "Premium leather with synthetic overlays",
      sole: "Vertex cushioning with street-ready outsole",
    },
    features: [
      "Premium leather construction",
      "Street-inspired design",
      "All-day comfort cushioning",
      "Durable rubber outsole",
      "Versatile style for any occasion",
    ],
  },
  // Men's products
  201: {
    id: 201,
    name: "VERTEX Air Force 1 '07",
    category: "Men's Shoes",
    price: 110,
    description: "Classic basketball style meets modern performance. A timeless silhouette with updated comfort features.",
    images: ["/images/products/urban-forge.jpg"],
    colors: [
      { name: "White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Navy", value: "navy" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "8", available: true },
      { size: "9", available: true },
      { size: "10", available: true },
      { size: "11", available: true },
      { size: "12", available: true },
    ],
    rating: 4.6,
    reviewCount: 892,
    details: {
      style: "VAF-201",
      colorShown: "White",
      material: "Leather upper",
      sole: "Rubber cupsole",
    },
    features: [
      "Classic basketball silhouette",
      "Premium leather upper",
      "Comfortable foam midsole",
      "Durable rubber outsole",
      "Iconic VERTEX styling",
    ],
  },
  // Men's Shoes
  1001: {
    id: 1001,
    name: "Vertex Force One '07",
    category: "Men's Shoes",
    price: 110,
    description: "The legendary Force One silhouette updated with modern VERTEX technology. Classic style with contemporary performance.",
    images: ["/images/products/urban-forge.jpg"],
    colors: [
      { name: "White/Black", value: "white" },
      { name: "Black/White", value: "black" },
      { name: "All White", value: "all-white" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "8", available: true },
      { size: "9", available: true },
      { size: "10", available: true },
      { size: "11", available: true },
      { size: "12", available: true },
    ],
    rating: 4.8,
    reviewCount: 1234,
    details: {
      style: "VF1-1001",
      colorShown: "White/Black",
      material: "Premium leather upper",
      sole: "Vertex Air cushioning",
    },
    features: [
      "Iconic Force One design",
      "Premium leather construction",
      "Vertex Air technology",
      "Classic pivot circle outsole",
      "Timeless street style",
    ],
  },
  // Men's Shoes (1002-1009)
  1002: {
    id: 1002,
    name: "Peak 90",
    category: "Men's Shoes",
    price: 130,
    description: "Iconic Peak 90 silhouette with modern comfort technology. Classic design meets contemporary performance for all-day wear.",
    images: ["/images/products/apex-runner.jpg"],
    colors: [
      { name: "White/Grey", value: "white" },
      { name: "Black/Red", value: "black" },
      { name: "Navy/White", value: "navy" },
      { name: "Grey/Blue", value: "grey" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.7,
    reviewCount: 2456,
    details: {
      style: "P90-1002",
      colorShown: "White/Grey",
      material: "Premium leather and mesh upper",
      sole: "Visible Peak Air cushioning",
    },
    features: [
      "Classic Peak 90 design heritage",
      "Visible Peak Air cushioning",
      "Premium leather construction",
      "Breathable mesh panels",
      "Durable rubber outsole",
    ],
  },
  1003: {
    id: 1003,
    name: "Court Classic Low Retro",
    category: "Men's Shoes",
    price: 110,
    description: "Timeless court style with modern comfort. The Court Classic Low delivers iconic basketball aesthetics with contemporary performance.",
    images: ["/images/products/dali.jpg"],
    colors: [
      { name: "Triple White", value: "white" },
      { name: "Black/White", value: "black" },
      { name: "Royal Blue", value: "blue" },
      { name: "Red/White", value: "red" },
      { name: "Grey/White", value: "grey" },
      { name: "Navy/White", value: "navy" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.8,
    reviewCount: 3421,
    details: {
      style: "CCL-1003",
      colorShown: "Triple White",
      material: "Premium leather upper",
      sole: "Classic rubber cupsole",
    },
    features: [
      "Iconic court silhouette",
      "Premium leather construction",
      "Classic perforations",
      "Comfortable foam midsole",
      "Timeless colorways",
    ],
  },
  1004: {
    id: 1004,
    name: "Swift Runner 40",
    category: "Men's Road Running Shoes",
    price: 130,
    description: "The trusted workhorse for daily training. Swift Runner 40 delivers responsive cushioning and reliable performance for runners of all levels.",
    images: ["/images/products/sky-dancer.jpg"],
    colors: [
      { name: "Pure White/Black", value: "white" },
      { name: "Thunder Grey/Red", value: "grey" },
      { name: "Black/White", value: "black" },
      { name: "Navy/Electric Blue", value: "navy" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.8,
    reviewCount: 4321,
    details: {
      style: "SR40-1004",
      colorShown: "Pure White/Black",
      material: "Engineered mesh with synthetic overlays",
      sole: "Swift React foam with rubber outsole",
    },
    features: [
      "Swift React foam cushioning",
      "Engineered mesh upper",
      "Heel counter for stability",
      "Durable rubber outsole",
      "Trusted daily trainer design",
    ],
  },
  1005: {
    id: 1005,
    name: "Vertex Jump 1 Low",
    category: "Men's Shoes",
    price: 110,
    description: "Classic basketball heritage meets modern performance. The Vertex Jump 1 Low delivers iconic style with contemporary comfort technology.",
    images: ["/images/products/van-gogh.jpg"],
    colors: [
      { name: "White/Black", value: "white" },
      { name: "Black/Red", value: "black" },
      { name: "Blue/White", value: "blue" },
      { name: "Green/White", value: "green" },
      { name: "Purple/White", value: "purple" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.7,
    reviewCount: 2890,
    details: {
      style: "VJ1L-1005",
      colorShown: "White/Black",
      material: "Premium leather with synthetic overlays",
      sole: "Vertex Air technology",
    },
    features: [
      "Classic basketball silhouette",
      "Vertex Air cushioning",
      "Premium leather construction",
      "Iconic design heritage",
      "Comfortable all-day wear",
    ],
  },
  1006: {
    id: 1006,
    name: "CrossPeak 9",
    category: "Men's Training Shoes",
    price: 150,
    description: "Dominate your training with the CrossPeak 9. Engineered for cross-training versatility with superior stability and support for all workout types.",
    images: ["/images/products/summit-pro.jpg"],
    colors: [
      { name: "Training Black", value: "black" },
      { name: "Gym Red", value: "red" },
      { name: "Pure White", value: "white" },
      { name: "Navy Blue", value: "blue" },
      { name: "Volt Green", value: "green" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.7,
    reviewCount: 2890,
    details: {
      style: "CP9-1006",
      colorShown: "Training Black",
      material: "Synthetic leather with mesh panels",
      sole: "Multi-directional traction pattern",
    },
    features: [
      "Multi-directional traction pattern",
      "Reinforced toe and heel areas",
      "Breathable mesh panels",
      "Lateral support for side-to-side movement",
      "Versatile cross-training design",
    ],
  },
  1007: {
    id: 1007,
    name: "Peak 270",
    category: "Men's Shoes",
    price: 160,
    description: "Experience maximum comfort with Peak 270. Advanced cushioning technology meets sleek design for all-day comfort and style.",
    images: ["/images/products/pink.jpg"],
    colors: [
      { name: "Black/Red", value: "black" },
      { name: "White/Grey", value: "white" },
      { name: "Navy/Blue", value: "navy" },
      { name: "Grey/Orange", value: "grey" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.6,
    reviewCount: 1987,
    details: {
      style: "P270-1007",
      colorShown: "Black/Red",
      material: "Mesh upper with synthetic overlays",
      sole: "Peak 270 air cushioning",
    },
    features: [
      "Peak 270 air cushioning technology",
      "Breathable mesh construction",
      "Lightweight design",
      "All-day comfort",
      "Modern aesthetic",
    ],
  },
  1008: {
    id: 1008,
    name: "Trail Blazer Mid '77 Vintage",
    category: "Men's Shoes",
    price: 105,
    description: "Classic basketball heritage meets trail-ready durability. The Trail Blazer Mid brings vintage style to modern adventures.",
    images: ["/images/products/terra-guide.jpg"],
    colors: [
      { name: "Vintage Brown", value: "brown" },
      { name: "Classic White", value: "white" },
      { name: "Forest Green", value: "green" },
      { name: "Navy Blue", value: "navy" },
      { name: "Black/White", value: "black" },
      { name: "Rust Orange", value: "orange" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.7,
    reviewCount: 2156,
    details: {
      style: "TBM-1008",
      colorShown: "Vintage Brown",
      material: "Premium suede and leather",
      sole: "Vintage rubber cupsole",
    },
    features: [
      "Vintage 1977 design heritage",
      "Premium suede construction",
      "Classic basketball silhouette",
      "Durable rubber outsole",
      "Retro color blocking",
    ],
  },
  1009: {
    id: 1009,
    name: "Infinity Stride FlexKnit 3",
    category: "Men's Road Running Shoes",
    price: 160,
    description: "Experience the future of running with Infinity Stride FlexKnit 3. Advanced knit construction meets responsive cushioning for the ultimate running experience.",
    images: ["/images/products/sport.jpg"],
    colors: [
      { name: "Pure White/Black", value: "white" },
      { name: "Black/Red", value: "black" },
      { name: "Grey/Blue", value: "grey" },
      { name: "Navy/Orange", value: "navy" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.9,
    reviewCount: 3567,
    details: {
      style: "ISF3-1009",
      colorShown: "Pure White/Black",
      material: "FlexKnit upper with Infinity foam",
      sole: "Infinity React foam with rubber outsole",
    },
    features: [
      "FlexKnit breathable upper",
      "Infinity React foam cushioning",
      "Seamless construction",
      "Responsive energy return",
      "Lightweight design",
    ],
  },
  
  // Men's Clothing (2001-2009)
  2001: {
    id: 2001,
    name: "Vertex ThermoFlex",
    category: "Men's Full-Zip Hoodie",
    price: 130,
    description: "Stay warm and perform at your best with the Vertex ThermoFlex hoodie. Advanced thermal regulation meets athletic style for ultimate comfort.",
    images: ["/images/products/vertex-sport-thermoflex.jpg"],
    colors: [
      { name: "Storm Grey", value: "grey" },
      { name: "Thunder Black", value: "black" },
      { name: "Cloud White", value: "white" },
      { name: "Navy Storm", value: "navy" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.7,
    reviewCount: 1856,
    details: {
      style: "VST-2001",
      colorShown: "Storm Grey",
      material: "ThermoFlex fabric with fleece lining",
      fit: "Standard fit with athletic cut",
    },
    features: [
      "ThermoFlex thermal regulation",
      "Soft fleece interior lining",
      "Full-zip design with storm flap",
      "Kangaroo pocket for storage",
      "Ribbed cuffs and hem",
    ],
  },
  2002: {
    id: 2002,
    name: "DryTech ADV TechWeave Ultra",
    category: "Men's Short-Sleeve Running Top",
    price: 80,
    description: "Advanced moisture-wicking performance meets ultra-lightweight design. The TechWeave Ultra features engineered zones for optimal ventilation and freedom of movement.",
    images: ["/images/products/drytech-adv-techweave.jpg"],
    colors: [
      { name: "Performance Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Electric Blue", value: "blue" },
      { name: "Pure White", value: "white" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.8,
    reviewCount: 1456,
    details: {
      style: "DTA-2002",
      colorShown: "Performance Black",
      material: "DryTech ADV TechWeave fabric",
      fit: "Athletic cut with engineered zones",
    },
    features: [
      "Advanced DryTech technology",
      "TechWeave Ultra lightweight construction",
      "Engineered ventilation zones",
      "Four-way stretch fabric",
      "Reflective details for visibility",
    ],
  },
  2003: {
    id: 2003,
    name: "Vertex Club",
    category: "Men's T-Shirt",
    price: 30,
    description: "Classic comfort meets modern performance. The Vertex Club tee features premium cotton construction with moisture-wicking technology for all-day comfort.",
    images: ["/images/products/vertex-sport-club.jpg"],
    colors: [
      { name: "Pure White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
      { name: "Forest Green", value: "green" },
      { name: "Burgundy", value: "burgundy" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.5,
    reviewCount: 1678,
    details: {
      style: "VSC-2003",
      colorShown: "Pure White",
      material: "Premium cotton blend",
      fit: "Classic fit with ribbed collar",
    },
    features: [
      "Premium cotton construction",
      "Classic comfortable fit",
      "Ribbed collar for durability",
      "Moisture-wicking technology",
      "Machine washable",
    ],
  },
  2004: {
    id: 2004,
    name: "ThermoFlex",
    category: "Men's Joggers",
    price: 120,
    description: "Premium ThermoFlex joggers engineered for comfort and style. Features innovative thermal regulation and a modern tapered fit perfect for training or casual wear.",
    images: ["/images/products/thermoflex-joggers.jpg"],
    colors: [
      { name: "Dark Grey Heather", value: "grey" },
      { name: "Black", value: "black" },
      { name: "Navy Blue", value: "navy" },
      { name: "Carbon Green", value: "green" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.7,
    reviewCount: 2134,
    details: {
      style: "TF-2004",
      colorShown: "Dark Grey Heather",
      material: "ThermoFlex fabric blend",
      fit: "Tapered fit with elastic waistband",
    },
    features: [
      "ThermoFlex thermal regulation",
      "Tapered modern fit",
      "Secure zip pockets",
      "Ribbed cuffs and waistband",
      "Soft brushed interior",
    ],
  },
  2005: {
    id: 2005,
    name: "Pro DryTech",
    category: "Men's Tight Shorts",
    price: 35,
    description: "Essential training shorts engineered for peak performance. Pro DryTech fabric with compression fit for support during intense workouts.",
    images: ["/images/products/pro-drytech-shorts.jpg"],
    colors: [
      { name: "Performance Black", value: "black" },
      { name: "Pure White", value: "white" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
      { name: "Electric Blue", value: "blue" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.6,
    reviewCount: 892,
    details: {
      style: "PDT-2005",
      colorShown: "Performance Black",
      material: "Pro DryTech performance fabric",
      fit: "Compression fit with 7-inch inseam",
    },
    features: [
      "Pro DryTech moisture management",
      "Compression fit for support",
      "Flatlock seams prevent chafing",
      "Lightweight construction",
      "Quick-dry technology",
    ],
  },
  2006: {
    id: 2006,
    name: "Storm Runner",
    category: "Men's Jacket",
    price: 100,
    description: "Weather-resistant Storm Runner jacket with modern performance features. Durable construction meets timeless style for year-round versatility.",
    images: ["/images/products/storm-runner-jacket.jpg"],
    colors: [
      { name: "Black/Grey/White", value: "black" },
      { name: "Navy/Blue/White", value: "navy" },
      { name: "Green/Black/White", value: "green" },
      { name: "Red/Black/White", value: "red" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.8,
    reviewCount: 2567,
    details: {
      style: "SR-2006",
      colorShown: "Black/Grey/White",
      material: "Weather-resistant fabric with mesh lining",
      fit: "Regular fit with adjustable hood",
    },
    features: [
      "Weather-resistant construction",
      "Adjustable hood",
      "Full-zip closure",
      "Side pockets for storage",
      "Breathable mesh lining",
    ],
  },
  2007: {
    id: 2007,
    name: "Vertex Essential",
    category: "Men's Long-Sleeve T-Shirt",
    price: 40,
    description: "Essential long-sleeve tee with moisture-wicking technology. Perfect for layering or wearing solo during training sessions.",
    images: ["/images/products/vertex-sport-essential.jpg"],
    colors: [
      { name: "Pure White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
      { name: "Forest Green", value: "green" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.5,
    reviewCount: 1234,
    details: {
      style: "VSE-2007",
      colorShown: "Pure White",
      material: "Premium cotton blend with moisture-wicking",
      fit: "Classic fit with long sleeves",
    },
    features: [
      "Premium cotton construction",
      "Moisture-wicking technology",
      "Classic comfortable fit",
      "Long sleeve design",
      "Machine washable",
    ],
  },
  2008: {
    id: 2008,
    name: "Flex",
    category: "Men's Training Shorts",
    price: 45,
    description: "Versatile training shorts with four-way stretch fabric. Designed for maximum mobility and comfort during any workout.",
    images: ["/images/products/flex-training-shorts.jpg"],
    colors: [
      { name: "Black/White", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
      { name: "Forest Green", value: "green" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.7,
    reviewCount: 1567,
    details: {
      style: "FLX-2008",
      colorShown: "Black/White",
      material: "Flex fabric with four-way stretch",
      fit: "Athletic fit with 9-inch inseam",
    },
    features: [
      "Four-way stretch fabric",
      "Athletic fit for mobility",
      "Moisture-wicking technology",
      "Secure zip pockets",
      "Elastic waistband with drawcord",
    ],
  },
  2009: {
    id: 2009,
    name: "ThermaShield ADV",
    category: "Men's Running Vest",
    price: 150,
    salePrice: 105,
    description: "Advanced running vest with thermal regulation and wind protection. ThermaShield ADV technology keeps you comfortable in changing conditions.",
    images: ["/images/products/thermashield-adv-vest.jpg"],
    colors: [
      { name: "Performance Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Storm", value: "navy" },
      { name: "Electric Blue", value: "blue" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.8,
    reviewCount: 1123,
    details: {
      style: "TSA-2009",
      colorShown: "Performance Black",
      material: "ThermaShield ADV fabric",
      fit: "Athletic fit with wind protection",
    },
    features: [
      "ThermaShield ADV technology",
      "Wind-resistant construction",
      "Thermal regulation",
      "Reflective details",
      "Packable design",
    ],
  },
  
  // Men's Accessories (3001-3009)
  3001: {
    id: 3001,
    name: "Legacy",
    category: "Hip Pack (3L)",
    price: 30,
    description: "Compact and versatile hip pack perfect for active lifestyles. Features a 3-liter capacity with secure storage for essentials.",
    images: ["/images/products/legacy-hip-pack.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
      { name: "Forest Green", value: "green" },
    ],
    sizes: [
      { size: "One Size", available: true },
    ],
    rating: 4.6,
    reviewCount: 1234,
    details: {
      style: "LEG-3001",
      colorShown: "Black",
      material: "Durable nylon with water-resistant coating",
      capacity: "3 liters",
    },
    features: [
      "3-liter storage capacity",
      "Water-resistant construction",
      "Adjustable waist strap",
      "Secure zip closure",
      "Compact design",
    ],
  },
  3002: {
    id: 3002,
    name: "Vertex Legacy86",
    category: "Cap",
    price: 28,
    description: "Classic cap with modern performance features. The Legacy86 design offers comfort and style for any activity.",
    images: ["/images/products/vertex-sport-legacy86-cap.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Pure White", value: "white" },
      { name: "Navy Blue", value: "navy" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Forest Green", value: "green" },
    ],
    sizes: [
      { size: "One Size", available: true },
    ],
    rating: 4.5,
    reviewCount: 892,
    details: {
      style: "VSL86-3002",
      colorShown: "Black",
      material: "Cotton twill with moisture-wicking sweatband",
      fit: "Adjustable with metal buckle",
    },
    features: [
      "Classic Legacy86 design",
      "Moisture-wicking sweatband",
      "Adjustable metal buckle",
      "Durable cotton construction",
      "Unstructured fit",
    ],
  },
  3003: {
    id: 3003,
    name: "Elite Pro",
    category: "Basketball Crew Socks",
    price: 18,
    description: "Performance basketball socks with cushioned comfort and moisture management. Designed for serious athletes who demand the best.",
    images: ["/images/products/elite-pro-socks.jpg"],
    colors: [
      { name: "White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
    ],
    sizes: [
      { size: "S (6-8)", available: true },
      { size: "M (8-10)", available: true },
      { size: "L (10-12)", available: true },
      { size: "XL (12-14)", available: true },
    ],
    rating: 4.7,
    reviewCount: 1567,
    details: {
      style: "EP-3003",
      colorShown: "White",
      material: "Performance blend with moisture-wicking",
      height: "Crew height",
    },
    features: [
      "Cushioned forefoot and heel",
      "Moisture-wicking fabric",
      "Arch support band",
      "Seamless toe construction",
      "Reinforced heel and toe",
    ],
  },
  3004: {
    id: 3004,
    name: "Summit 9.5",
    category: "Training Backpack (24L)",
    price: 45,
    description: "Versatile training backpack with 24-liter capacity. Perfect for gym sessions, outdoor adventures, or daily commutes.",
    images: ["/images/products/summit-backpack.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
      { name: "Forest Green", value: "green" },
    ],
    sizes: [
      { size: "One Size", available: true },
    ],
    rating: 4.8,
    reviewCount: 2134,
    details: {
      style: "S95-3004",
      colorShown: "Black",
      material: "Durable nylon with water-resistant coating",
      capacity: "24 liters",
    },
    features: [
      "24-liter storage capacity",
      "Water-resistant construction",
      "Padded shoulder straps",
      "Multiple compartments",
      "Laptop sleeve",
    ],
  },
  3005: {
    id: 3005,
    name: "Essential",
    category: "Speed Rope",
    price: 25,
    description: "High-performance speed rope designed for serious training. Lightweight construction with smooth ball bearings for optimal performance.",
    images: ["/images/products/essential-speed-rope.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Red", value: "red" },
      { name: "Blue", value: "blue" },
    ],
    sizes: [
      { size: "One Size", available: true },
    ],
    rating: 4.6,
    reviewCount: 1023,
    details: {
      style: "ESS-3005",
      colorShown: "Black",
      material: "Steel cable with rubber coating",
      length: "Adjustable",
    },
    features: [
      "Ball bearing system",
      "Adjustable length",
      "Lightweight design",
      "Comfortable grip handles",
      "Smooth rotation",
    ],
  },
  3006: {
    id: 3006,
    name: "HydroFuel",
    category: "Water Bottle (32oz)",
    price: 20,
    description: "Stay hydrated with the HydroFuel 32oz water bottle. Durable construction with leak-proof design for active lifestyles.",
    images: ["/images/products/hydrofuel-bottle.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Pure White", value: "white" },
      { name: "Electric Blue", value: "blue" },
      { name: "Forest Green", value: "green" },
    ],
    sizes: [
      { size: "32oz", available: true },
    ],
    rating: 4.7,
    reviewCount: 1789,
    details: {
      style: "HF-3006",
      colorShown: "Black",
      material: "BPA-free plastic",
      capacity: "32 fluid ounces",
    },
    features: [
      "32oz capacity",
      "BPA-free construction",
      "Leak-proof design",
      "Easy-grip surface",
      "Wide-mouth opening",
    ],
  },
  3007: {
    id: 3007,
    name: "Everyday Plus Cushioned",
    category: "Training Crew Socks (3 Pairs)",
    price: 16,
    description: "Comfortable training socks with cushioned support. This 3-pair pack offers excellent value for daily training and casual wear.",
    images: ["/images/products/everyday-plus-socks.jpg"],
    colors: [
      { name: "White/Black/Grey", value: "multi" },
      { name: "Black/Grey/Navy", value: "dark" },
    ],
    sizes: [
      { size: "S (6-8)", available: true },
      { size: "M (8-10)", available: true },
      { size: "L (10-12)", available: true },
      { size: "XL (12-14)", available: true },
    ],
    rating: 4.5,
    reviewCount: 2456,
    details: {
      style: "EPC-3007",
      colorShown: "White/Black/Grey",
      material: "Cotton blend with moisture-wicking",
      quantity: "3 pairs",
    },
    features: [
      "3-pair value pack",
      "Cushioned comfort",
      "Moisture-wicking fabric",
      "Reinforced heel and toe",
      "Crew height design",
    ],
  },
  3008: {
    id: 3008,
    name: "Vertex Sunglasses",
    category: "Sunglasses",
    price: 120,
    salePrice: 84,
    description: "High-performance sunglasses with UV protection and athletic design. Perfect for sports and outdoor activities.",
    images: ["/images/products/vertex-sport-sunglasses.jpg"],
    colors: [
      { name: "Black/Grey", value: "black" },
      { name: "White/Blue", value: "white" },
      { name: "Red/Black", value: "red" },
    ],
    sizes: [
      { size: "One Size", available: true },
    ],
    rating: 4.7,
    reviewCount: 1345,
    details: {
      style: "VS-3008",
      colorShown: "Black/Grey",
      material: "Lightweight polymer frame",
      lenses: "UV400 protection",
    },
    features: [
      "UV400 protection",
      "Lightweight design",
      "Anti-slip nose pads",
      "Durable construction",
      "Athletic styling",
    ],
  },
  3009: {
    id: 3009,
    name: "Essential Premium",
    category: "Backpack (21L)",
    price: 75,
    description: "Premium everyday backpack with 21-liter capacity. Designed for work, school, or travel with thoughtful organization features.",
    images: ["/images/products/essential-premium-backpack.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
    ],
    sizes: [
      { size: "One Size", available: true },
    ],
    rating: 4.8,
    reviewCount: 1987,
    details: {
      style: "EP-3009",
      colorShown: "Black",
      material: "Premium nylon with leather accents",
      capacity: "21 liters",
    },
    features: [
      "21-liter capacity",
      "Premium materials",
      "Laptop compartment",
      "Organized pockets",
      "Comfortable straps",
    ],
  },
  
  // Add the other featured products
  3: {
    id: 3,
    name: "Luna Rise",
    category: "Women's Cushioned Runner",
    price: 145,
    description: "Experience weightless running with Luna Rise. Engineered for women who demand superior comfort and style in every stride.",
    images: ["/images/products/luna-rise.jpg"],
    colors: [
      { name: "Sunset Pink", value: "pink" },
      { name: "Ocean Blue", value: "blue" },
      { name: "Moonlight White", value: "white" },
    ],
    sizes: [
      { size: "5", available: true },
      { size: "5.5", available: true },
      { size: "6", available: true },
      { size: "6.5", available: true },
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
    ],
    rating: 4.8,
    reviewCount: 1567,
    details: {
      style: "LR-003",
      colorShown: "Sunset Pink",
      material: "Breathable mesh with supportive overlays",
      sole: "Luna cushioning technology",
    },
    features: [
      "Women-specific fit and design",
      "Luna cushioning for cloud-like comfort",
      "Breathable mesh upper",
      "Responsive energy return",
      "Elegant colorways",
    ],
  },
  4: {
    id: 4,
    name: "Apex Runner",
    category: "Elite Marathon Racing Flat",
    price: 200,
    description: "Built for speed. The Apex Runner delivers race-winning performance with carbon fiber technology for elite athletes.",
    images: ["/images/products/apex-runner.jpg"],
    colors: [
      { name: "Racing Red", value: "red" },
      { name: "Electric Blue", value: "blue" },
      { name: "Pure White", value: "white" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
    ],
    rating: 4.9,
    reviewCount: 3456,
    details: {
      style: "AR-004",
      colorShown: "Racing Red",
      material: "Ultra-lightweight mesh with carbon plate",
      sole: "Carbon fiber plate with racing foam",
    },
    features: [
      "Carbon fiber plate technology",
      "Elite racing performance",
      "Ultra-lightweight construction",
      "Maximum energy return",
      "Professional athlete tested",
    ],
  },
  5: {
    id: 5,
    name: "Sky Dancer",
    category: "Women's Performance Trainer",
    price: 135,
    description: "Dance through your workout with Sky Dancer. Versatile training shoe designed for women who move with grace and power.",
    images: ["/images/products/sky-dancer.jpg"],
    colors: [
      { name: "Cloud White", value: "white" },
      { name: "Lavender", value: "purple" },
      { name: "Rose Gold", value: "rose-gold" },
    ],
    sizes: [
      { size: "5", available: true },
      { size: "5.5", available: true },
      { size: "6", available: true },
      { size: "6.5", available: true },
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
    ],
    rating: 4.7,
    reviewCount: 2134,
    details: {
      style: "SD-005",
      colorShown: "Cloud White",
      material: "Flexible mesh with supportive TPU",
      sole: "Multi-directional grip outsole",
    },
    features: [
      "Multi-sport versatility",
      "Women-specific design",
      "Superior flexibility",
      "All-day comfort",
      "Stylish performance",
    ],
  },
  6: {
    id: 6,
    name: "Terra Guide",
    category: "All-Terrain Hiking Shoe",
    price: 165,
    description: "Conquer any trail with Terra Guide. Rugged outdoor performance meets sustainable design for conscious adventurers.",
    images: ["/images/products/terra-guide.jpg"],
    colors: [
      { name: "Earth Brown", value: "brown" },
      { name: "Forest Green", value: "green" },
      { name: "Stone Gray", value: "gray" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
    ],
    rating: 4.8,
    reviewCount: 1789,
    details: {
      style: "TG-006",
      colorShown: "Earth Brown",
      material: "Recycled materials with waterproof membrane",
      sole: "Aggressive trail grip with rock protection",
    },
    features: [
      "All-terrain trail performance",
      "Sustainable construction",
      "Waterproof protection",
      "Rock plate protection",
      "Aggressive grip pattern",
    ],
  },
  // New page products (101-109)
  101: {
    id: 101,
    name: "Peak 270 GO",
    category: "Easy On/Off Shoes",
    price: 160,
    description: "Effortless style meets performance. The Peak 270 GO features hands-free design for ultimate convenience without compromising on comfort.",
    images: ["/images/products/pink.jpg"],
    colors: [
      { name: "Sunset Pink", value: "pink" },
      { name: "Ocean Blue", value: "blue" },
      { name: "Cloud White", value: "white" },
      { name: "Midnight Black", value: "black" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
    ],
    rating: 4.6,
    reviewCount: 1234,
    details: {
      style: "PG-101",
      colorShown: "Sunset Pink",
      material: "Breathable mesh with elastic heel",
      sole: "Peak Air cushioning technology",
    },
    features: [
      "Hands-free slip-on design",
      "Peak Air cushioning",
      "Breathable mesh upper",
      "Flexible construction",
      "All-day comfort",
    ],
  },
  102: {
    id: 102,
    name: "Trail Blazer Mid '77 Vintage",
    category: "Men's Shoes",
    price: 105,
    description: "Classic basketball heritage meets trail-ready durability. The Trail Blazer Mid brings vintage style to modern adventures.",
    images: ["/images/products/terra-guide.jpg"],
    colors: [
      { name: "Vintage Brown", value: "brown" },
      { name: "Classic White", value: "white" },
      { name: "Forest Green", value: "green" },
      { name: "Navy Blue", value: "navy" },
      { name: "Black/White", value: "black" },
      { name: "Rust Orange", value: "orange" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
    ],
    rating: 4.7,
    reviewCount: 2156,
    details: {
      style: "TB-102",
      colorShown: "Vintage Brown",
      material: "Premium suede and leather",
      sole: "Vintage rubber cupsole",
    },
    features: [
      "Vintage 1977 design heritage",
      "Premium suede construction",
      "Classic basketball silhouette",
      "Durable rubber outsole",
      "Retro color blocking",
    ],
  },
  103: {
    id: 103,
    name: "Court Classic Low Retro",
    category: "Men's Shoes",
    price: 110,
    description: "Timeless court style with modern comfort. The Court Classic Low delivers iconic basketball aesthetics with contemporary performance.",
    images: ["/images/products/dali.jpg"],
    colors: [
      { name: "Triple White", value: "white" },
      { name: "Black/White", value: "black" },
      { name: "Royal Blue", value: "blue" },
      { name: "Red/White", value: "red" },
      { name: "Grey/White", value: "grey" },
      { name: "Navy/White", value: "navy" },
      { name: "Green/White", value: "green" },
      { name: "Purple/White", value: "purple" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
    ],
    rating: 4.8,
    reviewCount: 3421,
    details: {
      style: "CC-103",
      colorShown: "Triple White",
      material: "Premium leather upper",
      sole: "Classic rubber cupsole",
    },
    features: [
      "Iconic court silhouette",
      "Premium leather construction",
      "Classic perforations",
      "Comfortable foam midsole",
      "Timeless colorways",
    ],
  },
  104: {
    id: 104,
    name: "ThermoFlex Storm Runner",
    category: "Men's Full-Zip Hoodie",
    price: 130,
    description: "Stay warm and stylish with the ThermoFlex Storm Runner. This premium full-zip hoodie combines advanced moisture-wicking technology with comfortable fleece lining for ultimate performance and comfort.",
    images: ["/images/products/storm-shield.jpg"],
    colors: [
      { name: "Storm Grey", value: "grey" },
      { name: "Thunder Black", value: "black" },
      { name: "Cloud White", value: "white" },
      { name: "Navy Storm", value: "navy" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.7,
    reviewCount: 1856,
    details: {
      style: "TF-104",
      colorShown: "Storm Grey",
      material: "ThermoFlex fabric with fleece lining",
      fit: "Standard fit with athletic cut",
    },
    features: [
      "Advanced moisture-wicking technology",
      "Soft fleece interior lining",
      "Full-zip design with storm flap",
      "Kangaroo pocket for storage",
      "Ribbed cuffs and hem",
    ],
  },
  105: {
    id: 105,
    name: "Vertex Phoenix Flex",
    category: "Women's Oversized Crew",
    price: 70,
    description: "Embrace comfort and style with the Phoenix Flex oversized crew. Featuring a relaxed fit and premium cotton blend for all-day comfort and versatility.",
    images: ["/images/products/van-gogh.jpg"],
    colors: [
      { name: "Phoenix Orange", value: "orange" },
      { name: "Sunset Pink", value: "pink" },
      { name: "Cream White", value: "white" },
      { name: "Sage Green", value: "green" },
      { name: "Lavender", value: "purple" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.6,
    reviewCount: 2341,
    details: {
      style: "PF-105",
      colorShown: "Phoenix Orange",
      material: "Premium cotton blend fleece",
      fit: "Oversized relaxed fit",
    },
    features: [
      "Oversized relaxed fit",
      "Premium cotton blend construction",
      "Ribbed crew neckline",
      "Drop shoulder design",
      "Soft brushed interior",
    ],
  },
  106: {
    id: 106,
    name: "CloudMax 2023 FlexKnit",
    category: "Men's Shoes",
    price: 210,
    description: "Experience ultimate comfort with CloudMax 2023 FlexKnit. Advanced knit construction meets cloud-like cushioning for a premium walking and running experience.",
    images: ["/images/products/sky-dancer.jpg"],
    colors: [
      { name: "Cloud White", value: "white" },
      { name: "Storm Grey", value: "grey" },
      { name: "Midnight Blue", value: "blue" },
      { name: "Carbon Black", value: "black" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
    ],
    rating: 4.9,
    reviewCount: 3789,
    details: {
      style: "CM-106",
      colorShown: "Cloud White",
      material: "FlexKnit upper with CloudMax foam",
      sole: "CloudMax cushioning technology",
    },
    features: [
      "FlexKnit breathable upper",
      "CloudMax foam cushioning",
      "Seamless construction",
      "Lightweight design",
      "Superior comfort technology",
    ],
  },
  107: {
    id: 107,
    name: "Swift Trail 4",
    category: "Men's Trail Running Shoes",
    price: 140,
    description: "Conquer any trail with the Swift Trail 4. Engineered for trail runners who demand superior traction, durability, and comfort on rugged terrain.",
    images: ["/images/products/apex-runner.jpg"],
    colors: [
      { name: "Trail Brown", value: "brown" },
      { name: "Forest Green", value: "green" },
      { name: "Stone Grey", value: "grey" },
      { name: "Midnight Black", value: "black" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
    ],
    rating: 4.8,
    reviewCount: 2567,
    details: {
      style: "ST-107",
      colorShown: "Trail Brown",
      material: "Durable mesh with synthetic overlays",
      sole: "Aggressive trail grip outsole",
    },
    features: [
      "Aggressive trail grip outsole",
      "Rock plate protection",
      "Breathable mesh upper",
      "Heel and toe reinforcement",
      "Trail-specific cushioning",
    ],
  },
  108: {
    id: 108,
    name: "Vertex Pro DryTech",
    category: "Women's Long-Sleeve Top",
    price: 35,
    description: "Stay dry and comfortable with the Vertex Pro DryTech long-sleeve top. Advanced moisture-wicking technology keeps you cool during intense workouts.",
    images: ["/images/products/sport.jpg"],
    colors: [
      { name: "Athletic Pink", value: "pink" },
      { name: "Ocean Blue", value: "blue" },
      { name: "Pure White", value: "white" },
      { name: "Charcoal Grey", value: "grey" },
      { name: "Mint Green", value: "green" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.5,
    reviewCount: 1678,
    details: {
      style: "VPD-108",
      colorShown: "Athletic Pink",
      material: "DryTech moisture-wicking fabric",
      fit: "Athletic fit with stretch",
    },
    features: [
      "Advanced moisture-wicking technology",
      "Four-way stretch fabric",
      "Flatlock seams for comfort",
      "Thumbholes for coverage",
      "UPF 50+ sun protection",
    ],
  },
  109: {
    id: 109,
    name: "CrossPeak 9",
    category: "Training Shoes",
    price: 150,
    description: "Dominate your training with the CrossPeak 9. Engineered for cross-training versatility with superior stability and support for all workout types.",
    images: ["/images/products/summit-pro.jpg"],
    colors: [
      { name: "Training Black", value: "black" },
      { name: "Gym Red", value: "red" },
      { name: "Pure White", value: "white" },
      { name: "Navy Blue", value: "blue" },
      { name: "Volt Green", value: "green" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
    ],
    rating: 4.7,
    reviewCount: 2890,
    details: {
      style: "CP-109",
      colorShown: "Training Black",
      material: "Synthetic leather with mesh panels",
      sole: "Multi-directional traction pattern",
    },
    features: [
      "Multi-directional traction pattern",
      "Reinforced toe and heel areas",
      "Breathable mesh panels",
      "Lateral support for side-to-side movement",
      "Versatile cross-training design",
    ],
  },
  // Men's Page Products (202-209)
  202: {
    id: 202,
    name: "VERTEX Dri-FIT ADV TechKnit Ultra",
    category: "Men's Running Top",
    price: 80,
    description: "Advanced moisture-wicking performance meets ultra-lightweight design. The TechKnit Ultra features engineered zones for optimal ventilation and freedom of movement during intense training sessions.",
    images: ["/images/products/sport.jpg"],
    colors: [
      { name: "Performance Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Electric Blue", value: "blue" },
      { name: "Pure White", value: "white" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.8,
    reviewCount: 1456,
    details: {
      style: "VDF-202",
      colorShown: "Performance Black",
      material: "Dri-FIT ADV TechKnit fabric",
      fit: "Athletic cut with engineered zones",
    },
    features: [
      "Advanced Dri-FIT technology",
      "TechKnit Ultra lightweight construction",
      "Engineered ventilation zones",
      "Four-way stretch fabric",
      "Reflective details for visibility",
    ],
  },
  203: {
    id: 203,
    name: "VERTEX Sportswear Tech Fleece",
    category: "Men's Joggers",
    price: 120,
    description: "Premium Tech Fleece joggers engineered for comfort and style. Features innovative thermal regulation and a modern tapered fit perfect for training or casual wear.",
    images: ["/images/products/van-gogh.jpg"],
    colors: [
      { name: "Dark Grey Heather", value: "grey" },
      { name: "Black", value: "black" },
      { name: "Navy Blue", value: "navy" },
      { name: "Carbon Green", value: "green" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.7,
    reviewCount: 2134,
    details: {
      style: "VTF-203",
      colorShown: "Dark Grey Heather",
      material: "Tech Fleece fabric blend",
      fit: "Tapered fit with elastic waistband",
    },
    features: [
      "Tech Fleece thermal regulation",
      "Tapered modern fit",
      "Secure zip pockets",
      "Ribbed cuffs and waistband",
      "Soft brushed interior",
    ],
  },
  204: {
    id: 204,
    name: "VERTEX Air Max 90",
    category: "Men's Shoes",
    price: 130,
    description: "Iconic Air Max 90 silhouette with modern VERTEX performance technology. Classic style meets contemporary comfort for all-day wear.",
    images: ["/images/products/apex-runner.jpg"],
    colors: [
      { name: "White/Grey/Black", value: "white" },
      { name: "Black/Red", value: "black" },
      { name: "Navy/White", value: "navy" },
      { name: "Green/White", value: "green" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.9,
    reviewCount: 3567,
    details: {
      style: "VAM-204",
      colorShown: "White/Grey/Black",
      material: "Premium leather and mesh upper",
      sole: "Visible Air Max cushioning",
    },
    features: [
      "Iconic Air Max visible cushioning",
      "Premium leather construction",
      "Mesh panels for breathability",
      "Rubber waffle outsole",
      "Classic 90s design heritage",
    ],
  },
  205: {
    id: 205,
    name: "VERTEX Pro Dri-FIT",
    category: "Men's Tight-Fit Sleeveless Top",
    price: 30,
    description: "Essential training tank engineered for peak performance. Tight-fit design with advanced moisture-wicking technology for intense workouts.",
    images: ["/images/products/sport.jpg"],
    colors: [
      { name: "Performance Black", value: "black" },
      { name: "Pure White", value: "white" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
      { name: "Electric Blue", value: "blue" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.6,
    reviewCount: 892,
    details: {
      style: "VPD-205",
      colorShown: "Performance Black",
      material: "Dri-FIT performance fabric",
      fit: "Tight-fit athletic cut",
    },
    features: [
      "Advanced Dri-FIT moisture management",
      "Tight-fit design for support",
      "Flatlock seams prevent chafing",
      "Lightweight construction",
      "Quick-dry technology",
    ],
  },
  206: {
    id: 206,
    name: "VERTEX Pegasus 40",
    category: "Men's Road Running Shoes",
    price: 130,
    description: "The trusted workhorse for daily training. Pegasus 40 delivers responsive cushioning and reliable performance for runners of all levels.",
    images: ["/images/products/sky-dancer.jpg"],
    colors: [
      { name: "Pure White/Black", value: "white" },
      { name: "Thunder Grey/Red", value: "grey" },
      { name: "Black/White", value: "black" },
      { name: "Navy/Electric Blue", value: "navy" },
    ],
    sizes: [
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
      { size: "11", available: true },
      { size: "11.5", available: true },
      { size: "12", available: true },
      { size: "13", available: true },
    ],
    rating: 4.8,
    reviewCount: 4321,
    details: {
      style: "VP40-206",
      colorShown: "Pure White/Black",
      material: "Engineered mesh with synthetic overlays",
      sole: "Vertex React foam with rubber outsole",
    },
    features: [
      "Vertex React foam cushioning",
      "Engineered mesh upper",
      "Heel counter for stability",
      "Durable rubber outsole",
      "Trusted daily trainer design",
    ],
  },
  207: {
    id: 207,
    name: "VERTEX Sportswear Club",
    category: "Men's T-Shirt",
    price: 30,
    description: "Classic comfort meets modern performance. The Sportswear Club tee features premium cotton construction with moisture-wicking technology for all-day comfort.",
    images: ["/images/products/sport.jpg"],
    colors: [
      { name: "Pure White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Thunder Grey", value: "grey" },
      { name: "Navy Blue", value: "navy" },
      { name: "Forest Green", value: "green" },
      { name: "Burgundy", value: "burgundy" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.5,
    reviewCount: 1678,
    details: {
      style: "VSC-207",
      colorShown: "Pure White",
      material: "Premium cotton blend",
      fit: "Classic fit with ribbed collar",
    },
    features: [
      "Premium cotton construction",
      "Classic comfortable fit",
      "Ribbed collar for durability",
      "Moisture-wicking technology",
      "Machine washable",
    ],
  },
  208: {
    id: 208,
    name: "VERTEX Elite",
    category: "Basketball Shorts",
    price: 45,
    description: "Dominate the court with VERTEX Elite basketball shorts. Engineered for peak performance with moisture-wicking fabric and strategic ventilation.",
    images: ["/images/products/dali.jpg"],
    colors: [
      { name: "Black/White", value: "black" },
      { name: "Red/Black", value: "red" },
      { name: "Navy/White", value: "navy" },
      { name: "Grey/Black", value: "grey" },
      { name: "Purple/White", value: "purple" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.7,
    reviewCount: 1234,
    details: {
      style: "VE-208",
      colorShown: "Black/White",
      material: "Dri-FIT performance fabric",
      fit: "Athletic fit with 9-inch inseam",
    },
    features: [
      "Dri-FIT moisture management",
      "Mesh panels for ventilation",
      "Elastic waistband with drawcord",
      "Side pockets for storage",
      "Basketball-specific design",
    ],
  },
  209: {
    id: 209,
    name: "VERTEX Windrunner",
    category: "Men's Jacket",
    price: 100,
    description: "Iconic windrunner design with modern performance features. Weather-resistant construction meets timeless style for year-round versatility.",
    images: ["/images/products/storm-shield.jpg"],
    colors: [
      { name: "Black/Grey/White", value: "black" },
      { name: "Navy/Blue/White", value: "navy" },
      { name: "Green/Black/White", value: "green" },
      { name: "Red/Black/White", value: "red" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.8,
    reviewCount: 2567,
    details: {
      style: "VW-209",
      colorShown: "Black/Grey/White",
      material: "Weather-resistant fabric with mesh lining",
      fit: "Regular fit with adjustable hood",
    },
    features: [
      "Weather-resistant construction",
      "Iconic chevron design",
      "Adjustable hood",
      "Full-zip closure",
      "Side pockets for storage",
    ],
  },
  // Women's Products (301-309)
  301: {
    id: 301,
    name: "Vertex Force One '07",
    category: "Women's Shoes",
    price: 110,
    description: "Classic Force One silhouette redesigned for women. Timeless basketball heritage meets modern comfort and style for everyday wear.",
    images: ["/images/products/womans1.jpg"],
    colors: [
      { name: "Pure White", value: "white" },
      { name: "Black/White", value: "black" },
      { name: "Pink/White", value: "pink" },
      { name: "Navy/White", value: "navy" },
    ],
    sizes: [
      { size: "5", available: true },
      { size: "5.5", available: true },
      { size: "6", available: true },
      { size: "6.5", available: true },
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
      { size: "10.5", available: true },
    ],
    rating: 4.7,
    reviewCount: 2890,
    details: {
      style: "VF1W-301",
      colorShown: "Pure White",
      material: "Premium leather upper",
      sole: "Vertex Air cushioning",
    },
    features: [
      "Women-specific fit and design",
      "Premium leather construction",
      "Vertex Air technology",
      "Classic pivot circle outsole",
      "Timeless basketball heritage",
    ],
  },
  302: {
    id: 302,
    name: "Vertex Phoenix Flex",
    category: "Women's Oversized Crew",
    price: 70,
    description: "Embrace comfort and style with the Phoenix Flex oversized crew. Featuring a relaxed fit and premium cotton blend for all-day comfort and versatility.",
    images: ["/images/products/womans2.jpg"],
    colors: [
      { name: "Phoenix Orange", value: "orange" },
      { name: "Sunset Pink", value: "pink" },
      { name: "Cream White", value: "white" },
      { name: "Sage Green", value: "green" },
      { name: "Lavender", value: "purple" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.6,
    reviewCount: 1789,
    details: {
      style: "VSPF-302",
      colorShown: "Phoenix Orange",
      material: "Premium cotton blend fleece",
      fit: "Oversized relaxed fit",
    },
    features: [
      "Oversized relaxed fit",
      "Premium cotton blend construction",
      "Ribbed crew neckline",
      "Drop shoulder design",
      "Soft brushed interior",
    ],
  },
  303: {
    id: 303,
    name: "FlowFit",
    category: "Women's Gentle-Support High-Waisted Leggings",
    price: 110,
    description: "Experience ultimate comfort with FlowFit leggings. Gentle support technology meets high-waisted design for a flattering fit that moves with you.",
    images: ["/images/products/womans3.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Midnight Navy", value: "navy" },
      { name: "Sage Green", value: "green" },
      { name: "Mauve Pink", value: "pink" },
      { name: "Charcoal Grey", value: "grey" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.8,
    reviewCount: 3456,
    details: {
      style: "FF-303",
      colorShown: "Black",
      material: "FlowFit fabric with gentle support",
      fit: "High-waisted with compression zones",
    },
    features: [
      "Gentle support technology",
      "High-waisted design",
      "Four-way stretch fabric",
      "Flattering compression zones",
      "Moisture-wicking properties",
    ],
  },
  304: {
    id: 304,
    name: "Court Classic Low",
    category: "Women's Shoes",
    price: 110,
    description: "Timeless court style designed for women. Classic basketball aesthetics with modern comfort and feminine proportions.",
    images: ["/images/products/womans1.jpg"],
    colors: [
      { name: "Triple White", value: "white" },
      { name: "Black/White", value: "black" },
      { name: "Pink/White", value: "pink" },
      { name: "Purple/White", value: "purple" },
      { name: "Mint Green/White", value: "green" },
    ],
    sizes: [
      { size: "5", available: true },
      { size: "5.5", available: true },
      { size: "6", available: true },
      { size: "6.5", available: true },
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
    ],
    rating: 4.7,
    reviewCount: 2134,
    details: {
      style: "CCW-304",
      colorShown: "Triple White",
      material: "Premium leather upper",
      sole: "Classic rubber cupsole",
    },
    features: [
      "Women-specific fit and sizing",
      "Premium leather construction",
      "Classic court perforations",
      "Comfortable foam midsole",
      "Feminine colorways",
    ],
  },
  305: {
    id: 305,
    name: "Vertex Bra",
    category: "Women's Medium-Support Padded Sports Bra",
    price: 35,
    description: "Essential medium-support sports bra engineered for active women. Padded design with moisture-wicking technology for comfort during workouts.",
    images: ["/images/products/womans2.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Pure White", value: "white" },
      { name: "Blush Pink", value: "pink" },
      { name: "Sage Green", value: "green" },
      { name: "Lavender", value: "purple" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.6,
    reviewCount: 1456,
    details: {
      style: "VS-305",
      colorShown: "Black",
      material: "Dri-FIT performance fabric",
      fit: "Medium-support with padded cups",
    },
    features: [
      "Medium-support construction",
      "Padded cups for comfort",
      "Dri-FIT moisture management",
      "Removable padding",
      "Racerback design",
    ],
  },
  306: {
    id: 306,
    name: "Swift Runner 40",
    category: "Women's Road Running Shoes",
    price: 130,
    description: "Engineered for female runners who demand performance and comfort. Swift Runner 40 delivers responsive cushioning and breathable construction.",
    images: ["/images/products/womans3.jpg"],
    colors: [
      { name: "Pure White/Pink", value: "white" },
      { name: "Black/Purple", value: "black" },
      { name: "Grey/Mint", value: "grey" },
      { name: "Navy/Coral", value: "navy" },
    ],
    sizes: [
      { size: "5", available: true },
      { size: "5.5", available: true },
      { size: "6", available: true },
      { size: "6.5", available: true },
      { size: "7", available: true },
      { size: "7.5", available: true },
      { size: "8", available: true },
      { size: "8.5", available: true },
      { size: "9", available: true },
      { size: "9.5", available: true },
      { size: "10", available: true },
    ],
    rating: 4.8,
    reviewCount: 2567,
    details: {
      style: "SR40W-306",
      colorShown: "Pure White/Pink",
      material: "Engineered mesh with synthetic overlays",
      sole: "Vertex React foam with rubber outsole",
    },
    features: [
      "Women-specific fit and design",
      "Vertex React foam cushioning",
      "Engineered mesh upper",
      "Heel counter for stability",
      "Feminine colorways",
    ],
  },
  307: {
    id: 307,
    name: "Vertex Essential",
    category: "Women's T-Shirt",
    price: 30,
    description: "Essential comfort meets athletic performance. The Sport Essential tee features moisture-wicking technology and a flattering feminine fit.",
    images: ["/images/products/womans1.jpg"],
    colors: [
      { name: "Pure White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Blush Pink", value: "pink" },
      { name: "Sage Green", value: "green" },
      { name: "Lavender", value: "purple" },
      { name: "Coral", value: "coral" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.5,
    reviewCount: 1234,
    details: {
      style: "VSE-307",
      colorShown: "Pure White",
      material: "Premium cotton blend",
      fit: "Relaxed fit with feminine cut",
    },
    features: [
      "Feminine fit and design",
      "Premium cotton construction",
      "Moisture-wicking technology",
      "Soft hand feel",
      "Machine washable",
    ],
  },
  308: {
    id: 308,
    name: "Vertex One",
    category: "Women's Mid-Rise 7/8 Leggings",
    price: 60,
    description: "Versatile 7/8 leggings with mid-rise design. Perfect for training, yoga, or casual wear with comfortable stretch fabric and flattering fit.",
    images: ["/images/products/womans2.jpg"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Midnight Navy", value: "navy" },
      { name: "Charcoal Grey", value: "grey" },
      { name: "Sage Green", value: "green" },
      { name: "Mauve Pink", value: "pink" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.7,
    reviewCount: 1890,
    details: {
      style: "VO-308",
      colorShown: "Black",
      material: "Stretch fabric with Dri-FIT technology",
      fit: "Mid-rise with 7/8 length",
    },
    features: [
      "Mid-rise comfortable waistband",
      "7/8 length design",
      "Four-way stretch fabric",
      "Dri-FIT moisture management",
      "Flattering fit",
    ],
  },
  309: {
    id: 309,
    name: "Storm Runner",
    category: "Women's Jacket",
    price: 100,
    description: "Weather-resistant jacket designed for active women. Storm Runner combines protection from the elements with feminine style and performance features.",
    images: ["/images/products/womans3.jpg"],
    colors: [
      { name: "Black/Grey", value: "black" },
      { name: "Navy/Pink", value: "navy" },
      { name: "White/Mint", value: "white" },
      { name: "Purple/White", value: "purple" },
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true },
    ],
    rating: 4.8,
    reviewCount: 2234,
    details: {
      style: "SRW-309",
      colorShown: "Black/Grey",
      material: "Weather-resistant fabric with mesh lining",
      fit: "Athletic fit with feminine silhouette",
    },
    features: [
      "Weather-resistant construction",
      "Feminine athletic silhouette",
      "Adjustable hood",
      "Full-zip closure",
      "Side pockets with secure zippers",
    ],
  },
}

// Mock related products
const relatedProducts = [
  {
    id: 2,
    name: "Terra Guide",
    category: "All-Terrain Hiking Shoe",
    price: 165,
    colors: 4,
    images: ["/images/products/terra-guide.jpg"],
  },
  {
    id: 3,
    name: "Apex Runner",
    category: "Elite Marathon Racing Flat",
    price: 200,
    colors: 3,
    images: ["/images/products/apex-runner.jpg"],
  },
  {
    id: 4,
    name: "Storm Shield",
    category: "Waterproof Cross-Trainer",
    price: 155,
    colors: 5,
    images: ["/images/products/storm-shield.jpg"],
  },
  {
    id: 5,
    name: "Night Hawk",
    category: "Reflective Running Shoe",
    price: 140,
    colors: 3,
    images: ["/images/products/urban-forge.jpg"],
  },
]

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const { addToCart } = useCart()
  const [productId, setProductId] = useState<number | null>(null)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  
  // Handle async params
  useEffect(() => {
    params.then(resolvedParams => {
      setProductId(parseInt(resolvedParams.id))
    })
  }, [params])
  
  // Get the product based on the ID from URL
  const product = productId ? allProducts[productId as keyof typeof allProducts] : null
  
  // If product not found, show default (Summit Pro)
  const currentProduct = product || allProducts[1]
  
  // Show loading state while params are resolving
  if (productId === null) {
    return (
      <>
        <Header currentSection="products" />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">Loading...</div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      category: currentProduct.category,
      price: currentProduct.price,
      colors: currentProduct.colors.length,
      image: currentProduct.images[0],
    })
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Breadcrumbs
          items={[
            { label: "Men", href: "/men" },
            { label: "Shoes", href: "/men/shoes" },
            { label: currentProduct.name },
          ]}
        />

        <div className="px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={currentProduct.images[currentImageIndex]}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : currentProduct.images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev < currentProduct.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {currentProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? "border-black" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentProduct.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title and Price */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{currentProduct.name}</h1>
                <p className="text-gray-600 mb-4">{currentProduct.category}</p>
                <p className="text-2xl font-medium">${currentProduct.price}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(currentProduct.rating)
                          ? "fill-black text-black"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {currentProduct.rating} ({currentProduct.reviewCount} Reviews)
                </span>
              </div>

              {/* Color Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">
                    Color: {currentProduct.colors[selectedColorIndex].name}
                  </h3>
                </div>
                <div className="flex gap-2">
                  {currentProduct.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColorIndex(index)}
                      className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                        selectedColorIndex === index
                          ? "border-black"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={currentProduct.images[0]}
                        alt={color.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Select Size</h3>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-sm text-gray-600 hover:text-black underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {currentProduct.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => size.available && setSelectedSize(size.size)}
                      disabled={!size.available}
                      className={`py-3 px-4 rounded-lg border transition-all ${
                        selectedSize === size.size
                          ? "border-black bg-black text-white"
                          : size.available
                          ? "border-gray-300 hover:border-gray-400"
                          : "border-gray-200 text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Bag & Favorite */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToBag}
                  className="flex-1 bg-black text-white hover:bg-gray-800 py-6 text-lg rounded-full"
                >
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-6 rounded-full"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="space-y-3 py-4 border-t">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Secure checkout</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5" />
                  <span className="text-sm">Free returns within 60 days</span>
                </div>
              </div>

              {/* Product Description */}
              <div className="prose prose-sm">
                <p>{currentProduct.description}</p>
              </div>

              {/* Expandable Sections */}
              <div className="space-y-2 border-t pt-4">
                {/* Features */}
                <div className="border-b">
                  <button
                    onClick={() => toggleSection("features")}
                    className="w-full py-4 flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium">Features & Benefits</span>
                    {expandedSection === "features" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {expandedSection === "features" && (
                    <div className="pb-4">
                      <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                        {currentProduct.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="border-b">
                  <button
                    onClick={() => toggleSection("details")}
                    className="w-full py-4 flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium">Product Details</span>
                    {expandedSection === "details" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {expandedSection === "details" && (
                    <div className="pb-4 space-y-2 text-sm text-gray-600">
                      <p>Style: {currentProduct.details.style}</p>
                      <p>Color Shown: {currentProduct.details.colorShown}</p>
                      <p>Material: {currentProduct.details.material}</p>
                      {"sole" in currentProduct.details && <p>Sole: {currentProduct.details.sole}</p>}
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div className="border-b">
                  <button
                    onClick={() => toggleSection("shipping")}
                    className="w-full py-4 flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium">Shipping & Returns</span>
                    {expandedSection === "shipping" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {expandedSection === "shipping" && (
                    <div className="pb-4 space-y-2 text-sm text-gray-600">
                      <p>Free standard shipping on orders $50+</p>
                      <p>Express shipping available at checkout</p>
                      <p>Free returns within 60 days</p>
                      <p>VERTEX Members get free shipping on all orders</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 bg-white">
            {/* Header Area */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-black">Reviews (2090)</h2>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-black text-black"
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-black">4.9 Stars</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-black underline hover:no-underline text-sm font-medium">
                  Write a Review
                </button>
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-8">
              {/* Review 1 - Long username with fire emojis */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black mr-1" />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 text-sm">OutdoorAdventureExplorer_MountainTrailRunner</span>
                  <span className="text-gray-600 text-sm">-</span>
                  <span className="text-gray-600 text-sm">May 30, 2025</span>
                </div>
                <p className="text-black leading-relaxed">
                  These Summit Pros are absolutely incredible! 🔥🔥🔥🔥 Love the deep navy color with the electric blue accents - really makes them pop on the trails.
                </p>
              </div>

              {/* Review 2 - Product-specific title with More link */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black mr-1" />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 text-sm">Summit Pro Trail Test</span>
                  <span className="text-gray-600 text-sm">-</span>
                  <span className="text-gray-600 text-sm">May 19, 2025</span>
                </div>
                <p className="text-black leading-relaxed">
                  I&apos;ve been putting these through rigorous testing for the past 3 months across various trail conditions. The carbon fiber plate provides excellent energy return, and the grip on technical terrain is outstanding. The sustainable materials don&apos;t compromise performance at all. Fit runs true to size with excellent arch support and heel lockdown...{" "}
                  <button className="text-black underline hover:no-underline">More</button>
                </p>
              </div>

              {/* Review 3 - Title format with promotional disclosure */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black mr-1" />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 text-sm">Love Summit Pro&apos;s</span>
                  <span className="text-gray-600 text-sm">-</span>
                  <span className="text-gray-600 text-sm">May 15, 2025</span>
                </div>
                <p className="text-black leading-relaxed mb-3">
                  VERTEX&apos;s commitment to sustainability really shines through in these shoes. The recycled materials feel premium and the performance is top-notch.
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  This reviewer received promotional consideration for this review.
                </p>
                <p className="text-xs text-gray-400">
                  Disclaimer: This review was written after receiving a free product from VERTEX ATHLETIC.
                </p>
              </div>

              {/* Review 4 - Performance focused */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black mr-1" />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 text-sm">UltraMarathonPro</span>
                  <span className="text-gray-600 text-sm">-</span>
                  <span className="text-gray-600 text-sm">May 12, 2025</span>
                </div>
                <p className="text-black leading-relaxed">
                  These helped me achieve a new PR in my last 50K! The energy return from the carbon plate is noticeable especially on longer runs. Traction on wet rocks and technical descents is phenomenal. VERTEX has created something special here.
                </p>
              </div>

              {/* Review 5 - Eco-conscious review */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex mb-3">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black mr-1" />
                  ))}
                  <Star className="w-4 h-4 fill-gray-200 text-gray-200 mr-1" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 text-sm">SustainableRunner_Alex</span>
                  <span className="text-gray-600 text-sm">-</span>
                  <span className="text-gray-600 text-sm">May 8, 2025</span>
                </div>
                <p className="text-black leading-relaxed">
                  Finally found a performance shoe that aligns with my environmental values! The recycled ocean plastic construction doesn&apos;t sacrifice durability. Only knocked off one star because they run slightly narrow for wide feet. 🌱
                </p>
              </div>

              {/* Review 6 - Technical analysis */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black mr-1" />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 text-sm">GearTester_Pro</span>
                  <span className="text-gray-600 text-sm">-</span>
                  <span className="text-gray-600 text-sm">May 5, 2025</span>
                </div>
                <p className="text-black leading-relaxed">
                  Technical specs delivered as promised. 35mm heel, 25mm forefoot stack height, 4mm drop. Carbon plate positioned perfectly for midfoot propulsion. Vibram outsole compound grips exceptionally well. At 285g, they&apos;re light for a max-cushion trail shoe...{" "}
                  <button className="text-black underline hover:no-underline">More</button>
                </p>
              </div>

              {/* Review 7 - Colorway specific */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black mr-1" />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 text-sm">StyleMeetsPerformance</span>
                  <span className="text-gray-600 text-sm">-</span>
                  <span className="text-gray-600 text-sm">May 1, 2025</span>
                </div>
                <p className="text-black leading-relaxed">
                  The Deep Navy/Electric Blue colorway is stunning! Looks great both on trails and around town. Performance is excellent too - comfortable for daily training and capable enough for race day.
                </p>
              </div>

              {/* Review 8 - Comparison review */}
              <div className="pb-6">
                <div className="flex mb-3">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black mr-1" />
                  ))}
                  <Star className="w-4 h-4 fill-gray-200 text-gray-200 mr-1" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 text-sm">TrailComparison_Expert</span>
                  <span className="text-gray-600 text-sm">-</span>
                  <span className="text-gray-600 text-sm">April 28, 2025</span>
                </div>
                <p className="text-black leading-relaxed">
                  Coming from other premium trail shoes, these Summit Pros hold their own well. The sustainability angle is a nice bonus. Traction and durability are excellent. Only concern is long-term wear on the carbon plate, but so far so good after 200+ miles.
                </p>
              </div>
            </div>

            {/* Load More Reviews */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <Button variant="outline" className="px-8 py-2 text-black border-black hover:bg-gray-50">
                Load More Reviews
              </Button>
            </div>
          </div>

          {/* You Might Also Like */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} showQuickView={false} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}