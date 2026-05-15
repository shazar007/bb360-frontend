import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HrSetupRouting from "./hrSetupRouting";
import EmployeePerformanceRouting from "./employeePerformanceRouting";
import EmployeeLeaveExpenseRouting from "./employeeLeaveExpenseRouting";
import AttendanceSetupRouting from "./attendanceSetupRouting";
import HrAttendanceRouting from "./hrAttendanceRouting";
import EmployeeAttendanceReportsRouting from "./employeeAttendanceReportsRouting";
import PayrollSetupRouting from "./payrollSetupRouting";
import PayrollProcessRouting from "./payrollProcessRouting";
import EmployeePayrollReportsRouting from "./employeePayrollReportsRouting";
import EmployeeReportsRouting from "./employeeReportsRouting";

export default function HrModuleRouting() {
  useEffect(() => {
    document.title = "HR Module — BB-360";
  }, []);

  return (
    <Routes>
      <Route path="/hr-setup/*" element={<HrSetupRouting />} />

      <Route
        path="/employee-performance/*"
        element={<EmployeePerformanceRouting />}
      />

      <Route
        path="/employee-leave-expense/*"
        element={<EmployeeLeaveExpenseRouting />}
      />

      <Route path="/attendance-setup/*" element={<AttendanceSetupRouting />} />

      <Route path="/hr-attendance/*" element={<HrAttendanceRouting />} />

      <Route
        path="/employee-attendance-reports/*"
        element={<EmployeeAttendanceReportsRouting />}
      />

      <Route path="/payroll-setup/*" element={<PayrollSetupRouting />} />
      <Route path="/payroll-process/*" element={<PayrollProcessRouting />} />
      <Route
        path="/employee-payroll-reports/*"
        element={<EmployeePayrollReportsRouting />}
      />

      <Route path="/employee-reports/*" element={<EmployeeReportsRouting />} />
    </Routes>
  );
}
