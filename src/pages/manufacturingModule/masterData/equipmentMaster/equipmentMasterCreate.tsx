import { Icon } from "@iconify/react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  addEquipmentMaster,
  getAllEquipmentMaster,
} from "../../../../api/manufacturingSerives";

export default function EquipmentMasterCreate() {
  const { goBack } = useAppNavigate();
  const { refetch } = useQuery({
    queryKey: ["getAllEquipment"],
    queryFn: getAllEquipmentMaster,
    staleTime: Infinity,
  });
  const [formData, setFormData] = useState({
    equipmentName: "",
    equipmentLocation: "",
    nextDueDate: "",
    workflowState: "",
    lastCalibration: "",
    cleaningStatus: "",
  });

  /* =========================
     CREATE API
  ========================= */
  const { mutate, isPending } = useMutation({
    mutationFn: addEquipmentMaster,
    onSuccess: () => {
      notifySuccess("Equipment Created Successfully");
      goBack();
      refetch();
    },
    onError: (err: any) => {
      notifyError(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    if (!formData.equipmentName) {
      return notifyError("Equipment Name required");
    }

    console.log("🚀 ~ handleSubmit ~ formData:", formData);
    mutate(formData);
  };

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Equipment Master
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:w-auto">
          <button
            onClick={goBack}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md bg-secondary md:w-auto"
          >
            <Icon icon="ion:play-back-outline" />
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md bg-primary md:w-auto"
          >
            <Icon icon="mynaui:save" />
            Save
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Equipment Master
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <CustomInput
              disabled
              label="Asset ID"
              // value={formData.assetId}
              // onChange={(e: any) =>
              //   setFormData({ ...formData, assetId: e.target.value })
              // }
              placeholder="TO BE GENERATED"
            />

            <CustomInput
              label="Equipment Location"
              value={formData.equipmentLocation}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  equipmentLocation: e.target.value,
                })
              }
              placeholder="Line 2, Hall 3"
            />

            <CustomDatePicker
              label="Next Due Date"
              value={formData.nextDueDate}
              onChange={(val: any) =>
                setFormData({ ...formData, nextDueDate: val })
              }
            />

            <CustomSelect
              label="Workflow State"
              value={formData.workflowState}
              options={[
                { label: "Approved", value: "approved" },
                { label: "Rejected", value: "rejected" },
                { label: "Draft", value: "draft" },
              ]}
              onChange={(val: any) =>
                setFormData({ ...formData, workflowState: val })
              }
            />

            <CustomInput
              label="Equipment Name"
              value={formData.equipmentName}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  equipmentName: e.target.value,
                })
              }
              placeholder="High Shear Granular Mixer"
            />

            <CustomDatePicker
              label="Last Calibration"
              value={formData.lastCalibration}
              onChange={(val: any) =>
                setFormData({ ...formData, lastCalibration: val })
              }
            />

            <CustomSelect
              label="Cleaning Status"
              value={formData.cleaningStatus}
              options={[
                { label: "Dirty", value: "dirty" },
                { label: "Clean", value: "clean" },
              ]}
              onChange={(val: any) =>
                setFormData({ ...formData, cleaningStatus: val })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
