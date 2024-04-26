import { createSlice } from "@reduxjs/toolkit";
export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    value: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const seller = action.payload.seller;
      const productDetail = action.payload.productDetails;
      const product = action.payload.product;
      // new khong co gi thi ko lam gi
      if (!productDetail || !seller || !product) return;
      // neu chua co thi tao
      if (!state.value[`${seller}`]) state.value[`${seller}`] = {};
      // neu chua co thi tao
      if (!state.value[`${seller}`][`${product}`])
        state.value[`${seller}`][`${product}`] = {};
      state.value[`${seller}`][`${product}`][`${productDetail}`] = state.value[
        `${seller}`
      ][`${product}`][`${productDetail}`]
        ? state.value[`${seller}`][`${product}`][`${productDetail}`] +
          action.payload.quantity * 1
        : action.payload.quantity * 1;
    },
    decrementCart: (state, action) => {
      const seller = action.payload.seller;
      const productDetail = action.payload.productDetails;
      const product = action.payload.product;
      if (state.value[`${seller}`][`${product}`][`${productDetail}`] == 1) {
        delete state.value[`${seller}`][`${product}`][`${productDetail}`];
        if (Object.keys(state.value[`${seller}`][`${product}`]).length === 0) {
          delete state.value[`${seller}`][`${product}`];
          if (Object.keys(state.value[`${seller}`]).length === 0) {
            delete state.value[`${seller}`];
          }
        }
        return;
      }
      state.value[`${seller}`][`${product}`][`${productDetail}`] =
        state.value[`${seller}`][`${product}`][`${productDetail}`] * 1 - 1;
    },
    incrementCart: (state, action) => {
      const seller = action.payload.seller;
      const productDetail = action.payload.productDetails;
      const product = action.payload.product;
      state.value[`${seller}`][`${product}`][`${productDetail}`] =
        state.value[`${seller}`][`${product}`][`${productDetail}`] * 1 + 1;
    },
    setCart: (state, action) => {
      const seller = action.payload.seller;
      const productDetail = action.payload.productDetails;
      const product = action.payload.product;
      state.value[`${seller}`][`${product}`][`${productDetail}`] =
        action.payload.quantity * 1;
    },
    removeFromCart: (state, action) => {
      const seller = action.payload.seller;
      const productDetail = action.payload.productDetails;
      const product = action.payload.product;
      delete state.value[`${seller}`][`${product}`][`${productDetail}`];
    },
    setInit: (state) => {
      state.value = {};
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  setInit,
  decrementCart,
  incrementCart,
  setCart,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
