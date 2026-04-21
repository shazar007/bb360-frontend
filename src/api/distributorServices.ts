import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const addDistributorApi = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ADD_DISTRIBUTOR, values);
};

export const getAllDistributor = () => {
  return HTTP_CLIENT.get(ENDPOINTS.GET_ALL_DISTRIBUTOR);
};

export const updateDistributor = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.UPDATE_DISTRIBUTOR}/${id}`, values);
};
export const deleteDistributor = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.DELETE_DISTRIBUTOR}/${id}`);
};