import React, { useState } from "react";
import CardListModal from "./CardListModal";

export default function PurchaseFlow({ product }) {
  const [open, setOpen] = useState(false);

  const handlePay = (card) => {
    console.log("MOCK PAY", {
      productId: product.id,
      price: product.price,
      cardToken: card.token,
    });

    setOpen(false);
    alert("결제가 완료되었습니다(모의).");
  };

  return (
    <>
      <button
        type="button"
        className="rounded-full px-2.5 py-1.5 text-[12px] font-extrabold transition bg-yellow-300 text-neutral-900 hover:bg-yellow-200"
        onClick={() => setOpen(true)}
      >
        구매
      </button>

      <CardListModal
        open={open}
        onClose={() => setOpen(false)}
        onPay={handlePay}
      />
    </>
  );
}