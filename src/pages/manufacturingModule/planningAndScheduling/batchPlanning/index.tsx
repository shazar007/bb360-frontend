import { Icon } from "@iconify/react";
import { useState } from "react";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
export default function BatchPlanning() {
  const [openFilter, setOpenFilter] = useState(false);
  const { goTo } = useAppNavigate();
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Batch Planning 
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

          {/* <button
            onClick={() => setOpenFilter(!openFilter)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button> */}

          <button
            onClick={() =>
              goTo(
                "/manufacturing-module/planning-and-scheduling/batch-planning/create",
              )
            }
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Create
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          norounded
          height="60vh"
          headers={[
            "Edit",
            "Planned Batch ID",
            "Target FG Item",
            "Assigned Line",
            "Planned Batch Size",
            "Batch Shift",
            "Start Timestamp",
            "End Timestamp",
            "Target Yield (Expected)",
            "Equipment Status",
            "Run Status",
            "Action",
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              "PLN-BAT-2026-042",

              <div>
                <p>Paracetamol 500mg</p>
                <p>SKU-Tab-PAR500</p>
              </div>,

              <div>
                <p>Line 1</p>
                <p>Compression B</p>
              </div>,

              "10,000",

              "Morning",

              "May 25, 06:00 AM",

              "May 25, 06:00 AM",

              "98.5",

              "Cleaned",

              "Ready",

              "-",
            ],
          ]}
        />
      </div>
    </div>
  );
}
