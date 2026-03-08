import { formatPrice } from '../../utils/cartUtils'

function CartSummary({ itemsTotal, shippingFee, finalTotal }) {
  return (
    <section className="cart-summary">
      <div className="summary-row">
        <span>상품 금액</span>
        <strong>{formatPrice(itemsTotal)}</strong>
      </div>

      <div className="summary-row">
        <span>배송비</span>
        <strong>{formatPrice(shippingFee)}</strong>
      </div>

      <div className="summary-divider" />

      <div className="summary-row total-row">
        <span>총 금액</span>
        <strong>{formatPrice(finalTotal)}</strong>
      </div>
    </section>
  )
}

export default CartSummary