"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import { glass, Shine } from "./glass";

const SHIPPING = 160; // 冷藏宅配運費
const FREE_SHIPPING = 1500; // 滿額免運

export default function OrderForm() {
  // 每個商品的數量，key 是商品 id
  const [qty, setQty] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const subtotal = products.reduce((sum, p) => sum + p.price * (qty[p.id] ?? 0), 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING;
  const total = subtotal + shipping;

  function change(id: string, delta: number) {
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={`${glass} px-6 py-12 text-center sm:px-8 sm:py-16`}>
        <Shine />
        <p className="relative text-6xl">🥭</p>
        <h3 className="relative mt-4 text-2xl font-bold">感謝您的訂購！</h3>
        <p className="relative mt-2 text-slate-600">
          訂單金額 NT${total.toLocaleString()}，我們會盡快與您聯繫確認出貨時間。
        </p>
        <button
          onClick={() => {
            setQty({});
            setSubmitted(false);
          }}
          className="relative mt-6 rounded-full border border-white/60 bg-white/50 px-6 py-2 font-medium transition hover:bg-white/80"
        >
          再訂一筆
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${glass} space-y-8 p-4 sm:p-8 lg:p-10`}>
      <Shine />

      {/* 上：選擇商品（一列排開） */}
      <div className="relative">
        <h3 className="text-xl font-bold">1. 選擇商品</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {products.map((p) => {
            const count = qty[p.id] ?? 0;
            return (
              <div
                key={p.id}
                className={`flex flex-col rounded-2xl p-3 transition ${
                  count > 0 ? "bg-white/70 ring-2 ring-orange-400" : "bg-white/40"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 240px, 45vw" className="object-cover" />
                </div>
                <p className="mt-3 font-semibold">{p.name}</p>
                <p className="flex-1 text-xs text-slate-500 sm:text-sm">{p.spec}</p>
                <p className="mt-1 font-bold text-orange-600">NT${p.price.toLocaleString()}</p>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => change(p.id, -1)}
                    disabled={count === 0}
                    className="h-9 w-9 rounded-full bg-white/80 font-bold transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:opacity-40"
                    aria-label={`減少${p.name}`}
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{count}</span>
                  <button
                    type="button"
                    onClick={() => change(p.id, 1)}
                    className="h-9 w-9 rounded-full bg-orange-400 font-bold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
                    aria-label={`增加${p.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 下：收件資料（左）＋ 金額（右） */}
      <div className="relative grid gap-6 md:grid-cols-2 md:gap-8">
        <div className="space-y-3">
          <h3 className="text-xl font-bold">2. 收件資料</h3>
          <input required placeholder="收件人姓名" className="w-full rounded-2xl border border-white/60 bg-white/50 px-4 py-3 outline-none focus:bg-white/80" />
          <input required type="tel" placeholder="手機號碼" className="w-full rounded-2xl border border-white/60 bg-white/50 px-4 py-3 outline-none focus:bg-white/80" />
          <input required type="email" placeholder="E-mail（寄送訂單確認信）" className="w-full rounded-2xl border border-white/60 bg-white/50 px-4 py-3 outline-none focus:bg-white/80" />
          <input required placeholder="收件地址" className="w-full rounded-2xl border border-white/60 bg-white/50 px-4 py-3 outline-none focus:bg-white/80" />
          <textarea placeholder="備註（希望到貨日等）" rows={2} className="w-full rounded-2xl border border-white/60 bg-white/50 px-4 py-3 outline-none focus:bg-white/80" />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold">3. 確認金額</h3>
          <div className="flex-1 space-y-1 rounded-2xl bg-white/40 px-4 py-3 text-sm">
            {/* 列出已選的商品 */}
            {products.filter((p) => (qty[p.id] ?? 0) > 0).map((p) => (
              <div key={p.id} className="flex justify-between text-slate-600">
                <span>{p.name} × {qty[p.id]}</span>
                <span>NT${(p.price * (qty[p.id] ?? 0)).toLocaleString()}</span>
              </div>
            ))}
            {subtotal === 0 && <p className="text-slate-500">尚未選擇商品</p>}
            <div className="mt-2 flex justify-between border-t border-white/60 pt-2"><span>小計</span><span>NT${subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between">
              <span>冷藏運費 {subtotal > 0 && subtotal < FREE_SHIPPING && <span className="text-slate-500">（滿 {FREE_SHIPPING.toLocaleString()} 免運）</span>}</span>
              <span>{shipping === 0 ? "免運" : `NT$${shipping}`}</span>
            </div>
            <div className="flex justify-between border-t border-white/60 pt-2 text-lg font-bold">
              <span>總計</span><span className="text-orange-600">NT${total.toLocaleString()}</span>
            </div>
          </div>
  
          <button
            type="submit"
            disabled={subtotal === 0}
            className="w-full rounded-full border border-white/60 bg-gradient-to-r from-orange-400 to-amber-500 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {subtotal === 0 ? "請先選擇商品" : "送出訂單"}
          </button>
        </div>
      </div>
    </form>
  );
}
