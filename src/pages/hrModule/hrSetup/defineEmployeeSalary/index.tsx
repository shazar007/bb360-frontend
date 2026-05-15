import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomInput from "../../../../components/customInput";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";

export default function DefineEmployeeSalary() {
  const { goTo } = useAppNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editData, setEditData] = useState<any>({
    id: "",
    employeeId: "",
    employeeName: "",
    currentSalary: "",
    newSalary: "",
    effectiveDate: "",
    changeAmount: "",
    changePercent: "",
    creationDate: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!editData.employeeId) {
      notifyError("Employee ID is required");
      return;
    }

    if (!editData.employeeName) {
      notifyError("Employee Name is required");
      return;
    }

    if (!editData.currentSalary) {
      notifyError("Current Salary is required");
      return;
    }

    if (!editData.newSalary) {
      notifyError("New Salary is required");
      return;
    }

    if (!editData.effectiveDate) {
      notifyError("Effective Date is required");
      return;
    }

    const payload = {
      id: editData.id,
      employee_id: editData.employeeId,
      employee_name: editData.employeeName,
      current_salary: editData.currentSalary,
      new_salary: editData.newSalary,
      effective_date: editData.effectiveDate,
      change_amount: editData.changeAmount,
      change_percent: editData.changePercent,
      creation_date: editData.creationDate,
    };

    console.log("Update Payload => ", payload);

    try {
      setLoading(true);

      // API CALL
      // await updateEmployeeSalary(payload);

      // demo delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notifySuccess("Employee Salary Updated Successfully");

      setOpenModal(false);
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const salaryData = [
    {
      id: 1,
      employeeId: "EMP-1226",
      employeeName: "Mohamed Sayah",
      currentSalary: "50,000",
      newSalary: "60,000",
      effectiveDate: "20-May-2026",
      changeAmount: "10,000",
      changePercent: "20%",
      creationDate: "13-March-2025",
    },

    {
      id: 2,
      employeeId: "EMP-1526",
      employeeName: "Bilal Hassan",
      currentSalary: "70,000",
      newSalary: "80,000",
      effectiveDate: "25-May-2026",
      changeAmount: "10,000",
      changePercent: "14%",
      creationDate: "15-March-2025",
    },
  ];

  const handleEdit = (row: any) => {
    setEditData(row);
    setOpenModal(true);
    setOpenDropdown(null);
  };

  const handleDelete = (id: number) => {
    console.log("Delete ID => ", id);

    setOpenDropdown(null);
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Define Employee Salary
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
                goTo("/hr-module/hr-setup/define-employee-salary/upload");
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary rounded-md text-white cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Upload Increment
            </button>

            <button
              onClick={() => {
                goTo("/hr-module/hr-setup/define-employee-salary/create");
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
                "Action",
                "Employee ID",
                "Employee Name",
                "Current Salary",
                "New Salary",
                "Effective From Date",
                "Change Amount",
                "Change %",
                "Creation Date",
              ]}
              data={salaryData.map((row, index) => [
                <div className="relative" key={row.id}>
                  <Icon
                    icon="qlementine-icons:menu-burger-16"
                    className="text-lg cursor-pointer text-primary"
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                  />

                  {openDropdown === index && (
                    <div
                      className="absolute z-10 w-32 py-2 bg-white rounded-md shadow-md cursor-pointer -right-15 top-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleEdit(row)}
                        className="w-full px-2 py-1 text-left hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setConfirm(true);
                        }}
                        className="w-full px-2 py-1 text-left text-red-500 cursor-pointer hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>,
                row.employeeId,
                row.employeeName,
                row.currentSalary,
                row.newSalary,
                row.effectiveDate,
                row.changeAmount,
                row.changePercent,
                row.creationDate,
              ])}
            />
          </div>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Employee Salary
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              <CustomInput
                label="Employee ID"
                value={editData.employeeId}
                onChange={(e: any) =>
                  handleInputChange("employeeId", e.target.value)
                }
              />

              <CustomInput
                label="Employee Name"
                value={editData.employeeName}
                onChange={(e: any) =>
                  handleInputChange("employeeName", e.target.value)
                }
              />

              <CustomInput
                label="Current Salary"
                value={editData.currentSalary}
                onChange={(e: any) =>
                  handleInputChange("currentSalary", e.target.value)
                }
              />

              <CustomInput
                label="New Salary"
                value={editData.newSalary}
                onChange={(e: any) =>
                  handleInputChange("newSalary", e.target.value)
                }
              />

              <CustomInput
                label="Effective Date"
                value={editData.effectiveDate}
                onChange={(e: any) =>
                  handleInputChange("effectiveDate", e.target.value)
                }
              />

              <CustomInput
                label="Change Amount"
                value={editData.changeAmount}
                onChange={(e: any) =>
                  handleInputChange("changeAmount", e.target.value)
                }
              />

              <CustomInput
                label="Change %"
                value={editData.changePercent}
                onChange={(e: any) =>
                  handleInputChange("changePercent", e.target.value)
                }
              />

              <CustomInput
                label="Creation Date"
                value={editData.creationDate}
                onChange={(e: any) =>
                  handleInputChange("creationDate", e.target.value)
                }
              />
            </div>

            <div className="flex justify-end p-4">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
              >
                {loading ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}{" "}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p onClick={() => setConfirm(false)} className="cursor-pointer">
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-80">
              <p className="text-2xl font-semibold text-center">
                Delete Employee Salary
              </p>
              <p className="text-center text-heading1 mt-3">
                Are you sure to delete this Employee Salary?
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
                // onClick={handleDelete}
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
