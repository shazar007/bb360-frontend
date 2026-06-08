import { Route, Routes } from "react-router-dom";

import DemandPlanning from "../../../pages/manufacturingModule/planningAndScheduling/demandPlanning";
import MrpPlanning from "../../../pages/manufacturingModule/planningAndScheduling/mrpPlanning";

import BatchPlanning from "../../../pages/manufacturingModule/planningAndScheduling/batchPlanning";
import BatchPlanningCreate from "../../../pages/manufacturingModule/planningAndScheduling/batchPlanning/batchPlanningCreate";

import WorkOrders from "../../../pages/manufacturingModule/planningAndScheduling/workOrders";
import DemanPlanningDetails from "../../../pages/manufacturingModule/planningAndScheduling/demandPlanning/demanPlanningDetails";

export default function PlanningAndSchedulingRouting() {
  return (
    <Routes>
      <Route path="/demand-planning" element={<DemandPlanning />} />
      <Route
        path="/demand-planning/create"
        element={<DemanPlanningDetails />}
      />

      <Route path="/mrp-planning" element={<MrpPlanning />} />

      <Route path="/batch-planning" element={<BatchPlanning />} />
      <Route path="/batch-planning/create" element={<BatchPlanningCreate />} />

      <Route path="/work-orders" element={<WorkOrders />} />
    </Routes>
  );
}
