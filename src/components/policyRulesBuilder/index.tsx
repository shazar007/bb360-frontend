import { Icon } from "@iconify/react";

import CustomSelect from "../../components/customSelect";

interface Props {
  onClose: () => void;
}

export default function PolicyRulesBuilder({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-[2px] z-60">
      <div className="w-full overflow-hidden bg-white shadow-xl max-w-170 rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D8DEE6]">
          <p className="text-base font-semibold text-heading1 text-[12px]">
            Policy Ruler Builder
          </p>

          <button
            onClick={onClose}
            className="text-2xl cursor-pointer text-heading1"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 gap-30 md:grid-cols-2">
            <div className="space-y-5">
              <CustomSelect label="Grace Period Input" placeholder="15mins" />

              <CustomSelect
                label="Slab Type"
                placeholder="Cumulative Count / Minutes-B..."
              />
            </div>

            <div>
              <CustomSelect label="3-Day Rule" placeholder="Yes / No" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              onClick={onClose}
              className="flex items-center justify-center h-11 gap-2 px-8 text-white rounded-lg cursor-pointer bg-secondary"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>

            <button className="flex items-center justify-center h-11 gap-2 px-10 text-white rounded-lg cursor-pointer bg-primary">
              <Icon icon="mynaui:save" className="w-5 h-5" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
