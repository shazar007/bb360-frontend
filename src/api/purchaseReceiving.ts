import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const getAllPurchaseReceiving = () => {
  return HTTP_CLIENT.get(ENDPOINTS.ALL_PURCHASE_RECEIVING);
};

export const updatePurchaseReceiving = (id: string | number, values: any) => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.UPDATE_PURCHASE_RECEIVING}/${id}`,
    values,
  );
};
