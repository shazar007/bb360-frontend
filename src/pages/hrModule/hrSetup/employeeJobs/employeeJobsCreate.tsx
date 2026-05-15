import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import {
  addEmployeeJobs,
  getAllEmployeeJobs,
} from "../../../../api/hrServices";
import { useQuery } from "@tanstack/react-query";

export default function EmployeeJobsCreate() {
  const { goBack } = useAppNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobName: "",
    description: "",
  });
  const { refetch } = useQuery({
    queryKey: ["getAllEmployeeJobs"],
    queryFn: getAllEmployeeJobs,
  });
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    if (!formData.jobName.trim()) {
      notifyError("Job Name is required");
      return false;
    }

    if (!formData.description.trim()) {
      notifyError("Description is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const payload = {
      job_name: formData.jobName,
      description: formData.description,
    };

    try {
      setLoading(true);
      await addEmployeeJobs(payload);
      notifySuccess("Job created successfully");

      setFormData({
        jobName: "",
        description: "",
      });
      goBack();
      refetch();
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
              Create Employee Jobs
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
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center justify-center w-full md:w-auto h-10 gap-2 px-6 text-white rounded-md bg-primary disabled:opacity-60"
            >
              {loading ? (
                <SyncLoader color="#fff" size={6} />
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
              Create Employee Job
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-24 xl:gap-y-2 xl:gap-x-40.25 lg:gap-x-40.25 lg:w-180 gap-y-2">
            <CustomInput
              label="Job Name"
              placeholder="write here"
              value={formData.jobName}
              onChange={(e: any) => handleChange("jobName", e.target.value)}
            />

            <CustomInput
              label="Description"
              placeholder="write here"
              value={formData.description}
              onChange={(e: any) => handleChange("description", e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
