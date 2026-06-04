import { Icon } from "@iconify/react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  deleteBillOfMaterial,
  getAllBillOfMaterial,
} from "../../../../api/manufacturingSerives";
import CustomCheckbox from "../../../../components/customCheckbox";

export default function BomMasterFormula() {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const { goTo } = useAppNavigate();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllBomMasterFormula"],
    queryFn: getAllBillOfMaterial,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const bomList = data?.data?.data || [];

  const { mutate: deleteItems, isPending } = useMutation({
    mutationFn: (ids: string[]) => deleteBillOfMaterial(ids[0]),
    onSuccess: async () => {
      notifySuccess("BOM Deleted Successfully");
      setSelectedIds([]);
      await refetch();
    },
    onError: (err: any) =>
      notifyError(err?.response?.data?.message || "Something went wrong"),
  });

  const filteredList = bomList.filter((item: any) =>
    [
      item.formulaId,
      item.productName,
      item.batchSize,
      item.workflowState,
      item.totalProcessSteps,
      ...(item.rawMaterials?.map((rm: any) => rm.itemName) || []),
    ].some((val) =>
      String(val ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => (prev.includes(id) ? [] : [id]));

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Bill Of Material (BOM)
          </p>
        </div>

        <div className="flex flex-col w-full gap-2 md:w-auto md:flex-row md:items-center">
          <div className="relative w-full md:w-40">
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white rounded-sm placeholder:text-sm placeholder:text-heading1/36 focus:outline-none"
            />
            <Icon
              icon="mynaui:search"
              className="absolute left-3 top-2.5 text-[20px] text-heading1/36"
            />
          </div>

          {/* ✅ Delete button — sirf tab dikhay jab koi selected ho */}
          {selectedIds.length > 0 && (
            <button
              onClick={() => deleteItems(selectedIds)}
              disabled={isPending}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white bg-red-500 rounded-md md:w-auto"
            >
              <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
              Delete ({selectedIds.length})
            </button>
          )}

          <button
            onClick={() =>
              goTo(
                "/manufacturing-module/manufacturing-setup/bom-master-formula/create",
              )
            }
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md bg-primary md:w-auto"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Create
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* TABLE */}
      <div className="mt-3 overflow-hidden bg-white rounded-2xl">
        <CustomTable
          loading={isLoading}
          norounded
          height="auto"
          headers={[
            "Edit",
            "Select",
            "Formula ID",
            "Product Name",
            "Batch Size",
            "Target Yield %",
            "Total Process Steps",
            "Raw Material",
            "Last Modified",
            "Workflow State",
          ]}
          data={filteredList.map((item: any) => [
            <Icon
              icon="basil:edit-outline"
              className="text-lg cursor-pointer text-primary"
              onClick={() =>
                navigate(
                  "/manufacturing-module/manufacturing-setup/bom-master-formula/create",
                  {
                    state: { rowData: item, type: "edit" },
                  },
                )
              }
            />,

            // ✅ Per row checkbox
            <div className="flex items-center justify-center">
            <CustomCheckbox
  checked={selectedIds.includes(item._id)}
  onChange={() => toggleSelect(item._id)}
/>
            </div>,

            item.formulaId || "-",
            item.productName || "-",
            item.batchSize || "-",
            item.targetYield || "-",
            item.totalProcessSteps || "-",
            <div className="flex flex-col gap-1">
              {item.rawMaterials?.length
                ? item.rawMaterials.map((rm: any, i: number) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-xs">{rm.itemName || "-"}</span>
                      <span className="text-xs text-gray-400">
                        {rm.quantity && `${rm.quantity} ${rm.uom || ""}`}
                      </span>
                    </div>
                  ))
                : "-"}
            </div>,
            dayjs(item?.lastModified).format("DD-MM-YYYY") || "-",

            <span
              className="px-2 py-1 text-xs font-medium rounded-md"
              style={{
                backgroundColor:
                  item.workflowState === "approved"
                    ? "#00F2001F"
                    : item.workflowState === "rejected"
                      ? "#FF00001F"
                      : "#F2F2001F",
                color:
                  item.workflowState === "approved"
                    ? "#1E9B1E"
                    : item.workflowState === "rejected"
                      ? "#D10000"
                      : "#9B8A1E",
              }}
            >
              {item.workflowState || "-"}
            </span>,
          ])}
        />
      </div>
    </div>
  );
}
