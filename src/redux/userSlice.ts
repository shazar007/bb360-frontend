import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") || null;

const initialState = {
  isLoggedIn: !!token,
  token: token,

  // ✅ ADD MASTER DATA HERE
  employees: [],
  departments: [],
  workCalendars: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ================= AUTH =================
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

      // clear master data on logout
      state.employees = [];
      state.departments = [];
      state.workCalendars = [];
    },

    // ================= EMPLOYEES =================
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },

    // ================= DEPARTMENTS =================
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },

    // ================= WORK CALENDAR =================
    setWorkCalendars: (state, action) => {
      state.workCalendars = action.payload;
    },

    // optional reset
    clearMasterData: (state) => {
      state.employees = [];
      state.departments = [];
      state.workCalendars = [];
    },
  },
});

export const {
  setIsLoggedIn,
  setToken,
  logout,
  setEmployees,
  setDepartments,
  setWorkCalendars,
  clearMasterData,
} = userSlice.actions;

export default userSlice.reducer;
