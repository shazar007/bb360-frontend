import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
export default function EquipmentMasterCreate() {
  const { goBack } = useAppNavigate();
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Equipment Master
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
            <CustomInput label="Assert ID" placeholder="TO BE GENERATE" />
            <CustomInput
              label="Equipment Location"
              placeholder="Line 2, Hall 3"
            />
            <CustomDatePicker label="Next Due Date" placeholder="01-Mar-2026" />
            <CustomSelect label="Workflow State" placeholder="Approved" />
            <CustomInput
              label="Equipment Name"
              placeholder="High Shear Granular Mixer"
            />
            <CustomDatePicker
              label="Last Calibration"
              placeholder="01-Mar-2026"
            />
            <CustomSelect label="Cleaning Status" placeholder="Dirty" />
          </div>
        </div>
      </div>
    </div>
  );
}
