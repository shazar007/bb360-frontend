import { Route, Routes } from "react-router-dom";

import EmployeePayElements from "../../../pages/hrModule/payrollSetup/employeePayElements";
import LoanDeductionSetup from "../../../pages/hrModule/payrollSetup/loanDeductionSetup";
import PayElementEntitlesUpload from "../../../pages/hrModule/payrollSetup/payElementEntitlesUpload";

export default function PayrollSetupRouting() {
  return (
    <Routes>
      <Route path="/employee-pay-elements" element={<EmployeePayElements />} />

      <Route path="/loan-deduction-setup" element={<LoanDeductionSetup />} />

      <Route
        path="/pay-element-entitles-upload"
        element={<PayElementEntitlesUpload />}
      />
    </Routes>
  );
}
