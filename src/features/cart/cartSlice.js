import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      /* console.log(name, thunkAPI) */
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
      /* return {
        cartItems: [],
        amount: 0,
        total: 0,
        isLoading: true,
      } */
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload)
      cartItem.amount = cartItem.amount + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotal: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.cartItems = payload
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions

export default cartSlice.reducer
