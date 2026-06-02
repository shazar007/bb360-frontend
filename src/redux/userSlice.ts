import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") || null;

// ✅ Define the shape — only what you need
export interface EmployeeOption {
  _id: string;
  name: string;
}

interface UserState {
  isLoggedIn: boolean;
  token: string | null;
  user: {
    _id: string | null;
  } | null;

  employees: EmployeeOption[];
  departments: any[];
  workCalendars: any[];
}

const initialState: UserState = {
  isLoggedIn: !!token,
  token: token,

  user: null,

  employees: [],
  departments: [],
  workCalendars: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("token", action.payload, { expires: 7 });
      } else {
        Cookies.remove("token");
      }
    },
    setUser: (state, action: PayloadAction<{ _id: string }>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      Cookies.remove("token");
      state.employees = [];
      state.departments = [];
      state.workCalendars = [];
    },

    setEmployees: (state, action: PayloadAction<EmployeeOption[]>) => {
      state.employees = action.payload;
    },

    setDepartments: (state, action: PayloadAction<any[]>) => {
      state.departments = action.payload;
    },
    setWorkCalendars: (state, action: PayloadAction<any[]>) => {
      state.workCalendars = action.payload;
    },
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
  setUser,
  clearMasterData,
} = userSlice.actions;

export default userSlice.reducer;
