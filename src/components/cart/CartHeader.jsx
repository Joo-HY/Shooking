import { useNavigate } from 'react-router-dom'

function CartHeader() {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <header className="cart-header">
      <button type="button" className="back-button" onClick={handleBack}>
        ←
      </button>
      <h1 className="cart-title">장바구니</h1>
    </header>
  )
}

export default CartHeader