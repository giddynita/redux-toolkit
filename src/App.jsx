import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { calculateTotal } from './features/cart/cartSlice'
import Modal from './components/Modal'
const App = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems])
  return (
    <main>
      <Modal />
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
