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

const tableData = [
  {
    employeeId: "EMP-000121",
    name: "Salman Ahmed",
    gender: "male",
    religion: "Islam",
    hireDate: "15-Jan-2023",
    fatherName: "Muhammad Ahmed",
    dob: "12-Aug-1992",
    cnic: "35202-1234567-1",
    city: "Lahore",
    country: "Pakistan",
    phoneNumber: "+92 300 1234567",
    address: "Model Town, Lahore",
    designation: "Software Engineer",
    employeeGrade: "B2",
    departmentName: "IT Department",
    locationName: "Head Office Lahore",
    employeeType: "Full Time",
    definePayroll: "Monthly",
    status: "Active",
    email: "salman.ahmed@gmail.com",
  },
  {
    employeeId: "EMP-000122",
    name: "Amina Khan",
    gender: "female",
    religion: "Islam",
    hireDate: "10-Mar-2022",
    fatherName: "Imran Khan",
    dob: "05-May-1994",
    cnic: "35201-7654321-9",
    city: "Karachi",
    country: "Pakistan",
    phoneNumber: "+92 321 9876543",
    address: "DHA Phase 5, Karachi",
    designation: "HR Manager",
    employeeGrade: "A2",
    departmentName: "Human Resources",
    locationName: "Karachi Office",
    employeeType: "Full Time",
    definePayroll: "Monthly",
    status: "Active",
    email: "amina.khan@gmail.com",
  },
];
export default function Employees() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { data: allEmployees } = useQuery({
    queryKey: ["getAllEmployees"],
    queryFn: getAllEmployees,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
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
            <div class="info"><b>Date of Birth:</b> ${item.dob || "-"}</div>
            <div class="info"><b>CNIC No.:</b> ${item.cnic || "-"}</div>
            <div class="info"><b>Designation:</b> ${item.designation || "-"}</div>
            <div class="info"><b>Employee Grade:</b> ${item.employeeGrade || "-"}</div>
            <div class="info"><b>Employee Type:</b> ${item.employeeType || "-"}</div>
            <div class="info"><b>Department:</b> ${item.departmentName || "-"}</div>
            <div class="info"><b>Location:</b> ${item.locationName || "-"}</div>
            <div class="info"><b>Hire Date:</b> ${item.hireDate || "-"}</div>
            <div class="info"><b>Status:</b> ${item.status || "-"}</div>
            <div class="info"><b>Email:</b> ${item.email || "-"}</div>
            <div class="info"><b>Phone:</b> ${item.phoneNumber || "-"}</div>
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
        hireDate: editData.hireDate,
        fatherName: editData.fatherName,
        dob: editData.dob,
        cnic: editData.cnic,
        city: editData.city,
        country: editData.country,
        phoneNumber: editData.phoneNumber,
        address: editData.address,
        designation: editData.designation,
        employeeGrade: editData.employeeGrade,
        departmentName: editData.departmentName,
        locationName: editData.locationName,
        employeeType: editData.employeeType,
        definePayroll: editData.definePayroll,
        status: editData.status,
        email: editData.email,
      };
      console.log("Update Payload =>", payload);
      // await updateEmployeeApi(payload)
      notifySuccess("Employee updated successfully");
      setIsEditOpen(false);
    } catch (error) {
      console.log(error);
      notifyError("Failed to update employee");
    } finally {
      setUpdateLoading(false);
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
              loading={false}
              height="60vh"
              headers={[
                "Edit",
                "View",
                "Report",
                "Employee ID",
                "Employee Name",
                "DOB",
                "Hire Date",
                "City",
                "Email",
                "Phone",
                "Address",
                "Job Title",
                "Department",
                "Location",
              ]}
              data={tableData.map((row, index) => [
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
                      className="absolute z-10 w-32 py-2 bg-white rounded-md shadow-md -right-20 top-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setEditData(row);
                          setIsEditOpen(true);
                          setOpenMenuIndex(null);
                        }}
                        className="w-full px-2 py-1 text-left cursor-pointer hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button className="w-full px-2 py-1 text-left text-red-500 cursor-pointer hover:bg-gray-100">
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
                row.name,
                row.dob,
                row.hireDate,
                row.city,
                row.email,
                row.phoneNumber,
                row.address,
                row.designation,
                row.departmentName,
                row.locationName,
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
            <div className="grid grid-cols-2 p-4 gap-x-6 gap-y-2">
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
                value={editData?.phoneNumber || ""}
                onChange={(e) =>
                  setEditData({ ...editData, phoneNumber: e.target.value })
                }
              />
              <CustomInput
                label="Address"
                value={editData?.address || ""}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
              />
              <CustomInput
                label="Designation"
                value={editData?.designation || ""}
                onChange={(e) =>
                  setEditData({ ...editData, designation: e.target.value })
                }
              />
              <CustomInput
                label="Department"
                value={editData?.departmentName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, departmentName: e.target.value })
                }
              />
              <CustomInput
                label="Location"
                value={editData?.locationName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, locationName: e.target.value })
                }
              />
              <CustomInput
                label="Status"
                value={editData?.status || ""}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
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
    </>
  );
}
