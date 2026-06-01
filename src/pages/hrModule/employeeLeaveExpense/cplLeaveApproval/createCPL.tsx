import { Icon } from "@iconify/react";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEmployees } from "../../../../api/employeesServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { addCPLApproved, getAllWorkCalendar } from "../../../../api/hrServices";
import CustomTimePicker from "../../../../components/timePicker";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { selectDepartments } from "../../../../redux/store";
import { useSelector } from "react-redux";

export default function CreateCPL() {
  const { goBack } = useAppNavigate();
  const [loading] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    employee: "",
    workCalendar: "",
    shiftHours: "",
    attendanceDate: "",
    timeIn: "",
    timeOut: "",
    workingHours: "",
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
  const queryClient = useQueryClient();
  const createCPLMutation = useMutation({
    mutationFn: addCPLApproved,

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getAllCPLApproved"],
      });
      notifySuccess("CPL Created Successfully");
      goBack();
    },

    onError: (error: any) => {
      console.log("Create CPL Error:", error);
      notifyError(
        error?.response?.data?.message ||
          "Something went wrong while creating CPL",
      );
    },
  });

  const handleSubmit = () => {
    const payload = {
      department: formData.department,
      employee: formData.employee,
      workCalendar: formData.workCalendar,
      shiftHours: Number(formData.shiftHours),
      attendanceDate: formData.attendanceDate,
      timeIn: formData.timeIn,
      timeOut: formData.timeOut,
      workingHours: Number(formData.workingHours),
    };

    createCPLMutation.mutate(payload);
  };
  const { data: allworkCalendar } = useQuery({
    queryKey: ["getAllWorkCalendar"],
    queryFn: getAllWorkCalendar,
  });

  const workCalendarOptions = (allworkCalendar?.data?.data || []).map(
    (cal: any) => ({
      label: cal.name,
      value: cal._id,
    }),
  );
  const departments = useSelector(selectDepartments);

  const departmentOptions = departments.map((dep: any) => ({
    label: dep.name,
    value: dep._id,
  }));
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create CPL Approved
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
              Create CPL Approved
            </p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25 gap-y-2">
            <CustomSelectSearch
              label="Employee"
              loading={isLoading}
              placeholder="Select Employee"
              value={formData.employee}
              options={employeeOptions}
              onChange={(value: any) => {
                const selectedEmployee = AllEmployee.find(
                  (emp: any) => emp._id === value,
                );

                setFormData((prev) => ({
                  ...prev,
                  employee: value,
                  department:
                    selectedEmployee?.department?._id ||
                    selectedEmployee?.department ||
                    "",
                  workCalendar:
                    selectedEmployee?.workCalendar?._id ||
                    selectedEmployee?.workCalendar ||
                    "",
                }));
              }}
            />
            <CustomSelectSearch
              label="Department"
              value={formData.department}
              options={departmentOptions}
              disabled
            />
            <CustomSelectSearch
              label="Work Calendar"
              value={formData.workCalendar}
              options={workCalendarOptions}
              disabled
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
            <CustomTimePicker
              label="Time In"
              placeholder="e.g. 09:00 AM"
              value={formData.timeIn}
              onChange={(value: any) => {
                setFormData((prev) => ({
                  ...prev,
                  timeIn: value,
                }));
              }}
            />
            <CustomTimePicker
              label="Time Out"
              placeholder="e.g. 06:00 PM"
              value={formData.timeOut}
              onChange={(value: any) => {
                setFormData((prev) => ({
                  ...prev,
                  timeOut: value,
                }));
              }}
            />
            <CustomInput
              label="Working Hours"
              placeholder="Auto / Manual"
              value={formData.workingHours}
              onChange={(e: any) =>
                setFormData({ ...formData, workingHours: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
