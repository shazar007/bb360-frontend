import { Route, Routes } from "react-router-dom";
import DistributorInvoice from "../../../pages/saleModule/sales/distributorInvioce";
import CreateDistributorInvoice from "../../../pages/saleModule/sales/distributorInvioce/createDistributorInvoice";
import DeliveryChallan from "../../../pages/saleModule/sales/deliveryChallan";
import CreateDeliveryChallan from "../../../pages/saleModule/sales/deliveryChallan/createDeliveryChallan"; 

export default function SaleRouting() {
  return (
    <Routes>
      <Route path="/distributor-invoice" element={<DistributorInvoice />} />
      <Route
        path="/distributor-invoice/create"
        element={<CreateDistributorInvoice />}
      />

      <Route path="/delivery-challan" element={<DeliveryChallan />} />

     
      <Route
        path="/delivery-challan/create"
        element={<CreateDeliveryChallan />}
      />
    </Routes>
  );
}