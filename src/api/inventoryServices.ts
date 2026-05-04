import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const addInventoryAdjustment = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.INVENTORY_ADJUSTMENT, values);
};

export const getAllInventoryAdjustments = () => {
  return HTTP_CLIENT.get(ENDPOINTS.INVENTORY_ADJUSTMENT);
};

export const deleteInventoryAdjustment = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.INVENTORY_ADJUSTMENT}/${id}`);
};
