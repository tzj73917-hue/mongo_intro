"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// 使用者在系統設定「減少動態效果」時，就不做視差和動畫
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * 捲動時呼叫 update，用 requestAnimationFrame 節流，一個畫格最多算一次
 */
function useScrollFrame(update: () => void) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);
}

/**
 * 視差容器：裡面的內容會以不同速度跟著捲動
 * speed > 0 比頁面慢（感覺在後面），speed < 0 比頁面快（感覺在前面）
 */
export function Parallax({
  speed = 0.1,
  className = "",
  children,
}: {
  speed?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  // 量外層（沒有位移的）位置，再移動內層，避免量到自己的位移而抖動
  const [update] = useState(() => () => {
    if (!outer.current || !inner.current) return;
    const rect = outer.current.getBoundingClientRect();
    const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
    inner.current.style.transform = `translate3d(0, ${offset * speed}px, 0)`;
  });
  useScrollFrame(update);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}

/**
 * 視差圖片：圖片比外框高一點，捲動時在框裡慢慢上下移動
 * 外框需要 relative + overflow-hidden
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  speed = 0.15,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  speed?: number;
  eager?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [update] = useState(() => () => {
    const el = ref.current;
    const frame = el?.parentElement;
    if (!el || !frame) return;
    const rect = frame.getBoundingClientRect();
    // -1（框在畫面最下方）到 1（框在畫面最上方）
    const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight;
    const max = rect.height * speed;
    el.style.transform = `translate3d(0, ${Math.max(-1, Math.min(1, progress)) * max}px, 0)`;
  });
  useScrollFrame(update);

  return (
    <div
      ref={ref}
      className="absolute inset-x-0 will-change-transform"
      style={{ top: `-${speed * 100}%`, bottom: `-${speed * 100}%` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        className={`object-cover ${className}`}
      />
    </div>
  );
}

/**
 * 捲動到畫面中時，從下方淡入
 */
export function Reveal({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      // motion-reduce：使用者關閉動態效果時，直接顯示不做動畫
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * 背景彩色光暈：散布在整頁，捲動時移動得比內容慢，產生景深
 */
const blobs = [
  { top: "-8rem", left: "-8rem", size: "24rem", color: "bg-orange-300/60", speed: 0.35 },
  { top: "10rem", right: "-6rem", size: "28rem", color: "bg-amber-300/50", speed: 0.2 },
  { top: "60rem", left: "20%", size: "24rem", color: "bg-lime-300/40", speed: 0.45 },
  { top: "110rem", right: "10%", size: "30rem", color: "bg-orange-200/60", speed: 0.25 },
  { top: "170rem", left: "-4rem", size: "26rem", color: "bg-yellow-300/50", speed: 0.4 },
  { top: "230rem", right: "-4rem", size: "24rem", color: "bg-lime-200/50", speed: 0.3 },
];

export function BackgroundBlobs() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const [update] = useState(() => () => {
    const y = window.scrollY;
    refs.current.forEach((el, i) => {
      if (el) el.style.transform = `translate3d(0, ${y * blobs[i].speed}px, 0)`;
    });
  });
  useScrollFrame(update);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className={`absolute rounded-full blur-3xl will-change-transform ${b.color}`}
          style={{ top: b.top, left: b.left, right: b.right, width: b.size, height: b.size }}
        />
      ))}
    </div>
  );
}
