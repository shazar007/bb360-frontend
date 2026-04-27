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

  // ------------Vendor-------------

  ADD_VENDORS: "/vendors",
  GET_ALL_VENDORS: "/vendors",
  UPDATE_VENDORS: "/vendors",
  DELETE_VENDORS: "/vendors",

  // ------------Distributor-------------
  ADD_DISTRIBUTOR: "/distributors",
  GET_ALL_DISTRIBUTOR: "/distributors",
  UPDATE_DISTRIBUTOR: "/distributors",
  DELETE_DISTRIBUTOR: "/distributors",

  // ------------Distributor-------------
  PURCHASE_ORDER: "/purchase-orders",

  // ------------purchase Receving-------------

  ALL_PURCHASE_RECEIVING: "/purchase-receiving",
  UPDATE_PURCHASE_RECEIVING: "/purchase-receiving",

  // ------------sales Invoice-------------
  SALES_INVOICE: "/sales-invoices",
};
