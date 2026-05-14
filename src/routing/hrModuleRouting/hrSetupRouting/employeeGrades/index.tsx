import { Route } from "react-router-dom";

import EmployeeGrades from "../../../../pages/hrModule/hrSetup/employeeGrades";
import EmployeeGradesCreate from "../../../../pages/hrModule/hrSetup/employeeGrades/employeeGradesCreate";

export const employeeGradesRoutes = (
  <>
    <Route path="/employee-grades" element={<EmployeeGrades />} />

    <Route
      path="/employee-grades/create"
      element={<EmployeeGradesCreate />}
    />
  </>
);