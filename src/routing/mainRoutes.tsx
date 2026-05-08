import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "../components/topBar";
import DashBoard360 from "../pages/dashBoards/360DashBoard";
import PurchaseModuleRouting from "./purchaseModuleRouting";
import ApplicationSetupRouting from "./applicationSetupRouting";
import SaleModuleRouting from "./saleModuleRouting";
import ProtectedRoute from "./protectedRoutes";
import FinancialModuleRouting from "./financialModuleRouting";
import InventoryRouting from "./inventoryRouting";
import HrModuleRouting from "./hrModuleRouting";
function MainRoutes() {
  return (
    <div className="flex flex-col w-full h-screen p-5 md:p-8 bg-bgprimary">
      <div className="shrink-0">
        <TopBar />
      </div>
      <div
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex-1 overflow-y-auto "
      >
        <Routes>
          <Route path="/" element={<Navigate to="/360-dashboard" replace />} />
          <Route
            path="/360-dashboard"
            element={
              <ProtectedRoute>
                <DashBoard360 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/application-setup/*"
            element={
              <ProtectedRoute>
                <ApplicationSetupRouting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-module/*"
            element={
              <ProtectedRoute>
                <PurchaseModuleRouting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sale-module/*"
            element={
              <ProtectedRoute>
                <SaleModuleRouting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/financial-module/*"
            element={
              <ProtectedRoute>
                <FinancialModuleRouting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory/*"
            element={
              <ProtectedRoute>
                <InventoryRouting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr-module/*"
            element={
              <ProtectedRoute>
                <HrModuleRouting />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default MainRoutes;
