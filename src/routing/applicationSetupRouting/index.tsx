import { Route, Routes } from "react-router-dom";
import DataUploadRouting from "./dataUploadRouting";
import DistributionSetupRoutes from "./distributionSetupRoutes";
import VendorDefineRouting from "./vendorDefineRouting";

export default function ApplicationSetupRouting() {
  return (
    <Routes>
      <Route path="/data-upload/*" element={<DataUploadRouting />} />
      <Route
        path="/distribution-setup/*"
        element={<DistributionSetupRoutes />}
      />
      <Route path="/vendor-define/*" element={<VendorDefineRouting />} />
    </Routes>
  );
}
