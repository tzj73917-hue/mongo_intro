import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { glass, Shine } from "@/components/glass";
import { ParallaxImage, Reveal } from "@/components/motion";
import { formatDate, getPost, posts, type Block } from "@/lib/posts";

// 建置時先產生三篇文章的頁面
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title}｜夏芒果園`, description: post.excerpt };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="mt-10 text-xl font-bold sm:text-2xl">{block.text}</h2>;
    case "p":
      return <p key={i} className="mt-4 leading-8 text-slate-700">{block.text}</p>;
    case "ul":
      return (
        <ul key={i} className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-7 text-slate-700">
              <span className="mt-0.5 shrink-0">🥭</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <div key={i} className="mt-6 rounded-2xl border border-amber-200/80 bg-amber-50/70 px-5 py-4 leading-7 text-amber-900">
          <span className="font-semibold">💡 小提醒：</span>
          {block.text}
        </div>
      );
  }
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <main className="relative mx-auto max-w-6xl px-3 sm:px-4">
      <article className="mx-auto max-w-3xl py-8 sm:py-12">
        <Reveal>
          <Link href="/blog" className="text-sm font-medium text-slate-600 transition hover:text-orange-600">
            ← 回到部落格
          </Link>
          <p className="mt-6 text-sm font-semibold text-orange-600">{post.category}</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            {formatDate(post.date)}．閱讀時間約 {post.readMinutes} 分鐘
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className={`${glass} mt-8 p-2 sm:p-3`}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <ParallaxImage
                src={post.cover}
                alt={post.coverAlt}
                sizes="(min-width: 768px) 720px, 100vw"
                speed={0.15}
                eager
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className={`${glass} mt-8 px-5 py-8 sm:px-10 sm:py-10`}>
            <Shine />
            <div className="relative [&>*:first-child]:mt-0">
              {post.content.map(renderBlock)}
            </div>
          </div>
        </Reveal>

        {/* 文末導購 */}
        <Reveal>
          <div className={`${glass} mt-8 flex flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left`}>
            <Shine />
            <div className="relative">
              <p className="text-lg font-bold">想吃到樹上熟的好芒果？</p>
              <p className="text-sm text-slate-600">夏芒果園產地直送，冷藏宅配到你家</p>
            </div>
            <Link
              href="/#order"
              className="relative shrink-0 rounded-full border border-white/60 bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:scale-105"
            >
              🛒 立即訂購
            </Link>
          </div>
        </Reveal>
      </article>

      {/* 其他文章 */}
      <section className="mx-auto max-w-3xl pb-10">
        <h2 className="text-xl font-bold sm:text-2xl">📖 延伸閱讀</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} className="h-full">
              <Link
                href={`/blog/${p.slug}`}
                className={`${glass} group flex h-full items-center gap-4 p-3 transition hover:bg-white/40`}
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={p.cover} alt={p.coverAlt} fill sizes="96px" className="object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="relative">
                  <p className="text-xs text-orange-600">{p.category}</p>
                  <p className="mt-1 font-semibold leading-snug transition group-hover:text-orange-600">{p.title}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
