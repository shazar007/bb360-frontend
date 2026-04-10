import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";

export default function PayBills() {
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Payable / Pay Bills
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-60">
            <input
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-white rounded-md border border-gray-200 focus:outline-none"
            />
            <Icon
              icon="mynaui:search"
              className="absolute text-[20px] top-2.5 left-3"
            />
          </div>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-white rounded-md">
            Actions
            <Icon icon="weui:arrow-filled" className="rotate-90" />
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-secondary text-white rounded-md">
            <Icon icon="mage:filter" />
            Filters
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-secondary text-white rounded-md">
            <Icon icon="ion:refresh-outline" />
            Reset
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-primary text-white rounded-md">
            <Icon icon="basil:add-outline" />
            Create
          </button>
        </div>
      </div>

      <div className="mt-2">
        <CustomTable
          height="60vh"
          headers={[
            "Edit",
            "View",
            "Report",
            "Transaction Date",
            "Transaction Number",
            "Vendor",
            "Account Name",
            "Location",
            "Created From",
            "Gross Amount",
            "Status",
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,
              <Icon
                icon="hugeicons:view"
                className="text-lg cursor-pointer text-primary"
              />,
              <Icon
                icon="ion:print-outline"
                className="text-lg cursor-pointer text-primary"
              />,
              "03-Nov-2025",
              "PO-0000015",
              "Globify Trader Karachi",
              "1001020224 - HBL",
              "Head Office 01",
              "-",
              "391,000",
              "Approved",
            ],
          ]}
        />
      </div>
    </div>
  );
}
