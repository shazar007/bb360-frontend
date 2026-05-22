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
export const getAllPayrollProcess = () => {
  return HTTP_CLIENT.get(ENDPOINTS.PAYROLL_PROCESS);
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

// --------------Employee Performance Criteria-------------
export const addEmployeePerformanceCriteria = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.EMPLOYEE_PERFORMANCE_CRITERIA, values);
};
export const getAllEmployeePerformanceCriteria = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EMPLOYEE_PERFORMANCE_CRITERIA);
};
export const updateEmployeePerformanceCriteria = (
  id: string | number,
  values: any,
) => {
  return HTTP_CLIENT.put(
    `${ENDPOINTS.EMPLOYEE_PERFORMANCE_CRITERIA}/${id}`,
    values,
  );
};

// --------------Employee Performance Evaluation-------------
export const addEmployeePerformanceEvaluation = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.EMPLOYEE_PERFORMANCE_EVALUATION, values);
};
export const getAllEmployeePerformanceEvaluation = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EMPLOYEE_PERFORMANCE_EVALUATION);
};
export const updateEmployeePerformanceEvaluation = (
  id: string | number,
  values: any,
) => {
  return HTTP_CLIENT.put(
    `${ENDPOINTS.EMPLOYEE_PERFORMANCE_EVALUATION}/${id}`,
    values,
  );
};

// --------------Employee Leave Application-------------
export const addLeaveApplication = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.LEAVE_APPLICATION, values);
};
export const getAllLeaveApplication = () => {
  return HTTP_CLIENT.get(ENDPOINTS.LEAVE_APPLICATION);
};
export const updateLeaveApplication = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.LEAVE_APPLICATION}/${id}`, values);
};
export const updateStatusLeave = (id: string | number, values: any) => {
  return HTTP_CLIENT.patch(
    `${ENDPOINTS.LEAVE_APPLICATION}/${id}/status`,
    values,
  );
};

// --------------  CPL Approval-------------

export const addCPLApproved = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.CPL_APPROVAL, values);
};
export const getAllCPLApproved = () => {
  return HTTP_CLIENT.get(ENDPOINTS.CPL_APPROVAL);
};
export const updateCPLApproved = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.CPL_APPROVAL}/${id}`, values);
};

// --------------Employee Expense Claim-------------

export const addExpenseClaim = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.EXENSE_CLAIM, values);
};
export const getAllExpenseClaim = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EXENSE_CLAIM);
};
export const updateEmployeeExpenseClaim = (
  id: string | number,
  values: any,
) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.EXENSE_CLAIM}/${id}`, values);
};

// --------------Employee Expense Claim-------------

export const addAttendanceHolidays = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ATTENDANCE_HOLIDAYS, values);
};
export const getAllAttendanceHolidays = () => {
  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE_HOLIDAYS);
};
export const updateAttendanceHolidays = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.ATTENDANCE_HOLIDAYS}/${id}`, values);
};

// --------------Attendance Upload-------------
export const uploadAttendance = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ATTENDANCE_UPLOAD, values);
};

// --------------get attendance-summary-------------
export const getAttendanceSummary = () => {
  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE_SUMMARY);
};
