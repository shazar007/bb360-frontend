import { Route, Routes } from "react-router-dom";
import DataUpload from "../../../pages/applicationSetup/dataUpload/itemUpload";
import ItemUpdate from "../../../pages/applicationSetup/dataUpload/itemUpdate";
import ItemDetails from "../../../pages/applicationSetup/dataUpload/itemUpdate/itemDetails";

export default function DataUploadRouting() {
  return (
    <Routes>
      <Route path="/item-upload" element={<DataUpload />} />
      <Route path="/item-update" element={<ItemUpdate />} />
      <Route path="/item-update-details" element={<ItemDetails />} />
    </Routes>
  );
}
