import { useMemo, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import PaymentModule from "./components/PaymentModule.jsx";
import CartPage from "./components/CartPage.jsx";
import { products } from "./data/products.js";
import { CardsProvider } from "./store/CardsContext.jsx";

export default function App() {
  const [cartIds, setCartIds] = useState(() => new Set());

  const [screen, setScreen] = useState("products");
  const [paymentItems, setPaymentItems] = useState([]);
  const [paymentTotal, setPaymentTotal] = useState(0);

  function toggleCart(productId) {
    setCartIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }

  const isInCart = useMemo(() => (id) => cartIds.has(id), [cartIds]);

  const cartProducts = useMemo(() => {
    return products.filter((p) => cartIds.has(p.id));
  }, [cartIds]);

  const handlePurchaseStart = (product) => {
    setPaymentItems([{ ...product, quantity: 1 }]);
    setPaymentTotal(product.price);
    setScreen("payment");
  };

  const handleCartCheckout = ({ items, finalTotal }) => {
    setPaymentItems(items);
    setPaymentTotal(finalTotal);
    setScreen("payment");
  };

  const handlePaymentClose = () => {
    setPaymentItems([]);
    setPaymentTotal(0);
    setScreen("products");
  };

  return (
    <CardsProvider>
      <div className="min-h-screen bg-white">
        <TopBar
          cartCount={cartIds.size}
          onCartClick={() => setScreen("cart")}
        />

        <main className="mx-auto max-w-[420px] px-4 py-4">
          {screen === "products" && (
            <>
              <h1 className="mb-1.5 text-[24px] font-extrabold tracking-[-0.2px] text-neutral-900">
                신발 상품 목록
              </h1>
              <p className="mb-3.5 text-[13px] text-neutral-500">
                현재 {products.length}개의 상품이 있습니다.
              </p>

              <section className="grid grid-cols-2 gap-3" aria-label="상품 목록">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isInCart={isInCart(p.id)}
                    onToggle={toggleCart}
                    onPurchase={handlePurchaseStart}
                  />
                ))}
              </section>
            </>
          )}

          {screen === "cart" && (
            <CartPage
              items={cartProducts}
              onBack={() => setScreen("products")}
              onCheckout={handleCartCheckout}
            />
          )}

          {screen === "payment" && (
            <PaymentModule
              items={paymentItems}
              totalPrice={paymentTotal}
              onClose={handlePaymentClose}
            />
          )}
        </main>
      </div>
    </CardsProvider>
  );
}