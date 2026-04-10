import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "../components/topBar";
import DashBoard360 from "../pages/dashBoards/360DashBoard";
import PurchaseModuleRouting from "./purchaseModuleRouting";
import ApplicationSetupRouting from "./applicationSetupRouting";
import SaleModuleRouting from "./saleModuleRouting";

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
          {/* Dashboard */}
          <Route path="/" element={<Navigate to="/360-dashboard" replace />} />
          <Route path="/360-dashboard" element={<DashBoard360 />} />
          {/* Purchase Module */}
          <Route
            path="/application-setup/*"
            element={<ApplicationSetupRouting />}
          />
          {/* Purchase Module */}
          <Route
            path="/purchase-module/*"
            element={<PurchaseModuleRouting />}
          />
          <Route path="/sale-module/*" element={<SaleModuleRouting />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainRoutes;
