import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import Filter from "../../../../components/customDatefilter";
import CustomDatePicker from "../../../../components/datePicker";
export default function EmployeeSalarySheet() {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Employee Salary Sheet
          </p>
        </div>
        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <>
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
          </>
        </div>
      </div>
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3  bg-white rounded-2xl">
        <div className="px-4 py-3 bg-[#ECF0F4] border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-heading1">
            Employee Salary Details
          </p>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-y-2 xl:gap-x-24 xl:w-170 lg:gap-x-20  lg:w-170 gap-y-2">
          <CustomSelect label="Payroll" placeholder="Daily Wages" />
          <CustomDatePicker label="Period" placeholder="01-Mar-2026" />
        </div>
      </div>

      <div className="pb-4 mt-2 bg-white rounded-2xl">
        <div className="flex justify-between items-center px-4.5 py-2">
          <p className="text-xs font-semibold text-primary">
            Employee Salary Detail Table
          </p>
        </div>
        <CustomTable
          norounded
          loading={false}
          height="auto"
          headers={[
            "Edit",
            "Department",
            "Designation",
            "Name",
            "Days",
            "Holidays",
            "Leaves",
            "Days Worked",
            "Basic Salary",
            "Leave Deduction",
            " After Leave  Deduction Basic Salary",
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,
              "EMP-1226",
              "Mohamed Sayah",
              "Fuel Allowance",
              "01-Jan-2026",
              "01-Jan-2026",
              "Amount",
              "Amount",
              "Amount",
              "Amount",
              "Amount",
            ],
          ]}
        />
      </div>
    </div>
  );
}
