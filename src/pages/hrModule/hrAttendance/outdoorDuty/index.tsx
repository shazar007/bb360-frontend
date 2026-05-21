import { useState } from "react";
import { Icon } from "@iconify/react";

import CustomTable from "../../../../components/customTable";

import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
export default function OutdoorDuty() {
  const [openFilter, setOpenFilter] = useState(false);
  const { goTo } = useAppNavigate();
  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Outdoor Duty
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

          {/* APPROVED OUTDOOR */}
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-3 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon
              icon="streamline-flex:credit-card-approved"
              className="w-5 h-5"
            />
            Approved Outdoor
          </button>

          {/* CREATE */}
          <button
            onClick={() => {
              goTo("/hr-module/hr-attendance/outdoor-duty/create");
            }}
            className="flex items-center justify-center w-full h-10 gap-1 px-3 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Create
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
            "Select",
            "Transaction Number",
            "Outdoor Duty Date",
            "Employee Name",
            "Department",
            "Duty Type",
            "Duration",
            "Location",
            "Status",
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

              "OUT-5589P",

              "21-May-2026",

              "Bilal Hassan",

              "Sales",

              "Survey",

              "4hrs",

              "Local",

              <div className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded w-fit">
                Approved
              </div>,
            ],
          ]}
        />
      </div>
    </div>
  );
}
