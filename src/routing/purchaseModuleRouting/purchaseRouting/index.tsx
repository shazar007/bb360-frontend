import { Route, Routes } from "react-router-dom";
import PurchaseOrder from "../../../pages/purchaseModule/purchase/purchaseOrder";
import PendingReceiveOrdersList from "../../../pages/purchaseModule/purchase/pendingReceiveOrdersList";
import GenerateConsolidateVendorBill from "../../../pages/purchaseModule/purchase/generateConsolidateVendorBill";
import CreateBill from "../../../pages/purchaseModule/purchase/generateConsolidateVendorBill/createBill";
import CreateReceipt from "../../../pages/purchaseModule/purchase/receivingChallan/createReceivingChallan";
import CreateContract from "../../../pages/purchaseModule/purchase/purchaseContract/createContract";
import PurchaseContract from "../../../pages/purchaseModule/purchase/purchaseContract";
import CreatePurchaseOrder from "../../../pages/purchaseModule/purchase/purchaseOrder/createPurchaseOrder";
import ReceivingChallan from "../../../pages/purchaseModule/purchase/receivingChallan";
import CreateReceivingChallan from "../../../pages/purchaseModule/purchase/receivingChallan/createReceivingChallan";
import OrderDetails from "../../../pages/purchaseModule/purchase/purchaseOrder/orderDetails";

export default function PurchaseRouting() {
  return (
    <Routes>
      <Route path="/purchase-order" element={<PurchaseOrder />} />
      <Route
        path="/purchase-order/create-order"
        element={<CreatePurchaseOrder />}
      />
      <Route path="/purchase-order/detail" element={<OrderDetails />} />
      <Route path="/purchase-contract" element={<PurchaseContract />} />
      <Route
        path="/purchase-contract/create-contract"
        element={<CreateContract />}
      />
      <Route
        path="/pending-receive-orders-list"
        element={<PendingReceiveOrdersList />}
      />
      <Route path="/receiving-challan" element={<ReceivingChallan />} />
      <Route
        path="/receiving-challan/create"
        element={<CreateReceivingChallan />}
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
