import { useState } from "react";
import { Icon } from "@iconify/react";
import Filter from "../../../../components/customDatefilter";
import CustomDatePicker from "../../../../components/datePicker";
import { SyncLoader } from "react-spinners";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { getAllEmployees } from "../../../../api/employeesServices";
import { useQuery } from "@tanstack/react-query";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { selectDepartments } from "../../../../redux/store";
import { useSelector } from "react-redux";

type Option = {
  label: string;
  value: string;
};

export default function SalaryIncrementReport() {
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const departments = useSelector(selectDepartments);

  const departmentOptions = departments.map((dep: any) => ({
    label: dep.name,
    value: dep._id,
  }));

  const { data: allEmployees, isLoading: isEmployeeLoading } = useQuery({
    queryKey: ["getAllEmployees"],
    queryFn: getAllEmployees,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const AllEmployee: any[] = allEmployees?.data?.data || [];

  const employeeOptions = AllEmployee.map((emp: any) => ({
    label: emp.name,
    value: emp._id,
  }));
  const [formData, setFormData] = useState<{
    employee: Option | null;
    department: Option | null;
    fromDate: string;
    toDate: string;
  }>({
    employee: null,
    department: null,
    fromDate: "",
    toDate: "",
  });

  const handleSave = async () => {
    const payload = {
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      employee: formData.employee?.value || "",
      department: formData.department?.value || "",
    };

    console.log("Payload =>", payload);

    try {
      setLoading(true);

      // await addSalaryIncrementReport(payload);

      notifySuccess("Salary Increment Report saved successfully");
    } catch (error) {
      console.error("Error =>", error);
      notifyError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Salary Increment Report
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-white rounded-md">
            <Icon icon="ion:refresh-outline" className="w-5 h-5" />
            Reset
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full md:w-28 cursor-pointer flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md"
          >
            {loading ? (
              <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3 bg-white rounded-2xl">
        <div className="px-4 py-3 bg-[#ECF0F4] border-b">
          <p className="text-xs font-semibold text-heading1">
            Select Salary Increment Report
          </p>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-y-2 xl:gap-x-24 xl:w-170 lg:gap-x-20 lg:w-170 gap-y-2">
          <CustomSelectSearch
            label="Employee Name"
            loading={isEmployeeLoading}
            options={employeeOptions}
            value={formData.employee?.value || ""}
            onChange={(value: string) => {
              const selected = employeeOptions.find((o) => o.value === value);

              setFormData({
                ...formData,
                employee: selected || null,
              });
            }}
          />
          <CustomSelectSearch
            label="Department"
            loading={departmentOptions.length === 0}
            options={departmentOptions}
            value={formData.department?.value || ""}
            onChange={(value: string) => {
              const selected = departmentOptions.find((o) => o.value === value);

              setFormData((prev) => ({
                ...prev,
                department: selected || null,
              }));
            }}
          />

          <CustomDatePicker
            label="From Date"
            value={formData.fromDate}
            onChange={(value: string) =>
              setFormData((prev) => ({
                ...prev,
                fromDate: value,
              }))
            }
          />

          <CustomDatePicker
            label="To Date"
            value={formData.toDate}
            onChange={(value: string) =>
              setFormData((prev) => ({
                ...prev,
                toDate: value,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
