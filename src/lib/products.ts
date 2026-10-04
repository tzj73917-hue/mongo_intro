export type Product = {
  id: string;
  name: string;
  spec: string;
  price: number;
  image: string;
  tag?: string;
  desc: string;
};

export const products: Product[] = [
  {
    id: "irwin-gift",
    name: "愛文芒果禮盒",
    spec: "5 台斤．約 8–10 顆",
    price: 880,
    image: "/image/mango.jpg",
    tag: "人氣 No.1",
    desc: "精選大顆愛文，果肉細緻、香氣濃郁，送禮自用都體面。",
  },
  {
    id: "irwin-family",
    name: "愛文芒果家庭號",
    spec: "10 台斤．大小混裝",
    price: 1580,
    image: "/image/mango-5.jpg",
    tag: "超值",
    desc: "外觀略有小斑點，甜度一樣好，全家一起吃最划算。",
  },
  {
    id: "jinhuang",
    name: "金煌芒果",
    spec: "10 台斤．約 6–8 顆",
    price: 1280,
    image: "/image/mango-2.jpg",
    desc: "果型碩大、纖維少，香甜不膩口，一顆就很有份量。",
  },
  {
    id: "frozen-cubes",
    name: "冷凍芒果丁",
    spec: "1 公斤．真空包裝",
    price: 450,
    image: "/image/mango-4.jpg",
    tag: "四季可買",
    desc: "產季鮮切急凍，做芒果冰、冰沙、優格碗都方便。",
  },
];
