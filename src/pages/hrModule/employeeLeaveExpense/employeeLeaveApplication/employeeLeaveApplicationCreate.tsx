import { Icon } from "@iconify/react";
import CustomSelect from "../../../.../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { getAllEmployees } from "../../../../api/employeesServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import {
  addLeaveApplication,
  getAllLeaveApplication,
} from "../../../../api/hrServices";

export default function EmployeeLeaveApplicationCreate() {
  const { goBack } = useAppNavigate();
  const { data: allEmployees, isLoading } = useQuery({
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    absenceReason: "",
    dateStart: "",
    dateEnd: "",
    absenceType: "",
    halfDayLeave: "",
  });

  const { refetch } = useQuery({
    queryKey: ["getAllLeaveApplication"],
    queryFn: getAllLeaveApplication,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    if (!formData.employeeId) return notifyError("Employee is required");
    if (!formData.absenceReason) return notifyError("Reason is required");
    if (!formData.dateStart) return notifyError("Start date is required");
    if (!formData.dateEnd) return notifyError("End date is required");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      employeeId: formData.employeeId,
      absenceReason: formData.absenceReason,
      dateStart: formData.dateStart,
      dateEnd: formData.dateEnd,
      absenceType: formData.absenceType,
      halfDayLeave: formData.halfDayLeave,
    };

    try {
      setLoading(true);
      await addLeaveApplication(payload);
      notifySuccess("Leave Application Created Successfully");
      await refetch();
      goBack();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Something went wrong");
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
            Create Employee Leave Application
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
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary disabled:opacity-60"
          >
            {loading ? (
              <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="mynaui:save" className="w-5 h-5" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Performance Criteria
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25  gap-y-2">
            <CustomSelectSearch
              label="Employee"
              loading={isLoading}
              placeholder="Select Employee"
              value={formData.employeeId}
              options={employeeOptions}
              onChange={(value: any) => handleChange("employeeId", value)}
            />
            <CustomInput
              label="Absence Reason"
              placeholder="Write Here"
              value={formData.absenceReason}
              onChange={(e: any) =>
                handleChange("absenceReason", e.target.value)
              }
            />
            <CustomDatePicker
              label="Start Date"
              value={formData.dateStart}
              onChange={(value: any) =>
                handleChange(
                  "dateStart",
                  value ? new Date(value).toISOString() : "",
                )
              }
            />

            <CustomSelect
              label="Absence Type"
              placeholder="Select Type"
              value={formData.absenceType}
              options={[
                { label: "Sick Leave", value: "Sick" },
                { label: "Casual Leave", value: "Casual" },
                { label: "Annual Leave", value: "Annual" },
              ]}
              onChange={(value: any) => handleChange("absenceType", value)}
            />
            <CustomSelect
              label="Half Day Leave"
              placeholder="Select"
              value={formData.halfDayLeave}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              onChange={(value: any) => handleChange("halfDayLeave", value)}
            />
            <CustomDatePicker
              label="End Date"
              value={formData.dateEnd}
              onChange={(value: any) =>
                handleChange(
                  "dateEnd",
                  value ? new Date(value).toISOString() : "",
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
