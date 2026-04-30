import { Route, Routes } from "react-router-dom";
import InventoryAdjustment from "../../pages/inventory/inventoryAdjustment";
import InventoryTransfer from "../../pages/inventory/inventoryTransfer";
import TransferOrders from "../../pages/inventory/transferOrders";
import StockTaking from "../../pages/inventory/stockTaking";
import MaterialReturnNote from "../../pages/inventory/materialReturnNote";
import MaterialIssueNote from "../../pages/inventory/materialIssueNote";

export default function InventoryRouting() {
  return (
    <Routes>
      <Route path="/inventory-adjustment" element={<InventoryAdjustment />} />
      <Route path="/inventory-transfer" element={<InventoryTransfer />} />
      <Route path="/material-issue-note" element={<MaterialIssueNote />} />
      <Route path="/transfer-orders" element={<TransferOrders />} />
      <Route path="/stock-taking" element={<StockTaking />} />
      <Route path="/material-return-note" element={<MaterialReturnNote />} />
    </Routes>
  );
}
