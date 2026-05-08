import { Route, Routes } from "react-router-dom";
import PurchaseQuotation from "../../../pages/purchaseModule/procurement/purchaseQuotation";
import RFQ from "../../../pages/purchaseModule/procurement/RFQ";
import RequisitionProcurement from "../../../pages/purchaseModule/procurement/requisitionforProcurement";
import Requisition from "../../../pages/purchaseModule/procurement/requisition";
import CreateQuotation from "../../../pages/purchaseModule/procurement/purchaseQuotation/createQuotation";
import CreateRequisition from "../../../pages/purchaseModule/procurement/requisition/createRequisition";
import CreateReqProcurememt from "../../../pages/purchaseModule/procurement/requisitionforProcurement/createReqProcurememt";
import CreateRFQ from "../../../pages/purchaseModule/procurement/RFQ/createRFQ";

export default function ProcurementRouting() {
  return (
    <Routes>
      <Route path="/requisition" element={<Requisition />} />
      <Route
        path="/requisition/create-requisition"
        element={<CreateRequisition />}
      />
      <Route
        path="/requisition-procurement"
        element={<RequisitionProcurement />}
      />
      <Route
        path="/requisition-procurement/create-procurememt"
        element={<CreateReqProcurememt />}
      />
      <Route path="/rfq" element={<RFQ />} />
      <Route path="/rfq/create" element={<CreateRFQ />} />

      <Route path="/purchase-quotation" element={<PurchaseQuotation />} />
      <Route path="/create-quotation" element={<CreateQuotation />} />
    </Routes>
  );
}
