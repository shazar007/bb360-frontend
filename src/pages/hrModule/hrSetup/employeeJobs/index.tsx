import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import {
  getAllEmployeeJobs,
  updateEmployeeJobs,
} from "../../../../api/hrServices";
import { notifyError, notifySuccess } from "../../../../components/toast";

export default function EmployeeJobs() {
  const { goTo } = useAppNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const {
    data: getEmployeeJobs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllEmployeeJobs"],
    queryFn: getAllEmployeeJobs,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const AllEmployeeJobs: any[] = getEmployeeJobs?.data?.data || [];
  const handleEdit = (item: any) => {
    setEditData(item);
    setOpenModal(true);
  };

  const handleChange = (field: string, value: string) => {
    setEditData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!editData?.job_name?.trim()) {
      notifyError("Job Name is required");
      return;
    }

    if (!editData?.description?.trim()) {
      notifyError("Description is required");
      return;
    }

    const payload = {
      job_name: editData.job_name,
      description: editData.description,
    };

    try {
      setLoading(true);

      await updateEmployeeJobs(editData.id, payload);
      notifySuccess("Job updated successfully");
      setOpenModal(false);
      await refetch();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Employee Jobs
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
                goTo("/hr-module/hr-setup/employee-jobs/create");
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
              headers={["Edit", "Job Name", "Description"]}
              data={
                AllEmployeeJobs?.map((item: any) => [
                  <Icon
                    icon="basil:edit-outline"
                    className="text-lg cursor-pointer text-primary"
                    onClick={() => handleEdit(item)}
                  />,
                  "Assistant Manager",
                  "For Assisting",
                ]) || []
              }
            />
          </div>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-120 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Employee Job
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
            <CustomInput
              label="Job Name"
              value={editData?.job_name || ""}
              onChange={(e: any) => handleChange("job_name", e.target.value)}
            />

            <CustomInput
              label="Description"
              value={editData?.description || ""}
              onChange={(e: any) => handleChange("description", e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                {loading ? <SyncLoader color="#fff" size={6} /> : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
