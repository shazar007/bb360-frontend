import { Route } from "react-router-dom";

import WorkCalendar from "../../../../pages/hrModule/hrSetup/workCalendar";
import WorkCalendarCreate from "../../../../pages/hrModule/hrSetup/workCalendar/workCalendarCreate";

export const workCalendarRoutes = (
  <>
    <Route path="/work-calendar" element={<WorkCalendar />} />

    <Route path="/work-calendar/create" element={<WorkCalendarCreate />} />
  </>
);
