export const getTotals = (cart) => {
  let totalAmount = 0
  let cartTotal = 0
  for (let { amount, price } of cart.values()) {
    cartTotal += amount
    totalAmount += amount * price
  }
  return { totalAmount, cartTotal }
}
