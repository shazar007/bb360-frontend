import { Route, Routes } from "react-router-dom";
import CreateDeparttment from "../../../pages/applicationSetup/classification/departments/createDeparttment";
import Departments from "../../../pages/applicationSetup/classification/departments";

export default function ClassificationRoutes() {
  return (
    <Routes>
      <Route path="/departments" element={<Departments />} />
      <Route path="/departments/create" element={<CreateDeparttment />} />
    </Routes>
  );
}
