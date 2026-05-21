import { Route, Routes } from "react-router-dom";

import HrPayrollDashboard from "../../../pages/hrModule/hrAttendance/hrPayrollDashboard";
import TimeAttendanceMachineData from "../../../pages/hrModule/hrAttendance/timeAttendanceMachineData";
import TimeAttendanceRegister from "../../../pages/hrModule/hrAttendance/timeAttendanceRegister";
import AccrualPlanBalances from "../../../pages/hrModule/hrAttendance/accrualPlanBalances";
import OvertimeApproval from "../../../pages/hrModule/hrAttendance/overtimeApproval";
import { outdoorDutyRoutes } from "./outdoorDuty";
import LateDeduction from "../../../pages/hrModule/hrAttendance/lateDeduction";

export default function HrAttendanceRouting() {
  return (
    <Routes>
      <Route path="/hr-payroll-dashboard" element={<HrPayrollDashboard />} />

      <Route
        path="/time-attendance-machine-data"
        element={<TimeAttendanceMachineData />}
      />

      <Route
        path="/time-attendance-register"
        element={<TimeAttendanceRegister />}
      />

      <Route path="/accrual-plan-balances" element={<AccrualPlanBalances />} />

      <Route path="/overtime-approval" element={<OvertimeApproval />} />

      {outdoorDutyRoutes}
      <Route path="/late-deduction" element={<LateDeduction />} />
    </Routes>
  );
}
