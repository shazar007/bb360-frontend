import { Icon } from "@iconify/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { addBillOfMaterial } from "../../../../api/manufacturingSerives";

export default function BomMasterFormulaCreate() {
  const { goBack } = useAppNavigate();

  const [formData, setFormData] = useState({
    formulaId: "",
    batchSize: "",
    totalProcessSteps: "",
    workflowState: "",
    productName: "",
    targetYield: "",
    lastModified: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addBillOfMaterial,
    onSuccess: () => {
      notifySuccess("BOM Created Successfully");
      goBack();
    },
    onError: (err: any) => {
      notifyError(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    if (!formData.productName) {
      return notifyError("Product Name required");
    }

    mutate(formData);
  };

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Bill Of Material (BOM)
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
            <p className="text-xs font-semibold text-heading1">Create BOM</p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <CustomInput
              disabled
              label="Formula ID"
              value={formData.formulaId}
              onChange={(e: any) =>
                setFormData({ ...formData, formulaId: e.target.value })
              }
              placeholder="TO BE GENERATED"
            />

            <CustomInput
              label="Batch Size"
              value={formData.batchSize}
              onChange={(e: any) =>
                setFormData({ ...formData, batchSize: e.target.value })
              }
              placeholder="10,000 Tablets"
            />

            <CustomInput
              label="Total Process Steps"
              value={formData.totalProcessSteps}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  totalProcessSteps: e.target.value,
                })
              }
              placeholder="8"
            />

            <CustomSelect
              label="Workflow State"
              value={formData.workflowState}
              options={[
                { label: "Approved", value: "Approved" },
                { label: "Draft", value: "Draft" },
                { label: "Pending", value: "Pending" },
              ]}
              onChange={(val: any) =>
                setFormData({ ...formData, workflowState: val })
              }
            />

            <CustomInput
              label="Product Name"
              value={formData.productName}
              onChange={(e: any) =>
                setFormData({ ...formData, productName: e.target.value })
              }
              placeholder="Paracetamol"
            />

            <CustomSelect
              label="Target Yield %"
              value={formData.targetYield}
              options={[
                { label: "70%", value: "70" },
                { label: "75%", value: "75" },
                { label: "80%", value: "80" },
                { label: "85%", value: "85" },
                { label: "90%", value: "90" },
              ]}
              onChange={(val: any) =>
                setFormData({ ...formData, targetYield: val })
              }
            />

            <CustomDatePicker
              label="Last Modified"
              value={formData.lastModified}
              onChange={(val: any) =>
                setFormData({ ...formData, lastModified: val })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
