import { Route, Routes } from "react-router-dom";

import EmployeeSalarySheet from "../../../pages/hrModule/employeePayrollReports/employeeSalarySheet";
import SalarySlip from "../../../pages/hrModule/employeePayrollReports/salarySlip";
import EmployeesClosingReport from "../../../pages/hrModule/employeePayrollReports/employeesClosingReport";
import EmployeeLedger from "../../../pages/hrModule/employeePayrollReports/employeeLedger";
import EmployeeAdvanceReport from "../../../pages/hrModule/employeePayrollReports/employeeAdvanceReport";
import EmployeeLoanSummary from "../../../pages/hrModule/employeePayrollReports/employeeLoanSummary";
import EmployeeLoanAdvanceSummaryReport from "../../../pages/hrModule/employeePayrollReports/employeeLoanAdvanceSummaryReport";

export default function EmployeePayrollReportsRouting() {
  return (
    <Routes>
      <Route path="/employee-salary-sheet" element={<EmployeeSalarySheet />} />

      <Route path="/salary-slip" element={<SalarySlip />} />

      <Route
        path="/employees-closing-report"
        element={<EmployeesClosingReport />}
      />

      <Route path="/employee-ledger" element={<EmployeeLedger />} />

      <Route
        path="/employee-advance-report"
        element={<EmployeeAdvanceReport />}
      />

      <Route path="/employee-loan-summary" element={<EmployeeLoanSummary />} />

      <Route
        path="/employee-loan-advance-summary-report"
        element={<EmployeeLoanAdvanceSummaryReport />}
      />
    </Routes>
  );
}
