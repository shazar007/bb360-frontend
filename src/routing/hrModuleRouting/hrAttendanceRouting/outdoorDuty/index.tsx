import { Route } from "react-router-dom";

import OutdoorDuty from "../../../../pages/hrModule/hrAttendance/outdoorDuty";
import OutdoorDutyCreate from "../../../../pages/hrModule/hrAttendance/outdoorDuty/outdoorDutyCreater";

export const outdoorDutyRoutes = (
  <>
    <Route path="/outdoor-duty" element={<OutdoorDuty />} />

    <Route path="/outdoor-duty/create" element={<OutdoorDutyCreate />} />
  </>
);
