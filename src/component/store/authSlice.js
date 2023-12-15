import { createSlice } from "@reduxjs/toolkit";

const intialToken = localStorage.getItem("token");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: intialToken,
    isLoggedIn: !!intialToken,
  },
  reducers: {
    login(state, action){
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = action.payload;
    },
  },
});

export const authActions =  authSlice.actions;
export default authSlice.reducer;