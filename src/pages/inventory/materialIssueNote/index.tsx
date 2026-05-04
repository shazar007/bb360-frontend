import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import { useAppNavigate } from "../../../hooks/navigation";

export default function MaterialIssueNote() {
  const { goTo } = useAppNavigate();
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Material Issue Note
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button>

          <button
            onClick={() => {
              goTo("/inventory/inventory-adjustment/create");
            }}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary rounded-md text-white cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Upload
          </button>

          <button
            onClick={() => {
              goTo("/inventory/material-issue-note/create");
            }}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Create
          </button>
        </div>
      </div>

      <div className="bg-bgprimary] rounded-2xl mt-3">
        <div className="mt-3">
          <CustomTable
            norounded
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
                "112060",
                "Punjab Aata",
                "Raw Material",
                "Kg",
                "881525/10",
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
