import { useState } from "react";
import { Icon } from "@iconify/react";

import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";

import Filter from "../../../../components/customDatefilter";
import CustomDatePicker from "../../../../components/datePicker";

export default function TimeAttendanceRegister() {
  const [activeTab, setActiveTab] = useState("Payroll Action");
  const [openFilter, setOpenFilter] = useState(false);

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
          {activeTab === "Payroll Action" && (
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
          )}

          {activeTab === "Execute Function Log" && (
            <>
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
            </>
          )}
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3 overflow-hidden bg-white rounded-2xl">
        <div className="px-4 py-3 bg-[#ECF0F4] border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-heading1">
            Payroll Process Run
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

      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-wrap gap-4 p-4">
          <button
            onClick={() => setActiveTab("Payroll Action")}
            className={`text-xs font-semibold cursor-pointer ${
              activeTab === "Payroll Action" ? "text-primary" : "text-heading1"
            }`}
          >
            Payroll Action
          </button>

          <button
            onClick={() => setActiveTab("Execute Function Log")}
            className={`text-xs font-semibold cursor-pointer ${
              activeTab === "Execute Function Log"
                ? "text-primary"
                : "text-heading1"
            }`}
          >
            Execute Function Log
          </button>
        </div>

        {activeTab === "Payroll Action" && (
          <CustomTable
            norounded
            height="48vh"
            headers={[
              "Edit",
              "Payroll",
              "Action Status",
              "Effective Date",
              "Last Update Date",
              "Payroll Period",
              "Location",
              "Department",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                />,

                "Regular Monthly Payroll",

                "Completed",

                "31-Mar-2026",

                "11-Mar-2026",

                "01Mar-31Mar 2026",

                "Factory",

                "Sales",
              ],
            ]}
          />
        )}

        {activeTab === "Execute Function Log" && (
          <div className=" bg-white rounded-2xl overflow-hidden">
            <CustomTable
              norounded
              height="48vh"
              headers={[
                "Edit",
                "Formula",
                "Run Type",
                "Run Date",
                "Employee Name",
                "Created Date",
                "Run Result",
              ]}
              data={[
                [
                  <Icon
                    icon="basil:edit-outline"
                    className="text-lg cursor-pointer text-primary"
                  />,

                  "Costing Process",

                  "Costing",

                  "31-Mar-2026",

                  "40016-fazil Iqbal",

                  "11-Mar-2026",

                  <div className="leading-4">
                    Function Complete
                    <br />
                    Successfully
                  </div>,
                ],
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
