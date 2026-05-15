import { Route, Routes } from "react-router-dom";

import PayrollProcessRun from "../../../pages/hrModule/payrollProcess/payrollProcessRun";
import SalaryPayableProcess from "../../../pages/hrModule/payrollProcess/salaryPayableProcess";
import SalaryPaymentProcess from "../../../pages/hrModule/payrollProcess/salaryPaymentProcess";
import PayrollProcessRunResult from "../../../pages/hrModule/payrollProcess/payrollProcessRunResult";

export default function PayrollProcessRouting() {
  return (
    <Routes>
      <Route path="/payroll-process-run" element={<PayrollProcessRun />} />

      <Route
        path="/salary-payable-process"
        element={<SalaryPayableProcess />}
      />

      <Route
        path="/salary-payment-process"
        element={<SalaryPaymentProcess />}
      />

      <Route
        path="/payroll-process-run-result"
        element={<PayrollProcessRunResult />}
      />
    </Routes>
  );
}
