import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const addVendorApi = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.VENDORS, values);
};

export const getAllVendors = () => {
  return HTTP_CLIENT.get(ENDPOINTS.VENDORS);
};

export const updateVendor = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.VENDORS}/${id}`, values);
};

export const deleteVendor = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.VENDORS}/${id}`);
};
