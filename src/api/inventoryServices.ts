import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

// --------------inventory Adjustments-------------
export const addInventoryAdjustment = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.INVENTORY_ADJUSTMENT, values);
};

export const getAllInventoryAdjustments = () => {
  return HTTP_CLIENT.get(ENDPOINTS.INVENTORY_ADJUSTMENT);
};

export const deleteInventoryAdjustment = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.INVENTORY_ADJUSTMENT}/${id}`);
};

// --------------inventory Transfers-------------
export const addInventoryTransfer = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.INVENTORY_TRANSFERS, values);
};

export const getAllInventoryTransfers = () => {
  return HTTP_CLIENT.get(ENDPOINTS.INVENTORY_TRANSFERS);
};

export const deleteInventoryTransfer = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.INVENTORY_TRANSFERS}/${id}`);
};

// --------------inventory Material-Issue-Notes-------------

export const addMaterialIssueNote = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.MATERIAL_ISSUE_NOTES, values);
};

export const getAllMaterialIssueNotes = () => {
  return HTTP_CLIENT.get(ENDPOINTS.MATERIAL_ISSUE_NOTES);
};

export const deleteMaterialIssueNote = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.MATERIAL_ISSUE_NOTES}/${id}`);
};

// --------------inventory Material-Return-Notes-------------

export const addMaterialReturnNote = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.MATERIAL_RETURN_NOTES, values);
};

export const getAllMaterialReturnNotes = () => {
  return HTTP_CLIENT.get(ENDPOINTS.MATERIAL_RETURN_NOTES);
};

export const deleteMaterialReturnNote = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.MATERIAL_RETURN_NOTES}/${id}`);
};
