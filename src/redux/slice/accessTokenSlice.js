import { createSlice } from "@reduxjs/toolkit";
export const accessTokenSlice = createSlice({
    name:"accessToken",
    initialState:{
        value:""
    },
    reducers:{
        setToken:(state,action)=>{
            console.log(action);
            console.log(action.payload);
            state.value=action.payload;
        },
        resetToken:(state)=>{
            state.value=""
        }
    }
})
export const {setToken,resetToken} = accessTokenSlice.actions
export default accessTokenSlice.reducer