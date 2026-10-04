import Link from "next/link";
import { glass, Shine } from "./glass";

export default function Footer() {
  return (
    <footer className="relative mx-auto mt-10 w-full max-w-6xl px-3 pb-4 sm:mt-16 sm:px-4 sm:pb-6">
      <div className={`${glass} px-6 py-8 sm:px-8 sm:py-10`}>
        <Shine />
        <div className="relative grid gap-8 text-center sm:grid-cols-3 sm:text-left">
          {/* 品牌 */}
          <div>
            <p className="text-xl font-bold">🥭 夏芒果園</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              樹上自然熟、產地直送，把台南最香甜的芒果送到你家。
            </p>
          </div>

          {/* 快速連結 */}
          <div>
            <p className="font-semibold">快速連結</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/#products" className="hover:text-orange-600">本季商品</Link></li>
              <li><Link href="/#story" className="hover:text-orange-600">果園故事</Link></li>
              <li><Link href="/#faq" className="hover:text-orange-600">常見問題</Link></li>
              <li><Link href="/blog" className="hover:text-orange-600">芒果部落格</Link></li>
              <li><Link href="/#order" className="hover:text-orange-600">線上訂購</Link></li>
            </ul>
          </div>

          {/* 聯絡資訊 */}
          <div>
            <p className="font-semibold">聯絡我們</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>📧 hello@example.com</li>
              <li>📍 台南市玉井區</li>
              <li>🕘 週一至週六 08:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="relative mt-8 space-y-1 border-t border-white/50 pt-6 text-center text-xs text-slate-500">
          <p>
            照片來源：Unsplash（Rajendra Biswal、Becky Mattson、Alexander Schimmeck、Fedor、HOTCHICKSING、Allec Gomes）、
            Wikimedia Commons（Evo101469，公有領域）
          </p>
          <p>© 2026 夏芒果園．AI-CODING 無痛上手練習作品，非真實商店</p>
        </div>
      </div>
    </footer>
  );
}
