import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import CustomDatePicker from "../../../../components/datePicker";

export default function DefineEmployeeSalaryCreate() {
  return (
    <div className="bg-[#f6f6f6] rounded-2xl mt-3">
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
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
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="mage:filter" className="text-lg" />
              Filters
            </button>

            <button
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-40"
            >
              <Icon icon="basil:add-outline" className="text-lg" />
              Upload Increment
            </button>

            <button
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              <Icon icon="basil:add-outline" className="text-lg" />
              Create
            </button>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Employee Salary
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-40.25">
            <div className="space-y-2">
              <CustomSelect
                className="w-full h-10 px-4 rounded-md bg-[#ECF0F4]"
                label="Employee"
                placeholder="Lorem Ipsum"
              />

              <CustomDatePicker
                className="w-full h-10 px-4 rounded-md bg-[#ECF0F4]"
                label="Creation Date"
                placeholder="01-Mar-2026"
              />
            </div>

            <div className="space-y-2">
              <CustomSelect
                className="w-full h-10 px-4 rounded-md bg-[#ECF0F4]"
                label="Start Hour"
                placeholder="09:00 AM"
              />

              <CustomSelect
                className="w-full h-10 px-4 rounded-md bg-[#ECF0F4]"
                label="End Hour"
                placeholder="09:00 AM"
              />
            </div>

            <div className="space-y-2">
              <CustomSelect
                className="w-full h-10 px-4 rounded-md bg-[#ECF0F4]"
                label="Work Hours Per Day"
                placeholder="8hr"
              />

              <CustomSelect
                className="w-full h-10 px-4 rounded-md bg-[#ECF0F4]"
                label="Half Mark After"
                placeholder="12:30 PM"
              />
            </div>

            <div className="space-y-2">
              <CustomInput
                className="w-full h-10 px-4 rounded-md bg-[#ECF0F4]"
                label="Full Duty Minimum Min"
                placeholder="-"
              />

              <CustomInput
                className="w-full h-10 px-4 rounded-md bg-[#ECF0F4]"
                label="Half Duty Minimum Min"
                placeholder="-"
              />
            </div>
          </div>
        </div>

        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">Working Days</p>
          </div>

          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-y-6">
            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />
              <p className="text-xs text-heading1">Monday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />
              <p className="text-xs text-heading1">Tuesday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />
              <p className="text-xs text-heading1">Wednesday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />
              <p className="text-xs text-heading1">Thursday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />
              <p className="text-xs text-heading1">Friday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />
              <p className="text-xs text-heading1">Saturday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />
              <p className="text-xs text-heading1">Sunday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
