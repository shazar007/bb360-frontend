import { useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { Icon } from "@iconify/react";
import {
  addEmployeeGrades,
  getAllEmployeeGrades,
} from "../../../../api/hrServices";
import CustomInput from "../../../../components/customInput";
import { SyncLoader } from "react-spinners";

export default function EmployeeGradesCreate() {
  const { goBack, goTo } = useAppNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    gradeName: "",
    description: "",
  });
  const { data, refetch } = useQuery({
    queryKey: ["getAllEmployeeGrades"],
    queryFn: getAllEmployeeGrades,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  const handleSave = async () => {
    if (!formData.gradeName.trim()) {
      notifyError("Grade name is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        gradeName: formData.gradeName,
        description: formData.description,
      };

      const response = await addEmployeeGrades(payload);

      notifySuccess(response?.data?.message || "Grade created successfully");

      setFormData({ gradeName: "", description: "" });

      await refetch();

      goTo("/hr-module/hr-setup/employee-grades");
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Failed to create grade");
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
              Create Employee Grades
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
              Create Employee Grades
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-24 xl:gap-y-2 xl:gap-x-40.25 lg:gap-x-40.25 lg:w-180 gap-y-2">
            <CustomInput
              label="Grade Name"
              placeholder="17 grade etc."
              value={formData.gradeName}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  gradeName: e.target.value,
                })
              }
            />

            <CustomInput
              label="Description"
              placeholder="write here"
              value={formData.description}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
