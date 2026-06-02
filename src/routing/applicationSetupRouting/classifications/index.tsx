import { Route, Routes } from "react-router-dom";
import CreateDeparttment from "../../../pages/applicationSetup/classification/departments/createDeparttment";
import Departments from "../../../pages/applicationSetup/classification/departments";
import JobLocations from "../../../pages/applicationSetup/classification/jobLocations";

export default function ClassificationRoutes() {
  return (
    <Routes>
      <Route path="/departments" element={<Departments />} />
      <Route path="/departments/create" element={<CreateDeparttment />} />
      <Route path="/job-locations" element={<JobLocations />} />
    </Routes>
  );
}
