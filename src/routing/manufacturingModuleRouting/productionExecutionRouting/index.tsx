import { Route, Routes } from "react-router-dom";

import BatchExecution from "../../../pages/manufacturingModule/productionExecution/batchExecution";
import ElectronicBatchRecordEbmr from "../../../pages/manufacturingModule/productionExecution/electronicBatchRecordEbmr";
import YieldReconciliation from "../../../pages/manufacturingModule/productionExecution/yieldReconciliation";

export default function ProductionExecutionRouting() {
  return (
    <Routes>
      <Route path="/batch-execution" element={<BatchExecution />} />

      <Route
        path="/electronic-batch-record-ebmr"
        element={<ElectronicBatchRecordEbmr />}
      />

      <Route path="/yield-reconciliation" element={<YieldReconciliation />} />
    </Routes>
  );
}
