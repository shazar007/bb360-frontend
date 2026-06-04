import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";
import AddNewTest from "./components/addNewTest";
import CustomSelect from "../../../../components/customSelect";
import { useEffect, useState } from "react";
export default function QcLabTestingSuiteCreate() {
  const { goBack } = useAppNavigate();
  const [errors, setErrors] = useState<any>({});
  const [openAddNewTest, setOpenAddNewTest] = useState(false);
  const [formData, setFormData] = useState({
    labTestId: "",
    batchLotId: "",
    materialName: "",
    testType: "",
    resultValue: "",
    errorStatus: "",
    testingStatus: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  useEffect(() => {
    const editData = localStorage.getItem("qcLabTestingEditData");

    if (editData) {
      const parsed = JSON.parse(editData);

      setEditIndex(parsed.editIndex);
      setIsEditMode(true);

      setFormData({
        labTestId: parsed.labTestId || "",
        batchLotId: parsed.batchLotId || "",
        materialName: parsed.materialName || "",
        testType: parsed.testType || "",
        resultValue: parsed.resultValue || "",
        errorStatus: parsed.errorStatus || "",
        testingStatus: parsed.testingStatus || "",
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

    if (!formData.labTestId.trim())
      newErrors.labTestId = "Lab Test ID is required";

    if (!formData.batchLotId.trim())
      newErrors.batchLotId = "Batch LOT ID is required";

    if (!formData.materialName.trim())
      newErrors.materialName = "Material Name is required";

    if (!formData.testType.trim()) newErrors.testType = "Test Type is required";

    if (!formData.resultValue.trim())
      newErrors.resultValue = "Result Value is required";

    if (!formData.errorStatus.trim())
      newErrors.errorStatus = "Error Status is required";

    if (!formData.testingStatus.trim())
      newErrors.testingStatus = "Testing Status is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const existingData = JSON.parse(
      localStorage.getItem("qcLabTestingData") || "[]",
    );

    if (editIndex !== null) {
      existingData[editIndex] = {
        ...existingData[editIndex],

        labTestId: formData.labTestId,
        batchLotId: formData.batchLotId,
        materialName: formData.materialName,
        testType: formData.testType,
        resultValue: formData.resultValue,
        errorStatus: formData.errorStatus,
        testingStatus: formData.testingStatus,
      };
    } else {
      existingData.push({
        labTestId: formData.labTestId,
        batchLotId: formData.batchLotId,
        materialName: formData.materialName,
        testType: formData.testType,
        resultValue: formData.resultValue,
        errorStatus: formData.errorStatus,
        testingStatus: formData.testingStatus,

        specificationLimit: "",
        instrumentId: "",
        testingTime: "",
      });
    }

    localStorage.setItem("qcLabTestingData", JSON.stringify(existingData));

    localStorage.removeItem("qcLabTestingEditData");

    alert("Data Saved Successfully");

    goBack();

    localStorage.removeItem("qcLabTestingEditData");
  };
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create QC Lab Test
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
            onClick={() => setOpenAddNewTest(true)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Add New Test
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
                label="Lab Test ID"
                value={formData.labTestId}
                onChange={(e: any) => handleChange("labTestId", e.target.value)}
                placeholder="TO BE GENERATE"
              />
              {errors.labTestId && (
                <p className="mt-1 text-xs text-red-500">{errors.labTestId}</p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Batch LOT ID"
                // disabled={isEditMode}
                className={isEditMode ? "opacity-100!" : ""}
                value={formData.batchLotId}
                onChange={(value) => handleChange("batchLotId", value)}
                placeholder="LOT-2026-44X"
                options={[
                  {
                    label: "LOT-2026-90A",
                    value: "LOT-2026-90A",
                  },
                  {
                    label: "LOT-2026-11B",
                    value: "LOT-2026-11B",
                  },
                  {
                    label: "LOT-2026-78B",
                    value: "LOT-2026-78B",
                  },
                ]}
              />
              {errors.labTestId && (
                <p className="mt-1 text-xs text-red-500">{errors.labTestId}</p>
              )}
            </div>

            <div>
              <CustomInput
                label="Result Value"
                value={formData.resultValue}
                onChange={(e: any) =>
                  handleChange("resultValue", e.target.value)
                }
                placeholder="99.42"
              />
              {errors.resultValue && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.resultValue}
                </p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Testing Status"
                value={formData.testingStatus}
                onChange={(value) => handleChange("testingStatus", value)}
                placeholder="Completed"
                options={[
                  {
                    label: "Completed",
                    value: "Completed",
                  },
                  {
                    label: "Testing",
                    value: "Testing",
                  },
                  {
                    label: "Staged",
                    value: "Staged",
                  },
                  {
                    label: "Failed",
                    value: "Failed",
                  },
                ]}
              />
              {errors.testingStatus && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.testingStatus}
                </p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Material Name"
                // disabled={isEditMode}
                className={isEditMode ? "opacity-100!" : ""}
                value={formData.materialName}
                onChange={(value) => handleChange("materialName", value)}
                placeholder="Paracetamol 500mg SKU-Tab-PA..."
                options={[
                  {
                    label: "Acetaminophen",
                    value: "Acetaminophen",
                  },
                  {
                    label: "Lactose",
                    value: "Lactose",
                  },
                  {
                    label: "Material B",
                    value: "Material B",
                  },
                  {
                    label: "Material C",
                    value: "Material C",
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
              <CustomSelect
                label="Test Type"
                value={formData.testType}
                onChange={(value) => handleChange("testType", value)}
                placeholder="Assay Purity"
                options={[
                  {
                    label: "Assay Purity",
                    value: "Assay Purity",
                  },
                  {
                    label: "Dissolution",
                    value: "Dissolution",
                  },
                  {
                    label: "Chemical",
                    value: "Chemical",
                  },
                  {
                    label: "Microbiological",
                    value: "Microbiological",
                  },
                ]}
              />
              {errors.testType && (
                <p className="mt-1 text-xs text-red-500">{errors.testType}</p>
              )}
            </div>
            <div>
              <CustomSelect
                label="Error Status"
                value={formData.errorStatus}
                onChange={(value) => handleChange("errorStatus", value)}
                placeholder="OOT Alert (Out Of Trend)"
                options={[
                  {
                    label: "Complaint",
                    value: "Complaint",
                  },
                  {
                    label: "OOS Alert (Out Of Specification)",
                    value: "OOS Alert (Out Of Specification)",
                  },
                  {
                    label: "OOT Alert (Out Of Trend)",
                    value: "OOT Alert (Out Of Trend)",
                  },
                  {
                    label: "Invalid",
                    value: "Invalid",
                  },
                ]}
              />
              {errors.errorStatus && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.errorStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {openAddNewTest && (
        <AddNewTest onClose={() => setOpenAddNewTest(false)} />
      )}
    </div>
  );
}
