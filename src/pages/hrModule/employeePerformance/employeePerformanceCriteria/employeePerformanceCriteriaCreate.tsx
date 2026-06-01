import { Icon } from "@iconify/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CustomSelect from "../../../.../../../components/customSelect";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  addEmployeePerformanceCriteria,
  getAllEmployeePerformanceCriteria,
  getAllEmployeeType,
} from "../../../../api/hrServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import CustomInput from "../../../../components/customInput";
import { SyncLoader } from "react-spinners";

export default function EmployeePerformanceCriteriaCreate() {
  const { goBack } = useAppNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeType: "",
    criteria: "",
    isGroup: "",
    parent: "",
    total: "",
  });

  const {
    data: getALLPerformanceCriteria,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllEmployeePerformanceCriteria"],
    queryFn: getAllEmployeePerformanceCriteria,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const handleSubmit = async () => {
    try {
      if (!formData.employeeType) {
        return notifyError("Employee Type required");
      }

      setLoading(true);

      await addEmployeePerformanceCriteria(formData);

      notifySuccess("Saved Successfully");

      await refetch();

      goBack();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const totalOptions = Array.from({ length: 10 }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
  }));
  const { data: getAllEmployeType } = useQuery({
    queryKey: ["getAllEmployeeType"],
    queryFn: getAllEmployeeType,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const AllEmployeType: any[] = getAllEmployeType?.data?.data || [];
  const departmentsOptions = AllEmployeType.map((emp: any) => ({
    label: emp.name,
    value: emp._id,
  }));

  const performanceCriteria: any[] =
    getALLPerformanceCriteria?.data?.data || [];
  const performanceCriteriaOption = performanceCriteria.map((emp: any) => ({
    label: emp.criteria,
    value: emp._id,
  }));
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Add / Edit Employee Performance Criteria
          </p>
        </div>

        <div className="flex flex-col w-full gap-2 md:w-auto md:flex-row">
          <button
            onClick={goBack}
            className="flex items-center cursor-pointer justify-center w-full h-10 gap-2 px-6 text-white rounded-md bg-secondary md:w-auto"
          >
            <Icon icon="ion:play-back-outline" />
            Back
          </button>

          <button className="flex items-center justify-center w-full h-10 gap-2 px-6 bg-white rounded-md shadow text-heading1 md:w-auto">
            <Icon icon="ion:print-outline" />
            Print
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer bg-primary md:w-auto disabled:opacity-60"
          >
            {loading ? (
              <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="mynaui:save" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-bgprimary">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="rounded-t-2xl bg-[#ECF0F4] p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Performance Criteria
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3 xl:w-250 xl:gap-x-40.25">
            <CustomSelectSearch
              label="Employee Type"
              placeholder="Select Employee"
              options={departmentsOptions}
              value={formData.employeeType}
              onChange={(val: any) =>
                setFormData({ ...formData, employeeType: val })
              }
            />

            <CustomSelectSearch
              label="Criteria"
              placeholder="Select Criteria"
              loading={isLoading}
              options={performanceCriteriaOption}
              value={formData.criteria}
              onChange={(val: any) => {
                const selected = performanceCriteria.find(
                  (item) => item._id === val,
                );
                setFormData({
                  ...formData,
                  criteria: val,
                  parent: selected?.parent?._id || "-",
                });
              }}
            />
            <CustomSelect
              label="Is Group"
              placeholder="Yes / No"
              value={formData.isGroup}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              onChange={(val: any) =>
                setFormData({ ...formData, isGroup: val })
              }
            />
            <CustomInput
              label="Parent"
              placeholder="Select Parent"
              value={formData.parent}
              onChange={(val: any) => setFormData({ ...formData, parent: val })}
            />
            <CustomSelect
              label="Total"
              placeholder="Select Total"
              value={formData.total}
              options={totalOptions}
              onChange={(val: any) => setFormData({ ...formData, total: val })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
