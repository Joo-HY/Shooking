import { useEffect, useMemo, useState } from "react";

export default function CartPage({ items, onBack, onCheckout }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const initialized = items.map((item) => ({
      ...item,
      quantity: 1,
    }));
    setCartItems(initialized);
  }, [items]);

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const itemsTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const shippingFee = useMemo(() => {
    if (itemsTotal === 0) return 0;
    return itemsTotal >= 100000 ? 0 : 3000;
  }, [itemsTotal]);

  const finalTotal = useMemo(() => {
    return itemsTotal + shippingFee;
  }, [itemsTotal, shippingFee]);

  const formatPrice = (price) => `${price.toLocaleString("ko-KR")}원`;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center">
        <button
          type="button"
          onClick={onBack}
          className="mr-3 text-[18px] font-bold text-neutral-800"
        >
          ←
        </button>
      </div>

      <h1 className="mb-1.5 text-[24px] font-extrabold tracking-[-0.2px] text-neutral-900">
        장바구니
      </h1>
      <p className="mb-5 text-[13px] text-neutral-500">
        현재 {cartItems.length}개의 상품이 담겨있습니다.
      </p>

      {cartItems.length === 0 ? (
        <div className="py-16 text-center text-neutral-500">
          장바구니가 비어 있습니다.
        </div>
      ) : (
        <>
          <section className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="flex gap-4 border-b border-neutral-200 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[100px] w-[100px] rounded-[20px] object-cover"
                />

                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-[15px] text-neutral-700">{item.brand}</p>
                  <p className="text-[16px] font-extrabold text-neutral-900">
                    {formatPrice(item.price)}
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleDecrease(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-[18px] text-neutral-700"
                    >
                      −
                    </button>

                    <span className="min-w-[12px] text-center text-[14px] text-neutral-800">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleIncrease(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-[18px] text-neutral-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-6 border-t border-neutral-200 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[15px] text-neutral-800">상품 금액</span>
              <strong className="text-[16px] font-extrabold text-neutral-900">
                {formatPrice(itemsTotal)}
              </strong>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-[15px] text-neutral-800">배송비</span>
              <strong className="text-[16px] font-extrabold text-neutral-900">
                {formatPrice(shippingFee)}
              </strong>
            </div>

            <div className="mb-5 border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-[16px] font-bold text-neutral-900">
                  총 금액
                </span>
                <strong className="text-[20px] font-extrabold text-neutral-900">
                  {formatPrice(finalTotal)}
                </strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onCheckout({
                  items: cartItems,
                  finalTotal,
                })
              }
              className="w-full rounded-[18px] bg-neutral-700 py-4 text-[18px] font-bold text-white"
            >
              결제하기
            </button>
          </section>
        </>
      )}
    </div>
  );
}