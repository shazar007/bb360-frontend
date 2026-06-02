import { Icon } from "@iconify/react";
import { useState } from "react";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@tanstack/react-query";

import CustomTable from "./components/customTable";
import Filter from "../../../../components/customDatefilter";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  getAllDemandPlanning,
  updateDemandPlanning,
} from "../../../../api/manufacturingSerives";

export default function DemandPlanning() {
  const [openFilter, setOpenFilter] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [localQty, setLocalQty] = useState<
    Record<string, Record<string, string>>
  >({});
  const [search, setSearch] = useState("");

  /* =========================
     GET API
  ========================= */
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllDemandPlanning"],
    queryFn: getAllDemandPlanning,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const planningList = data?.data?.data || [];

  const allMonths = planningList.flatMap(
    (row: any) => row.months?.map((m: any) => m.monthName) || [],
  );
  const monthlyData = [...new Set(allMonths)] as string[];

  const filteredList = planningList.filter((row: any) =>
    [
      row.productName,
      row.line,
      row.action,
      ...(row.months?.map((m: any) => m.monthName) || []),
    ].some((val) =>
      String(val ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );

  /* =========================
     UPDATE API
  ========================= */
  const { mutate: updateRow, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => {
      console.log("🚀 ~ DemandPlanning ~ id:", id);
      console.log("🚀 ~ DemandPlanning ~ payload:", payload);
      return updateDemandPlanning(id, payload);
    },
    onSuccess: async () => {
      notifySuccess("Updated Successfully");
      setEditingId(null);
      await refetch();
    },
    onError: (err: any) =>
      notifyError(err?.response?.data?.message || "Something went wrong"),
  });

  /* =========================
     Helpers
  ========================= */
  const getQty = (row: any, month: string): string => {
    // local edit state pehle check karo
    if (localQty[row._id]?.[month] !== undefined)
      return localQty[row._id][month];
    // phir API data
    const found = row.months?.find((m: any) => m.monthName === month);
    return found ? String(found.qty) : "";
  };

  const handleQtyChange = (rowId: string, month: string, val: string) => {
    setLocalQty((prev) => ({
      ...prev,
      [rowId]: { ...prev[rowId], [month]: val },
    }));
  };

  const handleEdit = (row: any) => {
    // Edit start — seed localQty with existing months
    const seed: Record<string, string> = {};
    row.months?.forEach((m: any) => {
      seed[m.monthName] = String(m.qty);
    });
    setLocalQty((prev) => ({ ...prev, [row._id]: seed }));
    setEditingId(row._id);
  };

  const handleSave = (row: any) => {
    if (!editingId) return;
    const currentRow = planningList.find((r: any) => r._id === editingId);
    if (!currentRow) return;

    const months = monthlyData.map((month) => ({
      monthName: month,
      qty: Number(localQty[currentRow._id]?.[month] || 0),
    }));

    updateRow({
      id: currentRow._id,
      payload: {
        productName: currentRow.productName,
        line: currentRow.line,
        action: currentRow.action,
        months, // ✅ updated quantities
      },
    });
  };

  const getTotalQty = (row: any): string => {
    const total = monthlyData.reduce(
      (sum, month) => sum + (Number(getQty(row, month)) || 0),
      0,
    );
    return total ? total.toLocaleString() : "-";
  };

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Demand Planning
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <div className="relative w-full md:w-40">
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
            />
            <Icon
              icon="mynaui:search"
              className="absolute text-[20px] text-heading1/36 top-2.5 left-3"
            />
          </div>
          <button
            onClick={handleSave} // ✅ row argument nahi chahiye ab
            disabled={isPending}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-white md:w-auto"
          >
            <Icon icon="mynaui:save" className="h-5 w-5" />
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* TABLE */}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          height="70vh"
          headers={[
            "Edit",
            "Product Name",
            ...monthlyData.map((month) => (
              <div className="min-w-28 text-center">{month}</div>
            )),
            "Total Qty",
            "Action",
          ]}
          data={filteredList.map((row: any) => {
            const isEditing = editingId === row._id;
            return [
              // Edit
              <Icon
                icon={isEditing ? "mdi:close-circle" : "basil:edit-outline"}
                className={`text-lg cursor-pointer ${isEditing ? "text-orange-400" : "text-primary"}`}
                onClick={() =>
                  isEditing ? setEditingId(null) : handleEdit(row)
                }
              />,

              // Product Name
              <div>
                <p>{row.productName || "-"}</p>
                <p className="text-xs text-heading2">{row.line || "-"}</p>
              </div>,

              // Monthly Qty
              ...monthlyData.map((month) =>
                isEditing ? (
                  <input
                    type="number"
                    value={getQty(row, month)}
                    onChange={(e) =>
                      handleQtyChange(row._id, month, e.target.value)
                    }
                    placeholder="0"
                    className="w-24 px-2 py-1 text-sm text-center rounded-md border border-primary outline-none focus:border-blue-400"
                  />
                ) : (
                  <div className="px-4 py-1 text-sm rounded-md border border-[#304250]/36">
                    {getQty(row, month) || "-"}
                  </div>
                ),
              ),

              // Total Qty
              getTotalQty(row),

              // Action
              isEditing ? (
                <button
                  onClick={() => {
                    setEditingId(null);
                  }}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Cancel
                </button>
              ) : (
                <span className="text-xs">{row.action || "-"}</span>
              ),
            ];
          })}
        />
      </div>
    </div>
  );
}

// <div className="w-40">
//   <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
//     <span>75%</span>
//     <span>to complete</span>
//   </div>

//   <div className="w-full h-3 rounded-full bg-[#D9D9D9] overflow-hidden">
//     <div className="w-[75%] h-full bg-[#20C4C4] rounded-full flex items-center justify-center">
//       <div className="w-1.5 h-1.5 bg-white rounded-full" />
//     </div>
//   </div>
// </div>,
