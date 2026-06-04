import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import MaterialReturnNote from "../../pages/inventory/materialReturnNote";
import MaterialIssueNote from "../../pages/inventory/materialIssueNote";
import MaterialIssueNoteCreate from "../../pages/inventory/materialIssueNote/materialIssueNoteCreate";
import MaterialReturnNoteCreate from "../../pages/inventory/materialReturnNote/materialReturnNoteCreate";

import MasterDataRouting from "./masterDataRouting";
import PlanningAndSchedulingRouting from "./planningAndSchedulingRouting";
import WarehouseControlsRouting from "./warehouseControlsRouting";
import ProductionExecutionRouting from "./productionExecutionRouting";
import QualityControlQcRouting from "./qualityControlQcRouting";
import QualityAssuranceQaRouting from "./qualityAssuranceQaRouting";
import TraceabilityAndComplianceRouting from "./traceabilityAndComplianceRouting";
import ReportsCenterRouting from "./reportsCenterRouting";
import AdministrationAndSettingsRouting from "./administrationAndSettingsRouting";

export default function ManufacturingRouting() {
  useEffect(() => {
    document.title = "Manufacturing Module — BB-360";
  }, []);

  return (
    <Routes>
      <Route
        path="/material-movement/material-issue-note"
        element={<MaterialIssueNote />}
      />

      <Route
        path="/material-movement/material-issue-note/create"
        element={<MaterialIssueNoteCreate />}
      />

      <Route
        path="/material-movement/material-return-note"
        element={<MaterialReturnNote />}
      />

      <Route
        path="/material-movement/material-return-note/create"
        element={<MaterialReturnNoteCreate />}
      />

      <Route path="/manufacturing-setup/*" element={<MasterDataRouting />} />

      <Route
        path="/planning-and-scheduling/*"
        element={<PlanningAndSchedulingRouting />}
      />

      <Route
        path="/warehouse-controls/*"
        element={<WarehouseControlsRouting />}
      />

      <Route
        path="/production-execution/*"
        element={<ProductionExecutionRouting />}
      />

      <Route
        path="/quality-control-qc/*"
        element={<QualityControlQcRouting />}
      />

      <Route
        path="/quality-assurance-qa/*"
        element={<QualityAssuranceQaRouting />}
      />

      <Route
        path="/traceability-and-compliance/*"
        element={<TraceabilityAndComplianceRouting />}
      />

      <Route path="/reports-center/*" element={<ReportsCenterRouting />} />

      <Route
        path="/administration-and-settings/*"
        element={<AdministrationAndSettingsRouting />}
      />
    </Routes>
  );
}
