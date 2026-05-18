import { Icon } from "@iconify/react";
import CustomSelect from "../../../.../../../components/customSelect";
import CustomDate from "../../../.../../../components/datePicker";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";
const tabs = ["Employee Evaluation Lines", "System Information", "Attachments"];
export default function EmployeeExpenseClaimCreate() {
  const [activeTab, setActiveTab] = useState("Employee Evaluation Lines");
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Employee Expense Claim
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
              Employee Expense Claim
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25 xl:w-250 lg:w-220 gap-y-2">
            <CustomInput
              label="Transaction Number"
              placeholder="TO BE GENERATE"
            />
            <CustomSelect label="Department" placeholder="-" />
            <CustomSelect label="Status" placeholder="-" />
            <CustomDate label="Expense Date" placeholder="01-Mar-2026" />
            <CustomSelect label="Location" placeholder="-" />
          </div>
        </div>
      </div>

      <div className="mt-3 bg-white rounded-2xl">
        <div className="flex flex-wrap items-center gap-4 p-4">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <p
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs sm:text-sm cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "text-primary font-medium"
                    : "text-heading1"
                }`}
              >
                {tab}
              </p>
            ))}
          </div>
          {activeTab === "Employee Evaluation Lines" && (
            <div className="flex items-center justify-end w-full gap-2 ml-auto sm:w-auto">
              <button className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-md cursor-pointer">
                <Icon icon="proicons:delete" />
              </button>

              <button className="h-8 px-3 text-xs text-white rounded-md cursor-pointer sm:text-sm bg-secondary">
                Add Row
              </button>
            </div>
          )}
        </div>

        {activeTab === "Employee Evaluation Lines" && (
          <CustomTable
            norounded
            headers={[
              "Edit",
              "Select",
              "Employee Name",
              "Expense Category",
              "Expense Amount",
              "Criteria",
              "Total",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                />,
                <Icon
                  icon="fluent:checkbox-checked-16-regular"
                  className="text-lg cursor-pointer text-primary"
                />,
                "-",
                "-",
                "-",
                "-",
                "-",
              ],
            ]}
          />
        )}
      </div>
    </div>
  );
}
