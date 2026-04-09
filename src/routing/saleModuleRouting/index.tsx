import { Route, Routes } from "react-router-dom";
import SaleRouting from "./saleRouting";

export default function SaleModuleRouting() {
  return (
    <Routes>
      <Route path="sales/*" element={<SaleRouting />} />
    </Routes>
  );
}
