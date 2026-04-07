import React from "react";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import { Icon } from "@iconify/react";

export default function CreateVendorType() {
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Vendor / Vendor Types
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              navigate("/purchase-module/vender-define/vender-type");
            }}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm bg-secondary rounded-md cursor-pointer md:w-27 text-white"
          >
            {" "}
            <Icon icon="ion:play-back-outline" className="text-lg" />
            Back
          </button>

          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
          >
            <Icon icon="mynaui:save" className="text-lg" />
            Save
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div className="bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
            <p className="font-semibold text-heading1 text-xs">
              Add / Edit Vendor Types
            </p>
          </div>
          <div className="p-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 md:gap-6 lg:gap-29.25">
            <div className="space-y-1.5">
              <CustomInput label="Name" placeholder="write the Name" />
            </div>
            <div className="space-y-1.5">
              <CustomInput label="Parent Type" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Vendor Status " />
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
