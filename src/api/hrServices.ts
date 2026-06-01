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
  return HTTP_CLIENT.post(ENDPOINTS.EMPLOYEES, values);
};
export const getAllEmployee = () => {
  return HTTP_CLIENT.get(ENDPOINTS.EMPLOYEES);
};

export const updateAllEmployee = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.EMPLOYEES}/${id}`, values);
};
export const deleteEmployee = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
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

// --------------Pay Element-Entries-------------
export const addPayElementEntries = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.PAY_ELEMENT_ENTRIES, values);
};
export const getAllPayElementEntries = () => {
  return HTTP_CLIENT.get(ENDPOINTS.PAY_ELEMENT_ENTRIES);
};

export const deletePayElement = (id: string | number) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.PAY_ELEMENT_ENTRIES}/${id}`);
};

export const uploadPayElementEntries = (data: any) =>
  HTTP_CLIENT.post(ENDPOINTS.PAY_ENTRIES, data);

// -------------Loan Deductions-------------
export const addLoanDeductions = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.LOAN_DEDUCTION, values);
};
export const getAllLoanDeductions = () => {
  return HTTP_CLIENT.get(ENDPOINTS.LOAN_DEDUCTION);
};
export const updateLoanDeductions = (id: string | number, values: any) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.LOAN_DEDUCTION}/${id}`, values);
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
export const addAttendanceSummary = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.ATTENDANCE_SUMMARY, values);
};
// --------------get attendanceMachine-------------
export const getAttendanceMachine = () => {
  return HTTP_CLIENT.get(ENDPOINTS.ATTENDANCE_MACHINE);
};

// --------------Performance Criteria-------------

// -------------- HR DASHOARD-------------
export const getAllStatHRDashboard = () => {
  return HTTP_CLIENT.get(ENDPOINTS.DASHBOARD_HR);
};
export const getAllStatAttendanceDashboard = () => {
  return HTTP_CLIENT.get(ENDPOINTS.DASHBOARD_Attendance);
};

// ------------------------PayRoll----------------------------------

// -------------- Payroll Process Run-------------
export const CreatePayrollProcessRun = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.PAYROLL_PROCESS_CREATE, values);
};
export const approvePayrollRun = (id: string | number) => {
  return HTTP_CLIENT.patch(`${ENDPOINTS.PAYROLL_PROCESS_CREATE}/${id}/approve`);
};
export const getPayrollProcessRun = (params: any) => {
  return HTTP_CLIENT.get(ENDPOINTS.PAYROLL_PROCESS_GET, {
    params: {
      payrollType: params.payrollType,
      periodMonth: Number(params.periodMonth),
      periodYear: Number(params.periodYear),
    },
  });
};

export const SalaryPayableProcessSubmit = (values: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SALARY_PAYABLE_SUBMIT, values);
};

export const getPayableProcessDetails = (id: string | number) => {
  return HTTP_CLIENT.get(`${ENDPOINTS.PAYROLL_PROCESS_CREATE}/${id}/result`);
};
