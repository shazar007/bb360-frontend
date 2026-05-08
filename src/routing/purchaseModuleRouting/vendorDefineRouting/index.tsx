import { Route, Routes } from "react-router-dom";
import VenderType from "../../../pages/purchaseModule/vendorDefine/vendorTypes";
import Venders from "../../../pages/purchaseModule/vendorDefine/venders";
import CreateVendor from "../../../pages/purchaseModule/vendorDefine/venders/createVendor";
import CreateVendorType from "../../../pages/purchaseModule/vendorDefine/vendorTypes/createVendorType";
import UploadVendors from "../../../pages/purchaseModule/vendorDefine/venders/uploadVendors";

export default function VenderDefine() {
  return (
    <Routes>
      <Route path="/venders" element={<Venders />} />
      <Route path="/venders/upload" element={<UploadVendors />} />
      <Route path="/venders/create" element={<CreateVendor />} />
      <Route path="/vender-type" element={<VenderType />} />
      <Route path="/vender-type/create" element={<CreateVendorType />} />
    </Routes>
  );
}
