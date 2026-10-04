import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BackgroundBlobs } from "@/components/motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "夏芒果園｜台南樹上熟愛文芒果",
  description: "產地直送的台南愛文芒果、金煌芒果與冷凍芒果丁，線上訂購冷藏宅配到府",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      {/* html 用 min-h-full（不是 h-full），背景漸層才會延伸到整頁，不會每一屏重複出現接縫 */}
      <body className="relative min-h-screen flex flex-col overflow-x-clip bg-gradient-to-br from-amber-100 via-orange-100 to-lime-100 text-slate-800">
        {/* 背景彩色光暈（會隨捲動產生視差） */}
        <BackgroundBlobs />

        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
