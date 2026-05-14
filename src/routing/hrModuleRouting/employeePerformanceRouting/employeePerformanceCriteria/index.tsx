import { Route } from "react-router-dom";

import EmployeePerformanceCriteria from "../../../../pages/hrModule/employeePerformance/employeePerformanceCriteria";
import EmployeePerformanceCriteriaCreate from "../../../../pages/hrModule/employeePerformance/employeePerformanceCriteria/employeePerformanceCriteriaCreate";

export const employeePerformanceCriteriaRoutes = (
  <>
    <Route path="/criteria" element={<EmployeePerformanceCriteria />} />

    <Route
      path="/criteria/create"
      element={<EmployeePerformanceCriteriaCreate />}
    />
  </>
);
