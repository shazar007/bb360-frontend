import { Route, Routes } from "react-router-dom";

import OperationalReportsSubmenu from "../../../pages/manufacturingModule/reportsCenter/operationalReportsSubmenu";
import GmpComplianceReportsSubmenu from "../../../pages/manufacturingModule/reportsCenter/gmpComplianceReportsSubmenu";
import QaTrendsReportsSubmenu from "../../../pages/manufacturingModule/reportsCenter/qaTrendsReportsSubmenu";

export default function ReportsCenterRouting() {
  return (
    <Routes>
      <Route
        path="/operational-reports-submenu"
        element={<OperationalReportsSubmenu />}
      />

      <Route
        path="/gmp-compliance-reports-submenu"
        element={<GmpComplianceReportsSubmenu />}
      />

      <Route
        path="/qa-trends-reports-submenu"
        element={<QaTrendsReportsSubmenu />}
      />
    </Routes>
  );
}
