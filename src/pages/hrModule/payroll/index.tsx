import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import type { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { useDebounce } from "../../../hooks/deBounce";
import {
  approvePayroll,
  generatePayroll,
  getAllPayrolls,
  updatePayroll,
} from "../../../api/hrServices";
import { notifyError, notifySuccess } from "../../../components/toast";
import { payrollSchema } from "../../../utils/constant";
import SearchById from "../../../components/SearchBar/searchById";
import CustomTable from "../../../components/customTable";
import CustomInput from "../../../components/customInput";
import CustomSelect from "../../../components/customSelect";
import { SyncLoader } from "react-spinners";
import { MonthYearFilter } from "../../../components/monthYearFilter";
import { useNavigate } from "react-router-dom";

const tableHeaders = [
  "Employee ID",
  "Employee Name",
  "Position",
  "Present Days",
  "Gross Salary",
  "Net Pay",
  "Approved By",
  "Payroll Status",
  "Action",
  "Details",
];
const months = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];
export default function Payroll() {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [editing, setEditing] = useState<any>(null);
  const [openModel, setOpenModel] = useState(false);
  const [isloading, setLoading] = useState(false);
  const { user } = useSelector((state: any) => {
    return state.user;
  });
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const debouncedSearchId = useDebounce(searchId, 500);
  const debouncedSearchName = useDebounce(searchName, 500);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedMonthYear, setSelectedMonthYear] = useState<{
    month: number;
    year: number;
  }>({
    month: currentMonth,
    year: currentYear,
  });

  const { refetch } = useQuery<AxiosResponse<any>>({
    queryKey: [
      "Payrolls",
      debouncedSearchId,
      debouncedSearchName,
      selectedMonthYear.month,
      selectedMonthYear.year,
    ],

    queryFn: () =>
      getAllPayrolls(
        debouncedSearchId,
        debouncedSearchName,
        months[selectedMonthYear.month - 1]?.value,
        selectedMonthYear.year,
      ),

    placeholderData: (previousData) => previousData,

    enabled: !!selectedMonthYear.month && !!selectedMonthYear.year,
  });

  const handleApprove = (rowData: any) => {
    if (rowData?.payrollStatus === "Approved") {
      notifyError("Payroll is already approved.");
      return;
    }

    const approverName = user?.name || "Admin";

    approvePayroll(rowData._id, { approvedBy: approverName })
      .then(() => {
        notifySuccess("Payroll approved successfully");
        refetch();
      })
      .catch((error) => {
        console.error(error);
        notifyError("Failed to approve payroll.");
      });
  };

  const dummyPayrollData = [
    {
      _id: "1",
      employeeId: "EMP-001",
      employeeName: "Ali Khan",
      position: "Frontend Developer",
      presentDays: 26,
      grossSalary: 120000,
      netPay: 110000,
      approvedBy: "Admin",
      payrollStatus: "Pending",

      month: "May",
      year: "2026",
      totalWorkingDays: 30,
      approvedLeaves: 2,
      basicSalary: 100000,

      allowances: {
        medical: 5000,
        transport: 7000,
        others: 3000,
      },

      deductions: {
        pf: 2000,
        loan: 0,
        advanceSalary: 1000,
        tax: 4000,
        others: 0,
      },
    },

    {
      _id: "2",
      employeeId: "EMP-002",
      employeeName: "Ahmed Raza",
      position: "Backend Developer",
      presentDays: 28,
      grossSalary: 150000,
      netPay: 138000,
      approvedBy: "HR Manager",
      payrollStatus: "Approved",

      month: "May",
      year: "2026",
      totalWorkingDays: 30,
      approvedLeaves: 1,
      basicSalary: 130000,

      allowances: {
        medical: 6000,
        transport: 8000,
        others: 4000,
      },

      deductions: {
        pf: 3000,
        loan: 2000,
        advanceSalary: 0,
        tax: 5000,
        others: 0,
      },
    },

    {
      _id: "3",
      employeeId: "EMP-003",
      employeeName: "Sara Khan",
      position: "UI/UX Designer",
      presentDays: 25,
      grossSalary: 100000,
      netPay: 92000,
      approvedBy: "Finance Manager",
      payrollStatus: "Pending",

      month: "May",
      year: "2026",
      totalWorkingDays: 30,
      approvedLeaves: 3,
      basicSalary: 85000,

      allowances: {
        medical: 4000,
        transport: 5000,
        others: 2000,
      },

      deductions: {
        pf: 2000,
        loan: 0,
        advanceSalary: 1000,
        tax: 3000,
        others: 0,
      },
    },
  ];

  const tableData =
    dummyPayrollData.map((v: any) => [
      v.employeeId,
      v.employeeName,
      v.position || "-",
      v.presentDays,
      v.grossSalary,
      v.netPay,
      v?.approvedBy,
      <span
        key={v._id + "-status"}
        className={`px-3 py-0.5 rounded-sm font-medium text-sm border ${
          v.payrollStatus === "Pending"
            ? "text-primary border-primary"
            : v.payrollStatus === "Approved"
              ? "text-green-600 border-green-600"
              : "text-gray-600 border-gray-400"
        }`}
      >
        {v.payrollStatus}
      </span>,
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative"
      >
        <Icon
          icon="ph:dots-three-outline-vertical-duotone"
          className="text-2xl cursor-pointer text-primary"
          onClick={() => setOpenActionId(openActionId === v._id ? null : v._id)}
        />

        {openActionId === v._id && (
          <div className="absolute right-0 z-50 w-40 mt-2 bg-white rounded-lg shadow-lg">
            <button
              disabled={v.payrollStatus == "Approved"}
              onClick={() => {
                setEditing(v);
                setOpenModel(true);
                setOpenActionId(null);
              }}
              className="px-4 py-2 w-full text-sm hover:bg-[#E5EBF7] cursor-pointer flex items-center gap-2 disabled:text-[#7d7d7d]/48"
            >
              Edit
            </button>
            <button
              disabled={v.payrollStatus == "Approved"}
              onClick={() => {
                handleApprove(v);
                setOpenActionId(null);
              }}
              className="px-4 py-2 w-full text-sm hover:bg-[#E5EBF7] cursor-pointer flex items-center gap-2 disabled:text-[#7d7d7d]/48"
            >
              Approved
            </button>{" "}
          </div>
        )}
      </div>,
      <p
        className="font-medium cursor-pointer text-primary"
        onClick={() =>
          navigate("/hr-module/payroll-details", {
            state: { rowData: v },
          })
        }
      >
        Details
      </p>,
    ]) || [];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeId: editing?.employeeId || "",
      employeeName: editing?.employeeName || "",
      position: editing?.position || "",
      month: editing?.month || "",
      year: editing?.year || "",
      totalWorkingDays: editing?.totalWorkingDays || "",
      presentDays: editing?.presentDays || 0,
      approvedLeaves: editing?.approvedLeaves || 0,
      basicSalary: editing?.basicSalary || 0,
      allowances: {
        medical: editing?.allowances?.medical || 0,
        transport: editing?.allowances?.transport || 0,
        others: editing?.allowances?.others || 0,
      },
      deductions: {
        pf: editing?.deductions?.pf || 0,
        loan: editing?.deductions?.loan || 0,
        advanceSalary: editing?.deductions?.advanceSalary || 0,
        tax: editing?.deductions?.tax || 0,
        others: editing?.deductions?.others || 0,
      },
    },
    validationSchema: payrollSchema,
    onSubmit: (values) => {
      setLoading(true);
      if (editing) {
        updatePayroll(editing._id, values)
          .then(() => {
            notifySuccess("Payroll updated successfully");
            setOpenModel(false);
            setEditing(null);
            formik.resetForm();
            refetch();
          })
          .catch((error) => {
            console.error(error);
            notifyError("Failed to update Payroll.");
          })
          .finally(() => setLoading(false));
      } else {
        generatePayroll(values)
          .then(() => {
            notifySuccess("Payroll generated successfully");
            setOpenModel(false);
            formik.resetForm();
            refetch();
          })
          .catch((error) => {
            console.error(error);
            notifyError("Failed to generate payroll.");
          })
          .finally(() => setLoading(false));
      }
    },
  });
  useEffect(() => {
    document.title = "HR-Management | Payroll";
  }, []);
  return (
    <>
      <div className="bg-[#F7F7F7] md:h-[calc(100vh-108px)] h-auto rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-5 xl:flex-nowrap">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
              <p className="text-base font-semibold md:text-lg text-heading1">
                Payroll
              </p>
            </div>
            <MonthYearFilter
              value={selectedMonthYear}
              onChange={(val) => setSelectedMonthYear(val)}
            />
          </div>
          <div className="flex flex-wrap items-center w-full gap-2 md:gap-4 md:w-auto">
            <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
              <div className="w-full md:w-62 lg:w-60 xl:w-70 2xl:w-70">
                <SearchById
                  value={searchId}
                  onChange={setSearchId || setSearchName}
                />
              </div>
            </div>
            <button
              onClick={() => {
                setOpenModel(true);
                setEditing(null);
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-35"
            >
              <Icon icon="basil:add-outline" className="text-lg text-white" />
              <p className="text-sm font-medium text-white">Add Payroll</p>
            </button>
          </div>
        </div>
        <div className="h-auto mt-4">
          <CustomTable headers={tableHeaders} norounded data={tableData} />
        </div>
      </div>

      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="relative bg-white mx-3 rounded-xl w-250 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                {editing ? "Update Payroll" : "Add Payroll"}
              </h2>
              <button
                className="cursor-pointer"
                onClick={() => setOpenModel(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={formik.handleSubmit} className="p-4 space-y-6">
              <div className="flex flex-wrap gap-6">
                <div className="flex-1 space-y-4 min-w-70">
                  <div>
                    <CustomInput
                      label="Employee ID"
                      placeholder="Enter Employee ID"
                      name="employeeId"
                      value={formik.values.employeeId}
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.touched.employeeId &&
                      formik.errors.employeeId &&
                      typeof formik.errors.employeeId === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.employeeId}
                        </div>
                      )}
                  </div>
                  <div>
                    <CustomInput
                      label="Employee Name"
                      placeholder="Enter Employee Name"
                      name="employeeName"
                      value={formik.values.employeeName}
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.touched.employeeName &&
                      formik.errors.employeeName &&
                      typeof formik.errors.employeeName === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.employeeName}
                        </div>
                      )}
                  </div>
                  <div>
                    <CustomInput
                      label="Position"
                      placeholder="Enter Position"
                      name="position"
                      value={formik.values.position}
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.touched.position &&
                      formik.errors.position &&
                      typeof formik.errors.position === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.position}
                        </div>
                      )}
                  </div>
                  <div>
                    {" "}
                    <CustomSelect
                      label="Month"
                      options={months}
                      placeholder="Enter Month"
                      value={formik.values.month}
                      onChange={(val) => formik.setFieldValue("month", val)}
                    />{" "}
                    {formik.touched.month &&
                      formik.errors.month &&
                      typeof formik.errors.month === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.month}
                        </div>
                      )}
                  </div>
                  <div>
                    {" "}
                    <CustomInput
                      label="Enter Year"
                      placeholder="Enter Year"
                      name="year"
                      value={formik.values.year}
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.touched.year &&
                      formik.errors.year &&
                      typeof formik.errors.year === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.year}
                        </div>
                      )}
                  </div>{" "}
                  <div>
                    {" "}
                    <CustomInput
                      label="Working Days"
                      placeholder="Enter Working Days"
                      name="totalWorkingDays"
                      value={formik.values.totalWorkingDays}
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.touched.totalWorkingDays &&
                      formik.errors.totalWorkingDays &&
                      typeof formik.errors.totalWorkingDays === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.totalWorkingDays}
                        </div>
                      )}
                  </div>
                  <div>
                    {" "}
                    <CustomInput
                      label="Present Days"
                      placeholder="Enter Present Days"
                      name="presentDays"
                      value={formik.values.presentDays}
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.touched.presentDays &&
                      formik.errors.presentDays &&
                      typeof formik.errors.presentDays === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.presentDays}
                        </div>
                      )}
                  </div>
                  <div>
                    {" "}
                    <CustomInput
                      label="Approved Leaves"
                      placeholder="Enter Approved Leaves"
                      name="approvedLeaves"
                      value={formik.values.approvedLeaves}
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.touched.approvedLeaves &&
                      formik.errors.approvedLeaves &&
                      typeof formik.errors.approvedLeaves === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.approvedLeaves}
                        </div>
                      )}
                  </div>
                  <div>
                    {" "}
                    <CustomInput
                      label="Basic Salary"
                      placeholder="Enter Basic Salary"
                      name="basicSalary"
                      value={formik.values.basicSalary}
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.touched.basicSalary &&
                      formik.errors.basicSalary &&
                      typeof formik.errors.basicSalary === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.basicSalary}
                        </div>
                      )}
                  </div>
                </div>

                <div className="flex-1 space-y-4 min-w-70">
                  <h3 className="text-lg font-semibold">Allowances</h3>
                  {Object.keys(formik.values.allowances).map((key) => (
                    <CustomInput
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      placeholder={`Enter ${key}`}
                      name={`allowances.${key}`}
                      value={
                        formik.values.allowances[
                          key as keyof typeof formik.values.allowances
                        ]
                      }
                      onChange={formik.handleChange}
                    />
                  ))}

                  <h3 className="mt-4 text-lg font-semibold">Deductions</h3>
                  {Object.keys(formik.values.deductions).map((key) => (
                    <CustomInput
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      placeholder={`Enter ${key}`}
                      name={`deductions.${key}`}
                      value={
                        formik.values.deductions[
                          key as keyof typeof formik.values.deductions
                        ]
                      }
                      onChange={formik.handleChange}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full h-10 gap-3 text-sm font-medium text-white rounded-md cursor-pointer md:w-38 bg-primary"
                >
                  {isloading ? (
                    <SyncLoader color="#fff" size={6} />
                  ) : editing ? (
                    "Update Payroll"
                  ) : (
                    "Generate Payroll"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
