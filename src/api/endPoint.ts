export const BASE_URL = "https://bb360-backend.vercel.app";
// export const BASE_URL = "http://localhost:5001";

export const ENDPOINTS = {
  // ------------Users-------------
  LOGIN_USER: "/user/login",
  LOGOUT_USER: "/user/logout",
  TOKEN_REFRESH: "/user/refresh-token",

  // ------------Products-------------
  ADD_ITEM: "/items",
  GET_ALL_ITEM: "/items",
  UPDATE_ITEM: "/items",
  DELETE_ITEM: "/items",
  GET_SINGLE_ITEM: "/items",

  // ------------Distributor-------------
  ADD_DISTRIBUTOR: "/distributors",
  GET_ALL_DISTRIBUTOR: "/distributors",
  UPDATE_DISTRIBUTOR: "/distributors",
};
