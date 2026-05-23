import { Route } from "react-router-dom";

import EmployeePerformanceEvaluation from "../../../../pages/hrModule/employeePerformance/employeePerformanceEvaluation";
import EmployeePerformanceEvaluationCreate from "../../../../pages/hrModule/employeePerformance/employeePerformanceEvaluation/employeePerformanceEvaluationCreate";
import PerformanceEvaluation from "../../../../pages/hrModule/employeePerformance/employeePerformanceEvaluation/performanceEvaluation";

export const employeePerformanceEvaluationRoutes = (
  <>
    <Route path="/evaluation" element={<EmployeePerformanceEvaluation />} />

    <Route
      path="/evaluation/create"
      element={<EmployeePerformanceEvaluationCreate />}
    />
    <Route path="/evaluation/details" element={<PerformanceEvaluation />} />
  </>
);
