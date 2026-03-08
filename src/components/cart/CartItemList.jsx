import CartItem from './CartItem'

function CartItemList({ items, onDecrease, onIncrease }) {
  return (
    <section className="cart-item-list">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />
      ))}
    </section>
  )
}

export default CartItemList