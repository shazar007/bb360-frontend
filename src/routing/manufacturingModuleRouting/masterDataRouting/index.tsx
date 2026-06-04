import { Route, Routes } from "react-router-dom";

import MaterialMaster from "../../../pages/manufacturingModule/masterData/materialMaster";
import MaterialMasterCreate from "../../../pages/manufacturingModule/masterData/materialMaster/materialMasterCreate";

import BomMasterFormula from "../../../pages/manufacturingModule/masterData/bomMasterFormula";
import BomMasterFormulaCreate from "../../../pages/manufacturingModule/masterData/bomMasterFormula/bomMasterFormulaCreate";

import EquipmentMaster from "../../../pages/manufacturingModule/masterData/equipmentMaster";
import EquipmentMasterCreate from "../../../pages/manufacturingModule/masterData/equipmentMaster/equipmentMasterCreate";

import SopMaster from "../../../pages/manufacturingModule/masterData/sopMaster";
import SopMasterCreate from "../../../pages/manufacturingModule/masterData/sopMaster/sopMasterCreate";
export default function MasterDataRouting() {
  return (
    <Routes>
      <Route path="/material-master" element={<MaterialMaster />} />
      <Route
        path="/material-master/create"
        element={<MaterialMasterCreate />}
      />

      <Route path="/bill-of-material" element={<BomMasterFormula />} />
      <Route
        path="/bill-of-material/create"
        element={<BomMasterFormulaCreate />}
      />

      <Route path="/equipment-master" element={<EquipmentMaster />} />
      <Route
        path="/equipment-master/create"
        element={<EquipmentMasterCreate />}
      />

      <Route path="/work-instructions" element={<SopMaster />} />
      <Route path="/work-instructions/create" element={<SopMasterCreate />} />
    </Routes>
  );
}
