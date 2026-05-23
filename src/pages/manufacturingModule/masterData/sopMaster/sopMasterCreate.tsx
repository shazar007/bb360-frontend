import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
export default function SopMasterCreate() {
  const { goBack } = useAppNavigate();
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create SOP Master
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
          <button className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary">
            <Icon icon="mynaui:save" className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>

      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Equipment Master
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-30.25 xl:w-7xl lg:w-230 gap-y-2">
            <CustomInput label="SOP Number" placeholder="TO BE GENERATE" />
            <CustomSelect label="Department" placeholder="Production" />
            <CustomDatePicker
              label="Effective Date"
              placeholder="01-Mar-2026"
            />
            <CustomInput label="Attachment" placeholder="Upload Here..." />
            <CustomInput
              label="Document Title"
              placeholder="Sanitization Protocol for Fluids B..."
            />
            <CustomInput label="Current Version" placeholder="v2.0" />
            <CustomSelect label="Review Cycle" placeholder="6 Months" />
          </div>
        </div>
      </div>
    </div>
  );
}
