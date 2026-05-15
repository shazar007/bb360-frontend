import { Route, Routes } from "react-router-dom";

import EmployeeLeaveApplication from "../../../pages/hrModule/employeeLeaveExpense/employeeLeaveApplication";
import CplLeaveApproval from "../../../pages/hrModule/employeeLeaveExpense/cplLeaveApproval";
import EmployeeExpenseClaim from "../../../pages/hrModule/employeeLeaveExpense/employeeExpenseClaim";

export default function EmployeeLeaveExpenseRouting() {
  return (
    <Routes>
      <Route path="/leave-application" element={<EmployeeLeaveApplication />} />

      <Route path="/cpl-leave-approval" element={<CplLeaveApproval />} />

      <Route path="/expense-claim" element={<EmployeeExpenseClaim />} />
    </Routes>
  );
}
