import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";

export default function WorkOrders() {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold text-heading1 md:text-lg">
            Work Orders
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <div className="relative w-full md:w-40">
            <input
              placeholder="Search"
              className="h-10 w-full rounded-sm bg-white pl-10 pr-4 placeholder:text-sm placeholder:text-heading1/36 focus:outline-none"
            />
            <Icon
              icon="mynaui:search"
              className="absolute left-3 top-2.5 text-[20px] text-heading1/36"
            />
          </div>
          {/* <button
            onClick={() => setOpenFilter(!openFilter)}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 text-white shadow-[0_1px_12px_#0000001F] md:w-auto"
          >
            <Icon icon="mage:filter" className="h-5 w-5" />
            Filters
          </button> */}
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3 overflow-hidden rounded-2xl bg-white">
        <div className="flex flex-wrap gap-4 p-4">
          <p className="text-xs font-semibold text-primary">
            Work Order Controller
          </p>
        </div>

        <CustomTable
          norounded
          height="55vh"
          headers={[
            "Edit",
            "Work Order ID",
            "Target Product",
            "Batch Number",
            "Routed Line",
            "Batch Size",
            "Start Time",
            "Target End",
            "STAGE PROGRESS",
            "Status",
            "Action",
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="cursor-pointer text-lg text-primary"
              />,

              "WO-2026-0871",

              <div>
                <p>Amoxicillin 500mg</p>
                <p>Capsule</p>
              </div>,
              "BT-240871",
              "Line 1 - Compression",
              "60,000 units",
              "12-May 06:00 AM",
              "12-May 06:00 AM",
              <div className="w-40">
                <div
                  className="flex items-center gap-2 text-xs mb-1"
                  style={{ color: "#0072C3" }}
                >
                  <span>75%</span>
                  <span>to complete</span>
                </div>

                <div className="relative w-full h-4 rounded-full bg-[#D9D9D9]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "75%",
                      backgroundColor: "#14CCC3",
                    }}
                  />
                  <div
                    className="absolute top-1/2 w-2 h-2 bg-white rounded-full"
                    style={{
                      left: "37%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />

                  <div
                    className="absolute top-1/2 w-2 h-2 bg-white rounded-full"
                    style={{
                      left: "75%",
                      transform: "translate(-30%, -50%)",
                    }}
                  />
                </div>
              </div>,

              "Running",
              <select
                disabled
                className="cursor-pointer  h-8 px-4 text-xs bg-white  border border-[#304250]/80 rounded-md focus:outline-none"
              >
                <option className="cursor-pointer ">Pause</option>
              </select>,
            ],
          ]}
        />
      </div>
    </div>
  );
}
