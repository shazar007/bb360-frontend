import { Route, Routes } from "react-router-dom";

import DefineAttendanceHolidays from "../../../pages/hrModule/attendanceSetup/defineAttendanceHolidays";

export default function AttendanceSetupRouting() {
  return (
    <Routes>
      <Route
        path="/define-attendance-holidays"
        element={<DefineAttendanceHolidays />}
      />
    </Routes>
  );
}
