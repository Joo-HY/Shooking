export const formatPrice = (value) => {
  const safeValue = Number(value) || 0
  return `${safeValue.toLocaleString('ko-KR')}원`
}

export const calculateItemsTotal = (items) => {
  return items.reduce((acc, item) => {
    const price = Number(item.price) || 0
    const quantity = Number(item.quantity) || 0
    return acc + price * quantity
  }, 0)
}

export const calculateShippingFee = (itemsTotal) => {
  if (itemsTotal <= 0) return 0
  return itemsTotal >= 100000 ? 0 : 3000
}

export const calculateFinalTotal = (itemsTotal, shippingFee) => {
  return (Number(itemsTotal) || 0) + (Number(shippingFee) || 0)
}