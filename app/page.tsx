"use client"

import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ProductGrid from "@/components/product-grid"
import Footer from "@/components/footer"
import ClaimOfferWithAssetButton from "@/components/claim-offer-with-asset-button"

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="py-12">
          <ProductGrid onViewAll={() => router.push("/men")} />
        </div>
        <div className="py-12">
          <ClaimOfferWithAssetButton />
        </div>
      </main>
      <Footer />
    </>
  )
}