import { createSlice } from "@reduxjs/toolkit";
export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    value: {},
    checkAll: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const sellerId = action.payload.seller;
      const productDetailId = action.payload.productDetails;
      const productId = action.payload.product;
      // new khong co gi thi ko lam gi
      if (!productDetailId || !sellerId || !productId) return;
      // neu chua co thi tao
      if (!state.value[`${sellerId}`])
        state.value[`${sellerId}`] = { checked: false };
      // neu chua co thi tao
      if (!state.value[`${sellerId}`][`${productId}`])
        state.value[`${sellerId}`][`${productId}`] = {};
      const productDetails =
        state.value[`${sellerId}`][`${productId}`][`${productDetailId}`];
      if (productDetails) {
        state.value[`${sellerId}`][`${productId}`][`${productDetailId}`] = {
          ...productDetails,
          quantity: productDetails.quantity + action.payload.quantity * 1,
        };
      } else {
        state.value[`${sellerId}`][`${productId}`][`${productDetailId}`] = {
          quantity: action.payload.quantity * 1,
          checked: false,
        };
        state.checkAll = false;
      }
      // = state
      //   .value[`${sellerId}`][`${productId}`][`${productDetailId}`]
      //   ? {
      //       ...state.value[`${sellerId}`][`${productId}`][`${productDetailId}`],
      //       quantity:
      //         state.value[`${sellerId}`][`${productId}`][`${productDetailId}`]
      //           .quantity +
      //         action.payload.quantity * 1,
      //     }
      //   :
    },
    decrementCart: (state, action) => {
      const sellerId = action.payload.seller;
      const productDetailId = action.payload.productDetails;
      const productId = action.payload.product;
      if (
        state.value[`${sellerId}`][`${productId}`][`${productDetailId}`]
          .quantity === 1
      ) {
        delete state.value[`${sellerId}`][`${productId}`][`${productDetailId}`];
        if (
          Object.keys(state.value[`${sellerId}`][`${productId}`]).length === 0
        ) {
          delete state.value[`${sellerId}`][`${productId}`];
          if (Object.keys(state.value[`${sellerId}`]).length === 1) {
            delete state.value[`${sellerId}`];
          }
        }
        return;
      }
      state.value[`${sellerId}`][`${productId}`][
        `${productDetailId}`
      ].quantity -= 1;
    },
    incrementCart: (state, action) => {
      const sellerId = action.payload.seller;
      const productDetailId = action.payload.productDetails;
      const productId = action.payload.product;
      state.value[`${sellerId}`][`${productId}`][
        `${productDetailId}`
      ].quantity += 1;
    },
    setCart: (state, action) => {
      const sellerId = action.payload.seller;
      const productDetailId = action.payload.productDetails;
      const productId = action.payload.product;
      state.value[`${sellerId}`][`${productId}`][
        `${productDetailId}`
      ].quantity = action.payload.quantity * 1;
    },
    checkCart: (state, action) => {
      const sellerId = action.payload.seller;
      const productDetailId = action.payload.productDetails;
      const productId = action.payload.product;
      const checked = action.payload.checked;
      state.value[`${sellerId}`][`${productId}`][`${productDetailId}`].checked =
        checked;
      if (checked) {
        let sellerChecked = true;
        for (const productIds in state.value[`${sellerId}`]) {
          if (productIds === "checked") continue;
          const result = Object.keys(
            state.value[`${sellerId}`][`${productIds}`]
          ).find(
            (cardId) =>
              !state.value[`${sellerId}`][`${productIds}`][`${cardId}`].checked
          );
          if (result) {
            sellerChecked = false;
            break;
          }
        }
        if (sellerChecked) {
          state.value[`${sellerId}`].checked = sellerChecked;
          for (const sellerIds in state.value) {
            for (const productIds in state.value[`${sellerIds}`]) {
              if (productIds === "checked") continue;
              const result = Object.keys(
                state.value[`${sellerIds}`][`${productIds}`]
              ).find(
                (cardId) =>
                  !state.value[`${sellerIds}`][`${productIds}`][`${cardId}`]
                    .checked
              );
              if (result) {
                sellerChecked = false;
                break;
              }
            }
            if (!sellerChecked) {
              break;
            }
          }
          if (sellerChecked) {
            state.checkAll = sellerChecked;
          }
        }
      } else {
        state.value[`${sellerId}`].checked = false;
        state.checkAll = false;
      }
    },
    checkSeller: (state, action) => {
      const sellerId = action.payload.seller;
      const checked = action.payload.checked;
      state.value[`${sellerId}`].checked = checked;
      setCheckSeller(state, sellerId, checked);
      if (checked) {
        let sellerChecked = true;
        for (const sellerIds in state.value) {
          for (const productIds in state.value[`${sellerIds}`]) {
            if (productIds === "checked") continue;
            const result = Object.keys(
              state.value[`${sellerIds}`][`${productIds}`]
            ).find(
              (cardId) =>
                !state.value[`${sellerIds}`][`${productIds}`][`${cardId}`]
                  .checked
            );
            if (result) {
              sellerChecked = false;
              break;
            }
          }
          if (!sellerChecked) {
            break;
          }
        }
        if (sellerChecked) {
          state.checkAll = true;
        }
      } else {
        state.checkAll = false;
      }
    },
    setCheckAll: (state, action) => {
      state.checkAll = action.payload;
      for (const sellerId in state.value) {
        setCheckSeller(state, sellerId, state.checkAll);
      }
    },
    removeFromCart: (state, action) => {
      const sellerId = action.payload.seller;
      const productDetailId = action.payload.productDetails;
      const productId = action.payload.product;
      delete state.value[`${sellerId}`][`${productId}`][`${productDetailId}`];
      if (
        Object.keys(state.value[`${sellerId}`][`${productId}`]).length === 0
      ) {
        delete state.value[`${sellerId}`][`${productId}`];
        if (Object.keys(state.value[`${sellerId}`]).length === 1) {
          delete state.value[`${sellerId}`];
        }
      }
    },
    setInit: (state) => {
      state.value = {};
      state.checkAll = false;
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
  checkCart,
  checkSeller,
  setCheckAll,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;

const setCheckSeller = (state, sellerId, check) => {
  state.value[`${sellerId}`] = {
    ...state.value[`${sellerId}`],
    checked: check,
  };
  for (const productId in state.value[`${sellerId}`]) {
    for (const productDetailId in state.value[`${sellerId}`][`${productId}`]) {
      state.value[`${sellerId}`][`${productId}`][`${productDetailId}`] = {
        ...state.value[`${sellerId}`][`${productId}`][`${productDetailId}`],
        checked: check,
      };
    }
  }
};
