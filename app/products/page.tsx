"use client"

import Header from "@/components/header"
import ProductListing from "@/components/product-listing"
import Footer from "@/components/footer"

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <ProductListing />
      </main>
      <Footer />
    </>
  )
}