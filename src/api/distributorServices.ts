import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const addDistributorApi = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.DISTRIBUTOR, values);
};

export const getAllDistributor = () => {
  return HTTP_CLIENT.get(ENDPOINTS.DISTRIBUTOR);
};

export const updateDistributor = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.DISTRIBUTOR}/${id}`, values);
};
export const deleteDistributor = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.DISTRIBUTOR}/${id}`);
};
