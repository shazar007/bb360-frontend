import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

export const getAllAttendance = (params?: {
  search?: string;
  month?: number;
  year?: number;
}) => {
  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE, {
    params,
  });
};

export const updateAttendance = (id: string, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ATTENDANCE}/${id}`, values);
};
export const updateAttendanceAdmin = (id: string, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ATTENDANCE}/${id}`, values);
};

export const getAttendanceSummary = () => {
  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE);
};

export const createDailyAttendance = () => {
  return HTTP_CLIENT.post(ENDPOINTS.ATTENDANCE);
};

export const getAttendanceGraph = () => {
  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE);
};

export const setCompanyTimingAPI = (values: {
  startTime: string;
  endTime: string;
  lateAfterMinutes: number;
}) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.ATTENDANCE}`, values);
};
export const GetCompanyTimingAPI = () => {
  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE);
};
