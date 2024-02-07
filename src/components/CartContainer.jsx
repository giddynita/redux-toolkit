import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
/* import { clearCart } from '../features/cart/cartSlice' */
import { openModal } from '../features/modal/modalSlice'

const CartContainer = () => {
  const dispatch = useDispatch()
  const { cartItems, amount, total } = useSelector((state) => state.cart)
  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    )
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      <footer>
        <hr />
        <div>
          <h4 className="cart-total">
            total <span>{`$${total.toFixed(2)}`}</span>
          </h4>
        </div>
        <button
          className="btn btn-hipster"
          onClick={() => {
            dispatch(openModal())
          }}
        >
          clear cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
