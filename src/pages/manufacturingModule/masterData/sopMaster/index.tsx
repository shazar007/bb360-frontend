import { Icon } from "@iconify/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import { getAllSOPMaster } from "../../../../api/manufacturingSerives";


export default function SopMaster() {
  const [openFilter, setOpenFilter] = useState(false);
  const { goTo } = useAppNavigate();

  /* =========================
     GET API
  ========================= */
  const { data: sopData, isLoading } = useQuery({
    queryKey: ["getAllSOPMaster"],
    queryFn: getAllSOPMaster,
    staleTime: Infinity,
  });

  const sopList = sopData?.data || [];

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            SOP Master
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          {/* SEARCH */}
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

          {/* FILTER */}
          {/* <button
            onClick={() => setOpenFilter(!openFilter)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button> */}

          {/* CREATE */}
          <button
            onClick={() =>
              goTo("/manufacturing-module/master-data/sop-master/create")
            }
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Create
          </button>
        </div>
      </div>

      {/* FILTER */}
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* TABLE */}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          loading={isLoading}
          norounded
          height="60vh"
          headers={[
            "Edit",
            "Select",
            "SOP Number",
            "Document Title",
            "Department",
            "Current Version",
            "Effective Date",
            "Review Cycle",
            "Attachment",
          ]}
          data={sopList.map((item: any) => [
            <Icon
              icon="basil:edit-outline"
              className="text-lg cursor-pointer text-primary"
            />,

            <Icon
              icon="fluent:checkbox-checked-16-regular"
              className="text-lg cursor-pointer text-primary"
            />,

            item.sopNumber || "-",

            item.documentTitle || "-",

            item.department || "-",

            item.currentVersion || "-",

            item.effectiveDate || "-",

            item.reviewCycle || "-",

            <span
              className="text-xs underline cursor-pointer"
              style={{ color: "#0088FF" }}
            >
              {item.attachment || "View File"}
            </span>,
          ])}
        />
      </div>
    </div>
  );
}