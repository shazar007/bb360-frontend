import { Route } from "react-router-dom";

import EmployeePerformanceEvaluation from "../../../../pages/hrModule/employeePerformance/employeePerformanceEvaluation";
import EmployeePerformanceEvaluationCreate from "../../../../pages/hrModule/employeePerformance/employeePerformanceEvaluation/employeePerformanceEvaluationCreate";

export const employeePerformanceEvaluationRoutes = (
  <>
    <Route path="/evaluation" element={<EmployeePerformanceEvaluation />} />

    <Route
      path="/evaluation/create"
      element={<EmployeePerformanceEvaluationCreate />}
    />
  </>
);
