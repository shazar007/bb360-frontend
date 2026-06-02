import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const addDepartments = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.DEPARTMENTS, values);
};

export const getAllDepartments = () => {
  return HTTP_CLIENT.get(ENDPOINTS.DEPARTMENTS);
};

export const updateDepartments = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.DEPARTMENTS}/${id}`, values);
};
export const updateDepartmentsStatus = (id: string | number, values: any) => {
  return HTTP_CLIENT.patch(
    `${ENDPOINTS.DEPARTMENTS}/${id}/toggle-status`,
    values,
  );
};

export const addJobLocations = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.JOB_LOCATIONS, values);
};

export const getAllJobLocations = () => {
  return HTTP_CLIENT.get(ENDPOINTS.JOB_LOCATIONS);
};
export const updateJobLocationsStatus = (id: string | number, values: any) => {
  return HTTP_CLIENT.patch(
    `${ENDPOINTS.JOB_LOCATIONS}/${id}/toggle-status`,
    values,
  );
};
