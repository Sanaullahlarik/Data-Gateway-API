import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.cartItem.find((item) => item.id === action.payload.id);
      if (isExist) {
        isExist.quantity += 1;
      } else {
        state.cartItem.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const isExist = state.cartItem.find((item) => item.id === action.payload.id);
      if (isExist) {
        isExist.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const isExist = state.cartItem.find((item) => item.id === action.payload.id);
      if (isExist && isExist.quantity > 1) {
        isExist.quantity -= 1;
      }
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
