import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SyncLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  getAllMaterialMastern,
  addMaterialMaster,
  updateMaterialMaster,
} from "../../../../api/manufacturingSerives";
import { getAllItems } from "../../../../api/itemServices";
import { getAllVendors } from "../../../../api/vendorServices";

const MATERIAL_TYPE_OPTIONS = [
  { label: "Raw Material", value: "raw_material" },
  { label: "Finished Goods", value: "finished_goods" },
  { label: "Packaging", value: "packaging" },
  { label: "Semi-Finished Goods", value: "semi_finished" },
];

const QC_OPTIONS = [
  { label: "Quarantine", value: "quarantine" },
  { label: "Approved", value: "approved" },
];

const validationSchema = Yup.object({
  item: Yup.string().required("Material Name is required"),
  materialType: Yup.string().required("Material Type is required"),
  shelfLife: Yup.number()
    .min(1, "Shelf Life must be at least 1")
    .required("Shelf Life is required"),
  qcDisposition: Yup.string().required("QC Disposition is required"),
  vendor: Yup.string().required("Vendor is required"),
});

export default function MaterialMasterCreate() {
  const { state } = useLocation();
  const { goBack } = useAppNavigate();
  const isEdit = state?.type === "edit";
  const itemData = state?.rowData;

  /* =========================
     Queries
  ========================= */
  const { refetch } = useQuery({
    queryKey: ["getAllMaterialMaster"],
    queryFn: getAllMaterialMastern,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: AllVendors } = useQuery({
    queryKey: ["getAllVendors"],
    queryFn: getAllVendors,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const items = AllItems?.data?.items || [];
  const vendors = AllVendors?.data?.vendors || [];

  const itemOptions = items.map((i: any) => ({
    label: i.itemName ?? "",
    value: i._id ?? "",
  }));
  const vendorOptions = vendors.map((v: any) => ({
    label: v.vendorName || v.name,
    value: v._id,
  }));

  /* =========================
     Mutation
  ========================= */
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) =>
      isEdit
        ? updateMaterialMaster(itemData?._id, payload)
        : addMaterialMaster(payload),
    onSuccess: async () => {
      notifySuccess(
        isEdit ? "Material Master Updated" : "Material Master Created",
      );
      await refetch();
      goBack();
    },
    onError: (err: any) =>
      notifyError(err?.response?.data?.message || "Something went wrong"),
  });

  /* =========================
     Formik
  ========================= */
  const formik = useFormik({
    initialValues: {
      item: itemData?.item?._id || itemData?.item || "", // ✅ edit me ID set karo
      materialName: itemData?.materialName || "",
      materialType: itemData?.materialType || "",
      shelfLife: itemData?.shelfLife || "",
      qcDisposition: itemData?.qcDisposition || "",
      uom: itemData?.uom || "",
      vendor: itemData?.vendor?._id || itemData?.vendor || "",
    },
    validationSchema,
    onSubmit: (values) => mutate(values),
  });

  // helper — error sirf touched hone ke baad dikhao
  const err = (field: string) =>
    (formik.touched as any)[field] && (formik.errors as any)[field]
      ? (formik.errors as any)[field]
      : "";

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            {isEdit ? "Edit Material Master" : "Create Material Master"}
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
            onClick={() => formik.handleSubmit()}
            disabled={isPending}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-white md:w-auto"
          >
            {isPending ? (
              <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="mynaui:save" className="h-5 w-5" />
                {isEdit ? "Update" : "Save"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="mt-3 rounded-2xl bg-bgprimary">
        <div className="mt-2 rounded-2xl bg-white">
          <div className="rounded-t-2xl bg-[#ECF0F4] p-4">
            <p className="text-xs font-semibold text-heading1">
              {isEdit ? "Edit Material" : "Create Material"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-4">
            <CustomInput
              disabled
              label="Material Code"
              placeholder="TO BE GENERATED"
              value={itemData?.materialCode || ""}
            />

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="Material Type"
                placeholder="Select Material Type"
                options={MATERIAL_TYPE_OPTIONS}
                value={formik.values.materialType}
                onChange={(val) => formik.setFieldValue("materialType", val)}
              />
              {err("materialType") && (
                <p className="text-[11px] text-red-500">
                  {err("materialType")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomInput
                label="Shelf Life (Days)"
                type="number"
                placeholder="30"
                value={formik.values.shelfLife}
                onChange={(e: any) =>
                  formik.setFieldValue("shelfLife", Number(e.target.value))
                }
              />
              {err("shelfLife") && (
                <p className="text-[11px] text-red-500">{err("shelfLife")}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="QC Disposition"
                placeholder="Select QC Disposition"
                options={QC_OPTIONS}
                value={formik.values.qcDisposition}
                onChange={(val) => formik.setFieldValue("qcDisposition", val)}
              />
              {err("qcDisposition") && (
                <p className="text-[11px] text-red-500">
                  {err("qcDisposition")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelectSearch
                label="Material Name"
                options={itemOptions}
                value={formik.values.item}
                onChange={(val) => {
                  const selected = items.find((i: any) => i._id === val);
                  formik.setFieldValue("item", val);
                  formik.setFieldValue(
                    "materialName",
                    selected?.itemName || "",
                  );
                  formik.setFieldValue("uom", selected?.uom || "");
                }}
              />
              {err("item") && (
                <p className="text-[11px] text-red-500">{err("item")}</p>
              )}
            </div>

            <CustomInput
              disabled
              label="UOM"
              placeholder="Auto filled"
              value={formik.values.uom}
            />

            <div className="flex flex-col gap-1">
              <CustomSelectSearch
                label="Vendor"
                options={vendorOptions}
                value={formik.values.vendor}
                onChange={(val) => formik.setFieldValue("vendor", val)}
              />
              {err("vendor") && (
                <p className="text-[11px] text-red-500">{err("vendor")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
