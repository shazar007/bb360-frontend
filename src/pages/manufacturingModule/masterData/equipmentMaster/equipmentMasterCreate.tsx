import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  addEquipmentMaster,
  getAllEquipmentMaster,
  updateEquipmentMaster,
} from "../../../../api/manufacturingSerives";

const WORKFLOW_OPTIONS = [
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Draft", value: "draft" },
];

const CLEANING_OPTIONS = [
  { label: "Dirty", value: "dirty" },
  { label: "Clean", value: "clean" },
];

const validationSchema = Yup.object({
  equipmentName: Yup.string().required("Equipment Name is required"),
  equipmentLocation: Yup.string().required("Equipment Location is required"),
  nextDueDate: Yup.string().required("Next Due Date is required"),
  workflowState: Yup.string().required("Workflow State is required"),
  lastCalibration: Yup.string().required("Last Calibration is required"),
  cleaningStatus: Yup.string().required("Cleaning Status is required"),
});

export default function EquipmentMasterCreate() {
  const { state } = useLocation();
  const isEdit = state?.type === "edit";
  const itemData = state?.rowData;
  const { goBack } = useAppNavigate();

  /* =========================
     Queries
  ========================= */
  const { refetch } = useQuery({
    queryKey: ["getAllEquipment"],
    queryFn: getAllEquipmentMaster,
    staleTime: Infinity,
  });

  /* =========================
     Mutation
  ========================= */
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) =>
      isEdit
        ? updateEquipmentMaster(itemData?._id, payload)
        : addEquipmentMaster(payload),
    onSuccess: async () => {
      notifySuccess(
        isEdit ? "Equipment Master Updated" : "Equipment Master Created",
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
      equipmentName: itemData?.equipmentName || "",
      equipmentLocation: itemData?.equipmentLocation || "",
      nextDueDate: itemData?.nextDueDate || "",
      workflowState: itemData?.workflowState || "",
      lastCalibration: itemData?.lastCalibration || "",
      cleaningStatus: itemData?.cleaningStatus || "",
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
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            {isEdit ? "Edit Equipment Master" : "Create Equipment Master"}
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
            <Icon icon="mynaui:save" />
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              {isEdit ? "Edit Equipment Master" : "Create Equipment Master"}
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <CustomInput
              disabled
              label="Asset ID"
              placeholder="TO BE GENERATED"
              value={itemData?.assertId || ""}
            />

            <div className="flex flex-col gap-1">
              <CustomInput
                label="Equipment Location"
                value={formik.values.equipmentLocation}
                onChange={(e: any) =>
                  formik.setFieldValue("equipmentLocation", e.target.value)
                }
                placeholder="Line 2, Hall 3"
              />
              {err("equipmentLocation") && (
                <p className="text-[11px] text-red-500">
                  {err("equipmentLocation")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomDatePicker
                label="Next Due Date"
                value={formik.values.nextDueDate}
                onChange={(val) => formik.setFieldValue("nextDueDate", val)}
              />
              {err("nextDueDate") && (
                <p className="text-[11px] text-red-500">{err("nextDueDate")}</p>
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
              <CustomInput
                label="Equipment Name"
                value={formik.values.equipmentName}
                onChange={(e: any) =>
                  formik.setFieldValue("equipmentName", e.target.value)
                }
                placeholder="High Shear Granular Mixer"
              />
              {err("equipmentName") && (
                <p className="text-[11px] text-red-500">
                  {err("equipmentName")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomDatePicker
                label="Last Calibration"
                value={formik.values.lastCalibration}
                onChange={(val) => formik.setFieldValue("lastCalibration", val)}
              />
              {err("lastCalibration") && (
                <p className="text-[11px] text-red-500">
                  {err("lastCalibration")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="Cleaning Status"
                value={formik.values.cleaningStatus}
                options={CLEANING_OPTIONS}
                onChange={(val) => formik.setFieldValue("cleaningStatus", val)}
              />
              {err("cleaningStatus") && (
                <p className="text-[11px] text-red-500">
                  {err("cleaningStatus")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
