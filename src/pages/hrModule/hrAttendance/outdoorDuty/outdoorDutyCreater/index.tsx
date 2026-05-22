import { Icon } from "@iconify/react";

import CustomSelect from "../../../../../components/customSelect";
import CustomInput from "../../../../../components/customInput";
import CustomDatePicker from "../../../../../components/datePicker";
import { useAppNavigate } from "../../../../../hooks/navigation";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../../../../components/toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllDepartments } from "../../../../../api/classificationServices";
import CustomSelectSearch from "../../../../../components/customSelectSearch";
import { getAllEmployees } from "../../../../../api/employeesServices";
export default function OutdoorDutyCreater() {
  const { goTo } = useAppNavigate();
  const [formData, setFormData] = useState({
    transactionNumber: "",
    employee: "",
    department: "",
    dutyType: "",
    location: "",
    date: "",
    duration: "",
    status: "pending",
  });
  const queryClient = useQueryClient();

  const handleSave = async () => {
    try {
      // await mutateAsync(formData);
      console.log("🚀 ~ formData:", formData);

      notifySuccess("Outdoor Duty created successfully");

      await queryClient.invalidateQueries({
        queryKey: ["outdoor-duty"],
      });

      // goTo("/hr-module/hr-attendance/outdoor-duty");
    } catch (error) {
      notifyError("Something went wrong");
    } finally {
      console.log("Request finished");
    }
  };
  const { data: alldepartment } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: getAllDepartments,
  });

  const AllgetDepartment = alldepartment?.data?.data || [];
  const departmentOptions = AllgetDepartment.map((dep: any) => ({
    label: dep.fullName || dep.name || "Unnamed",
    value: dep._id,
  }));
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
            Create Outdoor Duty
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={() => {
              goTo("/hr-module/hr-attendance/outdoor-duty");
            }}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Backs
          </button>
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          <button
            onClick={handleSave}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            <Icon icon="mynaui:save" className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>

      <div className="mt-3 bg-white rounded-2xl ">
        <div className="bg-[#ECF0F4] p-4 border-b border-[#D8DEE6]">
          <p className="text-xs font-semibold text-heading1">
            Create Outdoor Duty
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-20">
          <CustomInput
            label="Transaction Number"
            placeholder="TO BE GENERATED"
            value={formData.transactionNumber}
            onChange={(e: any) =>
              setFormData({ ...formData, transactionNumber: e.target.value })
            }
          />
          <CustomSelectSearch
            label="Employee"
            placeholder="Select Employee"
            loading={isLoading}
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
              }));
            }}
          />
          <CustomSelect
            label="Duty Type"
            placeholder="Select Duty Type"
            value={formData.dutyType}
            options={[
              { label: "Survey", value: "survey" },
              { label: "Meeting", value: "meeting" },
              { label: "Client Visit", value: "client_visit" },
            ]}
            onChange={(value: any) =>
              setFormData({ ...formData, dutyType: value })
            }
          />
          <CustomSelect
            label="Location"
            placeholder="Select Location"
            value={formData.location}
            options={[
              { label: "Head Office", value: "head_office" },
              { label: "City Office", value: "city_office" },
              { label: "On Site", value: "on_site" },
            ]}
            onChange={(value: any) =>
              setFormData({ ...formData, location: value })
            }
          />
          <CustomDatePicker
            label="Outdoor Duty Date"
            placeholder="Select Date"
            value={formData.date}
            onChange={(value: any) => setFormData({ ...formData, date: value })}
          />

          <CustomSelectSearch
            label="Department"
            value={formData.department}
            options={departmentOptions}
            disabled
          />
          <CustomSelect
            options={[
              { label: "1 Hour", value: "1hr" },
              { label: "2 Hours", value: "2hrs" },
              { label: "3 Hours", value: "3hrs" },
              { label: "4 Hours", value: "4hrs" },
              { label: "Full Day", value: "full_day" },
            ]}
            label="Duration"
            placeholder="Select Duration"
            value={formData.duration}
            onChange={(value: any) =>
              setFormData({ ...formData, duration: value })
            }
          />
          <CustomSelect
            label="Status"
            options={[
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ]}
            placeholder="Select Status"
            value={formData.status}
            onChange={(value: any) =>
              setFormData({ ...formData, status: value })
            }
          />
        </div>
      </div>
    </div>
  );
}
