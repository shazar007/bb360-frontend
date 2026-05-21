import { Icon } from "@iconify/react";

import CustomInput from "../../../../../components/customInput";

export default function LoanDeductionSetupCreate() {
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Add / Edit Loan Deduction Setup
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
              Add / Edit Loan Deduction Setup
            </p>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-x-30.25 lg:w-[calc(170%-8px)] xl:w-[calc(120%-8px)]">
            <CustomInput label="Payroll" placeholder="Daily Wages..." />

            <CustomInput
              label="Payroll Period"
              placeholder="01jun-30jun 2026"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
