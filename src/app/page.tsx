import Image from "next/image";
import { glass, Shine } from "@/components/glass";
import { Parallax, ParallaxImage, Reveal } from "@/components/motion";
import OrderForm from "@/components/OrderForm";
import { products } from "@/lib/products";

const features = [
  { icon: "🌳", title: "樹上自然熟", desc: "等到七、八分熟才採收，不催熟、香氣足。" },
  { icon: "🚚", title: "產地一一一一一一直送", desc: "當天採收、當天出貨，冷藏宅配到你家。" },
  { icon: "✅", title: "壞果包退", desc: "收到有碰傷、腐壞，拍照回報就補寄或退款。" },
];

// speed 正負交錯，讓照片牆的欄位上下錯開移動
const gallery = [
  { src: "/image/mango-3.jpg", alt: "一整堆紅黃色的芒果", speed: 0.06 },
  { src: "/image/mango-6.jpg", alt: "掛在枝頭帶著水珠的芒果", speed: -0.06 },
  { src: "/image/mango-4.jpg", alt: "一盤切好的芒果片", speed: 0.06 },
  { src: "/image/mango-5.jpg", alt: "一盆熟成的芒果", speed: -0.06 },
];

const faqs = [
  { q: "什麼時候出貨？", a: "芒果產季約 5–8 月，下單後 3–5 個工作天內出貨；冷凍芒果丁全年皆可訂購。" },
  { q: "運費怎麼算？", a: "全台冷藏宅配 NT$160，單筆滿 NT$1,500 免運（離島另計）。" },
  { q: "收到後怎麼保存？", a: "還偏硬的芒果放室溫通風處 1–2 天，聞到香氣、按壓微軟後再冷藏，風味最好。" },
  { q: "可以指定到貨日嗎？", a: "可以，請在訂購單備註欄寫下希望到貨日，我們會盡量配合。" },
];

export default function Home() {
  return (
    <main className="relative mx-auto max-w-6xl px-3 sm:px-4">
      {/* 主視覺 */}
      <section className="relative grid items-center gap-6 py-8 sm:py-12 lg:grid-cols-2 lg:gap-10 lg:py-24">
        {/* 漂浮的裝飾芒果：速度不同，捲動時產生前後層次 */}
        <Parallax speed={-0.3} className="pointer-events-none absolute right-3 top-4 z-10 text-5xl sm:-left-6 sm:right-auto sm:text-6xl">
          <span className="block rotate-[-20deg] drop-shadow-lg">🥭</span>
        </Parallax>
        <Parallax speed={-0.5} className="pointer-events-none absolute bottom-0 right-2 z-10 text-4xl sm:right-[45%] sm:text-5xl">
          <span className="block rotate-[15deg] drop-shadow-lg">🍃</span>
        </Parallax>

        <Reveal>
          <div className={`${glass} px-6 py-10 sm:px-10 sm:py-12`}>
            <Shine />
            <span className="relative inline-block rounded-full bg-white/60 px-4 py-1 text-sm font-medium text-orange-600">
              ☀️ 夏季芒果 開放預購中
            </span>
            <h1 className="relative mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              一口咬下<br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                滿滿的夏天
              </span>
            </h1>
            <p className="relative mt-6 text-base text-slate-600 sm:text-lg">
              來自台南的樹上熟愛文芒果，果肉細緻、香甜多汁。
              產地直送，從果園到你家餐桌只要一天。
            </p>
            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#order"
                className="rounded-full border border-white/60 bg-gradient-to-r from-orange-400 to-amber-500 px-8 py-3 text-center font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:scale-105"
              >
                立即訂購 →
              </a>
              <a
                href="#products"
                className="rounded-full border border-white/60 bg-white/40 px-8 py-3 text-center font-semibold transition hover:bg-white/70"
              >
                看看商品
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <Parallax speed={0.08}>
            <div className={`${glass} aspect-[4/3] p-2 sm:aspect-[16/9] sm:p-3 lg:aspect-[4/3]`}>
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <ParallaxImage
                  src="/image/mango-3.jpg"
                  alt="一整堆紅黃色的新鮮芒果"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  speed={0.15}
                  eager
                />
              </div>
              <Shine />
            </div>
          </Parallax>
        </Reveal>
      </section>

      {/* 商品 */}
      <section id="products" className="scroll-mt-28 py-10 sm:py-12">
        <Reveal>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">🥭 本季商品</h2>
          <p className="mt-2 text-center text-slate-600">每一顆都是親手挑選，安心送到你手上</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 100} className="h-full">
              <article
                className={`${glass} group flex h-full flex-col p-4 transition duration-300 hover:-translate-y-2 hover:bg-white/40`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-square">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  {p.tag && (
                    <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-semibold text-orange-600 backdrop-blur">
                      {p.tag}
                    </span>
                  )}
                </div>
                <Shine />
                <div className="relative flex flex-1 flex-col pt-4">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="text-sm text-slate-500">{p.spec}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-orange-600">
                      NT${p.price.toLocaleString()}
                    </span>
                    <a
                      href="#order"
                      className="rounded-full bg-gradient-to-r from-orange-400 to-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
                    >
                      訂購
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 視差大圖橫幅 */}
      <section className="py-10 sm:py-12">
        <Reveal>
          <div className="relative h-[60vh] min-h-80 max-h-[640px] overflow-hidden rounded-3xl border border-white/50 shadow-[0_8px_32px_rgba(31,38,135,0.15)]">
            <ParallaxImage
              src="/image/mango-6.jpg"
              alt="清晨掛在枝頭、帶著露水的芒果"
              sizes="(min-width: 1152px) 1152px, 100vw"
              speed={0.3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-end justify-center p-6 sm:items-center sm:p-10">
              <Parallax speed={-0.15}>
                <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/15 px-6 py-6 text-center text-white backdrop-blur-md sm:px-12 sm:py-10">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
                  <p className="relative text-sm tracking-[0.3em] text-white/80">FROM TREE TO TABLE</p>
                  <p className="relative mt-3 text-2xl font-bold sm:text-4xl">從枝頭到餐桌，只要一天</p>
                  <p className="relative mt-3 text-sm text-white/80 sm:text-base">清晨採收、當天出貨，留住芒果最新鮮的香氣</p>
                </div>
              </Parallax>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 果園故事 */}
      <section id="story" className="scroll-mt-28 py-10 sm:py-16">
        <Reveal>
          <div className={`${glass} grid items-center gap-6 p-4 sm:gap-8 sm:p-10 lg:grid-cols-2`}>
            <Shine />
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <ParallaxImage
                src="/image/mango-1.jpg"
                alt="果園裡結實纍纍的芒果樹"
                sizes="(min-width: 1024px) 520px, 100vw"
                speed={0.2}
              />
            </div>
            <div className="relative">
              <h2 className="text-2xl font-bold sm:text-3xl">🌳 我們的果園</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                台南玉井、楠西一帶日照充足、日夜溫差大，是很適合種芒果的地方。
                我們用友善的方式照顧每一棵樹，讓芒果在枝頭上慢慢累積甜度，
                等到最好吃的時候才採下來。
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                {features.map((f, i) => (
                  <Reveal key={f.title} delay={200 + i * 120}>
                    <div className="h-full rounded-2xl bg-white/40 p-3 text-center sm:p-4">
                      <p className="text-3xl">{f.icon}</p>
                      <p className="mt-2 text-sm font-semibold sm:text-base">{f.title}</p>
                      <p className="mt-1 hidden text-xs text-slate-600 sm:block">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 照片牆 */}
      <section className="py-10 sm:py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">📸 芒果的樣子</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 100}>
              <Parallax speed={g.speed}>
                <div className={`${glass} group aspect-square p-2`}>
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <ParallaxImage
                      src={g.src}
                      alt={g.alt}
                      sizes="(min-width: 1024px) 260px, 50vw"
                      speed={0.12}
                      className="transition duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 常見問題 */}
      <section id="faq" className="scroll-mt-28 py-10 sm:py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">❓ 常見問題</h2>
        </Reveal>
        <div className="mx-auto mt-8 max-w-3xl space-y-3 sm:mt-10 sm:space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <details className={`${glass} group px-5 py-4 sm:px-6`}>
                <summary className="relative cursor-pointer list-none font-semibold">
                  <span className="mr-2 inline-block transition group-open:rotate-90">▶</span>
                  {f.q}
                </summary>
                <p className="relative mt-3 text-slate-600">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 訂購單 */}
      <section id="order" className="scroll-mt-28 py-10 sm:py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">🛒 線上訂購</h2>
          <p className="mb-10 mt-2 text-center text-slate-600">選好數量、填寫資料，就能把夏天帶回家</p>
        </Reveal>
        <Reveal delay={100}>
          <OrderForm />
        </Reveal>
      </section>
    </main>
  );
}
