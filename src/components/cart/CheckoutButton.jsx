function CheckoutButton({ disabled, onClick }) {
  return (
    <button
      type="button"
      className={`checkout-button ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      결제하기
    </button>
  )
}

export default CheckoutButton