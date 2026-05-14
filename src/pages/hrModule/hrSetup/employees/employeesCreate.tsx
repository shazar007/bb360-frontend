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

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary">
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>
          <button className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary">
            <Icon icon="mynaui:save" className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>

      <div className="mt-3 bg-bgprimary rounded-2xl">
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
