import { Route, Routes } from "react-router-dom";

import DepartmentWiseEmployeeSummary from "../../../pages/hrModule/employeeReports/departmentWiseEmployeeSummary";
import EmployeeCard from "../../../pages/hrModule/employeeReports/employeeCard";
import UploadedDocumentsStatus from "../../../pages/hrModule/employeeReports/uploadedDocumentsStatus";
import ProvidentFundContributionReport from "../../../pages/hrModule/employeeReports/providentFundContributionReport";
import DepartmentWiseAttendance from "../../../pages/hrModule/employeeReports/departmentWiseAttendance";
import DailyAttendanceRegister from "../../../pages/hrModule/employeeReports/dailyAttendanceRegister";
import EmployeeLateArrivalReport from "../../../pages/hrModule/employeeReports/employeeLateArrivalReport";
import SalaryIncrementReport from "../../../pages/hrModule/employeeReports/salaryIncrementReport";

export default function EmployeeReportsRouting() {
  return (
    <Routes>
      <Route
        path="/department-wise-employee-summary"
        element={<DepartmentWiseEmployeeSummary />}
      />

      <Route path="/employee-card" element={<EmployeeCard />} />

      <Route
        path="/uploaded-documents-status"
        element={<UploadedDocumentsStatus />}
      />

      <Route
        path="/provident-fund-contribution-report"
        element={<ProvidentFundContributionReport />}
      />

      <Route
        path="/department-wise-attendance"
        element={<DepartmentWiseAttendance />}
      />

      <Route
        path="/daily-attendance-register"
        element={<DailyAttendanceRegister />}
      />

      <Route
        path="/employee-late-arrival-report"
        element={<EmployeeLateArrivalReport />}
      />

      <Route
        path="/salary-increment-report"
        element={<SalaryIncrementReport />}
      />
    </Routes>
  );
}
