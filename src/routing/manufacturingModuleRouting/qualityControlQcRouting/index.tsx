import { Route, Routes } from "react-router-dom";

import SamplingOperations from "../../../pages/manufacturingModule/qualityControlQc/samplingOperations";
import QcLabTestingSuite from "../../../pages/manufacturingModule/qualityControlQc/qcLabTestingSuite";
import QcReviewAndRelease from "../../../pages/manufacturingModule/qualityControlQc/qcReviewAndRelease";

export default function QualityControlQcRouting() {
  return (
    <Routes>
      <Route path="/sampling-operations" element={<SamplingOperations />} />

      <Route path="/qc-lab-testing-suite" element={<QcLabTestingSuite />} />

      <Route path="/qc-review-and-release" element={<QcReviewAndRelease />} />
    </Routes>
  );
}
