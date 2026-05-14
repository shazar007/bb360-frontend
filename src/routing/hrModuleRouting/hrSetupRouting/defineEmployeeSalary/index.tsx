import { Route } from "react-router-dom";
import DefineEmployeeSalary from "../../../../pages/hrModule/hrSetup/defineEmployeeSalary";
import DefineEmployeeSalaryCreate from "../../../../pages/hrModule/hrSetup/defineEmployeeSalary/defineEmployeeSalaryCreate";
import DefineEmployeeSalaryUpload from "../../../../pages/hrModule/hrSetup/defineEmployeeSalary/defineEmployeeSalaryUpload";
export const defineEmployeeSalaryRoutes = (
  <>
    <Route path="/define-employee-salary" element={<DefineEmployeeSalary />} />

    <Route
      path="/define-employee-salary/create"
      element={<DefineEmployeeSalaryCreate />}
    />

    <Route
      path="/define-employee-salary/upload"
      element={<DefineEmployeeSalaryUpload />}
    />
  </>
);
