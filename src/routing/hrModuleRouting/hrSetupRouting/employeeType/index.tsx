import { Route } from "react-router-dom";

import EmployeeTypes from "../../../../pages/hrModule/hrSetup/employeeTypes";
import EmployeeTypesCreate from "../../../../pages/hrModule/hrSetup/employeeTypes/employeeTypesCreate";

export const employeeTypeRoutes = (
  <>
    <Route path="/employee-types" element={<EmployeeTypes />} />

    <Route path="/employee-types/create" element={<EmployeeTypesCreate />} />
  </>
);
