import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";

import CustomSelect from "../../../../components/customSelect";
import { useEffect, useState } from "react";
export default function SamplingOperationsCreate() {
  const { goBack } = useAppNavigate();
  const [errors, setErrors] = useState<any>({});

  const [formData, setFormData] = useState({
    samplingId: "",
    vendorLotId: "",
    sampleWtUom: "",
    targetLab: "",
    materialName: "",
    sampleWt: "",
    storageState: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    const editData = localStorage.getItem("samplingEditData");

    if (editData) {
      const parsed = JSON.parse(editData);

      setEditIndex(parsed.editIndex);
      setIsEditMode(true);

      setFormData({
        samplingId: parsed.samplingId || "",
        vendorLotId: parsed.vendorLotId || "",
        sampleWtUom: parsed.sampleWt
          ? parsed.sampleWt.split(" ").slice(-1)[0]
          : "",
        targetLab: parsed.targetLab || "",
        materialName: parsed.materialName || "",
        sampleWt: parsed.sampleWt ? parsed.sampleWt.split(" ")[0] : "",

        storageState: parsed.storageState || "",
      });
    }
  }, []);
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev: any) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  const handleSave = () => {
    const newErrors: any = {};

    if (!formData.samplingId.trim())
      newErrors.samplingId = "Sampling ID is required";

    if (!formData.vendorLotId.trim())
      newErrors.vendorLotId = "Vendor LOT ID is required";

    if (!formData.sampleWtUom.trim())
      newErrors.sampleWtUom = "Sample WT UOM is required";

    if (!formData.targetLab.trim())
      newErrors.targetLab = "Target Lab is required";

    if (!formData.materialName.trim())
      newErrors.materialName = "Material Name is required";

    if (!formData.sampleWt.trim()) newErrors.sampleWt = "Sample WT is required";

    if (!formData.storageState.trim())
      newErrors.storageState = "Storage State is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const existingData = JSON.parse(
      localStorage.getItem("samplingTableData") || "[]",
    );

    if (editIndex !== null) {
      existingData[editIndex] = {
        ...existingData[editIndex],

        sampleWt: `${formData.sampleWt} ${formData.sampleWtUom}`,

        storageState: formData.storageState,

        targetLab: formData.targetLab,
      };
    } else {
      existingData.push({
        samplingId: formData.samplingId,
        materialName: formData.materialName,
        vendorLotId: formData.vendorLotId,

        totalMaterial: "",

        sampleWt: `${formData.sampleWt} ${formData.sampleWtUom}`,

        storageState: formData.storageState,
        targetLab: formData.targetLab,
      });
    }

    localStorage.setItem("samplingTableData", JSON.stringify(existingData));

    localStorage.removeItem("samplingEditData");

    alert("Data Saved Successfully");

    goBack();
  };
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Sampling
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={goBack}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            <Icon icon="mynaui:save" className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>

      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Sampling
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-25.25 xl:w-7xl lg:w-230 gap-y-2">
            <div>
              <CustomInput
                label="Sampling ID"
                disabled={isEditMode}
                value={formData.samplingId}
                onChange={(e: any) =>
                  handleChange("samplingId", e.target.value)
                }
                placeholder="TO BE GENERATE"
              />
              {errors.samplingId && (
                <p className="mt-1 text-xs text-red-500">{errors.samplingId}</p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Vendor LOT ID"
                disabled={isEditMode}
                value={formData.vendorLotId}
                className={isEditMode ? "opacity-100!" : ""}
                onChange={(value) => handleChange("vendorLotId", value)}
                placeholder="LOT-2026-44LM"
                options={[
                  {
                    label: "LOT-2026-44X",
                    value: "LOT-2026-44X",
                  },
                  {
                    label: "LOT-2026-90A",
                    value: "LOT-2026-90A",
                  },
                  {
                    label: "LOT-2026-78B",
                    value: "LOT-2026-78B",
                  },
                ]}
              />
              {errors.vendorLotId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.vendorLotId}
                </p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Sample Wt UOM"
                value={formData.sampleWtUom}
                onChange={(value) => handleChange("sampleWtUom", value)}
                placeholder="ml"
                options={[
                  {
                    label: "ml",
                    value: "ml",
                  },
                  {
                    label: "gm",
                    value: "gm",
                  },
                  {
                    label: "Kg",
                    value: "Kg",
                  },
                ]}
              />
              {errors.sampleWtUom && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.sampleWtUom}
                </p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Target Lab"
                value={formData.targetLab}
                onChange={(value) => handleChange("targetLab", value)}
                placeholder="QC-Micro Lab"
                options={[
                  {
                    label: "QC-Micro Lab",
                    value: "QC-Micro Lab",
                  },
                  {
                    label: "QC-Chemical Lab",
                    value: "QC-Chemical Lab",
                  },
                  {
                    label: "QC-Stability Lab",
                    value: "QC-Stability Lab",
                  },
                ]}
              />
              {errors.targetLab && (
                <p className="mt-1 text-xs text-red-500">{errors.targetLab}</p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Material Name"
                disabled={isEditMode}
                value={formData.materialName}
                className={isEditMode ? "opacity-100!" : ""}
                onChange={(value) => handleChange("materialName", value)}
                placeholder="Paracetamol 500mg SKU-Tab-PA..."
                options={[
                  {
                    label: "Paracetamol 500mg SKU-Tab-PA",
                    value: "Paracetamol 500mg SKU-Tab-PA",
                  },
                  {
                    label: "Lactose Mono",
                    value: "Lactose Mono",
                  },
                  {
                    label: "Liquid API Base",
                    value: "Liquid API Base",
                  },
                ]}
              />
              {errors.materialName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.materialName}
                </p>
              )}
            </div>

            <div>
              <CustomInput
                label="Sample Wt"
                value={formData.sampleWt}
                onChange={(e: any) => handleChange("sampleWt", e.target.value)}
                placeholder="10,000"
              />
              {errors.sampleWt && (
                <p className="mt-1 text-xs text-red-500">{errors.sampleWt}</p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Storage State"
                value={formData.storageState}
                onChange={(value) => handleChange("storageState", value)}
                placeholder="Dry Space"
                options={[
                  {
                    label: "Dry Space",
                    value: "Dry Space",
                  },
                  {
                    label: "Cold Freezer",
                    value: "Cold Freezer",
                  },
                  {
                    label: "Controlled Room",
                    value: "Controlled Room",
                  },
                ]}
              />
              {errors.storageState && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.storageState}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
