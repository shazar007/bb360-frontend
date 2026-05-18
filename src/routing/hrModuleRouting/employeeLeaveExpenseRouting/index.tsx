import { Route, Routes } from "react-router-dom";

import { employeeLeaveApplicationRoutes } from "./employeeLeaveApplication";
import CplLeaveApproval from "../../../pages/hrModule/employeeLeaveExpense/cplLeaveApproval";
import { employeeExpenseClaimRoutes } from "./employeeExpenseClaim";

export default function EmployeeLeaveExpenseRouting() {
  return (
    <Routes>
      {employeeLeaveApplicationRoutes}

      <Route path="/cpl-leave-approval" element={<CplLeaveApproval />} />

      {employeeExpenseClaimRoutes}
    </Routes>
  );
}
