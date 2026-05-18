import { Route, Routes } from "react-router-dom";

import { employeeLeaveApplicationRoutes } from "./employeeLeaveApplication";
import CplLeaveApproval from "../../../pages/hrModule/employeeLeaveExpense/cplLeaveApproval";
import { employeeExpenseClaimRoutes } from "./employeeExpenseClaim";
import CreateCPL from "../../../pages/hrModule/employeeLeaveExpense/cplLeaveApproval/createCPL";

export default function EmployeeLeaveExpenseRouting() {
  return (
    <Routes>
      {employeeLeaveApplicationRoutes}
      <Route path="/cpl-approval" element={<CplLeaveApproval />} />
      <Route path="/cpl-approval/create" element={<CreateCPL />} />

      {employeeExpenseClaimRoutes}
    </Routes>
  );
}
