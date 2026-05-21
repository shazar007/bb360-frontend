import { Icon } from "@iconify/react";
import CustomInput from "../../../../../components/customInput";

export default function EmployeePayElementsCreate() {
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Employee Pay Elements
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
              Create Employee Pay Elements
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25 xl:w-7xl lg:w-230 gap-y-2">
            <CustomInput label="Employee Name" placeholder="Bilal Hassan" />
            <CustomInput label="House Rent Allowance" placeholder="Rs.60,000" />
            <CustomInput label="Fuel Allowance" placeholder="Rs.60,000" />
            <CustomInput label="Income Tax" placeholder="Rs.60,000" />
            <CustomInput label="Basic Salary" placeholder="Rs.60,000" />
            <CustomInput label="Medical Allowance" placeholder="Rs.60,000" />
            <CustomInput label="Provisdent Fund" placeholder="Rs.60,000" />
            <CustomInput label="Total Earnings" placeholder="Rs.60,000" />
          </div>
        </div>
      </div>
    </div>
  );
}
