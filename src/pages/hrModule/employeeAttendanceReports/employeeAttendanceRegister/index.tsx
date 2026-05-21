import { Icon } from "@iconify/react";
import { useState } from "react";

import CustomTable from "./components/customTable";
import Filter from "../../../../components/customDatefilter";
import PolicyRulesBuilder from "../../../../components/policyRulesBuilder";

export default function EmployeeAttendanceRegister() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openPolicyBuilder, setOpenPolicyBuilder] = useState(false);

  const attendanceData = [
    { day: "01", week: "FR", status: "P" },
    { day: "02", week: "SA", status: "WO" },
    { day: "03", week: "SU", status: "WO" },
    { day: "04", week: "MO", status: "P" },
    { day: "05", week: "TU", status: "LC" },
    { day: "06", week: "WE", status: "P" },
    { day: "07", week: "TH", status: "P" },
    { day: "08", week: "FR", status: "P" },
    { day: "09", week: "FR", status: "OD" },
    { day: "10", week: "FR", status: "P" },
    { day: "11", week: "SA", status: "WO" },
    { day: "12", week: "SA", status: "WO" },
    { day: "13", week: "SU", status: "WO" },
    { day: "14", week: "SU", status: "WO" },
    { day: "15", week: "MO", status: "LC" },
    { day: "16", week: "MO", status: "LC" },
    { day: "17", week: "TU", status: "A" },
    { day: "18", week: "TU", status: "A" },
    { day: "19", week: "WE", status: "L" },
    { day: "20", week: "WE", status: "L" },
    { day: "21", week: "TH", status: "OD" },
    { day: "22", week: "TH", status: "OD" },
    { day: "23", week: "FR", status: "P" },
    { day: "24", week: "FR", status: "P" },
    { day: "25", week: "FR", status: "P" },
    { day: "26", week: "SA", status: "WO" },
    { day: "27", week: "SU", status: "WO" },
    { day: "28", week: "MO", status: "LC" },
    { day: "29", week: "TU", status: "A" },
    { day: "30", week: "WE", status: "L" },
    { day: "31", week: "TH", status: "OD" },
  ];

  const statusColors: Record<string, string> = {
    P: "#DAFADA",
    WO: "#F1F2F1",
    LC: "#FAF3DA",
    A: "#FADADA",
    L: "#DCD4FA",
    OD: "#F5DAFA",
  };
  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Employee Attendance Register
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          {/* SEARCH */}
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

          {/* FILTER */}
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button>

          <button
            onClick={() => setOpenPolicyBuilder(true)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Policy Rules Builder
          </button>
        </div>
      </div>

      {/* FILTER */}
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
      {openPolicyBuilder && (
        <PolicyRulesBuilder onClose={() => setOpenPolicyBuilder(false)} />
      )}

      {/* TABLE */}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          height="65vh"
          headers={[
            "Edit",
            "Employee ID",
            "Employee Name",

            ...attendanceData.map((item) => (
              <div className="min-w-13 text-center">
                {item.day}
                <br />
                {item.week}
              </div>
            )),

            <>
              Total <br /> P
            </>,
         
            <>
              Total <br /> A
            </>,

            <>
              Total <br /> L
            </>,
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              "EMP-309",

              "Shazar Khan",

              ...attendanceData.map((item) => (
                <div
                  className="flex items-center justify-center w-10 h-8 text-xs rounded-md border border-[#304250]/36"
                  style={{
                    backgroundColor: statusColors[item.status],
                  }}
                >
                  {item.status}
                </div>
              )),

              "15",
              "2",
              "4",
            ],
          ]}
        />
      </div>
    </div>
  );
}
