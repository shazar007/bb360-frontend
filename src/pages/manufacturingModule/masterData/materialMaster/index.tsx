import { Icon } from "@iconify/react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  getAllMaterialMastern,
  deleteMaterialMaster, // ✅ apni API file mein add karo
} from "../../../../api/manufacturingSerives";
import CustomCheckbox from "../../../../components/customCheckbox";

export default function MaterialMaster() {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null); // ✅
  const [search, setSearch] = useState("");

  const { goTo } = useAppNavigate();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllMaterialMaster"],
    queryFn: getAllMaterialMastern,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const materials = data?.data?.data || [];

  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: (id: string) => deleteMaterialMaster(id),
    onSuccess: async () => {
      notifySuccess("Material Deleted Successfully");
      setSelectedId(null);
      await refetch();
    },
    onError: (err: any) =>
      notifyError(err?.response?.data?.message || "Something went wrong"),
  });

  const filteredMaterials = materials.filter((item: any) =>
    [
      item.materialCode,
      item.materialName,
      item.materialType,
      item.uom,
      item.vendor?.vendorName,
      item.qcDisposition,
    ].some((val) => val?.toLowerCase().includes(search.toLowerCase())),
  );

  const toggleSelect = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id)); // ✅ single select

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Material Master
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

          {/* ✅ Delete button — sirf tab dikhay jab koi selected ho */}
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
              goTo("/manufacturing-module/master-data/material-master/create")
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
          height="auto"
          headers={[
            "Edit",
            "Select",
            "Material Code",
            "Material Name",
            "Material Type",
            "UOM",
            "Shelf Life",
            "Vendor",
            "QC Disposition",
          ]}
          data={filteredMaterials.map((item: any) => [
            <Icon
              icon="basil:edit-outline"
              className="text-lg cursor-pointer text-primary"
              onClick={() =>
                navigate(
                  "/manufacturing-module/master-data/material-master/create",
                  {
                    state: { rowData: item, type: "edit" },
                  },
                )
              }
            />,

            // ✅ Single select checkbox
            <div className="flex items-center justify-center">
             <CustomCheckbox
  checked={selectedId === item._id}
  onChange={() => toggleSelect(item._id)}
/>,
            </div>,

            item.materialCode || "-",
            item.materialName || "-",
            item.materialType || "-",
            item.uom || "-",
            item.shelfLife || "-",
            item.vendor?.vendorName || "-",
            <span
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{ backgroundColor: "#E6F20029", color: "#B5B800" }}
            >
              {item.qcDisposition || "-"}
            </span>,
          ])}
        />
      </div>
    </div>
  );
}
