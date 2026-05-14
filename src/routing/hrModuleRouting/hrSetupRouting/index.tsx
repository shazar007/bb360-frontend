// hrSetupRouting/index.tsx

import { Routes, Route } from "react-router-dom";

import { employeeRoutes } from "./employees";
import { workCalendarRoutes } from "./workCalendar";
import { defineEmployeeSalaryRoutes } from "./defineEmployeeSalary";
import { employeeTypeRoutes } from "./employeeType";
import { employeeGradesRoutes } from "./employeeGrades";
import { employeeJobsRoutes } from "./employeeJobs";
import { employeeDesignationRoutes } from "./employeeDesignation";

export default function HrSetupRouting() {
  return (
    <Routes>
      {employeeRoutes}
      {workCalendarRoutes}
      {defineEmployeeSalaryRoutes}
      {employeeTypeRoutes}
      {employeeGradesRoutes}
      {employeeJobsRoutes}
      {employeeDesignationRoutes}
    </Routes>
  );
}
