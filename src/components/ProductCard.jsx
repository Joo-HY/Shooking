export default function ProductCard({ product, isInCart, onToggle, onPurchase }) {
  const { id, brand, description, price, imageUrl } = product;

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="px-2.5 pt-2.5">
        <img
          src={imageUrl}
          alt={brand}
          loading="lazy"
          className="h-[92px] w-full rounded-xl object-cover"
        />
      </div>

      <div className="px-3 pb-3 pt-2.5">
        <h3 className="mb-1.5 text-[14px] font-extrabold text-neutral-900">
          {brand}
        </h3>

        <p
          className="mb-2 text-[12px] text-neutral-500
          [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden"
          title={description}
        >
          {description}
        </p>

        <p className="mb-2.5 text-[13px] font-extrabold text-neutral-900">
          {price.toLocaleString()}원
        </p>

        {/* 담기 + 구매 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggle(id)}
            className={[
              "rounded-full px-2.5 py-1.5 text-[12px] font-extrabold transition",
              isInCart
                ? "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                : "bg-black text-white hover:bg-neutral-800",
            ].join(" ")}
          >
            {isInCart ? "담김" : "담기"}
          </button>

          <button
            type="button"
            onClick={() => onPurchase(product)}
            className="rounded-full bg-yellow-300 px-2.5 py-1.5 text-[12px] font-extrabold text-neutral-900 transition hover:bg-yellow-200"
          >
            구매
          </button>
        </div>
      </div>
    </article>
  );
}