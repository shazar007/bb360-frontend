import { Route, Routes } from "react-router-dom";
import DistributorInvoice from "../../../pages/saleModule/sales/salesInvoice";
import CreateDistributorInvoice from "../../../pages/saleModule/sales/salesInvoice/createsalesInvoice";
import DeliveryChallan from "../../../pages/saleModule/sales/deliveryChallan";
import CreateDeliveryChallan from "../../../pages/saleModule/sales/deliveryChallan/createDeliveryChallan";

import SalesReturn from "../../../pages/saleModule/sales/salesReturn";
import CreateSalesReturn from "../../../pages/saleModule/sales/salesReturn/createSalesReturn";
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

      <Route path="/sales-return" element={<SalesReturn />} />
      <Route path="/sales-return/create" element={<CreateSalesReturn />} />
    </Routes>
  );
}
