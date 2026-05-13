// hrSetupRouting/employees/index.tsx

import { Route } from "react-router-dom";

import Employees from "../../../../pages/hrModule/hrSetup/employees";
import EmployeesCreate from "../../../../pages/hrModule/hrSetup/employees/employeesCreate";
import EmployeeUpload from "../../../../pages/hrModule/hrSetup/employees/employeeUpload";

export const employeeRoutes = (
  <>
    <Route path="/employees" element={<Employees />} />
    <Route path="/employees/create" element={<EmployeesCreate />} />
    <Route path="/employees/upload" element={<EmployeeUpload />} />
  </>
);
