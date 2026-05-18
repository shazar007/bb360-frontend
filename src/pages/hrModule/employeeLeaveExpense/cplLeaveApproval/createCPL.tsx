import { Icon } from "@iconify/react";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import CustomSelect from "../../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../../api/employeesServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";

export default function CreateCPL() {
  const { goBack } = useAppNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    employee: "",
    workCalendar: "",
    shiftHours: "",
    attendanceDate: "",
    timeIn: "",
    timeOut: "",
    workingHours: "",
    cplApproved: "",
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
  const AllEmployee: any[] = allEmployees?.data?.data || [];
  const employeeOptions = AllEmployee.map((emp: any) => ({
    label: emp.name,
    value: emp._id,
  }));
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
            // onClick={handleSubmit}
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
              Create CPL Approved
            </p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25 gap-y-2">
            {/* Department */}
            <CustomSelect
              label="Department"
              placeholder="Select Department"
              value={formData.department}
              options={[
                { label: "HR", value: "HR" },
                { label: "Finance", value: "Finance" },
                { label: "IT", value: "IT" },
              ]}
              onChange={(value: any) =>
                setFormData({ ...formData, department: value })
              }
            />

            <CustomSelectSearch
              label="Employee"
              loading={isLoading}
              placeholder="Select Employee"
              value={formData.employee}
              options={employeeOptions}
              onChange={(value: any) =>
                setFormData({ ...formData, employee: value })
              }
            />
            <CustomSelect
              label="Work Calendar"
              placeholder="Select Calendar"
              value={formData.workCalendar}
              options={[
                { label: "Standard Calendar", value: "standard" },
                { label: "Ramadan Calendar", value: "ramadan" },
              ]}
              onChange={(value: any) =>
                setFormData({ ...formData, workCalendar: value })
              }
            />

            <CustomInput
              label="Shift Hours"
              placeholder="e.g. 9"
              value={formData.shiftHours}
              onChange={(e: any) =>
                setFormData({ ...formData, shiftHours: e.target.value })
              }
            />

            <CustomDatePicker
              label="Attendance Date"
              value={formData.attendanceDate}
              onChange={(value: any) =>
                setFormData({ ...formData, attendanceDate: value })
              }
            />

            <CustomInput
              label="Time In"
              placeholder="e.g. 09:00 AM"
              value={formData.timeIn}
              onChange={(e: any) =>
                setFormData({ ...formData, timeIn: e.target.value })
              }
            />

            <CustomInput
              label="Time Out"
              placeholder="e.g. 06:00 PM"
              value={formData.timeOut}
              onChange={(e: any) =>
                setFormData({ ...formData, timeOut: e.target.value })
              }
            />

            <CustomInput
              label="Working Hours"
              placeholder="Auto / Manual"
              value={formData.workingHours}
              onChange={(e: any) =>
                setFormData({ ...formData, workingHours: e.target.value })
              }
            />

            <CustomSelect
              label="CPL Approved"
              placeholder="Select"
              value={formData.cplApproved}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              onChange={(value: any) =>
                setFormData({ ...formData, cplApproved: value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
