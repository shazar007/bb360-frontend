import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";

import { useEffect } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";

export default function VendorBills() {
  useEffect(() => {
    document.title = "Create Bills — BB-360";
  }, []);
  const { goTo } = useAppNavigate();
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Payable / Purchase Invoice
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full md:w-60">
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
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            {" "}
            <Icon icon="mage:filter" className="text-lg" />
            Filters
          </button>{" "}
          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            {" "}
            <Icon icon="ion:refresh-outline" className="text-lg" />
            Reset
          </button>
          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
          >
            {" "}
            <Icon icon="streamline-flex:story-post" className="text-lg" />
            post
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
            "Purchase Number",
            "Vendor",
            "Gross Amount",
            "Tax Amount",
            "Amount",
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
                onClick={() =>
                  goTo(
                    "/purchase-module/payable/vendor-bills/create-vendor-bill",
                  )
                }
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
              "PO-000121",
              "Globify Trader Karachi",
              "45,250",
              "8,250",
              "53,450",
            ],
          ]}
        />
      </div>
    </div>
  );
}
