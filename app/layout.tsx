import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-context";
import CartMessageHandler from "@/components/cart-message-handler";
import ClaimOfferButton from "@/components/claim-offer-button";
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
          <ClaimOfferButton />
        </CartProvider>
      </body>
    </html>
  );
}
