import { Route, Routes } from "react-router-dom";
import DataUploadRouting from "./dataUploadRouting";
import DistributionSetupRoutes from "./distributionSetupRoutes";
import VendorDefineRouting from "./vendorDefineRouting";
import { useEffect } from "react";
import ClassificationRoutes from "./classifications";
export default function ApplicationSetupRouting() {
  useEffect(() => {
    document.title = "Application Setup — BB-360";
  }, []);
  return (
    <Routes>
      <Route path="/data-upload/*" element={<DataUploadRouting />} />
      <Route
        path="/distribution-setup/*"
        element={<DistributionSetupRoutes />}
      />
      <Route path="/vendor-define/*" element={<VendorDefineRouting />} />
      <Route path="/classification/*" element={<ClassificationRoutes />} />
    </Routes>
  );
}
