import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { calculateTotal, getCartItems } from './features/cart/cartSlice'
import Modal from './components/Modal'
const App = () => {
  const { cartItems, isLoading } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state.modal)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  useEffect(() => {
    dispatch(calculateTotal('random'))
  }, [cartItems])

  if (isLoading) {
    return (
      <div className="loading">
        <h2>loading...</h2>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
