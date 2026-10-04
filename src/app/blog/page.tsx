import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { glass, Shine } from "@/components/glass";
import { Reveal } from "@/components/motion";
import { formatDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "芒果部落格｜炎炎夏日芒果園",
  description: "芒果挑選、保存、品種知識，讓你更懂得享受每一顆芒果",
};

export default function BlogPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-3 sm:px-4">
      {/* 標題 */}
      <section className="py-10 text-center sm:py-16">
        <Reveal>
          <span className="inline-block rounded-full bg-white/60 px-4 py-1 text-sm font-medium text-orange-600">
            📖 芒果部落格
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            更懂芒果，<span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">吃得更開心</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            從挑選、保存到品種知識，果園整理了關於芒果的大小事。
          </p>
        </Reveal>
      </section>

      {/* 文章列表 */}
      <section className="grid gap-6 pb-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 120} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className={`${glass} group flex h-full flex-col p-4 transition duration-300 hover:-translate-y-2 hover:bg-white/40`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={post.cover}
                  alt={post.coverAlt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-semibold text-orange-600 backdrop-blur">
                  {post.category}
                </span>
              </div>
              <Shine />
              <div className="relative flex flex-1 flex-col px-1 pt-4">
                <p className="text-xs text-slate-500">
                  {formatDate(post.date)}．約 {post.readMinutes} 分鐘
                </p>
                <h2 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-orange-600 sm:text-xl">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                <span className="mt-4 text-sm font-semibold text-orange-600">
                  閱讀文章 <span className="inline-block transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
