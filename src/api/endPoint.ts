// export const BASE_URL = "https://bb360-backend.vercel.app";
export const BASE_URL = "http://35.222.147.10/api";
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

  // --------------Departments-------------
  DEPARTMENTS: "/departments",

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

  // --------------Employees-------------
  EMPLOYEES: "/employees",

  // --------------Employees Designation-------------
  DESIGNATION: "/designation",

  // --------------Employees Type-------------
  EMPLOYEE_TYPE: "/employee-type",

  // --------------Employee Grades-------------
  EMPLOYEE_GRADES: "/employee-grade",

  // --------------WORK CLENDER-------------
  WORK_CLENDER: "/work-calendar",

  LOYEE_JOBS: "/employee-jobs",

  // --------------EMPLOYEES-------------
  EMPLOYEES_ALL: "/employees",

  // --------------Employee Salary-------------
  EMPLOYEE_SALARY: "/employee-salaries",

  // --------------Employee Performance Criteria-------------
  EMPLOYEE_PERFORMANCE_CRITERIA: "/employee-performance-criteria",

  // --------------Employee Performance Evaluation-------------
  EMPLOYEE_PERFORMANCE_EVALUATION: "/employee-performance-evaluation",

  // --------------Employee Leave Application-------------
  LEAVE_APPLICATION: "/leave-applications",

  // --------------CPL Approval-------------
  CPL_APPROVAL: "/cpl",

  // --------------Employee Expense Claim-------------
  EXENSE_CLAIM: "/exense-claim",

  // --------------Attendance Holidays-------------
  ATTENDANCE_HOLIDAYS: "/holidays",

  // --------------Attendance Upload-------------
  ATTENDANCE_UPLOAD: "/attendance/upload",

  // --------------get attendance-summary-------------
  ATTENDANCE_SUMMARY: "/attendance/summary",
  // -------------- ATTENDANCE_MACHINE-------------
  ATTENDANCE_MACHINE: "/attendance/machine",
  // --------------Upload-------------
  UPLOAD_IMAGE: "/image-upload/upload",

  // --------------------------------Manufacturing---------------------------------
  // --------------Material Mastern-------------
  MATERIRAL_MASTERN: "/material-mastern",

  // --------------Bill Of Material-------------
  BILL_MATERIAL: "/bill-material",

  // --------------Equipment Master-------------
  EQUIPMENT_MASTER: "/equipment-master",

  // -------------- SOP Master-------------
  SAP_MASTER: "/sop-master",

  // -------------- Demand Planning-------------
  DEMAND_PLANNING: "/demand-planning",

  // --------------Upload-------------
  PAYROLL_PROCESS: "/getAllPayrollProcess",
};
