import { Routes } from "react-router-dom";

import { employeePerformanceCriteriaRoutes } from "./employeePerformanceCriteria";

import { employeePerformanceEvaluationRoutes } from "./employeePerformanceEvaluation";

export default function EmployeePerformanceRouting() {
  return (
    <Routes>
      {employeePerformanceCriteriaRoutes}

      {employeePerformanceEvaluationRoutes}
    </Routes>
  );
}
