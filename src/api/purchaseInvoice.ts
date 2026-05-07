import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const createPurchaseInvoice = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.PURCHASE_INVOICE, values, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAllPurchaseInvoice = () => {
  return HTTP_CLIENT.get(ENDPOINTS.PURCHASE_INVOICE);
};
