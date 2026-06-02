import { Icon } from "@iconify/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import { getAllBatchPlanning } from "../../../../api/manufacturingSerives";

export default function BatchPlanning() {
  const [openFilter, setOpenFilter] = useState(false);
  const [search, setSearch] = useState("");
  const { goTo } = useAppNavigate();
  const navigate = useNavigate();

  /* =========================
     GET API
  ========================= */
  const { data, isLoading } = useQuery({
    queryKey: ["getAllBatchPlanning"],
    queryFn: getAllBatchPlanning,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const batchList = data?.data?.data || [];

  const filteredList = batchList.filter((item: any) =>
    [
      item.plannedBatchId,
      item.targetFgItemName,
      item.assignedLineName,
      item.batchShift,
      item.equipmentStatus,
      item.runStatus,
    ].some((val) => String(val ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Batch Planning
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <div className="relative w-full md:w-40">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
            />
            <Icon icon="mynaui:search" className="absolute text-[20px] text-heading1/36 top-2.5 left-3" />
          </div>

          <button
            onClick={() => goTo("/manufacturing-module/planning-and-scheduling/batch-planning/create")}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Create
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* TABLE */}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          loading={isLoading}
          norounded
          height="60vh"
          headers={[
            "Edit",
            "Planned Batch ID",
            "Target FG Item",
            "Assigned Line",
            "Planned Batch Size",
            "Batch Shift",
            "Start Timestamp",
            "End Timestamp",
            "Equipment Status",
            "Run Status",
            "Action",
          ]}
          data={filteredList.map((item: any) => [
            <Icon
              icon="basil:edit-outline"
              className="text-lg cursor-pointer text-primary"
              onClick={() =>
                navigate("/manufacturing-module/planning-and-scheduling/batch-planning/create", {
                  state: { rowData: item, type: "edit" },
                })
              }
            />,

            item.plannedBatchId || "-",

            <div>
              <p>{item.targetFgItem?.itemName || item.targetFgItemName || "-"}</p>
              <p className="text-xs text-heading2">{item.targetFgItem?.itemCode || "-"}</p>
            </div>,

            <div>
              <p>{item.assignedLineName || "-"}</p>
            </div>,

            item.plannedBatchSize?.toLocaleString() || "-",

            item.batchShift || "-",

            item.startTimestamp || "-",

            item.endTimestamp || "-",

            <span
              className="px-2 py-1 rounded-md text-xs font-medium capitalize"
              style={{
                backgroundColor: item.equipmentStatus === "cleaned" ? "#00F2001F" : "#FF00001F",
                color: item.equipmentStatus === "cleaned" ? "#1E9B1E" : "#D10000",
              }}
            >
              {item.equipmentStatus || "-"}
            </span>,

            <span
              className="px-2 py-1 rounded-md text-xs font-medium capitalize"
              style={{
                backgroundColor: item.runStatus === "ready" ? "#00F2001F" : "#F2F2001F",
                color: item.runStatus === "ready" ? "#1E9B1E" : "#9B8A1E",
              }}
            >
              {item.runStatus || "-"}
            </span>,

            "-",
          ])}
        />
      </div>
    </div>
  );
}