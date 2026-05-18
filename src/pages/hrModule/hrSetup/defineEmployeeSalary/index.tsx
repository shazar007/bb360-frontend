import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomInput from "../../../../components/customInput";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import {
  getAllEmployeeSalary,
  updateEmployeeSalary,
} from "../../../../api/hrServices";
import dayjs from "dayjs";
import CustomDatePicker from "../../../../components/datePicker";

export default function DefineEmployeeSalary() {
  const { goTo } = useAppNavigate();
  const [deleteLoading] = useState(false);
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
  });
  console.log("🚀 ~ editData:", editData);
  const {
    data: getEmployeeSalary,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllEmployeeSalary"],
    queryFn: getAllEmployeeSalary,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const allEmployeeSalary: any[] = getEmployeeSalary?.data?.data || [];
  console.log("🚀 ~ allEmployeeSalary:", allEmployeeSalary);
  const handleInputChange = (field: string, value: string) => {
    setEditData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
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
      currentSalary: editData.currentSalary,
      newSalary: editData.newSalary,
      effectiveDate: editData.effectiveDate,
    };

    console.log("Update Payload => ", payload);

    try {
      setLoading(true);
      await updateEmployeeSalary(editData._id, payload);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notifySuccess("Employee Salary Updated Successfully");
      refetch();
      setOpenModal(false);
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row: any) => {
    setEditData(row);
    setOpenModal(true);
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
              loading={isLoading}
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
              ]}
              data={allEmployeeSalary.map((row, index) => [
                <div className="relative" key={index}>
                  <Icon
                    icon="qlementine-icons:menu-burger-16"
                    className="text-lg cursor-pointer text-primary"
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                  />

                  {openDropdown === index && (
                    <div
                      className="absolute z-10 w-32 py-2 bg-white rounded-md shadow-md cursor-pointer -right-20 md:-right-15 top-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleEdit(row)}
                        className="w-full px-2 py-1 text-left hover:bg-gray-100"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>,
                row.employeeId?.employeeId || "-",
                row.employeeId?.name || "-",
                row.currentSalary || "-",
                row.newSalary || "-",
                dayjs(row.expiryDate).isValid()
                  ? dayjs(row.expiryDate).format("DD-MMM-YYYY")
                  : "-",
                row.changeAmount || "0",
                row.changePercentage || "0",
              ])}
            />
          </div>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3  max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
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

              <CustomDatePicker
                label="Effective Date"
                value={editData.effectiveDate}
                onChange={(e: any) =>
                  handleInputChange("effectiveDate", e.target.value)
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
              <p className="mt-3 text-center text-heading1">
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
