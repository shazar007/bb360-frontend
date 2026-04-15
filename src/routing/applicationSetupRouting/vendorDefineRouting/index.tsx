import { Route, Routes } from "react-router-dom";

// ✅ Import your pages
import VendorUpload from "../../../pages/applicationSetup/vendorDefine/vendorUpload";
import VendorUpdate from "../../../pages/applicationSetup/vendorDefine/vendorUpdate";

export default function VendorDefineRouting() {
  return (
    <Routes>
      <Route path="/vendor-upload" element={<VendorUpload />} />
      <Route path="/vendor-update" element={<VendorUpdate />} />
    </Routes>
  );
}