import { combineReducers } from '@reduxjs/toolkit';
import  accessTokenReducer  from './slice/accessTokenSlice';
// Import other slices as needed

// Combine all your slices into one root slice
const rootReducer = combineReducers({
  accessToken: accessTokenReducer
  // Add other slices here
});

export default rootReducer;
