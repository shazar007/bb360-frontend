import { Route, Routes } from "react-router-dom";

import { employeePayElementsRoutes } from "./employeePayElements";
import { loanDeductionSetupRoutes } from "./loanDeductionSetup";
import PayElementEntitlesUpload from "../../../pages/hrModule/payrollSetup/payElementEntitlesUpload";

export default function PayrollSetupRouting() {
  return (
    <Routes>
      {employeePayElementsRoutes}

      {loanDeductionSetupRoutes}

      <Route
        path="/pay-element-entitles-upload"
        element={<PayElementEntitlesUpload />}
      />
    </Routes>
  );
}
