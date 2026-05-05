export const BASE_URL = "https://bb360-backend.vercel.app";
// export const BASE_URL = "http://localhost:5001";

export const ENDPOINTS = {
  // ------------Users-------------
  LOGIN_USER: "/user/login",
  LOGOUT_USER: "/user/logout",
  TOKEN_REFRESH: "/user/refresh-token",

  // ------------Products-------------
  ITEMS: "/items",

  // ------------Vendor-------------

  VENDORS: "/vendors",

  // ------------Distributor-------------
  DISTRIBUTOR: "/distributors",

  // ------------Distributor-------------
  PURCHASE_ORDER: "/purchase-orders",

  // ------------purchase Receving-------------

  PURCHASE_RECEIVING: "/purchase-receiving",

  // ------------sales Invoice-------------
  SALES_INVOICE: "/sales-invoices",

  PURCHASE_INVOICE: "/purchase-invoices",
  // ------------Sale Retrun-------------
  SALES_RETURN: "/sales-returns",

  // --------------inventory Adjustments-------------
  INVENTORY_ADJUSTMENT: "/inventory-adjustments",

  // --------------inventory Transfers-------------
  INVENTORY_TRANSFERS: "/inventory-transfers",

  // --------------inventory Material-Issue-Notes-------------
  MATERIAL_ISSUE_NOTES: "/material-issue-notes",

  // --------------inventory Material-Return-Notes-------------
  MATERIAL_RETURN_NOTES: "/material-return-notes",
};
