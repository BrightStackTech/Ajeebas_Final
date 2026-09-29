import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollProgress from "@/components/ScrollProgress";
import CartToast from "@/components/CartToast";
import ConciergeChatbot from "@/components/ConciergeChatbot";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AJEEBAS CHOCOLATE | Premium Dubai Chocolate Collection",
  description: "Handcrafted Chocolate Dates with Almond & Pistachio, Iconic Pistachio Kunafa Bars, Truffles, Rocher & Gourmet Chocolates. Born in Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500 selection:bg-[var(--accent)] selection:text-[var(--background)]">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SmoothScrollProvider>
            <ScrollProgress />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartToast />
            <ConciergeChatbot />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
