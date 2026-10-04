// 共用的玻璃亮面樣式
export const glass =
  "relative overflow-hidden rounded-3xl border border-white/50 bg-white/25 shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-xl";

// 卡片上半部的亮面反光
export function Shine() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent" />
  );
}
