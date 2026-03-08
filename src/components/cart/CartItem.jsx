import QuantityControl from './QuantityControl'
import { formatPrice } from '../../utils/cartUtils'

function CartItem({ item, onDecrease, onIncrease }) {
  return (
    <article className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/100x100?text=No+Image'
        }}
      />

      <div className="cart-item-info">
        <p className="cart-item-brand">{item.brand}</p>
        <p className="cart-item-price">{formatPrice(item.price)}</p>

        <QuantityControl
          quantity={item.quantity}
          onDecrease={() => onDecrease(item.id)}
          onIncrease={() => onIncrease(item.id)}
        />
      </div>
    </article>
  )
}

export default CartItem