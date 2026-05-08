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

//  --------------------Events------------------------
export const updateEvents = (id: string, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ATTENDANCE}/${id}`, values);
};
export const createEvent = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ATTENDANCE, values);
};
export const getAllEvents = () => {
  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE);
};
export const deleteEvent = (id: string) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.ATTENDANCE}/${id}`);
};

//  --------------------Leaves------------------------

export const getAllLeaves = (search?: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE, {
    params: search ? { search } : {},
  });
};
export const updateLeavesStatus = (
  id: string,
  values: { status: string; approvedBy: string },
) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ATTENDANCE}/${id}`, values);
};
export const updateLeave = (id: string, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ATTENDANCE}/${id}`, values);
};

export const deleteLeave = (id: string) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.ATTENDANCE}/${id}`);
};
export const applyLeave = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ATTENDANCE, values);
};

//  --------------------Payroll------------------------
export const generatePayroll = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ATTENDANCE, values);
};

export const approvePayroll = (id: string, data: { approvedBy: string }) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ATTENDANCE.replace(":id", id)}`, data);
};

export const getAllPayrolls = (
  employeeId?: string,
  employeeName?: string,
  month?: string,
  year?: number,
) => {
  const params: any = {};
  if (employeeId) params.employeeId = employeeId;
  if (employeeName) params.employeeName = employeeName;
  if (month) params.month = month;
  if (year) params.year = year;

  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE, { params });
};

export const getEmployeePayrolls = (employeeId: string) => {
  return HTTP_CLIENT.get(
    ENDPOINTS.ATTENDANCE.replace(":employeeId", employeeId),
  );
};

export const updatePayroll = (id: string, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ATTENDANCE}/${id}`, values);
};
export const generateSalarySlip = (id: string) => {
  return HTTP_CLIENT.post(ENDPOINTS.ATTENDANCE.replace(":id", id));
};

export const downloadSalarySlip = (id: string) => {
  return HTTP_CLIENT.get(`${ENDPOINTS.ATTENDANCE}/${id}`, {
    responseType: "blob",
  });
};
