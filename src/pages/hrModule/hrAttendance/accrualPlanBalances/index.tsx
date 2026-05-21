import { useState } from "react";
import { Icon } from "@iconify/react";

import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import CustomDatePicker from "../../../../components/datePicker";

import Filter from "../../../../components/customDatefilter";

export default function AccrualPlanBalances() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Accrual Plan Balances
          </p>
        </div>

        {/* RIGHT SIDE */}
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
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Employee Register
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* MAIN CARD */}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        {/* TOP HEADING */}
        <div className="bg-[#ECF0F4] p-4 border-b border-[#D8DEE6]">
          <p className="text-xs font-semibold text-heading1">
            Pay Accrual Plan
          </p>
        </div>

        {/* FORM SECTION */}
        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-y-2 xl:gap-x-40.25 lg:w-220 xl:w-250 gap-y-2">
          <CustomSelect label="Employee Name" placeholder="Select" />

          <CustomSelect label="Accrual Plan" placeholder="Select" />

          <CustomDatePicker label="Date" placeholder="01-Mar-2026" />
        </div>

        {/* TABLE */}
        <CustomTable
          norounded
          height="45vh"
          headers={[
            "Employee Name",
            "Accrual Plan Name",
            "Total Leaves Allowed",
            "Total Adjustment",
            "Total Carry Over",
            "Total Residual",
            "Total",
          ]}
          data={[["Rizwan Ali", "Casual Leave Plan", "13", "-", "-", "-", "-"]]}
        />
      </div>
    </div>
  );
}
