import { Route } from "react-router-dom";

import EmployeeLeaveApplication from "../../../../pages/hrModule/employeeLeaveExpense/employeeLeaveApplication";
import EmployeeLeaveApplicationCreate from "../../../../pages/hrModule/employeeLeaveExpense/employeeLeaveApplication/employeeLeaveApplicationCreate";

export const employeeLeaveApplicationRoutes = (
  <>
    <Route path="/leave-application" element={<EmployeeLeaveApplication />} />

    <Route
      path="/leave-application/create"
      element={<EmployeeLeaveApplicationCreate />}
    />
  </>
);
