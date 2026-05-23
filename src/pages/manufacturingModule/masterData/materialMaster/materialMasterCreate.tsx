import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SyncLoader } from "react-spinners";

import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";

import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  getAllMaterialMastern,
  addMaterialMaster,
  updateMaterialMaster,
} from "../../../../api/manufacturingSerives";
import { useLocation } from "react-router-dom";

export default function MaterialMasterCreate() {
  const { state } = useLocation();
  const item = state?.rowData;
  console.log("🚀 ~ MaterialMasterCreate ~ state:", item);
  const { goBack } = useAppNavigate();

  const [formData, setFormData] = useState({
    materialType: item?.materialType || "",
    shelfLife: item?.shelfLife || 0,
    qcDisposition: item?.qcDisposition || "",
    materialName: item?.materialName || "",
    uom: item?.uom || "",
    vendor: item?.vendor || "",
  });

  /* =========================
     Queries
  ========================= */

  const { refetch } = useQuery({
    queryKey: ["getAllMaterialMaster"],
    queryFn: getAllMaterialMastern,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  /* =========================
     Mutation
  ========================= */
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) => {
      if (state?.type === "edit") {
        return updateMaterialMaster(item?._id, payload);
      }

      return addMaterialMaster(payload);
    },

    onSuccess: async () => {
      notifySuccess(
        state?.type === "edit"
          ? "Material Master Updated"
          : "Material Master Created",
      );

      await refetch();

      goBack();
    },

    onError: (error: any) => {
      notifyError(error?.response?.data?.message || "Something went wrong");
    },
  });

  /* =========================
     Submit
  ========================= */

  const handleSubmit = () => {
    if (!formData.materialName) {
      return notifyError("Material Name is required");
    }

    console.log("🚀 ~ handleSubmit ~ formData:", formData);
    mutate(formData);
  };

  return (
    <div className="mt-2">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            {state?.type === "edit"
              ? "Edit Material Master"
              : "Create Material Master"}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <button
            onClick={goBack}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 text-white md:w-auto"
          >
            <Icon icon="ion:play-back-outline" className="h-5 w-5" />
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-white md:w-auto"
          >
            {isPending ? (
              <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="mynaui:save" className="h-5 w-5" />
                {state?.type === "edit" ? "Update" : "Save"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="mt-3 rounded-2xl bg-bgprimary">
        <div className="mt-2 rounded-2xl bg-white">
          <div className="rounded-t-2xl bg-[#ECF0F4] p-4">
            <p className="text-xs font-semibold text-heading1">
              {state?.type === "edit" ? "Edit Material" : "Create Material"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 gap-y-2 p-4 md:grid-cols-2 lg:grid-cols-4 lg:w-230 xl:w-7xl xl:gap-x-30.25 xl:gap-y-2">
            <CustomInput
              label="Material Code"
              placeholder="TO BE GENERATE"
              // value={formData.materialCode}
              // onChange={(e: any) =>
              //   setFormData({
              //     ...formData,
              //     materialCode: e.target.value,
              //   })
              // }
            />

            <CustomSelect
              label="Material Type"
              placeholder="Select Material Type"
              options={[
                {
                  label: "Raw Material",
                  value: "raw_material",
                },
                {
                  label: "Finished Goods",
                  value: "finished_goods",
                },
                {
                  label: "Packaging",
                  value: "packaging",
                },
                {
                  label: "Semi-Finished Goods",
                  value: "semi_finished",
                },
              ]}
              value={formData.materialType}
              onChange={(val: any) =>
                setFormData({
                  ...formData,
                  materialType: val,
                })
              }
            />

            <CustomInput
              label="Shelf Life (Days)"
              type="number"
              placeholder="30"
              value={formData.shelfLife}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  shelfLife: Number(e.target.value),
                })
              }
            />

            <CustomSelect
              label="QC Disposition"
              placeholder="Select QC Disposition"
              options={[
                {
                  label: "Quarantine",
                  value: "quarantine",
                },
                {
                  label: "Approved",
                  value: "approved",
                },
              ]}
              value={formData.qcDisposition}
              onChange={(val: any) =>
                setFormData({
                  ...formData,
                  qcDisposition: val,
                })
              }
            />

            <CustomInput
              label="Material Name"
              placeholder="Paracetamol"
              value={formData.materialName}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  materialName: e.target.value,
                })
              }
            />

            <CustomSelect
              label="UOM"
              placeholder="Select UOM"
              options={[
                { label: "ml", value: "ml" },
                { label: "kg", value: "kg" },
                { label: "pcs", value: "pcs" },
                { label: "box", value: "box" },
                { label: "strip", value: "strip" },
                { label: "bottle", value: "bottle" },
                { label: "pack", value: "pack" },
                { label: "dozen", value: "dozen" },
              ]}
              value={formData.uom}
              onChange={(val: any) =>
                setFormData({
                  ...formData,
                  uom: val,
                })
              }
            />

            <CustomInput
              label="Vendor"
              placeholder="Vendor Name"
              value={formData.vendor}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  vendor: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
