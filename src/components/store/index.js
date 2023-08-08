import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import shoppingCartSlice from "./slices/shoppingCartSlice";

const store = configureStore({
  reducer: {
    productReducer: productSlice,
    shoppingCartReducer: shoppingCartSlice,
  },
});

export default store;
