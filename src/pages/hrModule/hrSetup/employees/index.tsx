import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../../api/employeesServices";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import dayjs from "dayjs";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import {
  deleteEmployee,
  getAllEmployeeDesignation,
  getAllEmployeeGrades,
  getAllEmployeeType,
  getAllWorkCalendar,
  updateAllEmployee,
} from "../../../../api/hrServices";
import CustomSelect from "../../../../components/customSelect";
import { getAllJobLocations } from "../../../../api/classificationServices";

const fetchHROptions = async () => {
  const [typeRes, designationRes, gradesRes, workCalendarres, jobLocationRes] =
    await Promise.all([
      getAllEmployeeType(),
      getAllEmployeeDesignation(),
      getAllEmployeeGrades(),
      getAllWorkCalendar(),
      getAllJobLocations(),
    ]);

  return {
    employeeTypeOptions: (typeRes?.data?.data || []).map((emp: any) => ({
      label: emp.name,
      value: emp._id,
    })),
    employeeDesignation: (designationRes?.data?.data || []).map((emp: any) => ({
      label: emp.name,
      value: emp._id,
    })),
    employeeGrades: (gradesRes?.data?.data || []).map((emp: any) => ({
      label: emp.gradeName,
      value: emp._id,
    })),
    workCalendar: (workCalendarres?.data?.data || []).map((emp: any) => ({
      label: emp.name,
      value: emp._id,
    })),
    jobLocationOption: (jobLocationRes?.data?.data || []).map((job: any) => ({
      label: job.name,
      value: job._id,
    })),
  };
};
export default function Employees() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {
    data: allEmployees,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllEmployees"],
    queryFn: getAllEmployees,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const { data: hrOptions, isLoading: hrLoading } = useQuery({
    queryKey: ["hrOptions"],
    queryFn: fetchHROptions,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const {
    employeeTypeOptions = [],
    employeeDesignation = [],
    employeeGrades = [],
    workCalendar = [],
    jobLocationOption = [],
  } = hrOptions ?? {};
  const AllEmployee: any[] = allEmployees?.data?.data || [];

  const handleChange = (name: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [name]: value }));
  };
  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  useEffect(() => {
    const handleClick = () => setOpenMenuIndex(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  const { goTo } = useAppNavigate();
  const handlePrint = (item: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Employee Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #000;
          }
          h2 {
            text-align: center;
            margin-bottom: 20px;
          }
          .info {
            margin-bottom: 10px;
            font-size: 14px;
          }
          .info b {
            display: inline-block;
            width: 180px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }

          th {
            background: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Employee Details Report</h2>
            <div class="info"><b>Employee ID:</b> ${item.employeeId || "-"}</div>
            <div class="info"><b>Name:</b> ${item.name || "-"}</div>
            <div class="info"><b>Father Name:</b> ${item.fatherName || "-"}</div>
            <div class="info"><b>Gender:</b> ${item.gender || "-"}</div>
            <div class="info"><b>Religion:</b> ${item.religion || "-"}</div>
            <div class="info">
              <b>Date of Birth:</b> ${item.dob ? dayjs(item.dob).format("DD-MMM-YYYY") : "-"}</div>
            <div class="info"><b>CNIC No.:</b> ${item.cnic || "-"}</div>
            <div class="info"><b>Designation:</b> ${item.designation.name || "-"}</div>
            <div class="info"><b>Employee Grade:</b> ${item.employeeGrade.gradeName || "-"}</div>
            <div class="info"><b>Employee Type:</b> ${item.employeeType.name || "-"}</div>
            <div class="info"><b>Location:</b> ${item.jobLocation || "-"}</div>
            <div class="info"><b>Hire Date:</b>  ${item.hireDate ? dayjs(item.hireDate).format("DD-MMM-YYYY") : "-"}</div>
            <div class="info"><b>Status:</b> ${item.status || "-"}</div>
            <div class="info"><b>Email:</b> ${item.email || "-"}</div>
            <div class="info"><b>Phone:</b> ${item.phone || "-"}</div>
            <div class="info"><b>Address:</b> ${item.address || "-"}</div>
            <div class="info"><b>City:</b> ${item.city || "-"}</div>
            <div class="info"><b>Country:</b> ${item.country || "-"}</div>
        <script>
          window.onload = function () {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };
  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      const payload = {
        name: editData.name,
        gender: editData.gender,
        religion: editData.religion,
        dob: editData.dob,
        fatherName: editData.fatherName,
        cnic: editData.cnic,
        phone: editData.phone,
        address: editData.address,
        city: editData.city,
        country: editData.country,
        hireDate: editData.hireDate,
        designation: editData.designation,
        employeeGrade: editData.employeeGrade,
        employeeType: editData.employeeType,
        workCalendar: editData.workCalendar,
        definePayroll: editData.definePayroll,
        jobLocation: editData.jobLocation,
        status: editData.status,
        email: editData.email,
        machineId: editData.machineId,
        department: editData.department,
      };
      console.log("Update Payload =>", payload);
      await updateAllEmployee(editData._id, payload);
      notifySuccess("Employee updated successfully");
      setIsEditOpen(false);
      refetch();
    } catch (error) {
      console.log(error);
      notifyError("Failed to update employee");
    } finally {
      setUpdateLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!deleteId) {
      notifyError("Employee ID not found");
      return;
    }

    try {
      setDeleteLoading(true);

      await deleteEmployee(deleteId);

      notifySuccess("Employee deleted successfully");

      setConfirm(false);
      setDeleteId(null);

      refetch();
    } catch (error: any) {
      console.log(error);
      notifyError(
        error?.response?.data?.message || "Failed to delete employee",
      );
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Employees
            </p>
          </div>
          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <div className="relative w-full md:w-60">
              <input
                placeholder="Search"
                className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
              />

              <Icon
                icon="mynaui:search"
                className="absolute text-[20px] text-heading1/36 top-2.5 left-3"
              />
            </div>
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>
            <button
              onClick={() => {
                goTo("/hr-module/hr-setup/employees/upload");
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary rounded-md text-white cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Upload
            </button>
            <button
              onClick={() => {
                goTo("/hr-module/hr-setup/employees/create");
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>
        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-3">
            <CustomTable
              loading={isLoading}
              height="auto"
              headers={[
                "Edit",
                "View",
                "Report",
                "Employee ID",
                "Mechine ID",
                "Employee Name",
                "DOB",
                "Hire Date",
                "City",
                "Email",
                "Phone",
                "Address",
                "Job Title",
                "Location",
              ]}
              data={AllEmployee.map((row, index) => [
                <div className="relative">
                  <Icon
                    icon="qlementine-icons:menu-burger-16"
                    className="text-lg cursor-pointer text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(index);
                    }}
                  />

                  {openMenuIndex === index && (
                    <div
                      className="absolute z-10 w-32 py-2 bg-white rounded-md shadow-md -right-25 top-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="w-full px-2 py-1 text-left cursor-pointer text-heading1 hover:bg-gray-100"
                        onClick={() => {
                          setEditData({
                            ...row,
                            designation: row.designation?._id || null,
                            employeeGrade: row.employeeGrade?._id || null,
                            employeeType: row.employeeType?._id || null,
                            workCalendar: row.workCalendar?._id || null,
                          });
                          setIsEditOpen(true);
                          setOpenMenuIndex(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setConfirm(true);
                          setDeleteId(row._id);
                        }}
                        className="w-full px-2 py-1 text-left text-red-500 cursor-pointer hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>,

                <Icon
                  icon="hugeicons:view"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() => handlePrint(row)}
                />,

                <Icon
                  icon="ion:print-outline"
                  onClick={() => handlePrint(row)}
                  className="text-lg cursor-pointer text-primary"
                />,

                row.employeeId,
                row.machineId,
                row.name,
                row.dob ? dayjs(row.dob).format("DD-MMM-YYYY") : "-",
                row.hireDate ? dayjs(row.hireDate).format("DD-MMM-YYYY") : "-",
                row.city,
                row.email,
                row.phone,
                row.address,
                row.designation?.name || "-",
                row.jobLocation,
              ])}
            />
          </div>
        </div>
      </div>
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Employee
              </h2>

              <button
                onClick={() => {
                  setIsEditOpen(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 p-4 md:grid-cols-2 gap-x-6 gap-y-2">
              <CustomInput
                label="Name"
                value={editData?.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
              <CustomInput
                label="Gender"
                value={editData?.gender || ""}
                onChange={(e) =>
                  setEditData({ ...editData, gender: e.target.value })
                }
              />
              <CustomInput
                label="Religion"
                value={editData?.religion || ""}
                onChange={(e) =>
                  setEditData({ ...editData, religion: e.target.value })
                }
              />
              <CustomDatePicker
                label="Hire Date"
                value={editData?.hireDate || ""}
                onChange={(value) =>
                  setEditData({ ...editData, hireDate: value })
                }
              />
              <CustomInput
                label="Father Name"
                value={editData?.fatherName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, fatherName: e.target.value })
                }
              />
              <CustomDatePicker
                label="DOB"
                value={editData?.dob || ""}
                onChange={(value) => setEditData({ ...editData, dob: value })}
              />
              <CustomInput
                label="CNIC"
                value={editData?.cnic || ""}
                onChange={(e) =>
                  setEditData({ ...editData, cnic: e.target.value })
                }
              />
              <CustomInput
                label="City"
                value={editData?.city || ""}
                onChange={(e) =>
                  setEditData({ ...editData, city: e.target.value })
                }
              />
              <CustomInput
                label="Country"
                value={editData?.country || ""}
                onChange={(e) =>
                  setEditData({ ...editData, country: e.target.value })
                }
              />
              <CustomInput
                label="Phone Number"
                value={editData?.phone || ""}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
              />
              <CustomInput
                label="Address"
                value={editData?.address || ""}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
              />
              <CustomSelectSearch
                label="Designation"
                placeholder="Select Designation"
                value={editData?.designation || ""}
                onChange={(value: any) => handleChange("designation", value)}
                options={employeeDesignation}
                loading={hrLoading}
              />
              <CustomSelectSearch
                label="Employee Grade"
                placeholder="Select Grade"
                loading={hrLoading}
                options={employeeGrades}
                value={editData?.employeeGrade || ""}
                onChange={(value: any) => handleChange("employeeGrade", value)}
              />{" "}
              <CustomSelectSearch
                label="Job Location"
                placeholder="Select Job Location"
                value={editData?.jobLocation || ""}
                onChange={(value: any) => handleChange("jobLocation", value)}
                options={jobLocationOption}
                loading={hrLoading}
              />
              <CustomSelectSearch
                label="Employee Type"
                loading={hrLoading}
                options={employeeTypeOptions}
                placeholder="Select Employee Type"
                value={editData?.employeeType || ""}
                onChange={(value: any) => handleChange("employeeType", value)}
              />
              <CustomSelectSearch
                label="Work Calendar"
                placeholder="Select workCalendar"
                value={editData?.workCalendar || ""}
                onChange={(value: any) => handleChange("workCalendar", value)}
                options={workCalendar}
                loading={hrLoading}
              />
              <CustomSelect
                label="Status"
                options={[
                  { label: "Active", value: "Active" },
                  { label: "Inactive", value: "Inactive" },
                  { label: "Terminated", value: "Terminated" },
                  { label: "On-Leave", value: "On-Leave" },
                ]}
                value={editData?.status || ""}
                onChange={(value: any) =>
                  setEditData({ ...editData, status: value })
                }
              />
              <CustomSelect
                label="Payroll Status"
                options={[
                  { label: "Active", value: "Active" },
                  { label: "On-Hold", value: "On-Hold" },
                  { label: "Terminated", value: "Terminated" },
                  { label: "Suspended", value: "Suspended" },
                ]}
                value={editData?.payrollStatus || ""}
                onChange={(value: any) =>
                  setEditData({ ...editData, payrollStatus: value })
                }
              />
            </div>
            <div className="flex justify-end gap-2 p-4">
              <button
                className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
                onClick={handleUpdate}
              >
                {updateLoading ? (
                  <>
                    <SyncLoader
                      color="#ffffff"
                      size={6}
                      speedMultiplier={0.6}
                    />
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p onClick={() => setConfirm(false)} className="cursor-pointer">
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-60">
              <p className="text-2xl font-semibold text-center">
                Delete Employees
              </p>
              <p className="mt-3 text-center text-heading1">
                Are you sure to delete this Employees?
              </p>
            </div>
            <div className="flex justify-between gap-2 p-4 pt-0">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
              <button
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                className="h-10 w-25 cursor-pointer rounded-md text-white bg-[#FF0000]"
                onClick={handleDelete}
              >
                {deleteLoading ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
