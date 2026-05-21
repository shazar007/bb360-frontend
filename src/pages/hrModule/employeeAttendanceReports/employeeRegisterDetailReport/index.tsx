import { Icon } from "@iconify/react";
import { useState } from "react";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import CustomGpsDrawer from "../../../../components/customGpsDrawer";
export default function EmployeeRegisterDetailReport() {
  const [openFilter, setOpenFilter] = useState(false);

  const [openGpsDrawer, setOpenGpsDrawer] = useState(false);

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Employee Register Detail Report
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
        </div>
      </div>

      {/* FILTER */}
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* GPS DRAWER */}
      {openGpsDrawer && (
        <CustomGpsDrawer onClose={() => setOpenGpsDrawer(false)} />
      )}

      {/* TABLE */}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          norounded
          height="60vh"
          headers={[
            "Edit",
            "Employee ID",
            "Employee Name",
            "Shift",
            "First In",
            "Last Out",
            "Device",
            "Late Mins",
            "Work HRS",
            "Status",
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              "EMP-121",

              "Shazar Khan",

              "Morning",

              "08:54AM",

              "06:12PM",

              "Biometric",

              "22",

              "9h 35mins",

              "Present",
            ],

            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              "EMP-121",

              "Bilal Hassan",

              "Morning",

              "08:54AM",

              "06:12PM",

              <p
                onClick={() => setOpenGpsDrawer(true)}
                className="text-[#0088FF] underline cursor-pointer"
              >
                Mobile GPS
              </p>,

              "22",

              "9h 35mins",

              "Present",
            ],
          ]}
        />
      </div>
    </div>
  );
}
