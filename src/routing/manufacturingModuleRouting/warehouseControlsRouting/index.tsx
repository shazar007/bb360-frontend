import { Route, Routes } from "react-router-dom";

import GoodsReceiptGrn from "../../../pages/manufacturingModule/warehouseControls/goodsReceiptGrn";
import InventoryManagement from "../../../pages/manufacturingModule/warehouseControls/inventoryManagement";
import MaterialStatusManagement from "../../../pages/manufacturingModule/warehouseControls/materialStatusManagement";
import WeighingAndDispensing from "../../../pages/manufacturingModule/warehouseControls/weighingAndDispensing";

export default function WarehouseControlsRouting() {
  return (
    <Routes>
      <Route path="/goods-receipt-grn" element={<GoodsReceiptGrn />} />

      <Route path="/inventory-management" element={<InventoryManagement />} />

      <Route
        path="/stock-status-management"
        element={<MaterialStatusManagement />}
      />

      <Route
        path="/measuring-and-dispensing"
        element={<WeighingAndDispensing />}
      />
    </Routes>
  );
}
