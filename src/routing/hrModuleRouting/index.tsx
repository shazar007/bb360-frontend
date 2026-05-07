import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Attendance from "../../pages/hrModule/attendance";
import Setting from "../../pages/hrModule/setting";
import Payroll from "../../pages/hrModule/payroll";
import Events from "../../pages/hrModule/events";
import Leaves from "../../pages/hrModule/leaves";
export default function HrModuleRouting() {
  useEffect(() => {
    document.title = "Hr Module — BB-360";
  }, []);
  return (
    <Routes>
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/leaves" element={<Leaves />} />
      <Route path="/events" element={<Events />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
}
