import { Route, Routes } from "react-router-dom";

import MaterialMaster from "../../../pages/manufacturingModule/masterData/materialMaster";
import MaterialMasterCreate from "../../../pages/manufacturingModule/masterData/materialMaster/materialMasterCreate";

import BomMasterFormula from "../../../pages/manufacturingModule/masterData/bomMasterFormula";
import BomMasterFormulaCreate from "../../../pages/manufacturingModule/masterData/bomMasterFormula/bomMasterFormulaCreate";

import EquipmentMaster from "../../../pages/manufacturingModule/masterData/equipmentMaster";
import EquipmentMasterCreate from "../../../pages/manufacturingModule/masterData/equipmentMaster/equipmentMasterCreate";

import SopMaster from "../../../pages/manufacturingModule/masterData/sopMaster";

export default function MasterDataRouting() {
  return (
    <Routes>
      <Route path="/material-master" element={<MaterialMaster />} />
      <Route
        path="/material-master/create"
        element={<MaterialMasterCreate />}
      />

      <Route path="/bom-master-formula" element={<BomMasterFormula />} />
      <Route
        path="/bom-master-formula/create"
        element={<BomMasterFormulaCreate />}
      />

      <Route path="/equipment-master" element={<EquipmentMaster />} />
      <Route
        path="/equipment-master/create"
        element={<EquipmentMasterCreate />}
      />

      <Route path="/sop-master" element={<SopMaster />} />
    </Routes>
  );
}
