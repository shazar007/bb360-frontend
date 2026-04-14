import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
 
export default function RFQ() {
  const {goTo} = useAppNavigate();
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Procurement / Request for Quotation (RFQ)
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
            className="flex items-center justify-center w-full h-10 gap-2 text-sm bg-white rounded-md cursor-pointer md:w-27 text-heading1"
          >
            Action
            <Icon icon="weui:arrow-filled" className="text-lg rotate-90" />
          </button>

          <button
            onClick={() => {
              goTo("/purchase-module/procurement/rfq/create");
            }}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
          >
            <Icon icon="basil:add-outline" className="text-lg" />
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
            "Transaction Number",
            "Created From",
            "Transaction Date",
            "Location",
            "Transaction Status",
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

              "REQ-000007",
              "RQ000009",
              "03-Nov-2025",
              "Approved",
              "Pending Purchase Order / RFQ",
            ],
          ]}
        />
      </div>
    </div>
  );
}
