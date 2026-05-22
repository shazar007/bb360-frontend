import { Route, Routes } from "react-router-dom";

import BatchGenealogy from "../../../pages/manufacturingModule/traceabilityAndCompliance/batchGenealogy";
import ProductRecallManagement from "../../../pages/manufacturingModule/traceabilityAndCompliance/productRecallManagement";
import SopControlHub from "../../../pages/manufacturingModule/traceabilityAndCompliance/sopControlHub";
import ESignaturesRegistry from "../../../pages/manufacturingModule/traceabilityAndCompliance/eSignaturesRegistry";
import ValidationProtocols from "../../../pages/manufacturingModule/traceabilityAndCompliance/validationProtocols";

export default function TraceabilityAndComplianceRouting() {
  return (
    <Routes>
      <Route path="/batch-genealogy" element={<BatchGenealogy />} />

      <Route
        path="/product-recall-management"
        element={<ProductRecallManagement />}
      />

      <Route path="/sop-control-hub" element={<SopControlHub />} />

      <Route path="/e-signatures-registry" element={<ESignaturesRegistry />} />

      <Route path="/validation-protocols" element={<ValidationProtocols />} />
    </Routes>
  );
}
