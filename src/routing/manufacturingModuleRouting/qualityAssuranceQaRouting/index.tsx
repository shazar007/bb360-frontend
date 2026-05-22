import { Route, Routes } from "react-router-dom";

import BatchReleaseControl from "../../../pages/manufacturingModule/qualityAssuranceQa/batchReleaseControl";
import DeviationsLog from "../../../pages/manufacturingModule/qualityAssuranceQa/deviationsLog";
import CapaManagement from "../../../pages/manufacturingModule/qualityAssuranceQa/capaManagement";
import ChangeControlVault from "../../../pages/manufacturingModule/qualityAssuranceQa/changeControlVault";

export default function QualityAssuranceQaRouting() {
  return (
    <Routes>
      <Route path="/batch-release-control" element={<BatchReleaseControl />} />

      <Route path="/deviations-log" element={<DeviationsLog />} />

      <Route path="/capa-management" element={<CapaManagement />} />

      <Route path="/change-control-vault" element={<ChangeControlVault />} />
    </Routes>
  );
}
