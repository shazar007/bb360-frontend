import { Route, Routes } from "react-router-dom";
import VenderDefine from "./vendorDefineRouting";
import ProcurementRouting from "./procurementRouting";
import PurchaseRouting from "./purchaseRouting";
import PayableRouting from "./payableRouting";
import { useEffect } from "react";

export default function PurchaseModuleRouting() {
  useEffect(() => {
    document.title = "Purchase Module — BB-360";
  }, []);
  return (
    <Routes>
      <Route path="vender-define/*" element={<VenderDefine />} />
      <Route path="procurement/*" element={<ProcurementRouting />} />
      <Route path="purchase/*" element={<PurchaseRouting />} />
      <Route path="payable/*" element={<PayableRouting />} />
    </Routes>
  );
}
