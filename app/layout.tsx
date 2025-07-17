import type { Metadata } from "next";
import Script from "next/script";
import { CartProvider } from "@/components/cart-context";
import CartMessageHandler from "@/components/cart-message-handler";
import "./globals.css";

export const metadata: Metadata = {
  title: "VERTEX ATHLETIC - Reach Your Peak",
  description: "Performance meets sustainability. Shop premium athletic footwear and gear for outdoor enthusiasts and urban athletes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {children}
          <CartMessageHandler />
        </CartProvider>
        
        {/* Chat Widget CSS and Container */}
        <link rel="stylesheet" href="/chat-widget.css" />
        <div id="chat-widget-root" />
        
        {/* Chat Widget Script - Built Version with ProductCarousel */}
        <Script 
          src="/chat-widget.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
