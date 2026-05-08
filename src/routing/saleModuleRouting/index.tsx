import { Route, Routes } from "react-router-dom";
import SaleRouting from "./saleRouting";
import { useEffect } from "react";

export default function SaleModuleRouting() {
  useEffect(() => {
    document.title = "Sale Module — BB-360";
  }, []);
  return (
    <Routes>
      <Route path="sales/*" element={<SaleRouting />} />
    </Routes>
  );
}
