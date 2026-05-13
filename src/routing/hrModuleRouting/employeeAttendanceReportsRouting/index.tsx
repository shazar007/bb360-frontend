import { Route, Routes } from "react-router-dom";

import TimeAttendanceSummary from "../../../pages/hrModule/employeeAttendanceReports/timeAttendanceSummary";
import EmployeeAttendanceRegister from "../../../pages/hrModule/employeeAttendanceReports/employeeAttendanceRegister";
import EmployeeRegisterDetailReport from "../../../pages/hrModule/employeeAttendanceReports/employeeRegisterDetailReport";
import EmployeeOvertimeReport from "../../../pages/hrModule/employeeAttendanceReports/employeeOvertimeReport";

export default function EmployeeAttendanceReportsRouting() {
  return (
    <Routes>
      <Route
        path="/time-attendance-summary"
        element={<TimeAttendanceSummary />}
      />

      <Route
        path="/employee-attendance-register"
        element={<EmployeeAttendanceRegister />}
      />

      <Route
        path="/employee-register-detail-report"
        element={<EmployeeRegisterDetailReport />}
      />

      <Route
        path="/employee-overtime-report"
        element={<EmployeeOvertimeReport />}
      />
    </Routes>
  );
}
