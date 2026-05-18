import { Route } from "react-router-dom";

import EmployeeExpenseClaim from "../../../../pages/hrModule/employeeLeaveExpense/employeeExpenseClaim";
import EmployeeExpenseClaimCreate from "../../../../pages/hrModule/employeeLeaveExpense/employeeExpenseClaim/employeeExpenseClaimCreate";

export const employeeExpenseClaimRoutes = (
  <>
    <Route path="/expense-claim" element={<EmployeeExpenseClaim />} />

    <Route
      path="/expense-claim/create"
      element={<EmployeeExpenseClaimCreate />}
    />
  </>
);
