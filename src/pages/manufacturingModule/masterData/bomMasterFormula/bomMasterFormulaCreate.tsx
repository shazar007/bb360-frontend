import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import MultiSelect from "../../../../components/multiSelect";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  addBillOfMaterial,
  getAllBillOfMaterial,
  updateBillOfMaterial,
} from "../../../../api/manufacturingSerives";
import { getAllItems } from "../../../../api/itemServices";

const WORKFLOW_OPTIONS = [
  { label: "Approved", value: "approved" },
  { label: "Draft", value: "draft" },
  { label: "Rejected", value: "rejected" },
];

const YIELD_OPTIONS = Array.from({ length: 21 }, (_, i) => ({
  label: `${i * 5}%`,
  value: String(i * 5),
}));

const validationSchema = Yup.object({
  item: Yup.string().required("Product Name is required"),
  batchSize: Yup.string().required("Batch Size is required"),
  totalProcessSteps: Yup.string().required("Total Process Steps is required"),
  workflowState: Yup.string().required("Workflow State is required"),
  targetYield: Yup.string().required("Target Yield is required"),
  lastModified: Yup.string().required("Last Modified is required"),
  rawMaterials: Yup.array().min(1, "At least one Raw Material is required"),
});

export default function BomMasterFormulaCreate() {
  const { goBack } = useAppNavigate();
  const { state } = useLocation();
  const isEdit = state?.type === "edit";
  const itemData = state?.rowData;

  /* =========================
     Queries
  ========================= */
  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { refetch } = useQuery({
    queryKey: ["getAllBomMasterFormula"],
    queryFn: getAllBillOfMaterial,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const items = AllItems?.data?.items || [];

  const itemOptions = items
    .filter((i: any) => i.itemCategory === "FINISHED_GOODS")
    .map((i: any) => ({ label: i.itemName || "", value: i._id || "" }));

  const rawItemOptions = items
    .filter((i: any) => i.itemCategory === "RAW_MATERIAL")
    .map((i: any) => ({
      label: i.itemName || "",
      value: i._id || "",
      uom: i.uom || "",
    }));

  /* =========================
     Mutation
  ========================= */
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) =>
      isEdit
        ? updateBillOfMaterial(itemData?._id, payload)
        : addBillOfMaterial(payload),
    onSuccess: async () => {
      notifySuccess(
        isEdit ? "BOM Updated Successfully" : "BOM Created Successfully",
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
      formulaId: itemData?.formulaId || "",
      batchSize: itemData?.batchSize || "",
      totalProcessSteps: itemData?.totalProcessSteps || "",
      workflowState: itemData?.workflowState || "",
      productName: itemData?.productName || "",
      targetYield: String(itemData?.targetYield || ""),
      lastModified: itemData?.lastModified || "",
      item: itemData?.item?._id || "",
      rawMaterials:
        itemData?.rawMaterials?.map((r: any) => r.item) || ([] as string[]),
      quantities:
        itemData?.rawMaterials?.reduce(
          (acc: any, r: any) => ({ ...acc, [r.item]: String(r.quantity) }),
          {},
        ) || ({} as Record<string, string>),
    },
    validationSchema,
    onSubmit: (values) => {
      const { quantities, ...rest } = values;
      mutate({
        ...rest,
        rawMaterials: values.rawMaterials.map((id: any) => ({
          item: id,
          quantity: quantities[id] || "0",
        })),
      });
    },
  });

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
            {isEdit ? "Edit Bill of Material" : "Create Bill of Material"}
          </p>
        </div>
        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:w-auto">
          <button
            onClick={goBack}
            className="flex items-center cursor-pointer justify-center w-full h-10 gap-2 px-6 text-white rounded-md bg-secondary md:w-auto"
          >
            <Icon icon="ion:play-back-outline" /> Back
          </button>
          <button
            onClick={() => formik.handleSubmit()}
            disabled={isPending}
            className="flex items-center cursor-pointer justify-center w-full h-10 gap-2 px-6 text-white rounded-md bg-primary md:w-auto"
          >
            <Icon icon="mynaui:save" /> {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              {isEdit ? "Edit BOM" : "Create BOM"}
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <CustomInput
              disabled
              label="Formula ID"
              value={formik.values.formulaId}
              placeholder="TO BE GENERATED"
            />

            <div className="flex flex-col gap-1">
              <CustomInput
                label="Batch Size"
                value={formik.values.batchSize}
                onChange={(e: any) =>
                  formik.setFieldValue("batchSize", e.target.value)
                }
                placeholder="10,000 Tablets"
              />
              {err("batchSize") && (
                <p className="text-[11px] text-red-500">{err("batchSize")}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomInput
                label="Total Process Steps"
                value={formik.values.totalProcessSteps}
                onChange={(e: any) =>
                  formik.setFieldValue("totalProcessSteps", e.target.value)
                }
                placeholder="8"
              />
              {err("totalProcessSteps") && (
                <p className="text-[11px] text-red-500">
                  {err("totalProcessSteps")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="Workflow State"
                value={formik.values.workflowState}
                options={WORKFLOW_OPTIONS}
                onChange={(val) => formik.setFieldValue("workflowState", val)}
              />
              {err("workflowState") && (
                <p className="text-[11px] text-red-500">
                  {err("workflowState")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelectSearch
                label="Product Name"
                options={itemOptions}
                value={formik.values.item}
                onChange={(val) => {
                  const found = items.find((i: any) => i._id === val);
                  formik.setFieldValue("item", val);
                  formik.setFieldValue("productName", found?.itemName || "");
                }}
              />
              {err("item") && (
                <p className="text-[11px] text-red-500">{err("item")}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="Target Yield %"
                value={formik.values.targetYield}
                options={YIELD_OPTIONS}
                onChange={(val) => formik.setFieldValue("targetYield", val)}
              />
              {err("targetYield") && (
                <p className="text-[11px] text-red-500">{err("targetYield")}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomDatePicker
                label="Last Modified"
                value={formik.values.lastModified}
                onChange={(val) => formik.setFieldValue("lastModified", val)}
              />
              {err("lastModified") && (
                <p className="text-[11px] text-red-500">
                  {err("lastModified")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <MultiSelect
                label="Raw Material"
                required
                options={rawItemOptions}
                value={formik.values.rawMaterials}
                onChange={(val) => formik.setFieldValue("rawMaterials", val)}
                quantities={formik.values.quantities}
                onQuantityChange={(id, qty) =>
                  formik.setFieldValue("quantities", {
                    ...formik.values.quantities,
                    [id]: qty,
                  })
                }
                placeholder="Select Raw Material"
              />
              {err("rawMaterials") && (
                <p className="text-[11px] text-red-500">
                  {err("rawMaterials")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
