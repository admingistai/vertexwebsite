"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-context"

interface HeaderProps {
  currentSection?: string
}

export default function Header({ currentSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cartCount } = useCart()

  const mainNavItems = [
    { label: "New", href: "/new" },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "Kids", href: "/kids" },
    { label: "About", href: "/about" },
  ]

  const userNavItems = [
    { label: "Find a Store", href: "#" },
    { label: "Help", href: "#" },
    { label: "Join Us", href: "#" },
    { label: "Sign In", href: "#" },
  ]

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
      {/* Top promotional banner */}
      <div className="bg-muted py-2 text-center text-sm">
        <button className="underline hover:no-underline text-muted-foreground">Get a VERTEX Gift Card</button>
      </div>

      {/* Main header */}
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <img 
              src="/images/logos/logo.png" 
              alt="VERTEX ATHLETIC" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold hidden sm:block text-foreground">VERTEX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-foreground hover:text-primary font-medium transition-colors ${
                  currentSection === item.label.toLowerCase() ? "text-primary font-bold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none p-0 text-sm focus-visible:ring-0"
              />
            </div>

            {/* User navigation - desktop */}
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              {userNavItems.map((item) => (
                <a key={item.label} href={item.href} className="text-gray-900 hover:text-gray-600 transition-colors">
                  {item.label}
                </a>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile search */}
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent border-none p-0 text-sm focus-visible:ring-0"
                />
              </div>

              {/* Mobile navigation */}
              {mainNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-gray-900 hover:text-gray-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile user navigation */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                {userNavItems.map((item) => (
                  <a key={item.label} href={item.href} className="block text-gray-900 hover:text-gray-600 py-2">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
