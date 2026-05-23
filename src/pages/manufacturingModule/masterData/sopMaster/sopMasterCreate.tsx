import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";



import { notifyError, notifySuccess } from "../../../../components/toast";
import { getAllDepartments } from "../../../../api/classificationServices";
import { addSOPMaster } from "../../../../api/manufacturingSerives";

export default function SopMasterCreate() {
  const { goBack } = useAppNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    sopNumber: "",
    department: "",
    effectiveDate: "",
    attachment: "",
    documentTitle: "",
    currentVersion: "",
    reviewCycle: "",
  });

  /* =========================
     GET Departments
  ========================= */

  const { data: departmentsData } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: getAllDepartments,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  /* =========================
     OPTIONS
  ========================= */

  const departmentOptions =
    departmentsData?.data?.data?.map((dep: any) => ({
      label: dep.fullName,
      value: dep._id,
    })) || [];

  const reviewCycleOptions = [
    {
      label: "3 Months",
      value: "3 Months",
    },
    {
      label: "6 Months",
      value: "6 Months",
    },
    {
      label: "12 Months",
      value: "12 Months",
    },
  ];

  /* =========================
     CREATE API
  ========================= */

  const { mutate: createSOP, isPending } = useMutation({
    mutationFn: addSOPMaster,

    onSuccess: () => {
      notifySuccess("SOP Master Created Successfully");

      queryClient.invalidateQueries({
        queryKey: ["getAllSopMaster"],
      });

      goBack();
    },

    onError: (error: any) => {
      notifyError(error?.message || "Something went wrong");
    },
  });

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = () => {
    try {
      if (!formData.department) {
        return notifyError("Department is required");
      }

      if (!formData.documentTitle) {
        return notifyError("Document Title is required");
      }

      const payload = {
        ...formData,
      };

      console.log("🚀 SOP Payload:", payload);

      createSOP(payload);
    } catch (error: any) {
      notifyError(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create SOP Master
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-2 md:w-auto md:flex-row md:items-center">
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
            <Icon icon="mynaui:save" className="h-5 w-5" />

            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="mt-3 rounded-2xl bg-bgprimary">
        <div className="mt-2 rounded-2xl bg-white">
          <div className="rounded-t-2xl bg-[#ECF0F4] p-4">
            <p className="text-xs font-semibold text-heading1">
              Create SOP Master
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 gap-y-2 p-4 md:grid-cols-2 lg:grid-cols-4 lg:w-230 xl:w-7xl xl:gap-x-30.25 xl:gap-y-2">
            <CustomInput
              label="SOP Number"
              placeholder="TO BE GENERATE"
              value={formData.sopNumber}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  sopNumber: e.target.value,
                })
              }
            />

            <CustomSelect
              label="Department"
              placeholder="Select Department"
              options={departmentOptions}
              value={formData.department}
              onChange={(val: any) =>
                setFormData({
                  ...formData,
                  department: val,
                })
              }
            />

            <CustomDatePicker
              label="Effective Date"
              value={formData.effectiveDate}
              onChange={(val: any) =>
                setFormData({
                  ...formData,
                  effectiveDate: val,
                })
              }
            />

            <CustomInput
              label="Attachment"
              placeholder="Upload Here..."
              value={formData.attachment}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  attachment: e.target.value,
                })
              }
            />

            <CustomInput
              label="Document Title"
              placeholder="Sanitization Protocol for Fluids B..."
              value={formData.documentTitle}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  documentTitle: e.target.value,
                })
              }
            />

            <CustomInput
              label="Current Version"
              placeholder="v2.0"
              value={formData.currentVersion}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  currentVersion: e.target.value,
                })
              }
            />

            <CustomSelect
              label="Review Cycle"
              placeholder="Select Review Cycle"
              options={reviewCycleOptions}
              value={formData.reviewCycle}
              onChange={(val: any) =>
                setFormData({
                  ...formData,
                  reviewCycle: val,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}