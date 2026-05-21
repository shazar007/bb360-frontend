import { Route } from "react-router-dom";

import LoanDeductionSetup from "../../../../pages/hrModule/payrollSetup/loanDeductionSetup";
import LoanDeductionSetupCreate from "../../../../pages/hrModule/payrollSetup/loanDeductionSetup/loanDeductionSetupCreate";

export const loanDeductionSetupRoutes = (
  <>
    <Route path="/loan-deduction-setup" element={<LoanDeductionSetup />} />

    <Route
      path="/loan-deduction-setup/create"
      element={<LoanDeductionSetupCreate />}
    />
  </>
);
