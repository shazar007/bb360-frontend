import { Route, Routes } from "react-router-dom";
import PayBills from "../../../pages/purchaseModule/payable/payBills";
import VendorBills from "../../../pages/purchaseModule/payable/vendorBills";
import VendorCredit from "../../../pages/purchaseModule/payable/vendorCredit";
import RecurringVendorBill from "../../../pages/purchaseModule/payable/recurringVendorBill";
import CreateVendorBill from "../../../pages/purchaseModule/payable/vendorBills/createVendorBill";

export default function PayableRouting() {
  return (
    <Routes>
      <Route path="/vendor-bills" element={<VendorBills />} />
      <Route
        path="/vendor-bills/create-vendor-bill"
        element={<CreateVendorBill />}
      />
      <Route path="/pay-bills" element={<PayBills />} />
      <Route path="/vendor-credit" element={<VendorCredit />} />
      <Route path="/recurring-vendor-bill" element={<RecurringVendorBill />} />
    </Routes>
  );
}
