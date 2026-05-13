import { Icon } from "@iconify/react";

import CustomSelect from "../../../.../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";

export default function EmployeesCreate() {
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Employees
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
            <Icon icon="basil:add-outline" className="text-lg" />
            Upload
          </button>

          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-45"
          >
            <Icon icon="basil:add-outline" className="text-lg" />
            Download Template
          </button>
        </div>
      </div>

      <div className="bg-bgprimary rounded-2xl mt-3">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Personal Information
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25">
            <CustomInput
              label="Transaction Number"
              placeholder="TO BE GENERATE"
            />
            <CustomInput label="Name" placeholder="Lorem Ipsum" />{" "}
            <CustomSelect label="Gender" placeholder="Male / Female" />{" "}
            <CustomInput label="Religion" placeholder="-" />
            <CustomDatePicker label="Hire Date" placeholder="01-Mar-2026" />
            <CustomInput label="Father Name" placeholder="Lorem Ipsum" />
            <CustomDatePicker label="DOB" placeholder="01-Mar-2026" />
            <CustomInput label="CNIC" placeholder="-" />
          </div>
        </div>

        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Email / Phone / Address
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 xl:gap-y-2 xl:gap-x-40.25 w-full lg:w-[46.5%]">
            <CustomDatePicker label="City" placeholder="01-Mar-2026" />

            <CustomDatePicker label="Country" placeholder="01-Mar-2026" />
            <CustomInput label="Phone Number" placeholder="Lorem Ipsum" />

            <CustomInput label="Address" placeholder="Lorem Ipsum" />
          </div>
        </div>
      </div>

      <div className="mt-2 bg-white rounded-2xl">
        <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
          <p className="text-xs font-semibold text-heading1">Job Detail</p>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25">
          <CustomSelect label="Designation" placeholder="Lorem Ipsum" />

          <CustomDatePicker label="Employee Grade" placeholder="01-Mar-2026" />
          <CustomInput label="Department Name" placeholder="Lorem Ipsum" />

          <CustomInput label="Location Name" placeholder="Lorem Ipsum" />
          <CustomSelect label="Employee Type" placeholder="Lorem Ipsum" />

          <CustomSelect
            className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
            label="Define Payroll"
            placeholder="Lorem Ipsum"
          />
          <CustomInput label="Status" placeholder="Lorem Ipsum" />
        </div>
      </div>
    </div>
  );
}
