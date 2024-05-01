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

      state.value[`${sellerId}`][`${productId}`][`${productDetailId}`] = state
        .value[`${sellerId}`][`${productId}`][`${productDetailId}`]
        ? {
            ...state.value[`${sellerId}`][`${productId}`][`${productDetailId}`],
            quantity:
              state.value[`${sellerId}`][`${productId}`][`${productDetailId}`]
                .quantity +
              action.payload.quantity * 1,
          }
        : { quantity: action.payload.quantity * 1, checked: false };
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
          if (Object.keys(state.value[`${sellerId}`]).length === 0) {
            delete state.value[`${sellerId}`];
          }
        }
        return;
      }
      state.value[`${sellerId}`][`${productId}`][`${productDetailId}`] = {
        ...state.value[`${sellerId}`][`${productId}`][`${productDetailId}`],
        quantity:
          state.value[`${sellerId}`][`${productId}`][`${productDetailId}`]
            .quantity - 1,
      };
    },
    incrementCart: (state, action) => {
      const sellerId = action.payload.seller;
      const productDetailId = action.payload.productDetails;
      const productId = action.payload.product;
      state.value[`${sellerId}`][`${productId}`][`${productDetailId}`] = {
        ...state.value[`${sellerId}`][`${productId}`][`${productDetailId}`],
        quantity:
          state.value[`${sellerId}`][`${productId}`][`${productDetailId}`]
            .quantity + 1,
      };
    },
    setCart: (state, action) => {
      const sellerId = action.payload.seller;
      const productDetailId = action.payload.productDetails;
      const productId = action.payload.product;
      state.value[`${sellerId}`][`${productId}`][`${productDetailId}`] = {
        ...state.value[`${sellerId}`][`${productId}`][`${productDetailId}`],
        quantity: action.payload.quantity * 1,
      };
    },
    checkCart: (state, action) => {
      const sellerId = action.payload.seller;
      const productDetailId = action.payload.productDetails;
      const productId = action.payload.product;
      const checked = action.payload.checked;
      state.value[`${sellerId}`][`${productId}`][`${productDetailId}`] = {
        ...state.value[`${sellerId}`][`${productId}`][`${productDetailId}`],
        checked: action.payload.checked,
      };
      if (checked) {
        let sellerChecked = true;
        for (const productIds in state.value[`${sellerId}`]) {
          if (productIds === "checked") continue;
          const result = Object.keys(
            state.value[`${sellerId}`][`${productIds}`]
          ).filter(
            (cardId) =>
              !state.value[`${sellerId}`][`${productIds}`][`${cardId}`].checked
          );
          if (result.length !== 0) {
            sellerChecked = false;
            break;
          }
        }
        if (sellerChecked) {
          state.value[`${sellerId}`] = {
            ...state.value[`${sellerId}`],
            checked: true,
          };
          for (const sellerIds in state.value) {
            for (const productIds in state.value[`${sellerIds}`]) {
              if (productIds === "checked") continue;
              const result = Object.keys(
                state.value[`${sellerIds}`][`${productIds}`]
              ).filter(
                (cardId) =>
                  !state.value[`${sellerIds}`][`${productIds}`][`${cardId}`]
                    .checked
              );
              if (result.length !== 0) {
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
        }
      } else {
        state.value[`${sellerId}`] = {
          ...state.value[`${sellerId}`],
          checked: false,
        };
        state.checkAll = false;
      }
    },
    checkSeller: (state, action) => {
      const sellerId = action.payload.seller;
      state.value[`${sellerId}`] = {
        ...state.value[`${sellerId}`],
        checked: action.payload.checked,
      };
      setCheckSeller(state, sellerId, action.payload.checked);
      if (action.payload.checked) {
        let sellerChecked = true;
        for (const sellerIds in state.value) {
          for (const productIds in state.value[`${sellerIds}`]) {
            if (productIds === "checked") continue;
            const result = Object.keys(
              state.value[`${sellerIds}`][`${productIds}`]
            ).filter(
              (cardId) =>
                !state.value[`${sellerIds}`][`${productIds}`][`${cardId}`]
                  .checked
            );
            if (result.length !== 0) {
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
      // for (const productId in state.value[`${sellerId}`]) {
      //   for (const productDetailId in state.value[`${sellerId}`][
      //     `${productId}`
      //   ]) {
      //     state.value[`${sellerId}`][`${productId}`][`${productDetailId}`] = {
      //       ...state.value[`${sellerId}`][`${productId}`][`${productDetailId}`],
      //       checked: action.payload.checked,
      //     };
      //   }
      // }
    },
    setCheckAll: (state, action) => {
      state.checkAll = action.payload;
      for (const sellerId in state.value) {
        setCheckSeller(state, sellerId, state.checkAll);
        //checkSeller({ seller: sellerId, checked: state.checkAll });
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
        if (Object.keys(state.value[`${sellerId}`]).length === 0) {
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
