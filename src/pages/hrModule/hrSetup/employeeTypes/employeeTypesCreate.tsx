import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import { useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import {
  addEmployeeType,
  getAllEmployeeType,
} from "../../../../api/hrServices";
import { useQuery } from "@tanstack/react-query";

export default function EmployeeTypesCreate() {
  const { goTo, goBack } = useAppNavigate();
  const [loading, setLoading] = useState(false);
  const { refetch } = useQuery({
    queryKey: ["getAllEmployeeType"],
    queryFn: getAllEmployeeType,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleSave = async () => {
    if (!formData.name.trim()) {
      notifyError("Employee type name is required");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
      };

      const response = await addEmployeeType(payload);
      notifySuccess(
        response?.data?.message || "Employee type created successfully",
      );
      goTo("/hr-module/hr-setup/employee-types");
      refetch();
    } catch (error: any) {
      notifyError(
        error?.response?.data?.message || "Failed to create employee type",
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
              Create Employee Type
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
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary disabled:opacity-50"
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
              Create Employee Type
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2  gap-24 xl:gap-y-2 xl:gap-x-40.25 lg:gap-x-40.25 lg:w-180 gap-y-2">
            <CustomInput
              label="Employee Type Name"
              placeholder="write here"
              value={formData.name}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
