import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const addVendorApi = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ADD_VENDORS, values);
};

export const getAllVendors = () => {
  return HTTP_CLIENT.get(ENDPOINTS.GET_ALL_VENDORS);
};

export const updateVendor = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.UPDATE_VENDORS}/${id}`, values);
};

export const deleteVendor = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.DELETE_VENDORS}/${id}`);
};
