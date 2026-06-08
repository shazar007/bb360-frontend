// export const BASE_URL = "https://bb360-backend.vercel.app";
// export const BASE_URL = "http://35.222.147.10/api";
// export const BASE_URL = "http://localhost:5001";

// Connect with Sufyan
export const BASE_URL = "http://192.168.18.121:5001";

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

  // ------------------------------------- hr Module --------------------------------

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
  EMPLOYEES: "/employees",

  // --------------Employee Salary-------------
  EMPLOYEE_SALARY: "/employee-salaries",

  // --------------Employee Performance Criteria-------------
  EMPLOYEE_PERFORMANCE_CRITERIA: "/performance-criteria",

  // --------------Employee Performance Evaluation-------------
  EMPLOYEE_PERFORMANCE_EVALUATION: "/performance-evaluation",

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

  // -------------- HR DASHOARD-------------
  DASHBOARD_HR: "/dashboard/stats",
  DASHBOARD_Attendance: "/dashboard/attendance-stats",

  // --------------Upload-------------
  UPLOAD_IMAGE: "/image-upload/upload",

  // --------------Employee Pay Elements-------------
  PAY_ENTRIES: "/employee-pay-elements/bulk",

  // --------------Pay Element-Entries-------------
  PAY_ELEMENT_ENTRIES: "/employee-pay-elements",

  // -------------Loan Deductions-------------
  LOAN_DEDUCTION: "/loan-deductions",

  // --------------------------------Manufacturing---------------------------------
  // --------------Material Mastern-------------
  MATERIRAL_MASTERN: "/material-master",

  // --------------Bill Of Material-------------
  BILL_MATERIAL: "/bom",

  // --------------Equipment Master-------------
  EQUIPMENT_MASTER: "/equipment-master",

  // -------------- SOP Master  work-instructions-------------
  SOP_MASTER: "/sop-master",

  // -------------- Demand Planning-------------
  DEMAND_PLANNING: "/demand-plans",

  // -------------- Payroll Process Run-------------
  PAYROLL_PROCESS: "/payroll/runs",
  PAYROLL_PROCESS_CREATE: "/payroll/run",
  SALARY_PAYABLE_SUBMIT: "/payroll/salary-payable",
  // --------------------------------JOB Location---------------------------------
  JOB_LOCATIONS: "/job-locations",
  // -------------- MRP Planning-------------
  MRP_PLANNING: "/mrp-planning",

  // -------------- Batch Planning-------------
  BATCH_PLANNING: "/batch-planning",

  // -------------- Work Orders-------------
  WORK_ORDERS: "/work-orders",

  // --------------Upload-------------
  PAYROLL_PROCESS_GET: "/payroll/runs",
  SALARY_PAYMENT_PROCESS: "/payroll/salary-payment",
};
