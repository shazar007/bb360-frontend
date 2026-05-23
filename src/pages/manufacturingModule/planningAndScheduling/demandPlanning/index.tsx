import { Icon } from "@iconify/react";
import { useState } from "react";

import CustomTable from "./components/customTable";
import Filter from "../../../../components/customDatefilter";
export default function DemandPlanning() {
  const [openFilter, setOpenFilter] = useState(false);

  const monthlyData = [
    "Jun-2026",
    "Jul-2026",
    "Aug-2026",
    "Sep-2026",
    "Oct-2026",
    "Nov-2026",
    "Dec-2026",
  ];
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Demand Planning
          </p>
        </div>
        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
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
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          height="70vh"
          headers={[
            "Edit",
            "Select",
            "Product Name",

            ...monthlyData.map((month) => (
              <div className="min-w-20 text-center">{month}</div>
            )),

            "Total Qty",

            "Line Utilization %",

            "Action",
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary ml-4"
              />,

              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-lg cursor-pointer text-primary ml-8"
              />,

              <div>
                <p>Paracetamol 500mg Tablets</p>
                <p className="text-xs text-heading2">Line 3</p>
              </div>,

              ...monthlyData.map(() => (
                <div className="flex items-center justify-center">
                  <div className="px-4 py-1 text-sm rounded-md border border-[#304250]/36">
                    45,000
                  </div>
                </div>
              )),

              "450,000",

              <div className="w-40">
                <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
                  <span>75%</span>
                  <span>to complete</span>
                </div>

                <div className="w-full h-3 rounded-full bg-[#D9D9D9] overflow-hidden">
                  <div className="w-[75%] h-full bg-[#20C4C4] rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
              </div>,

              "-",
            ],
          ]}
        />
      </div>
    </div>
  );
}
