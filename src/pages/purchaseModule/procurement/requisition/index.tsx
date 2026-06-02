import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import Filters from "../../../../components/filter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Requisition() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Procurement / Requisition
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
              onClick={() => setOpen(true)}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="mage:filter" className="text-lg" />
              Filters
            </button>
            <button
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="ion:refresh-outline" className="text-lg" />
              Reset
            </button>
            <button
              onClick={() => {
                navigate(
                  "/purchase-module/procurement/requisition/create-requisition",
                );
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
            height="auto"
            headers={[
              "Edit",
              "View",
              "Report",
              "TranDate",
              "TranNumber",
              "From Location",
              "Status",
              "Created From",
              "Document Status",
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
                "05-Mar-2026",
                "RQ000045",
                "Head Office 01",
                "Approved",
                "-",
                "Pending Purchase Order / RFQ",
              ],
            ]}
          />
        </div>
      </div>
      <Filters isOpen={open} onClose={() => setOpen(false)} title="Filters" />
    </>
  );
}
