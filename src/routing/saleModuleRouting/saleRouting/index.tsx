import { Route, Routes } from "react-router-dom";
import DistributorInvoice from "../../../pages/saleModule/sales/distributorInvioce";
import CreateDistributorInvoice from "../../../pages/saleModule/sales/distributorInvioce/createDistributorInvoice";

export default function SaleRouting() {
  return (
    <Routes>
      <Route path="/distributor-invoice" element={<DistributorInvoice />} />
      <Route
        path="/distributor-invoice/create"
        element={<CreateDistributorInvoice />}
      />
    </Routes>
  );
}
