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
import CustomCheckbox from "../../../../components/customCheckbox";

const getFileName = (path: string) => path?.split("/").pop() || path;
const getFileUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}/${path}`;
};

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

  const handleDownload = async (url: string, fileName: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

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
            <span className="w-full text-center block">Attachment</span>,
          ]}
          data={filteredList?.map((item: any) => {
            console.log("🚀 ~ SopMaster ~ item:...", item);
            return [
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
                <CustomCheckbox
                  checked={selectedId === item._id}
                  onChange={() => toggleSelect(item._id)}
                />
              </div>,

              item?.sopNumber || "-",
              item?.documentTitle || "-",
              item?.department?.fullName || "-",
              item?.currentVersion || "-",
              item?.effectiveDate || "-",
              item?.reviewCycle || "-",

              item?.attachment ? (
                <div className="flex items-center justify-end w-full gap-3">
                  {/* File Name Badge */}
                  <div
                    className="max-w-[140px] truncate text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700"
                    title={getFileName(item.attachment)}
                  >
                    {getFileName(item.attachment)}
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() =>
                      window.open(getFileUrl(item.attachment), "_blank")
                    }
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                  >
                    <Icon icon="mdi:eye-outline" width="16" />
                    View
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={() =>
                      handleDownload(
                        getFileUrl(item.attachment),
                        getFileName(item.attachment),
                      )
                    }
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                  >
                    <Icon icon="mdi:download" width="16" />
                    Download
                  </button>
                </div>
              ) : (
                <span className="text-xs text-gray-400">No file</span>
              ),
            ];
          })}
        />
      </div>
    </div>
  );
}
