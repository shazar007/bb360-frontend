import { HTTP_CLIENT } from "../utils/httpClient";
import { ENDPOINTS } from "./endPoint";

// --------------DESIGNATION-------------
export const addEmployeeDesignation = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.DESIGNATION, values);
};
export const getAllEmployeeDesignation = () => {
  return HTTP_CLIENT.get(ENDPOINTS.DESIGNATION);
};
export const updateEmployeeDesignation = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.DESIGNATION}/${id}`, values);
};

// --------------EMPLOYEES TYPE-------------
export const addEmployeeType = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.EMPLOYEE_TYPE, values);
};
export const getAllEmployeeType = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EMPLOYEE_TYPE);
};
export const updateEmployeeType = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.EMPLOYEE_TYPE}/${id}`, values);
};

// --------------EMPLOYEE GRADES-------------
export const addEmployeeGrades = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.EMPLOYEE_GRADES, values);
};
export const getAllEmployeeGrades = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EMPLOYEE_GRADES);
};
export const updateEmployeeGrades = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.EMPLOYEE_GRADES}/${id}`, values);
};
export const updateEmployeeGradesStatus = (
  id: string | number,
  values: any,
) => {
  return HTTP_CLIENT.patch(`${ENDPOINTS.EMPLOYEE_GRADES}/${id}/toggle`, values);
};

// --------------WORK CLENDER-------------
export const addWorkCalendar = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.WORK_CLENDER, values);
};
export const getAllWorkCalendar = () => {
  return HTTP_CLIENT.get(ENDPOINTS.WORK_CLENDER);
};
export const updateWorkCalendar = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.WORK_CLENDER}/${id}`, values);
};

// --------------EMPLOYEE-------------

export const addAllEmployee = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.EMPLOYEES_ALL, values);
};
export const getAllEmployee = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EMPLOYEES_ALL);
};
export const updateAllEmployee = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.EMPLOYEES_ALL}/${id}`, values);
};
export const deleteEmployee = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.EMPLOYEES_ALL}/${id}`);
};

// --------------Employee Salary-------------
export const addEmployeeSalary = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.EMPLOYEE_SALARY, values);
};
export const getAllEmployeeSalary = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EMPLOYEE_SALARY);
};
export const updateEmployeeSalary = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.EMPLOYEE_SALARY}/${id}`, values);
};
