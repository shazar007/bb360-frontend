import { Icon } from "@iconify/react";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { getAllEmployees } from "../../../../api/employeesServices";
import { useQuery } from "@tanstack/react-query";
import { useAppNavigate } from "../../../../hooks/navigation";
import {
  addEmployeeSalary,
  getAllEmployeeSalary,
} from "../../../../api/hrServices";
import { SyncLoader } from "react-spinners";

export default function DefineEmployeeSalaryCreate() {
  const [loading, setLoading] = useState(false);
  const { goBack } = useAppNavigate();

  const [formData, setFormData] = useState({
    employee: "",
    effectiveDate: "",
    currentSalary: 0,
    newSalary: 0,
  });
  const { data: allEmployees, isLoading } = useQuery({
    queryKey: ["getAllEmployees"],
    queryFn: getAllEmployees,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const { refetch } = useQuery({
    queryKey: ["getAllEmployeeSalary"],
    queryFn: getAllEmployeeSalary,
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
  const handleChange = (field: any, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "currentSalary") {
        updated.newSalary = Number(value); // example logic
      }

      return updated;
    });
  };

  const validateForm = () => {
    if (!formData.employee) {
      notifyError("Employee is required");
      return false;
    }

    if (!formData.effectiveDate) {
      notifyError("Effective Date is required");
      return false;
    }

    if (!formData.currentSalary) {
      notifyError("Current Salary is required");
      return false;
    }
    if (!formData.newSalary) {
      notifyError("New Salary is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      employeeId: formData.employee,
      effectiveDate: formData.effectiveDate,
      newSalary: formData.newSalary,
      currentSalary: formData.currentSalary,
    };

    console.log("Payload => ", payload);

    try {
      setLoading(true);
      const response = await addEmployeeSalary(payload);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      notifySuccess("Employee Salary Created Successfully");
      refetch();
      goBack();
      console.log(payload);
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 bg-bgprimary rounded-2xl">
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Create Employee Salary
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
              onClick={goBack}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>
            <button
              style={{
                boxShadow: "0px 1px 12px 0px #0000001F",
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="mage:filter" className="text-lg" />
              Filters
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                boxShadow: "0px 1px 12px 0px #0000001F",
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27 disabled:opacity-50"
            >
              {loading ? (
                <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
              ) : (
                <>
                  <Icon icon="basil:add-outline" className="text-lg" />
                  Create
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Employee Salary
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25">
            <CustomSelectSearch
              label="Employee"
              loading={isLoading}
              placeholder="Select Employee"
              value={formData.employee}
              options={employeeOptions}
              onChange={(value: any) => handleChange("employee", value)}
            />
            <CustomInput
              label="Current Salary"
              placeholder="Enter Current Salary in PKR"
              value={formData.currentSalary}
              onChange={(e) => handleChange("currentSalary", e.target.value)}
            />

            <CustomInput
              label="New Salary"
              placeholder="Enter New Salary in PKR"
              value={formData.newSalary}
              onChange={(e) => handleChange("newSalary", e.target.value)}
              disabled
            />
            <CustomDatePicker
              label="Effective Date"
              value={formData.effectiveDate}
              onChange={(value: any) => handleChange("effectiveDate", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
