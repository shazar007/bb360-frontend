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
import { getAllDepartments } from "../../../../api/classificationServices";
import {
  addSOPMaster,
  getAllSOPMaster,
  updateSOPMaster,
} from "../../../../api/manufacturingSerives";
import { useRef, useState } from "react";

const REVIEW_CYCLE_OPTIONS = [
  { label: "3 Months", value: "3 Months" },
  { label: "6 Months", value: "6 Months" },
  { label: "12 Months", value: "12 Months" },
];

const validationSchema = Yup.object({
  department: Yup.string().required("Department is required"),
  documentTitle: Yup.string().required("Document Title is required"),
  effectiveDate: Yup.string().required("Effective Date is required"),
  currentVersion: Yup.string().required("Current Version is required"),
  reviewCycle: Yup.string().required("Review Cycle is required"),
  attachment: Yup.string().required("Attachment is required"), // ✅
});

export default function SopMasterCreate() {
  const { state } = useLocation();
  const isEdit = state?.type === "edit";
  const itemData = state?.rowData;
  console.log("🚀 ~ SopMasterCreate ~ itemData:", itemData);
  const { goBack } = useAppNavigate();

  /* =========================
     Queries
  ========================= */
  const { data: departmentsData } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: getAllDepartments,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const departmentOptions =
    departmentsData?.data?.data?.map((dep: any) => ({
      label: dep.fullName,
      value: dep._id,
    })) || [];

  const { refetch } = useQuery({
    queryKey: ["getAllSOPMaster"],
    queryFn: getAllSOPMaster,
    staleTime: Infinity,
  });

  /* =========================
     Mutation
  ========================= */
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: FormData) => {
      console.log("🚀 ~ SopMasterCreate ~ payload:", payload);
      return isEdit
        ? updateSOPMaster(itemData?._id, payload)
        : addSOPMaster(payload);
    },

    onSuccess: async () => {
      notifySuccess(isEdit ? "SOP Master Updated" : "SOP Master Created");
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
      sopNumber: itemData?.sopNumber || "",
      department: itemData?.department?._id || itemData?.department || "", // ✅ _id lo
      effectiveDate: itemData?.effectiveDate || "",
      attachment: itemData?.attachment || "",
      documentTitle: itemData?.documentTitle || "",
      currentVersion: itemData?.currentVersion || "",
      reviewCycle: itemData?.reviewCycle || "",
    },
    validationSchema,
   onSubmit: (values) => {
  console.log("Formik Values:", values);
  console.log("Attachment:", attachmentFile);

  const payload = new FormData();
  console.log("🚀 ~ SopMasterCreate ~ payload:", payload)

  Object.entries(values).forEach(([key, val]) => {
    if (key !== "attachment") payload.append(key, String(val));
  });

  if (attachmentFile) {
    payload.append("attachment", attachmentFile);
  } else if (values.attachment) {
    payload.append("attachment", values.attachment);
  }

  for (const pair of payload.entries()) {
    console.log(pair[0], pair[1]);
  }

  mutate(payload);
}
  });

  const err = (field: string) =>
    (formik.touched as any)[field] && (formik.errors as any)[field]
      ? (formik.errors as any)[field]
      : "";

  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getFileName = (path: string) => path?.split("/").pop() || path;
  

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            {isEdit ? "Edit SOP Master" : "Create SOP Master"}
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-2 md:w-auto md:flex-row md:items-center">
          <button
            onClick={goBack}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 text-white md:w-auto"
          >
            <Icon icon="ion:play-back-outline" className="h-5 w-5" /> Back
          </button>

          <button
            onClick={() => formik.handleSubmit()}
            disabled={isPending}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-white md:w-auto"
          >
            <Icon icon="mynaui:save" className="h-5 w-5" />
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
 
      {/* FORM */}
      <div className="mt-3 rounded-2xl bg-bgprimary">
        <div className="mt-2 rounded-2xl bg-white">
          <div className="rounded-t-2xl bg-[#ECF0F4] p-4">
            <p className="text-xs font-semibold text-heading1">
              {isEdit ? "Edit SOP Master" : "Create SOP Master"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-4">
            <CustomInput
              disabled
              label="SOP Number"
              placeholder="TO BE GENERATED"
              value={formik.values.sopNumber}
            />

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="Department"
                placeholder="Select Department"
                options={departmentOptions}
                value={formik.values.department}
                onChange={(val) => formik.setFieldValue("department", val)}
              />
              {err("department") && (
                <p className="text-[11px] text-red-500">{err("department")}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomDatePicker
                label="Effective Date"
                value={formik.values.effectiveDate}
                onChange={(val) => formik.setFieldValue("effectiveDate", val)}
              />
              {err("effectiveDate") && (
                <p className="text-[11px] text-red-500">
                  {err("effectiveDate")}
                </p>
              )}
            </div>

            {/* Attachment */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-heading1">Attachment</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-between h-10 px-3 rounded-md bg-[#ECF0F4] cursor-pointer"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {(attachmentFile || formik.values.attachment) && (
                    <Icon
                      icon={
                        attachmentFile?.type === "application/pdf" ||
                        formik.values.attachment?.endsWith(".pdf")
                          ? "mdi:file-pdf-box"
                          : "mdi:image"
                      }
                      className={
                        attachmentFile?.type === "application/pdf" ||
                        formik.values.attachment?.endsWith(".pdf")
                          ? "text-red-500"
                          : "text-blue-500"
                      }
                      width="18"
                    />
                  )}
                  <span
                    className={`text-xs truncate ${attachmentFile || formik.values.attachment ? "text-heading1" : "text-gray-400"}`}
                  >
                    {attachmentFile
                      ? attachmentFile.name
                      : formik.values.attachment
                        ? getFileName(formik.values.attachment) // ✅ path se filename nikalo
                        : "Upload PDF or Image..."}
                  </span>
                </div>

                {attachmentFile || formik.values.attachment ? (
                  <Icon
                    icon="mdi:close"
                    width="16"
                    className="text-gray-400 cursor-pointer hover:text-red-500 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAttachmentFile(null);
                      formik.setFieldValue("attachment", "");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  />
                ) : (
                  <Icon
                    icon="mdi:paperclip"
                    className="text-gray-400 flex-shrink-0"
                    width="18"
                  />
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAttachmentFile(file);
                    formik.setFieldValue("attachment", file.name);
                  }
                }}
              />
              {err("attachment") && (
                <p className="text-[11px] text-red-500">{err("attachment")}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomInput
                label="Document Title"
                placeholder="Sanitization Protocol for Fluids B..."
                value={formik.values.documentTitle}
                onChange={(e: any) =>
                  formik.setFieldValue("documentTitle", e.target.value)
                }
              />
              {err("documentTitle") && (
                <p className="text-[11px] text-red-500">
                  {err("documentTitle")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomInput
                label="Current Version"
                placeholder="v2.0"
                value={formik.values.currentVersion}
                onChange={(e: any) =>
                  formik.setFieldValue("currentVersion", e.target.value)
                }
              />
              {err("currentVersion") && (
                <p className="text-[11px] text-red-500">
                  {err("currentVersion")}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <CustomSelect
                label="Review Cycle"
                placeholder="Select Review Cycle"
                options={REVIEW_CYCLE_OPTIONS}
                value={formik.values.reviewCycle}
                onChange={(val) => formik.setFieldValue("reviewCycle", val)}
              />
              {err("reviewCycle") && (
                <p className="text-[11px] text-red-500">{err("reviewCycle")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
