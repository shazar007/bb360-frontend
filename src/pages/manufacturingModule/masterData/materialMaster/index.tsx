import { Icon } from "@iconify/react";
import { useState } from "react";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
export default function MaterialMaster() {
  const [openFilter, setOpenFilter] = useState(false);
  const { goTo } = useAppNavigate();
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Material Master
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

          <button
            onClick={() =>
              goTo("/manufacturing-module/master-data/material-master/create")
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
          height="auto"
          headers={[
            "Edit",
            "Select",
            "Material Code",
            "Material Name",
            "Material Type",
            "UOM",
            "Shelf Life (Days)",
            "Vendor",
            "QC Disposition",
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

              "MAT-5589P",

              "Paracetamol",

              "Raw Material",

              "Kgs",

              "120 Days",

              "Xi-Pong, China",

              <span
                className="px-2 py-1 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: "#E6F20029",
                  color: "#B5B800",
                }}
              >
                Quarantine
              </span>,
            ],
          ]}
        />
      </div>
    </div>
  );
}
