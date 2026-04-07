import { Route, Routes } from "react-router-dom";
import PurchaseOrder from "../../../pages/purchaseModule/purchase/purchaseOrder";
import PendingReceiveOrdersList from "../../../pages/purchaseModule/purchase/pendingReceiveOrdersList";
import ItemReceiptNote from "../../../pages/purchaseModule/purchase/itemReceiptNote";
import GenerateConsolidateVendorBill from "../../../pages/purchaseModule/purchase/generateConsolidateVendorBill";
import CreateBill from "../../../pages/purchaseModule/purchase/generateConsolidateVendorBill/createBill";
import CreateReceipt from "../../../pages/purchaseModule/purchase/itemReceiptNote/createReceipt";
import CreateContract from "../../../pages/purchaseModule/purchase/purchaseContract/createContract";
import PurchaseContract from "../../../pages/purchaseModule/purchase/purchaseContract";
import CreatePurchaseOrder from "../../../pages/purchaseModule/purchase/purchaseOrder/createPurchaseOrder";

export default function PurchaseRouting() {
  return (
    <Routes>
      <Route path="/purchase-order" element={<PurchaseOrder />} />
      <Route
        path="/purchase-order/create-order"
        element={<CreatePurchaseOrder />}
      />
      <Route path="/purchase-contract" element={<PurchaseContract />} />
      <Route
        path="/purchase-contract/create-contract"
        element={<CreateContract />}
      />
      <Route
        path="/pending-receive-orders-list"
        element={<PendingReceiveOrdersList />}
      />
      <Route path="/item-receipt-note" element={<ItemReceiptNote />} />
      <Route
        path="/item-receipt-note/create-receipt"
        element={<CreateReceipt />}
      />
      <Route
        path="/generate-consolidate-vendor-bill"
        element={<GenerateConsolidateVendorBill />}
      />{" "}
      <Route
        path="/generate-consolidate-vendor-bill/create-bill"
        element={<CreateBill />}
      />
    </Routes>
  );
}
