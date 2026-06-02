import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const storage = createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({ user: userReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectEmployees = (state: RootState) => state.user.employees;
export const selectEmployeeById = (id: string) => (state: RootState) =>
  state.user.employees.find((e) => e._id === id);

export const selectDepartments = (state: RootState) => state.user.departments;
export const selectDepartmentById = (id: string) => (state: RootState) =>
  state.user.departments.find((d: any) => d._id === id);

export const selectWorkCalendars = (state: RootState) =>
  state.user.workCalendars;
export const selectWorkCalendarById = (id: string) => (state: RootState) =>
  state.user.workCalendars.find((w: any) => w._id === id);
export const selectUserId = (state: RootState) => state.user.user?._id;
