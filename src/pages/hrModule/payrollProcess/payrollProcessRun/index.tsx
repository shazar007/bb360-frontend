import { Icon } from "@iconify/react";
import CustomSelect from "../../../../components/customSelect";
import CustomDatePicker from "../../../../components/datePicker";
import CustomTable from "../../../../components/customTable";

export default function PayrollProcessRun() {
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Payroll Process Run
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
              Payroll Process
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25 xl:w-250 lg:w-220 gap-y-2">
            <CustomSelect label="Department" placeholder="Sales" />

            <CustomSelect label="Location" placeholder="factory" />

            <CustomDatePicker label="Period" placeholder="01-Mar-2026" />

            <CustomSelect label="Payroll" placeholder="Daily Wages" />

            <CustomSelect label="Employee Name" placeholder="Bilal Hassan" />
          </div>
        </div>
      </div>

      <div className="pb-4 mt-2 bg-white rounded-2xl">
        <div className="flex justify-between items-center px-4.5 py-2">
          <p className="text-xs font-semibold text-primary">
            Pay_Elements_Entries_Temp
          </p>

          <div className="flex items-center gap-2">
            <button className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center">
              <Icon icon="proicons:delete" className="text-xl" />
            </button>

            <button className="text-xs text-white bg-secondary rounded-md w-18 h-8.5 cursor-pointer">
              Add Row
            </button>
          </div>
        </div>

        <CustomTable
          norounded
          loading={false}
          height="55vh"
          headers={[
            "Edit",
            // "View",
            // "Report",
            "Employee ID",
            "Employee Name",
            "Element Type ",
            "Effective Start Dates",
            "Effective End Date",
            "Input Field",
            "Input Value  ",
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              // <Icon
              //   icon="hugeicons:view"
              //   className="text-lg cursor-pointer text-primary"
              // />,

              // <Icon
              //   icon="ion:print-outline"
              //   className="text-lg cursor-pointer text-primary"
              // />,

              "EMP-1226",
              "Mohamed Sayah",
              "Fuel Allowance",
              "01-Jan-2026",
              "01-Jan-2026",
              "Amount",
              "Rs.5000",
            ],
          ]}
        />
      </div>
    </div>
  );
}
