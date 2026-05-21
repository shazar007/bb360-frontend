import { Icon } from "@iconify/react";
import { useState } from "react";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";

export default function TimeAttendanceSummary() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Time Attendance Summary
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

          {/* PRINT */}
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          {/* SEND TO PAYROLL */}
          <button className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary">
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Send to Payroll
          </button>
        </div>
      </div>

      {/* FILTER */}
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* TABLE */}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          norounded
          height="60vh"
          headers={[
            "Edit",
            "Employee ID",
            "Employee Name",
            "Total Days",
            "Expected Days",
            "Present Days",
            "Absent Days",
            "Leaves Taken",
            "Outdoor Duty",
            "CPL (Utilized)",
            "Late Days",
            "Overtime (hrs)",
            "Final Payable Days",
            "Status",
          ]}
          data={[
            [
              <Icon
                icon="qlementine-icons:menu-burger-16"
                className="text-lg cursor-pointer text-primary"
              />,

              "EMP-309",

              "Shazar Khan",

              "31",

              "22",

              "19",

              "3",

              "2",

              "1",

              "2",

              "6",

              "6.06",

              "20.3",

              "Pending",
            ],
          ]}
        />
      </div>
    </div>
  );
}
