import { Icon } from "@iconify/react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  getAllSOPMaster,
  deleteSOPMaster, // ✅ apni API file mein add karo
} from "../../../../api/manufacturingSerives";
import { BASE_URL } from "../../../../api/endPoint";

const getFileName = (path: string) => path?.split("/").pop() || path;
const getFileUrl = (path: string) => `${BASE_URL}/${path}`;

export default function SopMaster() {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { goTo } = useAppNavigate();
  const navigate = useNavigate();

  const {
    data: sopData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllSOPMaster"],
    queryFn: getAllSOPMaster,
    staleTime: Infinity,
  });

  const sopList = sopData?.data?.data || [];

  const filteredList = sopList.filter((item: any) =>
    [
      item.sopNumber,
      item.documentTitle,
      item.department?.fullName,
      item.currentVersion,
      item.reviewCycle,
    ].some((val) =>
      String(val ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );

  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: (id: string) => deleteSOPMaster(id),
    onSuccess: async () => {
      notifySuccess("SOP Deleted Successfully");
      setSelectedId(null);
      await refetch();
    },
    onError: (err: any) =>
      notifyError(err?.response?.data?.message || "Something went wrong"),
  });

  const toggleSelect = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id));

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
          <div className="relative w-full md:w-40">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
            />
            <Icon
              icon="mynaui:search"
              className="absolute text-[20px] text-heading1/36 top-2.5 left-3"
            />
          </div>

          {selectedId && (
            <button
              onClick={() => deleteItem(selectedId)}
              disabled={isPending}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md md:w-auto bg-red-500"
            >
              <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
              {isPending ? "Deleting..." : "Delete"}
            </button>
          )}

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
          data={filteredList?.map((item: any) => [
            <Icon
              icon="basil:edit-outline"
              className="cursor-pointer text-lg text-primary"
              onClick={() =>
                navigate(
                  "/manufacturing-module/master-data/sop-master/create",
                  {
                    state: { rowData: item, type: "edit" },
                  },
                )
              }
            />,

            <div className="flex items-center justify-center">
              <div
                onClick={() => toggleSelect(item._id)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors
                  ${selectedId === item._id ? "bg-primary border-primary" : "border-gray-400"}`}
              >
                {selectedId === item._id && (
                  <Icon icon="mdi:check" className="text-white text-[10px]" />
                )}
              </div>
            </div>,

            item?.sopNumber || "-",
            item?.documentTitle || "-",
            item?.department?.fullName || "-",
            item?.currentVersion || "-",
            item?.effectiveDate || "-",
            item?.reviewCycle || "-",

            <span
              className="text-xs underline cursor-pointer"
              style={{ color: "#0088FF" }}
              onClick={() => {
                if (item?.attachment) {
                  window.open(getFileUrl(item.attachment), "_blank");
                }
              }}
            >
              {item?.attachment ? getFileName(item.attachment) : "-"}
            </span>,
          ])}
        />
      </div>
    </div>
  );
}
