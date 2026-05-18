import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";

export default function PayBills() {
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Payable / Pay Bills
          </p>
        </div>
        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <div className="relative w-full md:w-60">
            <input
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-white border border-gray-200 rounded-md focus:outline-none"
            />
            <Icon
              icon="mynaui:search"
              className="absolute text-[20px] top-2.5 left-3"
            />
          </div>

          <button className="flex items-center justify-center w-full h-10 gap-2 px-4 bg-white rounded-md md:w-auto">
            Actions
            <Icon icon="weui:arrow-filled" className="rotate-90" />
          </button>

          <button className="flex items-center justify-center w-full h-10 gap-2 px-4 text-white rounded-md md:w-auto bg-secondary">
            <Icon icon="mage:filter" />
            Filters
          </button>

          <button className="flex items-center justify-center w-full h-10 gap-2 px-4 text-white rounded-md md:w-auto bg-secondary">
            <Icon icon="ion:refresh-outline" />
            Reset
          </button>

          <button className="flex items-center justify-center w-full h-10 gap-2 px-4 text-white rounded-md md:w-auto bg-primary">
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
