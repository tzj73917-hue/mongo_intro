"use client";

import { useState } from "react";
import Link from "next/link";
import { glass, Shine } from "./glass";

const links = [
  { href: "/#products", label: "商品" },
  { href: "/#story", label: "果園故事" },
  { href: "/#faq", label: "常見問題" },
  { href: "/blog", label: "部落格" },
];

export default function Header() {
  // 手機版選單是否展開
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-3 z-20 mx-auto mt-3 w-full max-w-6xl px-3 sm:top-4 sm:mt-4 sm:px-4">
      <nav className={`${glass} px-4 py-3 sm:px-6`}>
        <Shine />
        <div className="relative flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-lg font-bold sm:text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 bg-gradient-to-br from-amber-300/70 to-orange-400/70 text-lg shadow-inner">
              🥭
            </span>
            夏芒果園
          </Link>

          <div className="flex items-center gap-3 text-sm font-medium md:gap-6">
            {/* 平板、電腦：直接顯示連結 */}
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hidden transition hover:text-orange-600 md:inline">
                {link.label}
              </Link>
            ))}
            <Link
              href="/#order"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/60 bg-gradient-to-r from-orange-400 to-amber-500 px-4 py-2 text-white shadow-md shadow-orange-500/30 transition hover:scale-105"
            >
              🛒 <span className="hidden sm:inline">立即</span>訂購
            </Link>

            {/* 手機：漢堡選單按鈕 */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-xl transition hover:bg-white/80 md:hidden"
              aria-label={open ? "關閉選單" : "開啟選單"}
              aria-expanded={open}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* 手機：展開的選單 */}
        {open && (
          <div className="relative mt-3 flex flex-col gap-1 border-t border-white/50 pt-3 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-medium transition hover:bg-white/50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
