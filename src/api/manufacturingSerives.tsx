import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

// --------------Material Master-------------
export const addMaterialMaster = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.MATERIRAL_MASTERN, values);
};
export const getAllMaterialMastern = () => {
  return HTTP_CLIENT.get(ENDPOINTS.MATERIRAL_MASTERN);
};
export const updateMaterialMaster = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.MATERIRAL_MASTERN}/${id}`, values);
};
export const deleteMaterialMaster = (id: string) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.MATERIRAL_MASTERN}/${id}`);
};

// -------------- Bill Of Material-------------
export const addBillOfMaterial = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.BILL_MATERIAL, values);
};
export const getAllBillOfMaterial = () => {
  return HTTP_CLIENT.get(ENDPOINTS.BILL_MATERIAL);
};
export const updateBillOfMaterial = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.BILL_MATERIAL}/${id}`, values);
};
export const deleteBillOfMaterial = (id: string) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.BILL_MATERIAL}/${id}`);
};

// -------------- Equipment Master-------------

export const addEquipmentMaster = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.EQUIPMENT_MASTER, values);
};
export const getAllEquipmentMaster = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EQUIPMENT_MASTER);
};
export const updateEquipmentMaster = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.EQUIPMENT_MASTER}/${id}`, values);
};
export const deleteEquipmentMaster = (id: string) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.EQUIPMENT_MASTER}/${id}`);
};

// -------------- SOP Master-------------

export const addSOPMaster = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SOP_MASTER, values);
};
export const getAllSOPMaster = () => {
  return HTTP_CLIENT.get(ENDPOINTS.SOP_MASTER);
};
export const updateSOPMaster = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.SOP_MASTER}/${id}`, values);
};
export const deleteSOPMaster = (id: string) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.SOP_MASTER}/${id}`);
};

// -------------- Demand Planning--------------
export const addDemandPlanning = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.DEMAND_PLANNING, values);
};
export const getAllDemandPlanning = () => {
  return HTTP_CLIENT.get(ENDPOINTS.DEMAND_PLANNING);
};
export const updateDemandPlanning = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.DEMAND_PLANNING}/${id}`, values);
};

// -------------- Batch Planning--------------
export const addBatchPlanning = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.BATCH_PLANNING, values);
};
export const getAllBatchPlanning = () => {
  return HTTP_CLIENT.get(ENDPOINTS.BATCH_PLANNING);
};
export const updateBatchPlanning = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.BATCH_PLANNING}/${id}`, values);
};
