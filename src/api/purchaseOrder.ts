import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const createPurchaseOrderApi = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.PURCHASE_ORDER, values);
};

export const getAllOrders = () => {
  return HTTP_CLIENT.get(ENDPOINTS.PURCHASE_ORDER);
};

export const getPurchaseOrderByPoNumber = (poNumber: string | number) => {
  console.log("🚀 ~ getPurchaseOrderByPoNumber ~ poNumber:", poNumber);
  return HTTP_CLIENT.get(`${ENDPOINTS.PURCHASE_ORDER}/po-Number/${poNumber}`);
};

export const updatePurchaseOrder = (id: string | number, values: any) => {
  const token = localStorage.getItem("token");

  return HTTP_CLIENT.put(`${ENDPOINTS.PURCHASE_ORDER}/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
