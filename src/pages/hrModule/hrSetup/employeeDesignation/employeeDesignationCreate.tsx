import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomInput from "../../../../components/customInput";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  addEmployeeDesignation,
  getAllEmployeeDesignation,
} from "../../../../api/hrServices";
import { SyncLoader } from "react-spinners";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";

export default function EmployeeDesignationCreate() {
  const [designationName, setDesignationName] = useState("");
  const [loading, setLoading] = useState(false);
  const { goBack, goTo } = useAppNavigate();

  const { refetch } = useQuery({
    queryKey: ["getAllEmployeeDesignation"],
    queryFn: getAllEmployeeDesignation,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const handleSave = async () => {
    if (!designationName.trim()) {
      notifyError("Designation name is required");
      return;
    }
    try {
      setLoading(true);
      const payload = { name: designationName };
      const response = await addEmployeeDesignation(payload);
      notifySuccess(
        response?.data?.message || "Employee designation created successfully",
      );
      setDesignationName("");
      refetch();
      goTo("/hr-module/hr-setup/employee-designation");
    } catch (error: any) {
      notifyError(
        error?.response?.data?.message ||
          "Failed to create employee designation",
      );
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
              Create Employee Designation
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <button
              onClick={goBack}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>

            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
              <Icon icon="ion:print-outline" className="w-5 h-5" />
              Print
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer bg-primary md:w-auto"
            >
              {loading ? (
                <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
              ) : (
                <>
                  <Icon icon="mynaui:save" className="w-5 h-5" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Employee Designation
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-24 xl:gap-y-2 xl:gap-x-40.25 lg:gap-x-40.25 lg:w-180 gap-y-2">
            <CustomInput
              label="Designation Name"
              placeholder="write here"
              value={designationName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDesignationName(e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
