import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";

export default function MrpPlanning() {
  const [activeTab, setActiveTab] = useState("MRP Run & Shortages");
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold text-heading1 md:text-lg">
            MRP Planning
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
          {["MRP Run & Shortages", "Suggested Sourcing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer text-xs font-semibold ${
                activeTab === tab ? "text-primary" : "text-heading1"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "MRP Run & Shortages" && (
          <CustomTable
            norounded
            height="55vh"
            headers={[
              "Edit",
              "Material Name",
              "Current Stock Bal",
              "Safety Stock Floor",
              "MRP Required Qty",
              "Shortage Deficit",
              "Lead Time Indicator",
              "Procurement Status",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="cursor-pointer text-lg text-primary"
                />,
                "Lactose Monohydrate",
                "5000",
                "9000",
                "7500",
                "6000",
                "24 days",
                "PO Created",
              ],
            ]}
          />
        )}

        {activeTab === "Suggested Sourcing" && (
          <CustomTable
            norounded
            height="55vh"
            headers={[
              "Edit",
              "Material Name",
              "Primary Vendor",
              "Deficit Req",
              "Suggested Qty",
              "UOM",
              "Unit Price",
              "Total Cost",
              "Lead Time",
              "Buy Level Risk Badge",
              "Action",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="cursor-pointer text-lg text-primary"
                />,

                "Acetaminophen",

                "Sino-Chem Corp",

                "8,400",

                "3000",

                "Kg",

                "Rs. 1,200",

                "Rs. 1,350,000",

                "45 Days",

                "PO Created",

                "PO Created",
              ],
            ]}
          />
        )}
      </div>
    </div>
  );
}
