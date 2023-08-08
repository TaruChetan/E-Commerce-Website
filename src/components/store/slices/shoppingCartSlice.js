import { createSlice } from "@reduxjs/toolkit";
import { localLanguage } from "../../../utils/constants";

const shoppingCartSlice = createSlice({
  name: localLanguage.SHOPPING_CART,
  initialState: {
    cart: [],
    totalCount: 0,
    isLoader: true,
  },
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      state.totalCount += 1;
      state.isLoader = false;
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => {
        return item.id != action.payload;
      });
      state.totalCount -= 1;
    },
    increaseProductCount(state, action) {
      state?.cart.map((item) => {
        if (item.id == action.payload) {
          return (item.productCount += 1);
        }
      });
    },
    decreaseProductCount(state, action) {
      state?.cart.map((item) => {
        if (item.id == action.payload) {
          return (item.productCount -= 1);
        }
      });
    },
    removeAllFromCart(state, action) {
      while (state.cart.length > 0) {
        state.cart.pop();
      }
      state.totalCount = 0;
    },
  },
});

export default shoppingCartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  increaseProductCount,
  decreaseProductCount,
  removeAllFromCart,
} = shoppingCartSlice.actions;
