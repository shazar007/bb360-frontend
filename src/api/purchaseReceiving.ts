import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const getAllPurchaseReceiving = () => {
  return HTTP_CLIENT.get(ENDPOINTS.PURCHASE_RECEIVING);
};

export const getPurchaseRecevingPoNumber = (poNumber: string | number) => {
  return HTTP_CLIENT.get(`${ENDPOINTS.PURCHASE_RECEIVING}/by-pr/${poNumber}`);
};

export const updatePurchaseReceiving = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.PURCHASE_RECEIVING}/${id}`, values);
};

export const createReceivingChallan = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.PURCHASE_RECEIVING, values);
};
