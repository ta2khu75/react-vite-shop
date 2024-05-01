import { combineReducers } from '@reduxjs/toolkit';
import  accessTokenReducer  from './slice/accessTokenSlice';
import shoppingCardReducer from './slice/shoppingCardSlice';
// Import other slices as needed

// Combine all your slices into one root slice
const rootReducer = combineReducers({
  shoppingCart: shoppingCardReducer,
  accessToken: accessTokenReducer
  // Add other slices here
});

export default rootReducer;