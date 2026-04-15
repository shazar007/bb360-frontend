type NavItem = {
  name: string;
  path?: string;
  icon?: string;
  children?: NavItem[];
};
export const navItems: NavItem[] = [
  {
    name: "Dashboards",
    icon: "si:dashboard-duotone",
    children: [
      {
        name: "Sales 360 Dashboard",
        path: "/360-dashboard",
      },
      // {
      //   name: "HR & Payroll Dashboard",
      //   path: "/hr-dashboard",
      // },
      // {
      //   name: "Purchase Dashboard",
      //   path: "/purchase-dashboard",
      // },
      // {
      //   name: "Inventory Dashboard",
      //   path: "/inventory-dashboard",
      // },
    ],
  },
  {
    name: "Application Setup",
    icon: "mdi:application",
    children: [
      // {
      //   name: "Classification",
      //   children: [
      //     {
      //       name: "Department",
      //       path: "/application-setup/classification/department",
      //     },
      //     {
      //       name: "Classes",
      //       path: "/application-setup/classification/classes",
      //     },
      //     {
      //       name: "Countries",
      //       path: "/application-setup/classification/countries",
      //     },
      //     {
      //       name: "State",
      //       path: "/application-setup/classification/state",
      //     },
      //     {
      //       name: "City",
      //       path: "/application-setup/classification/city",
      //     },
      //     {
      //       name: "Area Types",
      //       path: "/application-setup/classification/area-type",
      //     },
      //     {
      //       name: "Entity Group",
      //       path: "/application-setup/classification/entity-group",
      //     },
      //   ],
      // },
      // {
      //   name: "Set Up Taxes",
      //   children: [
      //     {
      //       name: "Tex Items",
      //       path: "/application-setup/tex-items",
      //     },
      //   ],
      // },
      // {
      //   name: "LOVs Setup",
      //   children: [
      //     {
      //       name: "User List of Values",
      //       path: "/application-setup/lovs/user-list-of-values",
      //     },
      //     {
      //       name: "Cost Category",
      //       path: "/application-setup/lovs/cost-category",
      //     },
      //   ],
      // },
      {
        name: "Distribution Setup",
        children: [
          {
            name: "Distribution Upload",
            path: "/application-setup/distribution-setup/distributor-upload",
          },
          {
            name: "Distribution Update",
            path: "/application-setup/distribution-setup/distributor-update",
          },
          //     {
          //       name: "Vehicles",
          //       path: "/application-setup/distribution-setup/vehicles",
          //     },
          //     {
          //       name: "Routes",
          //       path: "/application-setup/distribution-setup/routes",
          //     },
          //     {
          //       name: "Customers Map View",
          //       path: "/application-setup/distribution-setup/customers-map-view",
          //     },
          //     {
          //       name: "Employee Location Routes",
          //       path: "/application-setup/distribution-setup/employee-location-routes",
          //     },
          //     {
          //       name: "Fuel Price List",
          //       path: "/application-setup/distribution-setup/fuel-price-list",
          //     },
        ],
      },
      {
        name: "Data Upload",
        children: [
          {
            name: "Items Upload",
            path: "/application-setup/data-upload/item-upload",
          },
          {
            name: "Items Update",
            path: "/application-setup/data-upload/item-update",
          },
          // {
          //   name: "Item Rate Upload",
          //   path: "/application-setup/data-upload/item-rate-upload",
          // },
          // {
          //   name: "Update Item Rate",
          //   path: "/application-setup/data-upload/update-item-rate",
          // },
          // {
          //   name: "Item Category Upload",
          //   path: "/application-setup/data-upload/item-category-upload",
          // },
          // {
          //   name: "Employees upload",
          //   path: "/application-setup/data-upload/employees-upload",
          // },
          // {
          //   name: "Departments Upload",
          //   path: "/application-setup/data-upload/departments-upload",
          // },
          // {
          //   name: "Customers Update",
          //   path: "/application-setup/data-upload/customers-update",
          // },
          // {
          //   name: "Customers Upload",
          //   path: "/application-setup/data-upload/customers-upload",
          // },
          // {
          //   name: "Inventory Ajustment Upload",
          //   path: "/application-setup/data-upload/inventory-adjustment-upload",
          // },
          // {
          //   name: "Budget Upload",
          //   path: "/application-setup/data-upload/budget-upload",
          // },
          // {
          //   name: "Vendor Upload",
          //   path: "/application-setup/data-upload/vendor-upload",
          // },
          // {
          //   name: "Lovs Values Upload",
          //   path: "/application-setup/data-upload/lovs-values-upload",
          // },
          // {
          //   name: "Vendors Update ",
          //   path: "/application-setup/data-upload/vendors-upload",
          // },
          // {
          //   name: "Journal Entry Upload",
          //   path: "/application-setup/data-upload/journal-entry-upload",
          // },
          // {
          //   name: "Unit Type Upload ",
          //   path: "/application-setup/data-upload/unit-type-upload",
          // },
          // {
          //   name: "Sale_Order_Temp",
          //   path: "/application-setup/data-upload/sales-order-temp",
          // },
          // {
          //   name: "City Upload",
          //   path: "/application-setup/data-upload/city-upload",
          // },
          // {
          //   name: "Area Upload",
          //   path: "/application-setup/data-upload/area/upload",
          // },
          // {
          //   name: "Employee Advance Upload",
          //   path: "/application-setup/data-upload/employee-advance-upload",
          // },
          // {
          //   name: "Assets Items Upload",
          //   path: "/application-setup/data-upload/assets-items-upload",
          // },
          // {
          //   name: "Assets Category Upload",
          //   path: "/application-setup/data-upload/assest-category-upload",
          // },
        ],
      },
      // {
      //   name: "Approval Workflow",
      //   children: [
      //     {
      //       name: "Approval Group",
      //       path: "/application-setup/approval-workflow/approval-group",
      //     },
      //     {
      //       name: "Approval Rules",
      //       path: "/application-setup/approval-workflow/approval-rules",
      //     },
      //     {
      //       name: "Vacation Rules",
      //       path: "/application-setup/approval-workflow/vacation-rules",
      //     },
      //     {
      //       name: "Admin Approvals",
      //       path: "/application-setup/approval-workflow/admin/approvals",
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "Financial Module",
    icon: "mdi:finance",
    children: [
      // {
      //   name: "Financial",
      //   children: [
      //     {
      //       name: "Journal Entries",
      //       path: "/financial-module/Financial/journal-entries",
      //     },
      //     {
      //       name: "Post Dated Cheque's",
      //       path: "/financial-module/Financial/post-dated-cheque",
      //     },
      //     {
      //       name: "Recurring Journal",
      //       path: "/financial-module/Financial/recurring-journal",
      //     },
      //     {
      //       name: "Budgets",
      //       path: "/financial-module/Financial/budgets",
      //     },
      //     {
      //       name: "Account Closing - Retained Erning Entry",
      //       path: "/financial-module/Financial/account-closing",
      //     },
      //     {
      //       name: "Run Items Costing",
      //       path: "/financial-module/Financial/run-items-costing",
      //     },
      //     {
      //       name: "Inward Post Dated Cheque",
      //       path: "/financial-module/Financial/inward-post-date-cheque",
      //     },
      //     {
      //       name: "Outward Post Dated Cheque",
      //       path: "/financial-module/Financial/outward-post-date-cheque",
      //     },
      //   ],
      // },
      // {
      //   name: "Cash & Banks",
      //   children: [
      //     {
      //       name: "Make Payments",
      //       path: "/financial-module/cash-banks/make-payments",
      //     },
      //     {
      //       name: "Make Receipt",
      //       path: "/financial-module/cash-banks/make-receipt",
      //     },
      //     {
      //       name: "Route Wise Cash Recovery",
      //       path: "/financial-module/cash-banks/route-wise-cash-recovery",
      //     },
      //     {
      //       name: "Employee Advance",
      //       path: "/financial-module/cash-banks/employee-advance",
      //     },
      //     {
      //       name: "Employee Loans",
      //       path: "/financial-module/cash-banks/employee-loans",
      //     },
      //     {
      //       name: "Funds Issue",
      //       path: "/financial-module/cash-banks/funds-issue",
      //     },
      //     {
      //       name: "Fund Receiving",
      //       path: "/financial-module/cash-banks/funds-receiving",
      //     },
      //   ],
      // },
      // {
      //   name: "Accounting Setup",
      //   children: [
      //     {
      //       name: "Currencies",
      //       path: "/financial-module/accounting-setup/currencies",
      //     },
      //     {
      //       name: "Payment Terms",
      //       path: "/financial-module/accounting-setup/payment-terms",
      //     },
      //     {
      //       name: "cheque Book",
      //       path: "/financial-module/accounting-setup/cash-book",
      //     },
      //     {
      //       name: "Accounting Periods",
      //       path: "/financial-module/accounting-setup/accounting-periods",
      //     },
      //     {
      //       name: "Transaction Accounting Verify",
      //       path: "/financial-module/accounting-setup/transaction-accounting-verify",
      //     },
      //     {
      //       name: "Merge Account Setup",
      //       path: "/financial-module/accounting-setup/merge-account-setup",
      //     },
      //   ],
      // },
      // {
      //   name: "Fixed Asset",
      //   children: [
      //     {
      //       name: "Fixed Assets Register",
      //       path: "/financial-module/fixed-asset/fixed-assets-register",
      //     },
      //     {
      //       name: "Asset Category",
      //       path: "/financial-module/fixed-asset/asset-category",
      //     },
      //     {
      //       name: "Asset Depreciation Calculation",
      //       path: "/financial-module/fixed-asset/asset-depreciation-calculation",
      //     },
      //     {
      //       name: "Fixed Asset Depreciation",
      //       path: "/financial-module/fixed-asset/fixed-asset-deprection",
      //     },
      //     {
      //       name: "Disposal of Asset",
      //       path: "/financial-module/fixed-asset/disposal-of-assets",
      //     },
      //     {
      //       name: "Revaluation of Asset",
      //       path: "/financial-module/fixed-asset/revaluation-of-assets",
      //     },
      //     {
      //       name: "Asset Ledger",
      //       path: "/financial-module/fixed-asset/asset-",
      //     },
      //     {
      //       name: "Fixed Asset Detail Report",
      //       path: "/financial-module/fixed-asset/",
      //     },
      //     {
      //       name: "Fixed Asset Category Report",
      //       path: "/financial-module/fixed-asset/",
      //     },
      //   ],
      // },
      // {
      //   name: "Asset Maintenance",
      //   children: [
      //     {
      //       name: "Maintenance Request",
      //       path: "/financial-module/asset-maintenance/maintenance-request",
      //     },
      //     {
      //       name: "Supervisior Activity",
      //       path: "/financial-module/asset-maintenance/supervisior-activity",
      //     },
      //     {
      //       name: "Technician Activity",
      //       path: "/financial-module/asset-maintenance/technician-activity",
      //     },
      //     {
      //       name: "Vendor Activity",
      //       path: "/financial-module/asset-maintenance/vendor-activity",
      //     },
      //     {
      //       name: "Maintenance Job Cards",
      //       path: "/financial-module/asset-maintenance/maintenance-job-cards",
      //     },
      //   ],
      // },
      // {
      //   name: "Financial Reports",
      //   children: [
      //     {
      //       name: "Account Ledger",
      //       path: "/financial-module/financial-reports/account-ledger",
      //     },
      //     {
      //       name: "Cash / Bank Ledger",
      //       path: "/financial-module/financial-reports/cash-bank-ledger",
      //     },
      //     {
      //       name: "Cash /  Bank Summary",
      //       path: "/financial-module/financial-reports/cash-bank-summary",
      //     },
      //     {
      //       name: "Cash In Out Details",
      //       path: "/financial-module/financial-reports/cash-in-out-details",
      //     },
      //     {
      //       name: "Daily Cash Book Report",
      //       path: "/financial-module/financial-reports/daily-cash-book-report",
      //     },
      //     {
      //       name: "Trial Balance",
      //       path: "/financial-module/financial-reports/trial-balance",
      //     },
      //     {
      //       name: "Trial Balance",
      //       path: "/financial-module/financial-reports/trial-balance-2",
      //     },
      //     {
      //       name: "Payment and Receipt Summary",
      //       path: "/financial-module/financial-reports/payment-receipt-summary",
      //     },
      //     {
      //       name: "Trial Balance Details",
      //       path: "/financial-module/financial-reports/trial-balance-details",
      //     },
      //     {
      //       name: "Trial Balance Month Wise",
      //       path: "/financial-module/financial-reports/trial-balance-month-wise",
      //     },
      //     {
      //       name: "Balance Sheet Report",
      //       path: "/financial-module/financial-reports/balance-sheet-report",
      //     },
      //     {
      //       name: "Cash Flow Statement",
      //       path: "/financial-module/financial-reports/cash-flow-statement",
      //     },
      //     {
      //       name: "Profit / Loss Statement",
      //       path: "/financial-module/financial-reports/profit-loss-statement",
      //     },
      //     {
      //       name: "General Journal Report",
      //       path: "/financial-module/financial-reports/general-journal-report",
      //     },
      //     {
      //       name: "Daily Activity Report",
      //       path: "/financial-module/financial-reports/daily-activity-report",
      //     },
      //     {
      //       name: "Daily Expense Report",
      //       path: "/financial-module/financial-reports/daily-expense-report",
      //     },
      //     {
      //       name: "Working Capital Report",
      //       path: "/financial-module/financial-reports/working-capital-report",
      //     },
      //     {
      //       name: "Daily Expense Summary",
      //       path: "/financial-module/financial-reports/daily-expense-summary",
      //     },
      //     {
      //       name: "Budget Status Report",
      //       path: "/financial-module/financial-reports/budget-status-report",
      //     },
      //     {
      //       name: "Accounts Closing Balances",
      //       path: "/financial-module/financial-reports/accounts-closing-balances",
      //     },
      //   ],
      // },

      {
        name: "Account Ledger",
        path: "/financial-module/account-ledger",
      },
      {
        name: "Debit / Credit Note",
        path: "/financial-module/debit-credit-note",
      },
    ],
  },
  {
    name: "Inventory Module",
    icon: "ic:twotone-inventory",
    children: [
      { name: "No Data Found" },
      // {
      //   name: "Item Setup",
      //   children: [
      //     {
      //       name: "Item",
      //       path: "/inventory-module/item-setup/item",
      //     },
      //     {
      //       name: "Item Category",
      //       path: "/inventory-module/item-setup/item-category",
      //     },
      //     {
      //       name: "Unit Type",
      //       path: "/inventory-module/item-setup/unit-type",
      //     },
      //     {
      //       name: "Item Barcode Generate",
      //       path: "/inventory-module/item-setup/item-barcode-generate",
      //     },
      //     {
      //       name: "Price Type",
      //       path: "/inventory-module/item-setup/price-type",
      //     },
      //     {
      //       name: "Discount Policies",
      //       path: "/inventory-module/item-setup/discount-Policies",
      //     },
      //     {
      //       name: "BINS",
      //       path: "/inventory-module/item-setup/bins",
      //     },
      //   ],
      // },
      // {
      //   name: "Inventory Tranasaction",
      //   children: [
      //     {
      //       name: "Inventory Adjustment",
      //       path: "/inventory-module/inventory-tranasaction/inventory-adjustment",
      //     },
      //     {
      //       name: "Inventory Transfer",
      //       path: "/inventory-module/inventory-tranasaction/inventory-transfer",
      //     },
      //     {
      //       name: "Material Issue Note",
      //       path: "/inventory-module/inventory-tranasaction/material-issue-note",
      //     },
      //     {
      //       name: "Material Return Note",
      //       path: "/inventory-module/inventory-tranasaction/material-return-note",
      //     },
      //     {
      //       name: "Transfer Order",
      //       path: "/inventory-module/inventory-tranasaction/transfer-order",
      //     },
      //     {
      //       name: "Pending Delivery Challan",
      //       path: "/inventory-module/inventory-tranasaction/pending-delivery-challan",
      //     },
      //     {
      //       name: "Pending Receive Orders List",
      //       path: "/inventory-module/inventory-tranasaction/pending-receive-orders-list",
      //     },
      //     {
      //       name: "Stock Taking",
      //       path: "/inventory-module/inventory-tranasaction/stock-taking",
      //     },
      //     {
      //       name: "Update Cost Rate",
      //       path: "/inventory-module/inventory-tranasaction/update-cost-rate",
      //     },
      //     {
      //       name: "Update Lot/Batch Balance",
      //       path: "/inventory-module/inventory-tranasaction/update-Lot/batch-balance",
      //     },
      //     {
      //       name: "Run Items Costing",
      //       path: "/inventory-module/inventory-tranasaction/run-items-costing",
      //     },
      //   ],
      // },
      // {
      //   name: "Gate Pass Reports",
      //   children: [
      //     {
      //       name: "Gate Pass In",
      //       path: "/inventory-module/inventory-tranasaction/Gate Pass In",
      //     },
      //     {
      //       name: "Gate Pass Out",
      //       path: "/inventory-module/inventory-tranasaction/Gate Pass Out",
      //     },
      //   ],
      // },
      // {
      //   name: "Inventory Reports",
      //   children: [
      //     {
      //       name: "Item Closing As On Date Report",
      //       path: "/inventory-module/inventory-tranasaction/item-closing-as-on-date-report",
      //     },
      //     {
      //       name: "Items Ledger",
      //       path: "/inventory-module/inventory-tranasaction/items-ledger",
      //     },
      //     {
      //       name: "Stock Movement Report",
      //       path: "/inventory-module/inventory-tranasaction/stock-movement-report",
      //     },
      //     {
      //       name: "Stock Aging Report",
      //       path: "/inventory-module/inventory-tranasaction/stock-aging-report",
      //     },
      //     {
      //       name: "Store Wise Closing Balance Report",
      //       path: "/inventory-module/inventory-tranasaction/store-wise-closing-balance-report",
      //     },
      //     {
      //       name: "Inventory Profit Margin",
      //       path: "/inventory-module/inventory-tranasaction/inventory-profit-margin",
      //     },
      //     {
      //       name: "Un Balanced Detail Ledger",
      //       path: "/inventory-module/inventory-tranasaction/un-balanced-detail-ledger",
      //     },
      //     {
      //       name: "Items Price List",
      //       path: "/inventory-module/inventory-tranasaction/items-price-list",
      //     },
      //     {
      //       name: "Inventory Profit Margin Summary",
      //       path: "/inventory-module/inventory-tranasaction/inventory-profit-margin-summary",
      //     },
      //     {
      //       name: "Inventory Transfer",
      //       path: "/inventory-module/inventory-tranasaction/inventory-transfer",
      //     },
      //     {
      //       name: "Inventory Adjustment",
      //       path: "/inventory-module/inventory-tranasaction/inventory-adjustment",
      //     },
      //     {
      //       name: "Transfer Order",
      //       path: "/inventory-module/inventory-tranasaction/transfer-order",
      //     },
      //     {
      //       name: "Minimum Stock Report",
      //       path: "/inventory-module/inventory-tranasaction/minimum-stock-report",
      //     },
      //     {
      //       name: "Re Order Level Report",
      //       path: "/inventory-module/inventory-tranasaction/re-order-level-report",
      //     },
      //     {
      //       name: "Requisition Report",
      //       path: "/inventory-module/inventory-tranasaction/requisition-report",
      //     },
      //     {
      //       name: "Stock Movement Detail Report",
      //       path: "/inventory-module/inventory-tranasaction/stock-movement-detail-report",
      //     },
      //     {
      //       name: "Items Detail Ledger",
      //       path: "/inventory-module/inventory-tranasaction/items-detail-ledger",
      //     },
      //     {
      //       name: "Material Issue Note Report",
      //       path: "/inventory-module/inventory-tranasaction/material-issue-note-report",
      //     },
      //     {
      //       name: "Material Return Note Report",
      //       path: "/inventory-module/inventory-tranasaction/material-return-note-report",
      //     },
      //     {
      //       name: "Items Details Closing Report",
      //       path: "/inventory-module/inventory-tranasaction/items-details-closing-report",
      //     },
      //     {
      //       name: "Assembly Item Production Report",
      //       path: "/inventory-module/inventory-tranasaction/assembly-item-production-report",
      //     },
      //     {
      //       name: "Item Production Report",
      //       path: "/inventory-module/inventory-tranasaction/item-production-report",
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "Purchase Module",
    icon: "material-symbols:sell-outline",
    children: [
      // {
      //   name: "Vendor Define",
      //   children: [
      //     {
      //       name: "Vendors",
      //       path: "/purchase-module/vender-define/venders",
      //     },
      //     {
      //       name: "Vendors Type",
      //       path: "/purchase-module/vender-define/vender-type",
      //     },
      //   ],
      // },
      // {
      //   name: "Procurement",
      //   children: [
      //     {
      //       name: "Requisition",
      //       path: "/purchase-module/procurement/requisition",
      //     },
      //     {
      //       name: "Requisition for Procurement",
      //       path: "/purchase-module/procurement/requisition-procurement",
      //     },
      //     {
      //       name: "RFQ",
      //       path: "/purchase-module/procurement/rfq",
      //     },
      //     {
      //       name: "Purchase Quotation",
      //       path: "/purchase-module/procurement/purchase-quotation",
      //     },
      //   ],
      // },
      {
        name: "Purchase",
        children: [
          {
            name: "Purchase Order",
            path: "/purchase-module/purchase/purchase-order",
          },
          // {
          //   name: "Purchase Contract",
          //   path: "/purchase-module/purchase/purchase-contract",
          // },
          // {
          //   name: "Pending Receive Orders List",
          //   path: "/purchase-module/purchase/pending-receive-orders-list",
          // },
          {
            name: "Receiving Challan",
            path: "/purchase-module/purchase/receiving-challan",
          },
          // {
          //   name: "Generate Consolidate Vendor Bill",
          //   path: "/purchase-module/purchase/generate-consolidate-vendor-bill",
          // },
        ],
      },
      {
        name: "Payable",
        children: [
          {
            name: "Purchase Invoice",
            path: "/purchase-module/payable/vendor-bills",
          },
          // {
          //   name: "Pay Bills",
          //   path: "/purchase-module/payable/pay-bills",
          // },
          // {
          //   name: "Vendor Credit",
          //   path: "/purchase-module/payable/vendor-credit",
          // },
          // {
          //   name: "Recurring Vendor Bill",
          //   path: "/purchase-module/payable/recurring-vendor-bill",
          // },
        ],
      },
      // {
      //   name: "Import",
      //   children: [
      //     {
      //       name: "Inbound Shipment",
      //       path: "/import/inbound-shipment",
      //     },
      //     {
      //       name: "Pending Inbound Shipment",
      //       path: "/import/pending-inbound-shipment",
      //     },
      //     {
      //       name: "Item Inbound Shipment",
      //       path: "/import/item-inbound-shipment",
      //     },
      //     {
      //       name: "Import Shipment Report",
      //       path: "/import/import-shipment-report",
      //     },
      //   ],
      // },
      // {
      //   name: "Purchase Reports",
      //   children: [
      //     {
      //       name: "Purchase Order Details",
      //       path: "/purchase-reports/purchase-order-details",
      //     },
      //     {
      //       name: "Purchase Summary Details",
      //       path: "/purchase-reports/purchase-summary-details",
      //     },
      //     {
      //       name: "Day Item Receipt Report",
      //       path: "/purchase-reports/day-item-receipt-report",
      //     },
      //     {
      //       name: "Pending Purchase Order for Receipt",
      //       path: "/purchase-reports/pending-purchase-order-for-receipt",
      //     },
      //     {
      //       name: "Pending Item Receipt for Billing",
      //       path: "/purchase-reports/pending-item-receipt-for-billing",
      //     },
      //     {
      //       name: "Purchase Order Tracking Report",
      //       path: "/purchase-reports/purchase-order-tracking-report",
      //     },
      //     {
      //       name: "Purchase Contract Details",
      //       path: "/purchase-reports/purchase-contract-details",
      //     },
      //   ],
      // },
      // {
      //   name: "Payable Reports",
      //   children: [
      //     {
      //       name: "Daily Purchase Report",
      //       path: "/payable-reports/daily-purchase-report",
      //     },
      //     {
      //       name: "Vendor Closing Report",
      //       path: "/payable-reports/vendor-closing-report",
      //     },
      //     {
      //       name: "Vendors Ledger Foreign Currency",
      //       path: "/payable-reports/vendors-ledger-foreign-currency",
      //     },
      //     {
      //       name: "Vendors Ledger",
      //       path: "/payable-reports/vendors-ledger",
      //     },
      //     {
      //       name: "Vendor Payable Summary Report",
      //       path: "/payable-reports/vendor-payable-summary-report",
      //     },
      //     {
      //       name: "Vendor Aging Summary Report",
      //       path: "/payable-reports/vendor-aging-summary-report",
      //     },
      //     {
      //       name: "Vendor Aging",
      //       path: "/payable-reports/vendor-aging",
      //     },
      //     {
      //       name: "Vendor Details Ledger Report",
      //       path: "/payable-reports/vendor-details-ledger-report",
      //     },
      //     {
      //       name: "Vendor Credit Report",
      //       path: "/payable-reports/vendor-credit-report",
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "Sales Module",
    icon: "hugeicons:sale-tag-02",
    children: [
      // {
      //   name: "Customer Define",
      //   children: [
      //     {
      //       name: "Manufacturing Routing 1",
      //       path: "/manufacturing-module/customer-define/manufacturing-routing-1",
      //     },
      //     {
      //       name: "Manufacturing Routing 2",
      //       path: "/manufacturing-module/customer-define/manufacturing-routing-2",
      //     },
      //     {
      //       name: "Manufacturing Routing 3",
      //       path: "/manufacturing-module/customer-define/manufacturing-routing-3",
      //     },
      //   ],
      // },
      // {
      //   name: "POS System",
      //   children: [
      //     {
      //       name: "Point of Sale",
      //       path: "/sales-module/pos-system/point-of-sale",
      //     },
      //     {
      //       name: "Cash Sale",
      //       path: "/sales-module/pos-system/cash-sale",
      //     },
      //   ],
      // },
      {
        name: "Sales",
        children: [
          // {
          //   name: "Quotation",
          //   path: "/sales-module/sales/quotation",
          // },
          {
            name: "Distributor Invoice",
            path: "/sale-module/sales/distributor-invoice",
          },
          // {
          //   name: "Pending Delivery Challan",
          //   path: "/sales-module/sales/pending-delivery-challan",
          // },
          {
            name: "Delivery Challan",
            path: "/sale-module/sales/delivery-challan",
          },
          // {
          //   name: "Generate Consolidate Invoice",
          //   path: "/sales-module/sales/generate-consolidate-invoice",
          // },
        ],
      },
      // {
      //   name: "Receivable",
      //   children: [
      //     {
      //       name: "Invoice",
      //       path: "/sales-module/receivable/invoice",
      //     },
      //     {
      //       name: "Recurring Invoice",
      //       path: "/sales-module/receivable/recurring-invoice",
      //     },
      //     {
      //       name: "Customer Receipt",
      //       path: "/sales-module/receivable/customer-receipt",
      //     },
      //     {
      //       name: "Credit Memo",
      //       path: "/sales-module/receivable/credit-memo",
      //     },
      //     {
      //       name: "WHT Certificate Receive",
      //       path: "/sales-module/receivable/wht-certificate-receive",
      //     },
      //     {
      //       name: "Invoice Matching",
      //       path: "/sales-module/receivable/invoice-matching",
      //     },
      //   ],
      // },
      // {
      //   name: "Export",
      //   children: [
      //     {
      //       name: "Outbound Shipment",
      //       path: "/sales-module/export/outbound-shipment",
      //     },
      //     {
      //       name: "Outbound Shipment Report",
      //       path: "/sales-module/export/outbound-shipment-report",
      //     },
      //   ],
      // },
      // {
      //   name: "Sales Report",
      //   children: [
      //     {
      //       name: "Sale Order Details",
      //       path: "/sales-module/sales-report/sale-order-details",
      //     },
      //     {
      //       name: "Date Wise Sale Order Planning",
      //       path: "/sales-module/sales-report/date-wise-sale-order-planning",
      //     },
      //     {
      //       name: "Item Wise Sale Order Planning",
      //       path: "/sales-module/sales-report/item-wise-sale-order-planning",
      //     },
      //     {
      //       name: "Delivery Order Details",
      //       path: "/sales-module/sales-report/delivery-order-details",
      //     },
      //     {
      //       name: "Pending Sale Order For DO",
      //       path: "/sales-module/sales-report/pending-sale-order-for-do",
      //     },
      //     {
      //       name: "Sale Target VS Actual",
      //       path: "/sales-module/sales-report/sale-target-vs-actual",
      //     },
      //     {
      //       name: "Weekly Market Tour Plan",
      //       path: "/sales-module/sales-report/weekly-market-tour-plan",
      //     },
      //     {
      //       name: "Sale Staff Perspective",
      //       path: "/sales-module/sales-report/sale-staff-perspective",
      //     },
      //     {
      //       name: "Sale Order Tracking Report",
      //       path: "/sales-module/sales-report/sale-order-tracking-report",
      //     },
      //   ],
      // },
      // {
      //   name: "Receivable Reports",
      //   children: [
      //     {
      //       name: "Daily Sale Report",
      //       path: "/sales-module/receivable-reports/daily-sale-report",
      //     },
      //     {
      //       name: "Sale Summary Report",
      //       path: "/sales-module/receivable-reports/sale-summary-report",
      //     },
      //     {
      //       name: "Transaction Wise Sale Report",
      //       path: "/sales-module/receivable-reports/transaction-wise-sale-report",
      //     },
      //     {
      //       name: "Sales Rep Wise Summary Report",
      //       path: "/sales-module/receivable-reports/sales-rep-wise-summary-report",
      //     },
      //     {
      //       name: "Customer Ledger",
      //       path: "/sales-module/receivable-reports/customer-ledger",
      //     },
      //     {
      //       name: "Customer Closing Report",
      //       path: "/sales-module/receivable-reports/customer-closing-report",
      //     },
      //     {
      //       name: "Customer Receivable Summary Report",
      //       path: "/sales-module/receivable-reports/customer-receivable-summary-report",
      //     },
      //     {
      //       name: "Customer Ledger Report Foreign Currency",
      //       path: "/sales-module/receivable-reports/customer-ledger-foreign-currency",
      //     },
      //     {
      //       name: "Credit Memo Report",
      //       path: "/sales-module/receivable-reports/credit-memo-report",
      //     },
      //     {
      //       name: "Customer Aging",
      //       path: "/sales-module/receivable-reports/customer-aging",
      //     },
      //     {
      //       name: "Customer Aging Summary",
      //       path: "/sales-module/receivable-reports/customer-aging-summary",
      //     },
      //     {
      //       name: "Customer Details Ledger Report",
      //       path: "/sales-module/receivable-reports/customer-details-ledger-report",
      //     },
      //     {
      //       name: "Customer Forecasting Report",
      //       path: "/sales-module/receivable-reports/customer-forecasting-report",
      //     },
      //     {
      //       name: "Inward Post Dated Cheque",
      //       path: "/sales-module/receivable-reports/inward-post-dated-cheque",
      //     },
      //     {
      //       name: "WHT Certificate Receive",
      //       path: "/sales-module/receivable-reports/wht-certificate-receive",
      //     },
      //     {
      //       name: "Commission Summary Report",
      //       path: "/sales-module/receivable-reports/commission-summary-report",
      //     },
      //     {
      //       name: "Recovery Sheet",
      //       path: "/sales-module/receivable-reports/recovery-sheet",
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "Manufacturing Module",
    icon: "mdi:factory",
    children: [
      { name: "No Data Found" },
      // {
      //   name: "Manufacturing Setup",
      //   children: [
      //     {
      //       name: "Manufacturing Routing",
      //       path: "/manufacturing-module/manufacturing-setup/manufacturing-routing",
      //     },
      //     {
      //       name: "Work Centers / Entity Group",
      //       path: "/manufacturing-module/manufacturing-setup/work-centers-entity-group",
      //     },
      //     {
      //       name: "Machines Setup",
      //       path: "/manufacturing-module/manufacturing-setup/machines-setup",
      //     },
      //     {
      //       name: "Bill of Materials",
      //       path: "/manufacturing-module/manufacturing-setup/bill-of-materials",
      //     },
      //   ],
      // },
      // {
      //   name: "Discrete Manufacturing",
      //   children: [
      //     {
      //       name: "Pending SO for Discrete Work Order",
      //       path: "/manufacturing-module/discrete-manufacturing/pending-so-for-discrete-work-order",
      //     },
      //     {
      //       name: "Discrete Work Order",
      //       path: "/manufacturing-module/discrete-manufacturing/discrete-work-order",
      //     },
      //     {
      //       name: "Pending Work Orders",
      //       path: "/manufacturing-module/discrete-manufacturing/pending-work-orders",
      //     },
      //     {
      //       name: "Assembly Build",
      //       path: "/manufacturing-module/discrete-manufacturing/assembly-build",
      //     },
      //     {
      //       name: "Assembly Unbuild",
      //       path: "/manufacturing-module/discrete-manufacturing/assembly-unbuild",
      //     },
      //     {
      //       name: "Employee Piece Routing",
      //       path: "/manufacturing-module/discrete-manufacturing/employee-piece-routing",
      //     },
      //   ],
      // },
      // {
      //   name: "Process Manufacturing",
      //   children: [
      //     {
      //       name: "Pending SO for Discrete Work Order",
      //       path: "/manufacturing-module/process-manufacturing/pending-so-for-discrete-work-order",
      //     },
      //     {
      //       name: "Work Order",
      //       path: "/manufacturing-module/process-manufacturing/work-order",
      //     },
      //     {
      //       name: "Pending Work Progress",
      //       path: "/manufacturing-module/process-manufacturing/pending-work-progress",
      //     },
      //     {
      //       name: "Work Progress",
      //       path: "/manufacturing-module/process-manufacturing/work-progress",
      //     },
      //     {
      //       name: "Pending Material Consumption",
      //       path: "/manufacturing-module/process-manufacturing/pending-material-consumption",
      //     },
      //     {
      //       name: "Material Consumption",
      //       path: "/manufacturing-module/process-manufacturing/material-consumption",
      //     },
      //   ],
      // },
      // {
      //   name: "Manufacturing Report",
      //   children: [
      //     {
      //       name: "Work Order Status Report",
      //       path: "/manufacturing-module/manufacturing-report/work-order-status-report",
      //     },
      //     {
      //       name: "Assembly Builds Report",
      //       path: "/manufacturing-module/manufacturing-report/assembly-builds-report",
      //     },
      //     {
      //       name: "Material Planning Sale Order Wise",
      //       path: "/manufacturing-module/manufacturing-report/material-planning-sale-order-wise",
      //     },
      //     {
      //       name: "Material Planning Work Order Wise",
      //       path: "/manufacturing-module/manufacturing-report/material-planning-work-order-wise",
      //     },
      //     {
      //       name: "Assembly Build Piece Rate",
      //       path: "/manufacturing-module/manufacturing-report/assembly-build-piece-rate",
      //     },
      //     {
      //       name: "Work Progress Piece Rate",
      //       path: "/manufacturing-module/manufacturing-report/work-progress-piece-rate",
      //     },
      //     {
      //       name: "Actual vs Plan Consumption Summary",
      //       path: "/manufacturing-module/manufacturing-report/actual-vs-plan-consumption-summary",
      //     },
      //     {
      //       name: "Daily Actual vs Plan Consumption Report",
      //       path: "/manufacturing-module/manufacturing-report/daily-actual-vs-plan-consumption-report",
      //     },
      //     {
      //       name: "Down Time Report",
      //       path: "/manufacturing-module/manufacturing-report/down-time-report",
      //     },
      //     {
      //       name: "Daily Production Route Wise",
      //       path: "/manufacturing-module/manufacturing-report/daily-production-route-wise",
      //     },
      //     {
      //       name: "Route Production Summary",
      //       path: "/manufacturing-module/manufacturing-report/route-production-summary",
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "HR Module",
    icon: "streamline-freehand:human-resources-hierarchy",
    children: [
      { name: "No Data Found" },
      // {
      //   name: "HR Setup",
      //   children: [
      //     {
      //       name: "Employee",
      //       path: "/hr-module/hr-setup/employee",
      //     },
      //     {
      //       name: "Work Calendar",
      //       path: "/hr-module/hr-setup/work-calendar",
      //     },
      //     {
      //       name: "Define Employee Salary",
      //       path: "/hr-module/hr-setup/define-employee-salary",
      //     },
      //     {
      //       name: "Employee Types",
      //       path: "/hr-module/hr-setup/employee-types",
      //     },
      //     {
      //       name: "Employee Grades",
      //       path: "/hr-module/hr-setup/employee-grades",
      //     },
      //     {
      //       name: "Employee Jobs",
      //       path: "/hr-module/hr-setup/employee-jobs",
      //     },
      //     {
      //       name: "Employee Designation",
      //       path: "/hr-module/hr-setup/employee-designation",
      //     },
      //   ],
      // },
      // {
      //   name: "Employee Performance",
      //   children: [
      //     {
      //       name: "Employee Performance Criteria",
      //       path: "/hr-module/employee-performance/employee-performance-criteria",
      //     },
      //     {
      //       name: "Employee Performance Evalution",
      //       path: "/hr-module/employee-performance/employee-performance-evalution",
      //     },
      //   ],
      // },
      // {
      //   name: "Employee Leave & Expense",
      //   children: [
      //     {
      //       name: "Employee Leave Application",
      //       path: "/hr-module/employee-leave-expense/employee-leave-application",
      //     },
      //     {
      //       name: "CPL Leave Approval",
      //       path: "/hr-module/employee-leave-expense/cpl-leave-approval",
      //     },
      //     {
      //       name: "Employee Expense Claim",
      //       path: "/hr-module/employee-leave-expense/employee-expense-claim",
      //     },
      //   ],
      // },
      // {
      //   name: "Attendance Setup",
      //   children: [
      //     {
      //       name: "Define Attendance Holidays",
      //       path: "/hr-module/attendance-setup/define-attendance-holidays",
      //     },
      //   ],
      // },
      // {
      //   name: "HR-Attendance",
      //   children: [
      //     {
      //       name: "HR & Payroll Dashboard",
      //       path: "/hr-module/hr-attendance/hr-payroll-dashboard",
      //     },
      //     {
      //       name: "Time Attendance Machine Data",
      //       path: "/hr-module/hr-attendance/time-attendance-machine-data",
      //     },
      //     {
      //       name: "Time Attendance Register",
      //       path: "/hr-module/hr-attendance/time-attendance-register",
      //     },
      //     {
      //       name: "Accrual Plan Balance",
      //       path: "/hr-module/ahr-attendance/accrual-plan-balance",
      //     },
      //     {
      //       name: "Overtime Approval",
      //       path: "/hr-module/hr-attendance/overtime-approval",
      //     },
      //     {
      //       name: "Outdoor Duty",
      //       path: "/hr-module/hr-attendance/outdoor-duty",
      //     },
      //     {
      //       name: "Late Deduction",
      //       path: "/hr-module/hr-attendance/late-deduction",
      //     },
      //   ],
      // },
      // {
      //   name: "Employee Attendance Reports",
      //   children: [
      //     {
      //       name: "Time Attendance Summary",
      //       path: "/hr-module/employee-attendance-reports/time-attendance-summary",
      //     },
      //     {
      //       name: "Employee Attendance Register",
      //       path: "/hr-module/employee-attendance-reports/employee-attendance-register",
      //     },
      //     {
      //       name: "Employee Register Detail Report",
      //       path: "/hr-module/employee-attendance-reports/employee-register-detail-report",
      //     },
      //     {
      //       name: "Employee Overtime Report",
      //       path: "/hr-module/employee-attendance-reports/employee-overtime-report",
      //     },
      //   ],
      // },
      // {
      //   name: "Payroll Setup",
      //   children: [
      //     {
      //       name: "Employee Pay Elements",
      //       path: "/hr-module/payroll-setup/employee-pay-elements",
      //     },
      //     {
      //       name: "Loan Deduction Setup",
      //       path: "/hr-module/payroll-setup/loan-deduction-setup",
      //     },
      //     {
      //       name: "Pay Element Entries Upload",
      //       path: "/hr-module/payroll-setup/pay-element-entries-upload",
      //     },
      //   ],
      // },
      // {
      //   name: "Payroll Process",
      //   children: [
      //     {
      //       name: "Item Closing As On Date Report",
      //       path: "/hr-module/payroll-process",
      //     },
      //   ],
      // },
      // {
      //   name: "Employee Payroll Reports",
      //   children: [
      //     {
      //       name: "Employee Salary Sheet",
      //       path: "/hr-module/employee-payroll-reports/employee-salary-sheet",
      //     },
      //     {
      //       name: "Salary Slip",
      //       path: "/hr-module/employee-payroll-reports/salary-slip",
      //     },
      //     {
      //       name: "Employees Closing Report",
      //       path: "/hr-module/employee-payroll-reports/employees-closing-report",
      //     },
      //     {
      //       name: "Employees Ledger",
      //       path: "/hr-module/employee-payroll-reports/employees-ledger",
      //     },
      //     {
      //       name: "Employee Advance Report",
      //       path: "/hr-module/employee-payroll-reports/employee-advance-report",
      //     },
      //     {
      //       name: "Employee Laon Summary",
      //       path: "/hr-module/employee-payroll-reports/employee-laon-summary",
      //     },
      //     {
      //       name: "Employee Laon & Advance Summary Reports",
      //       path: "/hr-module/employee-payroll-reports/employee-laon-advance-summary-reports",
      //     },
      //   ],
      // },
      // {
      //   name: "Employee Reports",
      //   children: [
      //     {
      //       name: "Department Wise Employee Summary",
      //       path: "/hr-module/employee-reports/department-wise-employee-summary",
      //     },
      //     {
      //       name: "Employee Card",
      //       path: "/hr-module/employee-reports/employee-card",
      //     },
      //     {
      //       name: "Uploaded Documents Status",
      //       path: "/hr-module/employee-reports/uploaded-documents-status",
      //     },
      //     {
      //       name: "Provident Fund Contribution Report",
      //       path: "/hr-module/employee-reports/provident-fund-contribution-report",
      //     },
      //     {
      //       name: "Department wise Attendance",
      //       path: "/hr-module/employee-reports/department-wise-attendance",
      //     },
      //     {
      //       name: "Daily Attendance Register",
      //       path: "/hr-module/employee-reports/daily-attendance-register",
      //     },
      //     {
      //       name: "Employee Late Arrival Report",
      //       path: "/hr-module/employee-reports/employee-late-arrival-report",
      //     },
      //     {
      //       name: "Salary Increment report",
      //       path: "/hr-module/employee-reports/salary-increment-report",
      //     },
      //   ],
      // },
    ],
  },
];

export const partyAccounts = [
  {
    label: "ABC Pharma",
    value: "69dcc84be8429accb2a934cc",
    id: "69dcc84be8429accb2a934cc",
    reference: "Manufacturing Dept",
  },
  {
    label: "XYZ Traders",
    value: "69dcc84be8429accb2a934cd",
    id: "69dcc84be8429accb2a934cd",
    reference: "Sales Dept",
  },
  {
    label: "Al-Fateh Medicine",
    value: "69dcc84be8429accb2a934ce",
    id: "69dcc84be8429accb2a934ce",
    reference: "Import Dept",
  },
];
