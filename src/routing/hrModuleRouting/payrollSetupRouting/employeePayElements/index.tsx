import { Route } from "react-router-dom";

import EmployeePayElements from "../../../../pages/hrModule/payrollSetup/employeePayElements";
import EmployeePayElementsCreate from "../../../../pages/hrModule/payrollSetup/employeePayElements/employeePayElementsCreate";

export const employeePayElementsRoutes = (
  <>
    <Route path="/employee-pay-elements" element={<EmployeePayElements />} />

    <Route
      path="/employee-pay-elements/create"
      element={<EmployeePayElementsCreate />}
    />
  </>
);
