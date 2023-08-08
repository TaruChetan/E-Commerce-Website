import { createSlice } from "@reduxjs/toolkit";
import { localLanguage } from "../../../utils/constants";

const productSlice = createSlice({
  name: localLanguage.PRODUCT,
  initialState: {
    products: [],
    productsMain: [],
    productDetails: [],
    isLoader: true,
  },
  reducers: {
    getAllProducts(state, action) {
      state.products.push(...action.payload);
      state.isLoader = false;
    },
    getAllProductsMain(state, action) {
      state.productsMain.push(...action.payload);
    },
    getProductDetails(state, action) {
      state.productDetails.push(action.payload);
    },
    clearData(state, action) {
      while (state.products.length > 0) {
        state.products.pop();
      }
    },
    clearProductDetails(state, action) {
      state.productDetails.pop();
    },
  },
});

export default productSlice.reducer;
export const {
  getAllProducts,
  getAllProductsMain,
  clearData,
  getProductDetails,
  clearProductDetails,
} = productSlice.actions;
