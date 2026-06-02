import { Route, Routes } from "react-router-dom";

import SamplingOperations from "../../../pages/manufacturingModule/qualityControlQc/samplingOperations";
import QcLabTestingSuite from "../../../pages/manufacturingModule/qualityControlQc/qcLabTestingSuite";
import QcReviewAndRelease from "../../../pages/manufacturingModule/qualityControlQc/qcReviewAndRelease";
import SamplingOperationsCreate from "../../../pages/manufacturingModule/qualityControlQc/samplingOperations/samplingOperationsCreate";
export default function QualityControlQcRouting() {
  return (
    <Routes>
      s
      <Route path="/sampling-operations" element={<SamplingOperations />} />
      <Route
        path="/sampling-operations/create"
        element={<SamplingOperationsCreate />}
      />

      <Route path="/qc-lab-testing-suite" element={<QcLabTestingSuite />} />

      <Route path="/qc-review-and-release" element={<QcReviewAndRelease />} />
    </Routes>
  );
}
