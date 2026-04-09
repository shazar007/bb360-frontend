import { Route, Routes } from "react-router-dom";
import DataUpload from "../../../pages/applicationSetup/dataUpload/itemUpload";
import ItemUpdate from "../../../pages/applicationSetup/dataUpload/itemUpdate";

export default function DataUploadRouting() {
  return (
    <Routes>
      <Route path="/item-upload" element={<DataUpload />} />
      <Route path="/item-update" element={<ItemUpdate />} />
    </Routes>
  );
}
