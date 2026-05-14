import { Route } from "react-router-dom";

import EmployeeDesignation from "../../../../pages/hrModule/hrSetup/employeeDesignation";
import EmployeeDesignationCreate from "../../../../pages/hrModule/hrSetup/employeeDesignation/employeeDesignationCreate";

export const employeeDesignationRoutes = (
  <>
    <Route path="/employee-designation" element={<EmployeeDesignation />} />

    <Route
      path="/employee-designation/create"
      element={<EmployeeDesignationCreate />}
    />
  </>
);
