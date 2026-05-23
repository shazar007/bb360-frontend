import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomSelect from "../../../../components/customSelect";
export default function BatchPlanningCreate() {
  const { goBack } = useAppNavigate();
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Batch Planning
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
          <button className="flex items-center justify -center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary">
            <Icon icon="mynaui:save" className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>

      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Batch Planning
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-30.25 xl:w-7xl lg:w-230 gap-y-2">
            <CustomInput
              label="Planned Batch ID"
              placeholder="TO BE GENERATE"
            />

            <CustomSelect
              label="Assigned Line"
              placeholder="Line 1, Compression B"
            />

            <CustomSelect label="Batch Shift" placeholder="Morning" />

            <CustomInput label="End Timestamp" placeholder="Upload Here..." />

            <CustomInput
              label="Target FG Item"
              placeholder="Paracetamol 500mg SKU-Tab-PA..."
            />

            <CustomInput label="Planned Batch Size" placeholder="10,000" />

            <CustomSelect label="Start Timestamp" placeholder="6 Months" />

            <CustomInput
              label="Equipment Status"
              placeholder="Upload Here..."
            />

            <CustomInput
              label="Run Status"
              placeholder="Paracetamol 500mg SKU-Tab-PA..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
