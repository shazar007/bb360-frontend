import { Icon } from "@iconify/react";
// import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import CustomDatePicker from "../../../../components/datePicker";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";

export default function DefineEmployeeSalaryCreate() {
  return (
    <div className="mt-3 bg-bgprimary rounded-2xl">
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Create Employee Salary
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

        <div className="mt-3 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Employee Salary
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-24 xl:gap-y-2 xl:gap-x-40.25 lg:gap-x-40.25 lg:w-200 gap-y-2">
            <CustomSelect label="Employee" placeholder="Lorem Ipsum" />
            <CustomInput label="Salary" placeholder="" />
            <CustomDatePicker label="Creation Date" placeholder="01-Mar-2026" />
          </div>
        </div>

        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <CustomTable
            norounded
            loading={false}
            height="30vh"
            headers={[
              "Edit",
              "Employee ID",
              "Employee Name",
              "Creation Date",
              "Salary",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                />,

                "EMP-1226",

                "Mohamed Sayah",

                "13-March-2025",

                "50,000",
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
