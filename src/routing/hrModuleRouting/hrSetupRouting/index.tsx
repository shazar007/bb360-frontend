import { Routes, Route } from "react-router-dom";

import { employeeRoutes } from "./employees";
import { workCalendarRoutes } from "./workCalendar";
import { defineEmployeeSalaryRoutes } from "./defineEmployeeSalary";

import EmployeeTypes from "../../../pages/hrModule/hrSetup/employeeTypes";
import EmployeeGrades from "../../../pages/hrModule/hrSetup/employeeGrades";
import EmployeeJobs from "../../../pages/hrModule/hrSetup/employeeJobs";
import EmployeeDesignation from "../../../pages/hrModule/hrSetup/employeeDesignation";

export default function HrSetupRouting() {
  return (
    <Routes>
      {employeeRoutes}
      {workCalendarRoutes}
      {defineEmployeeSalaryRoutes}
      <Route path="/employee-types" element={<EmployeeTypes />} />
      <Route path="/employee-grades" element={<EmployeeGrades />} />
      <Route path="/employee-jobs" element={<EmployeeJobs />} />
      <Route path="/employee-designation" element={<EmployeeDesignation />} />
    </Routes>
  );
}
