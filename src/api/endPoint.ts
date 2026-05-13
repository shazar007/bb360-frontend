// export const BASE_URL = "https://bb360-backend.vercel.app";
// export const BASE_URL = "http://localhost:5001";
export const BASE_URL = "http://35.222.147.10/api";

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

  // ------------Purchase Receving-------------
  PURCHASE_RECEIVING: "/purchase-receiving",

  // ------------Sales Invoice-------------
  SALES_INVOICE: "/sales-invoices",

  // ------------Purchase Invoice-------------
  PURCHASE_INVOICE: "/purchase-invoices",

  // ------------Sale Retrun-------------
  SALES_RETURN: "/sales-returns",

  // --------------Inventory Adjustments-------------
  INVENTORY_ADJUSTMENT: "/inventory-adjustments",

  // --------------Inventory Transfers-------------
  INVENTORY_TRANSFERS: "/inventory-transfers",

  // --------------Inventory Material-Issue-Notes-------------
  MATERIAL_ISSUE_NOTES: "/material-issue-notes",

  // --------------Inventory Material-Return-Notes-------------
  MATERIAL_RETURN_NOTES: "/material-return-notes",

  // --------------Inventory Transfer Orders-------------
  TRANSFER_ORDERS: "/transfer-orders",

  // --------------Inventory Stock Taking-------------
  STOCK_TAKING: "/stock-taking",

  // --------------Account Ledger-------------
  ACCOUNT_LEDGER: "/ledgers",

  // --------------Attendence-------------
  ATTENDANCE: "/attendance",

  // --------------Debit / Credit Note-------------
  DEBIT_CREDIT_NOTE: "/ledgers/journal-voucher",
};
