import { Route, Routes } from "react-router-dom";
import DistributorUpload from "../../../pages/applicationSetup/distributionSetup/distributorUpload";
import DistributorUpdate from "../../../pages/applicationSetup/distributionSetup/distributorUpdate";

export default function DistributionSetupRoutes() {
  return (
    <Routes>
      <Route path="/distributor-upload" element={<DistributorUpload />} />
      <Route path="/distributor-update" element={<DistributorUpdate />} />
    </Routes>
  );
}
