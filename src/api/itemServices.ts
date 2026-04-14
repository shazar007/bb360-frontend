import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const addItems = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ADD_ITEM, values);
};

export const getAllItems = () => {
  return HTTP_CLIENT.get(ENDPOINTS.GET_ALL_ITEM);
};

export const getSingleItem = (id: string | number) => {
  return HTTP_CLIENT.get(`${ENDPOINTS.GET_SINGLE_ITEM}/${id}`);
};

export const updateItem = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.UPDATE_ITEM}/${id}`, values);
};

export const deleteItem = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.DELETE_ITEM}/${id}`);
};
