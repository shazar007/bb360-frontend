import { Route, Routes } from "react-router-dom";
import InventoryAdjustment from "../../pages/inventory/inventoryAdjustment";
import InventoryTransfer from "../../pages/inventory/inventoryTransfer";
import TransferOrders from "../../pages/inventory/transferOrders";
import StockTaking from "../../pages/inventory/stockTaking";
import MaterialReturnNote from "../../pages/inventory/materialReturnNote";
import MaterialIssueNote from "../../pages/inventory/materialIssueNote";
import InventoryAdjustmentCreate from "../../pages/inventory/inventoryAdjustment/inventoryAdjustmentCreate";
import InventoryTransferCreate from "../../pages/inventory/inventoryTransfer/inventoryTransferCreate";
import MaterialIssueNoteCreate from "../../pages/inventory/materialIssueNote/materialIssueNoteCreate";
import MaterialReturnNoteCreate from "../../pages/inventory/materialReturnNote/materialReturnNoteCreate";
import { useEffect } from "react";

export default function InventoryRouting() {
  useEffect(() => {
    document.title = "Inventory — BB-360";
  }, []);
  return (
    <Routes>
      <Route path="/inventory-adjustment" element={<InventoryAdjustment />} />
      <Route
        path="/inventory-adjustment/create"
        element={<InventoryAdjustmentCreate />}
      />{" "}
      <Route path="/inventory-transfer" element={<InventoryTransfer />} />
      <Route
        path="/inventory-transfer/create"
        element={<InventoryTransferCreate />}
      />
      <Route path="/material-issue-note" element={<MaterialIssueNote />} />
      <Route
        path="/material-issue-note/create"
        element={<MaterialIssueNoteCreate />}
      />
      <Route
        path="/material-issue-note/create"
        element={<MaterialIssueNoteCreate />}
      />
      <Route path="/material-return-note" element={<MaterialReturnNote />} />
      <Route
        path="/material-return-note/create"
        element={<MaterialReturnNoteCreate />}
      />
      <Route path="/transfer-orders" element={<TransferOrders />} />
      <Route
        path="/material-return-note/create"
        element={<MaterialReturnNoteCreate />}
      />
      <Route path="/stock-taking" element={<StockTaking />} />
    </Routes>
  );
}
