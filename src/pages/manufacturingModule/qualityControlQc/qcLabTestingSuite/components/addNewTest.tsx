import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomInput from "../../../../../components/customInput";
import CustomSelect from "../../../../../components/customSelect";

interface Props {
  onClose: () => void;
}

export default function AddNewTestModal({ onClose }: Props) {
  const [formData, setFormData] = useState({
    testType: "",
    instrumentId: "",
    specificationTargetLimit: "",
    testingTime: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Modal Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-[2px]">
      <div className="w-full max-w-160 overflow-hidden bg-white rounded-2xl shadow-xl">
    
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#A0A7B4]">
          <h2 className="text-base font-semibold text-heading1">
            Add New Test
          </h2>

          <button onClick={onClose} className="cursor-pointer text-[#302250]">
            <Icon icon="mdi:close" className="text-[28px]" />
          </button>
        </div>

  
        <div className="p-6">
          <div className="grid grid-cols-2 gap-x-20 gap-y-4">
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
                    label: "Chemical Analysis",
                    value: "Chemical Analysis",
                  },
                ]}
              />
            </div>

            <div>
              <CustomInput
                label="Instrument ID"
                value={formData.instrumentId}
                onChange={(e: any) =>
                  handleChange("instrumentId", e.target.value)
                }
                placeholder="HPLC-LAB-02"
              />
            </div>

            <div>
              <CustomInput
                label="Specification Target Limit"
                value={formData.specificationTargetLimit}
                onChange={(e: any) =>
                  handleChange("specificationTargetLimit", e.target.value)
                }
                placeholder="98%"
              />
            </div>

            <div>
              <CustomSelect
                label="Testing Time"
                value={formData.testingTime}
                onChange={(value) => handleChange("testingTime", value)}
                placeholder="02h:15min"
                options={[
                  {
                    label: "00h:10min",
                    value: "00h:10min",
                  },
                  {
                    label: "01h:30min",
                    value: "01h:30min",
                  },
                  {
                    label: "02h:15min",
                    value: "02h:15min",
                  },
                  {
                    label: "03h:00min",
                    value: "03h:00min",
                  },
                ]}
              />
            </div>
          </div>

        
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={onClose}
              className="flex items-center justify-center h-10 gap-2 px-6 text-white rounded-md cursor-pointer bg-secondary"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>

            <button
              onClick={handleSave}
              className="flex items-center justify-center h-10 gap-2 px-6 text-white rounded-md cursor-pointer bg-primary"
            >
              <Icon icon="mynaui:save" className="w-5 h-5" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
