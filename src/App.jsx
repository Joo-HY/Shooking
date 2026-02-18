import { useMemo, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import { products } from "./data/products.js";

export default function App() {
  // 담긴 상품 id만 관리(Set으로 중복 방지)
  const [cartIds, setCartIds] = useState(() => new Set());

  function toggleCart(productId) {
    setCartIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }

  const isInCart = useMemo(() => {
    return (id) => cartIds.has(id);
  }, [cartIds]);

  return (
    <div className="min-h-screen bg-white">
      <TopBar cartCount={cartIds.size} />

      <main className="mx-auto max-w-[420px] px-4 py-4">
        <h1 className="mb-1.5 text-[24px] font-extrabold tracking-[-0.2px] text-neutral-900">
          신발 상품 목록
        </h1>
        <p className="mb-3.5 text-[13px] text-neutral-500">
          현재 {products.length}개의 상품이 있습니다.
        </p>

        {/* 2열 고정 */}
        <section className="grid grid-cols-2 gap-3" aria-label="상품 목록">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isInCart={isInCart(p.id)}
              onToggle={toggleCart}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
