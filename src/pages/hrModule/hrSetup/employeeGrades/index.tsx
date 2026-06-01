import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getAllEmployeeGrades,
  updateEmployeeGrades,
  updateEmployeeGradesStatus,
} from "../../../../api/hrServices";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomTextarea from "../../../../components/customTextarea";
import CustomInput from "../../../../components/customInput";

export default function EmployeeGrades() {
  const { goTo } = useAppNavigate();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<boolean>(false);
  const [editModal, setEditModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    gradeName: "",
    description: "",
  });
  const {
    data: getAllGrades,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllEmployeeGrades"],
    queryFn: getAllEmployeeGrades,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const allGrades: any[] = getAllGrades?.data?.data || [];
  const handleStatusChange = (item: any) => {
    setSelectedItem(item);
    setNewStatus(!item.isActive);
    setConfirm(true);
  };
  const handleConfirmUpdate = async () => {
    try {
      setLoading(true);

      await updateEmployeeGradesStatus(selectedItem._id, {
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
  const handleEdit = (item: any) => {
    setFormData({
      id: item._id,
      gradeName: item.gradeName,
      description: item.description,
    });

    setEditModal(true);
  };
  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);

      await updateEmployeeGrades(formData.id, {
        gradeName: formData.gradeName,
        description: formData.description,
      });

      notifySuccess("Grade updated successfully");

      setEditModal(false);
      refetch();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Failed to update grade");
    } finally {
      setUpdateLoading(false);
    }
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Employee Grades
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
                goTo("/hr-module/hr-setup/employee-grades/create");
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
              headers={["Edit", "Grade Name", "Description", "Status"]}
              data={
                allGrades?.map((item: any) => [
                  <Icon
                    icon="basil:edit-outline"
                    className="text-lg cursor-pointer text-primary"
                    onClick={() => handleEdit(item)}
                  />,

                  item.gradeName,
                  item.description,
                  <Icon
                    icon={item.isActive ? "fa:toggle-on" : "fa:toggle-off"}
                    className={`cursor-pointer text-2xl ${
                      item.isActive ? "text-primary" : "text-gray-400"
                    }`}
                    onClick={() => handleStatusChange(item)}
                  />,
                ]) || []
              }
            />
          </div>
        </div>
      </div>{" "}
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
                </span>{" "}
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
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3  max-w-120 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Employee Grades
              </h2>

              <button
                onClick={() => {
                  setEditModal(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2">
              <CustomInput
                label="Grade Name"
                value={formData.gradeName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gradeName: e.target.value,
                  })
                }
                placeholder="Grade Name"
              />

              <CustomTextarea
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleUpdate}
                  disabled={updateLoading}
                  className="px-5 py-2 text-white rounded-md cursor-pointer bg-primary disabled:opacity-50"
                >
                  {updateLoading ? (
                    <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
