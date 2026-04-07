import { Route, Routes } from "react-router-dom";
import VenderDefine from "./vendorDefineRouting";
import ProcurementRouting from "./procurementRouting";
import PurchaseRouting from "./purchaseRouting";
import PayableRouting from "./payableRouting";

export default function PurchaseModuleRouting() {
  return (
    <Routes>
      <Route path="vender-define/*" element={<VenderDefine />} />
      <Route path="procurement/*" element={<ProcurementRouting />} />
      <Route path="purchase/*" element={<PurchaseRouting />} />
      <Route path="payable/*" element={<PayableRouting />} />
    </Routes>
  );
}
