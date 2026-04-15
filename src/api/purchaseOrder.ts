import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const createPurchaseOrderApi = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ORDER_CREATE, values);
};

export const getAllOrders = () => {
  return HTTP_CLIENT.get(ENDPOINTS.GET_ALL_ORDERS);
};
export const updatePurchaseOrder = (id: string | number, values: any) => {
  const token = localStorage.getItem("token");

  return HTTP_CLIENT.put(`${ENDPOINTS.UPDATE_ORDERS}/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
