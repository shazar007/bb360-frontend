import { Route, Routes } from "react-router-dom";

import DefineAttendanceHolidays from "../../../pages/hrModule/attendanceSetup/defineAttendanceHolidays";
import DefineAttendanceHolidaysCreate from "../../../pages/hrModule/attendanceSetup/defineAttendanceHolidays/defineAttendanceHolidaysCreate";

export default function AttendanceSetupRouting() {
  return (
    <Routes>
      <Route
        path="/define-attendance-holidays"
        element={<DefineAttendanceHolidays />}
      />
      <Route
        path="/define-attendance-holidays/create"
        element={<DefineAttendanceHolidaysCreate />}
      />
    </Routes>
  );
}
