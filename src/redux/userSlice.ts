import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") || null;

const initialState = {
  isLoggedIn: !!token,
  token: token,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("token", action.payload, { expires: 7 });
      } else {
        Cookies.remove("token");
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setIsLoggedIn, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
