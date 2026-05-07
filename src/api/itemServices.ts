import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const addItems = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ITEMS, values);
};

export const getAllItems = () => {
  return HTTP_CLIENT.get(ENDPOINTS.ITEMS);
};

export const getSingleItem = (id: string | number) => {
  return HTTP_CLIENT.get(`${ENDPOINTS.ITEMS}/${id}`);
};

export const updateItem = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ITEMS}/${id}`, values);
};

export const deleteItem = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.ITEMS}/${id}`);
};

export const getItemByCategory = (type: string | number) => {
  return HTTP_CLIENT.get(`${ENDPOINTS.ITEMS}/category/${type}`);
};
