import { useState } from "react";
import { Icon } from "@iconify/react";

import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";

import Filter from "../../../../components/customDatefilter";
import AttendanceRegisterSummary from "./attendanceRegisterSummary";
export default function TimeAttendanceRegister() {
  const [activeTab, setActiveTab] = useState("machine");
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Generate Attendance Register
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          {activeTab === "machine" && (
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
                <Icon icon="ion:print-outline" className="w-5 h-5" />
                Employee Register
              </button>
            </>
          )}
          {activeTab === "summary" && (
            <>
              <button className="flex items-center justify-center w-full h-10 gap-2 px-4 text-white rounded-md cursor-pointer md:w-auto bg-secondary">
                <Icon icon="ion:play-back-outline" className="w-5 h-5" />
                Back
              </button>

              <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
                <Icon icon="ion:print-outline" className="w-5 h-5" />
                Print
              </button>

              {/* <button className="flex items-center justify-center w-full h-10 gap-2 px-4 text-white rounded-md cursor-pointer md:w-auto bg-primary">
                <Icon icon="mynaui:save" className="w-5 h-5" />
                Save
              </button> */}
            </>
          )}
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl overflow-hidden">
          <div className="bg-[#ECF0F4] p-4">
            <p className="text-xs font-semibold text-heading1">
              Generate Attendance Register
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-y-2 xl:gap-x-40.25 lg:w-220 xl:w-250 gap-y-2">
            <CustomSelect label="Payroll Type" placeholder="Daily / Monthly" />
            <CustomSelect label="Days" placeholder="22" />
            <CustomSelect label="Department" placeholder="Sales" />
            <CustomSelect label="Payroll Period" placeholder="One Month" />
            <CustomSelect label="Location" placeholder="Head Office" />
            <CustomSelect label="Employee Name" placeholder="Lorem" />
          </div>
        </div>
      </div>
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-wrap gap-4 p-4">
          <button
            onClick={() => setActiveTab("machine")}
            className={`text-xs font-semibold cursor-pointer ${
              activeTab === "machine" ? "text-primary" : "text-heading1"
            }`}
          >
            Time Attendance Register
          </button>

          <button
            onClick={() => setActiveTab("summary")}
            className={`text-xs font-semibold cursor-pointer ${
              activeTab === "summary" ? "text-primary" : "text-heading1"
            }`}
          >
            Attendance Register Summary
          </button>
        </div>
        {activeTab === "machine" && (
          <CustomTable
            norounded
            height="45vh"
            headers={[
              "Edit",
              "Employee Name",
              "Attendance Date",
              "Time In",
              "Time Out",
              "Duty Hours",
              "Attendance Status",
              "Leave Type",
            ]}
            data={[
              [
                <Icon
                  icon="qlementine-icons:menu-burger-16"
                  className="text-lg cursor-pointer text-primary"
                />,

                "-",

                "-",

                "-",

                "-",

                "-",

                "-",

                "-",
              ],
            ]}
          />
        )}

        {activeTab === "summary" && <AttendanceRegisterSummary />}
      </div>
    </div>
  );
}
