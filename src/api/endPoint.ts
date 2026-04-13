export const BASE_URL = "https://bb360-backend.vercel.app/";
// export const BASE_URL = "http://localhost:5001";

export const ENDPOINTS = {
  // ------------Users-------------
  LOGIN_USER: "/user/login",
  LOGOUT_USER: "/user/logout",
  TOKEN_REFRESH: "/user/refresh-token",

  // ------------Products-------------
  ADD_PRODUCTS: "/api/items",
  GET_ALL_PRODUCTS: "/api/items",
  UPDATE_PRODUCTS: "/api/items",
  DELETE_PRODUCTS: "/api/items",
};
