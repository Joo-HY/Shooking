import { useMemo, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import PaymentModule from "./components/PaymentModule.jsx";
import CartPage from "./components/CartPage.jsx";
import { products } from "./data/products.js";
import { CardsProvider } from "./store/CardsContext.jsx";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [screen, setScreen] = useState("products");

  const [paymentItems, setPaymentItems] = useState([]);
  const [paymentTotal, setPaymentTotal] = useState(0);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const isInCart = useMemo(() => {
    return (id) => cartItems.some((item) => item.id === id);
  }, [cartItems]);

  const cartProducts = useMemo(() => {
    return cartItems
      .map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.id);
        if (!product) return null;

        return {
          ...product,
          quantity: cartItem.quantity,
        };
      })
      .filter(Boolean);
  }, [cartItems]);

  function handleToggleCart(productId) {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === productId);

      if (exists) {
        return prev.filter((item) => item.id !== productId);
      }

      return [...prev, { id: productId, quantity: 1 }];
    });
  }

  function handleIncreaseCartItem(productId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecreaseCartItem(productId) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemoveCartItem(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

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

  const handlePaymentSuccess = () => {
    const payingIds = new Set(paymentItems.map((item) => item.id));

    setCartItems((prev) => prev.filter((item) => !payingIds.has(item.id)));

    setPaymentItems([]);
    setPaymentTotal(0);
    setScreen("products");
  };

  return (
    <CardsProvider>
      <div className="min-h-screen bg-white">
        <TopBar
          cartCount={cartCount}
          onCartClick={() => setScreen("cart")}
        />

        <main className="mx-auto max-w-[420px] px-4 py-4">

          {screen === "products" && (
            <>
              <h1 className="mb-1.5 text-[24px] font-extrabold text-neutral-900">
                신발 상품 목록
              </h1>

              <p className="mb-3.5 text-[13px] text-neutral-500">
                현재 {products.length}개의 상품이 있습니다.
              </p>

              <section className="grid grid-cols-2 gap-3">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isInCart={isInCart(p.id)}
                    onToggle={handleToggleCart}
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
              onIncrease={handleIncreaseCartItem}
              onDecrease={handleDecreaseCartItem}
              onRemove={handleRemoveCartItem}
              onCheckout={handleCartCheckout}
            />
          )}

          {screen === "payment" && (
            <PaymentModule
              items={paymentItems}
              totalPrice={paymentTotal}
              onClose={handlePaymentClose}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
        </main>
      </div>
    </CardsProvider>
  );
}