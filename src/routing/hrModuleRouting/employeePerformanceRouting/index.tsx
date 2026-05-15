import { Route, Routes } from "react-router-dom";

import EmployeePerformanceCriteria from "../../../pages/hrModule/employeePerformance/employeePerformanceCriteria";
import EmployeePerformanceEvaluation from "../../../pages/hrModule/employeePerformance/employeePerformanceEvaluation";

export default function EmployeePerformanceRouting() {
  return (
    <Routes>
      <Route path="/criteria" element={<EmployeePerformanceCriteria />} />

      <Route path="/evaluation" element={<EmployeePerformanceEvaluation />} />
    </Routes>
  );
}
