function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="quantity-control">
      <button type="button" className="quantity-btn" onClick={onDecrease}>
        −
      </button>
      <span className="quantity-value">{quantity}</span>
      <button type="button" className="quantity-btn" onClick={onIncrease}>
        +
      </button>
    </div>
  )
}

export default QuantityControl