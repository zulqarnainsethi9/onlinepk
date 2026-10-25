import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import CartProvider from "@/components/cart/CartProvider";
import CatalogProvider from "@/components/catalog/CatalogProvider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: `${siteConfig.name} | Wireless Earbuds & Electronics`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900">
        <CartProvider>
          <CatalogProvider>
            <AnnouncementBar />
            <Suspense
              fallback={
                <div className="h-16 border-b border-zinc-200/80 bg-white" />
              }
            >
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CatalogProvider>
        </CartProvider>
      </body>
    </html>
  );
}
