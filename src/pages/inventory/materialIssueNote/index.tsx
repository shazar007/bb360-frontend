import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import { useAppNavigate } from "../../../hooks/navigation";

export default function MaterialIssueNote() {
  const { goTo } = useAppNavigate();

 
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Material Issue Note
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

          <button className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27">
            <Icon icon="mage:filter" className="text-lg" />
            Filters
          </button>

          <button
            onClick={()=>{
              goTo("/inventory/material-issue-note/create")
            }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-37"
          >
            <Icon icon="basil:add-outline" className="text-lg" />
            Create
          </button>
        </div>
      </div>

      <div className="mt-3">
        <CustomTable
          height="60vh"
          headers={[
            "Edit",
            "View",
            "Report",
            "Transaction Number",
            "Transaction Date",
            "Created From",
            "Transaction Name",
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
              "IA-000121",
              "07-Apr-2026",
              "Head Office 01",
              "Inventory Adjustment April-2026",
              "Approved",
            ],
          ]}
        />
      </div>
    </div>
  );
}
