import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";
import {
  getAllDepartments,
  updateDepartmentsStatus,
} from "../../../../api/classificationServices";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import { notifyError, notifySuccess } from "../../../../components/toast";

export default function Departments() {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { goTo } = useAppNavigate();
  const {
    data: getdepartment,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: getAllDepartments,
  });
  const getAlldepartment: any[] = getdepartment?.data?.data || [];

  const handleStatusChange = (item: any) => {
    setSelectedItem(item);
    setNewStatus(!item.isActive);
    setConfirm(true);
  };
  const handleConfirmUpdate = async () => {
    try {
      setLoading(true);

      await updateDepartmentsStatus(selectedItem._id, {
        isActive: newStatus,
      });
      notifySuccess("Status updated successfully");
      setConfirm(false);
      refetch();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Departments
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
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
            <button
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm bg-white rounded-md cursor-pointer md:w-27 text-heading1"
            >
              Action
              <Icon icon="weui:arrow-filled" className="text-lg rotate-90" />
            </button>{" "}
            <button
              onClick={() => {
                goTo("/application-setup/classification/departments/create");
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-3">
            <p className="text-xs font-semibold text-primary">
              Departments_List
            </p>
          </div>
          <CustomTable
            norounded
            loading={isLoading}
            height="60vh"
            headers={["Department Name", "Parent Name", "Date", "Status"]}
            data={getAlldepartment.map((dept) => {
              return [
                dept.fullName || "-",
                dept.parentName || "-",
                dept.createdAt || "-",
                <Icon
                  icon={dept.isActive ? "fa:toggle-on" : "fa:toggle-off"}
                  className={`cursor-pointer text-2xl ${
                    dept.isActive ? "text-primary" : "text-gray-400"
                  }`}
                  onClick={() => handleStatusChange(dept)}
                />,
              ];
            })}
          />
        </div>
      </div>
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p onClick={() => setConfirm(false)} className="cursor-pointer">
                {" "}
                ✕
              </p>
            </div>
            <div className="mx-auto mt-4 w-80">
              <p className="text-2xl font-semibold text-center">
                {" "}
                Change Status
              </p>
              <p className="text-center text-heading1">
                Are you sure you want to change status to{" "}
                <span className="font-semibold">
                  {newStatus ? "Active" : "Inactive"}
                </span>
                ?
              </p>
            </div>

            <div className="flex justify-between gap-2 p-4 pt-0 mt-5">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  boxShadow: "0px 1px 12px 0px #0000001F",
                }}
                className="h-10 text-white rounded-md cursor-pointer w-25 bg-primary"
                onClick={handleConfirmUpdate}
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
      )}
    </>
  );
}
