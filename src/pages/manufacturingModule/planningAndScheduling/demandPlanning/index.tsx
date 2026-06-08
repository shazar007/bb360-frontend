import { Icon } from "@iconify/react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomTable from "./components/customTable";
import Filter from "../../../../components/customDatefilter";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  getAllDemandPlanning,
  updateDemandPlanning,
} from "../../../../api/manufacturingSerives";
import { SyncLoader } from "react-spinners";

export default function DemandPlanning() {
  const [openFilter, setOpenFilter] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [localQty, setLocalQty] = useState<
    Record<string, Record<string, string>>
  >({});
  const [search, setSearch] = useState("");
  const { data, refetch } = useQuery({
    queryKey: ["getAllDemandPlanning"],
    queryFn: getAllDemandPlanning,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const planningList = data?.data?.data || [];
  console.log("🚀 ~ planningList:", planningList);
  const allMonths = planningList.flatMap(
    (row: any) => row.months?.map((m: any) => m.monthName) || [],
  );
  const monthlyData = [...new Set(allMonths)] as string[];

  const { mutate: updateRow, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => {
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

  const handleSave = () => {
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
        months,
      },
    });
  };

  return (
    <div className="mt-2">
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
            onClick={handleSave}
            disabled={isPending}
            className="flex h-10 cursor-pointer w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-white md:w-auto"
          >
            <Icon icon="mynaui:save" className="h-5 w-5" />
            {isPending ? (
              <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          height="auto"
          headers={[
            "Plan No",
            "Plan Name ",
            "Plan Type",
            "Period From ",
            "Period To",
            "Department",
            "Location",
            "Priority",
            "Notes",
            "Status",
            "Action",
          ]}
          data={planningList.map((row: any) => [
            row.planNo || "-",
            row.planName || "-",
            row.planType || "-",
            row.periodFrom || "-",
            row.periodTo || "-",
            row.department || "-",
            row.location || "-",
            row.priority || "-",
            row.notes || "-",
            row.status || "-",
            <p onClick={() => {}} className="underline text-blue-500">
              Details
            </p>,
          ])}
        />
      </div>
    </div>
  );
}
