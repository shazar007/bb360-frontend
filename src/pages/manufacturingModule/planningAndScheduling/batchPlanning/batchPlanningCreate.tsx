import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  addBatchPlanning,
  getAllBatchPlanning,
  updateBatchPlanning,
} from "../../../../api/manufacturingSerives";
import { getAllItems } from "../../../../api/itemServices";

const SHIFT_OPTIONS = [
  { label: "Morning", value: "morning" },
  { label: "Evening", value: "evening" },
  { label: "Night", value: "night" },
];

const EQUIPMENT_STATUS_OPTIONS = [
  { label: "Cleaned", value: "cleaned" },
  { label: "Dirty", value: "dirty" },
];

const RUN_STATUS_OPTIONS = [
  { label: "Ready", value: "ready" },
  { label: "Running", value: "running" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "onhold" },
];

const validationSchema = Yup.object({
  targetFgItem: Yup.string().required("Target FG Item is required"),
  assignedLineName: Yup.string().required("Assigned Line is required"),
  plannedBatchSize: Yup.string().required("Planned Batch Size is required"),
  batchShift: Yup.string().required("Batch Shift is required"),
  startTimestamp: Yup.string().required("Start Timestamp is required"),
  endTimestamp: Yup.string().required("End Timestamp is required"),
  equipmentStatus: Yup.string().required("Equipment Status is required"),
  runStatus: Yup.string().required("Run Status is required"),
});

export default function BatchPlanningCreate() {
  const { goBack } = useAppNavigate();
  const { state } = useLocation();
  const isEdit = state?.type === "edit";
  const itemData = state?.rowData;

  /* =========================
     Queries
  ========================= */
  const { refetch } = useQuery({
    queryKey: ["getAllBatchPlanning"],
    queryFn: getAllBatchPlanning,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const items = AllItems?.data?.items || [];
  const finishedGoods = items.filter(
    (i: any) => i.itemCategory === "FINISHED_GOODS",
  );
  const itemOptions = finishedGoods.map((i: any) => ({
    label: i.itemName || "",
    value: i._id || "",
  }));

  /* =========================
     Mutation
  ========================= */
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) =>
      isEdit
        ? updateBatchPlanning(itemData?._id, payload)
        : addBatchPlanning(payload),
    onSuccess: async () => {
      notifySuccess(
        isEdit ? "Batch Planning Updated" : "Batch Planning Created",
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
      plannedBatchId: itemData?.plannedBatchId || "",
      targetFgItem: itemData?.targetFgItem?._id || itemData?.targetFgItem || "",
      targetFgItemName: itemData?.targetFgItemName || "",
      assignedLineName: itemData?.assignedLineName || "",
      plannedBatchSize: itemData?.plannedBatchSize
        ? String(itemData.plannedBatchSize)
        : "",
      batchShift: itemData?.batchShift || "",
      startTimestamp: itemData?.startTimestamp || "",
      endTimestamp: itemData?.endTimestamp || "",
      equipmentStatus: itemData?.equipmentStatus || "",
      runStatus: itemData?.runStatus || "",
    },
    validationSchema,
    onSubmit: (values) => mutate(values),
  });

  const err = (field: string) =>
    (formik.touched as any)[field] && (formik.errors as any)[field]
      ? (formik.errors as any)[field]
      : "";

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            {isEdit ? "Edit Production Order" : "Create Production Order"}
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={goBack}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" /> Back
          </button>
          <button
            onClick={() => formik.handleSubmit()}
            disabled={isPending}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            <Icon icon="mynaui:save" className="w-5 h-5" />
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              {isEdit ? "Edit Batch Planning" : "Create Batch Planning"}
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-2">
            <CustomInput
              disabled
              label="Planned Batch ID"
              placeholder="TO BE GENERATED"
              value={formik.values.plannedBatchId}
            />

            <div className="flex flex-col gap-1">
              <CustomInput
                label="Assigned Line"
                placeholder="Line 1, Compression B"
                value={formik.values.assignedLineName}
                onChange={(e: any) =>
                  formik.setFieldValue("assignedLineName", e.target.value)
                }
              />
              {err("assignedLineName") && (
                <p className="text-[11px] text-red-500">
                  {err("assignedLineName")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="Batch Shift"
                placeholder="Select Shift"
                options={SHIFT_OPTIONS}
                value={formik.values.batchShift}
                onChange={(val) => formik.setFieldValue("batchShift", val)}
              />
              {err("batchShift") && (
                <p className="text-[11px] text-red-500">{err("batchShift")}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-heading1">Start Timestamp</label>
              <input
                type="time"
                value={formik.values.startTimestamp}
                onChange={(e) =>
                  formik.setFieldValue("startTimestamp", e.target.value)
                }
                onBlur={() => formik.setFieldTouched("startTimestamp", true)}
                className="h-10 px-3 rounded-md bg-[#ECF0F4] text-xs text-heading1 outline-none cursor-pointer"
              />
              {err("startTimestamp") && (
                <p className="text-[11px] text-red-500">
                  {err("startTimestamp")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-heading1">End Timestamp</label>
              <input
                type="time"
                value={formik.values.endTimestamp}
                onChange={(e) =>
                  formik.setFieldValue("endTimestamp", e.target.value)
                }
                onBlur={() => formik.setFieldTouched("endTimestamp", true)}
                className="h-10 px-3 rounded-md bg-[#ECF0F4] text-xs text-heading1 outline-none cursor-pointer"
              />
              {err("endTimestamp") && (
                <p className="text-[11px] text-red-500">
                  {err("endTimestamp")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelectSearch
                label="Target FG Item"
                options={itemOptions}
                value={formik.values.targetFgItem}
                onChange={(val) => {
                  const found = finishedGoods.find((i: any) => i._id === val);
                  formik.setFieldValue("targetFgItem", val);
                  formik.setFieldValue(
                    "targetFgItemName",
                    found?.itemName || "",
                  );
                }}
              />
              {err("targetFgItem") && (
                <p className="text-[11px] text-red-500">
                  {err("targetFgItem")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomInput
                label="Planned Batch Size"
                placeholder="10,000"
                type="number"
                value={formik.values.plannedBatchSize}
                onChange={(e: any) =>
                  formik.setFieldValue("plannedBatchSize", e.target.value)
                }
              />
              {err("plannedBatchSize") && (
                <p className="text-[11px] text-red-500">
                  {err("plannedBatchSize")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="Equipment Status"
                placeholder="Select Status"
                options={EQUIPMENT_STATUS_OPTIONS}
                value={formik.values.equipmentStatus}
                onChange={(val) => formik.setFieldValue("equipmentStatus", val)}
              />
              {err("equipmentStatus") && (
                <p className="text-[11px] text-red-500">
                  {err("equipmentStatus")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="Run Status"
                placeholder="Select Run Status"
                options={RUN_STATUS_OPTIONS}
                value={formik.values.runStatus}
                onChange={(val) => formik.setFieldValue("runStatus", val)}
              />
              {err("runStatus") && (
                <p className="text-[11px] text-red-500">{err("runStatus")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
