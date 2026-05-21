import { Icon } from "@iconify/react";

import CustomSelect from "../../../../../components/customSelect";
import CustomInput from "../../../../../components/customInput";
import CustomDatePicker from "../../../../../components/datePicker";

export default function OutdoorDutyCreater() {
  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Outdoor Duty
          </p>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          {/* BACK */}
          <button className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary">
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>

          {/* PRINT */}
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          {/* SAVE */}
          <button className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary">
            <Icon icon="mynaui:save" className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        {/* TOP HEADING */}
        <div className="bg-[#ECF0F4] p-4 border-b border-[#D8DEE6]">
          <p className="text-xs font-semibold text-heading1">
            Create Outdoor Duty
          </p>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-y-2 xl:gap-x-20 gap-y-2">
          {/* ROW 1 */}
          <CustomInput
            label="Transaction Number"
            placeholder="TO BE GENERATE"
          />
          <CustomSelect label="Employee Name" placeholder="Select name..." />
          <CustomSelect label="Duty Type" placeholder="Survey" />
          <CustomSelect label="Location" placeholder="Head Office" />
          {/* ROW 2 */}
          <CustomDatePicker
            label="Outdoor Duty Date"
            placeholder="01-Mar-2026"
          />
          <CustomSelect label="Department" placeholder="Sales" />
          <CustomSelect label="Duration" placeholder="3hrs" />
          <CustomSelect label="Status" placeholder="Pending" />
        </div>
      </div>
    </div>
  );
}
