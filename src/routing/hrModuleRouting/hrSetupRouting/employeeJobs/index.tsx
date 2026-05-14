import { Route } from "react-router-dom";

import EmployeeJobs from "../../../../pages/hrModule/hrSetup/employeeJobs";
import EmployeeJobsCreate from "../../../../pages/hrModule/hrSetup/employeeJobs/employeeJobsCreate";

export const employeeJobsRoutes = (
  <>
    <Route path="/employee-jobs" element={<EmployeeJobs />} />

    <Route path="/employee-jobs/create" element={<EmployeeJobsCreate />} />
  </>
);
