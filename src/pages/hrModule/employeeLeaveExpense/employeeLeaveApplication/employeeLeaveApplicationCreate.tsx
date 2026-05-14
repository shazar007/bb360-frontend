import { Icon } from "@iconify/react";
import CustomSelect from "../../../.../../../components/customSelect";

export default function EmployeeLeaveApplicationCreate() {
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Add / Edit Employee Leave Application
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
              Create Performance Criteria
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25 xl:w-250 lg:w-220 gap-y-2">
            <CustomSelect
              label="Employee Type"
              placeholder="Prohibition Period/Permanent"
            />
            <CustomSelect
              label="Criteria"
              placeholder="Prohibition Period/Permanents"
            />
            <CustomSelect label="Is Group" placeholder="Yes/No" />
            <CustomSelect
              label="Parent"
              placeholder="Job Knowledge and Skills"
            />
            <CustomSelect label="Total" placeholder="5" />
          </div>
        </div>
      </div>
    </div>
  );
}
