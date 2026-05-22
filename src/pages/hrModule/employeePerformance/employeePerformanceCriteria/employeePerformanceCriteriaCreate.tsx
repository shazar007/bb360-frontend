import { Icon } from "@iconify/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CustomSelect from "../../../.../../../components/customSelect";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";

import { getAllEmployees } from "../../../../api/employeesServices";
import { getAllEmployeePerformanceCriteria } from "../../../../api/hrServices";

export default function EmployeePerformanceCriteriaCreate() {
  const { goBack } = useAppNavigate();

  const [formData, setFormData] = useState({
    employeeType: "",
    criteria: "",
    isGroup: "",
    parent: "",
    total: "",
  });

  const { data: employeesData } = useQuery({
    queryKey: ["getAllEmployees"],
    queryFn: getAllEmployees,
    staleTime: Infinity,
  });

  const employees = employeesData?.data?.data || [];

  const employeeOptions = employees.map((emp: any) => ({
    label: emp.name,
    value: emp._id,
  }));

  const handleSubmit = () => {
    try {
      if (!formData.employeeType) {
        return notifyError("Employee Type required");
      }

      console.log("Payload:", formData);

      notifySuccess("Saved Successfully");
    } catch (error: any) {
      notifyError(error?.message || "Something went wrong");
    }
  };

  const totalOptions = Array.from({ length: 10 }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
  }));

  return (
    <div className="mt-2">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Add / Edit Employee Performance Criteria
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <button
            onClick={goBack}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 text-white md:w-auto"
          >
            <Icon icon="ion:play-back-outline" />
            Back
          </button>

          <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-white px-6 text-heading1 shadow md:w-auto">
            <Icon icon="ion:print-outline" />
            Print
          </button>

          <button
            onClick={handleSubmit}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-white md:w-auto"
          >
            <Icon icon="mynaui:save" />
            Save
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="mt-3 rounded-2xl bg-bgprimary">
        <div className="mt-2 rounded-2xl bg-white">
          <div className="rounded-t-2xl bg-[#ECF0F4] p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Performance Criteria
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3 xl:w-250 xl:gap-x-40.25">
            <CustomSelect
              label="Employee Type"
              placeholder="Select Employee"
              options={employeeOptions}
              value={formData.employeeType}
              onChange={(val: any) =>
                setFormData({ ...formData, employeeType: val })
              }
            />

            <CustomSelect
              label="Criteria"
              placeholder="Select Criteria"
              value={formData.criteria}
              onChange={(val: any) =>
                setFormData({ ...formData, criteria: val })
              }
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

            <CustomSelect
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
