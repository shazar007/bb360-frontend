import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomSelectSearch from "../../../../components/customSelectSearch";

import CustomSelect from "../../../../components/customSelect";
import Filter from "../../../../components/customDatefilter";
import CustomDatePicker from "../../../../components/datePicker";
import { useSelector } from "react-redux";
import { selectDepartments, selectEmployees } from "../../../../redux/store";

export default function DailyAttendanceRegister() {
  const [openFilter, setOpenFilter] = useState(false);
  const [formData, setFormData] = useState<{
    department: string;
    designation: string;
    employee: string;
    shift: string;
    fromDate: string;
    toDate: string;
  }>({
    department: "",
    designation: "",
    employee: "",
    shift: "",
    fromDate: "",
    toDate: "",
  });

  const departments = useSelector(selectDepartments);

  const departmentOptions = departments.map((dep: any) => ({
    label: dep.name,
    value: dep._id,
  }));
  const employees = useSelector(selectEmployees);

  const employeeOptions = employees.map((emp) => ({
    label: emp.name,
    value: emp._id,
  }));
  const designationOptions = [
    { label: "Manager", value: "manager" },
    { label: "Officer", value: "officer" },
  ];

  const shiftOptions = [
    { label: "Morning", value: "morning" },
    { label: "Evening", value: "evening" },
  ];

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Daily Attendance Register
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <div className="relative w-full md:w-40">
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
            onClick={() => setOpenFilter(!openFilter)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:refresh-outline" className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3  bg-white rounded-2xl">
        <div className="px-4 py-3 bg-[#ECF0F4] border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-heading1">
            Select Daily Attendance
          </p>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-24 xl:w-250 lg:w-220 gap-y-2">
          <CustomSelectSearch
            label="Department"
            options={departmentOptions}
            loading={departments.length === 0}
            value={formData.department}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, department: value }))
            }
          />

          <CustomSelect
            label="Designation"
            placeholder="Monthly Wages"
            value={formData.designation}
            options={designationOptions}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, designation: value }))
            }
          />

          <CustomDatePicker
            label="From Date"
            value={formData.fromDate}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, fromDate: value }))
            }
          />

          <CustomSelectSearch
            label="Employee Name"
            loading={employees.length === 0}
            placeholder="Select Employee"
            options={employeeOptions}
            value={formData.employee}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, employee: value }))
            }
          />
          <CustomSelect
            label="Shift"
            placeholder="Morning"
            value={formData.shift}
            options={shiftOptions}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, shift: value }))
            }
          />

          <CustomDatePicker
            label="To Date"
            value={formData.toDate}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, toDate: value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
