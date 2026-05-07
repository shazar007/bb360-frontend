import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import CustomDatePicker from "../../../../components/datePicker";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useLocation } from "react-router-dom";

export default function CreateDeliveryChallan() {
  const { goBack } = useAppNavigate();
  const location = useLocation();
  const receivedData = location.state?.item;
  // console.log("🚀 ~ CreateDeliveryChallan ~ receivedData:", receivedData);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Delivery Challan
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={goBack}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="mynaui:save" className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>

      <div className="bg-bgprimary rounded-2xl mt-3">
        <div className="mt-3">
          <div className="bg-white rounded-2xl">
            <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
              <p className="text-xs font-semibold text-heading1">
                Purchase Order
              </p>
            </div>

            <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-29.25">
              <div className="space-y-1.5">
                <CustomInput
                  label="Purchase Order"
                  placeholder="PO-000121"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  disabled
                />
                <CustomDatePicker
                  label="Date"
                  value="2026-04-08"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
              </div>

              <div className="space-y-1.5">
                <CustomSelect
                  label="Party Account"
                  placeholder="Noorsons"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
                <CustomInput
                  label="Party Reference"
                  placeholder="Rawat-Organic Dep"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
              </div>

              <div className="space-y-1.5">
                <CustomInput
                  label="Contact Number"
                  placeholder="+92 322 1235 225"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
                <CustomInput
                  label="Delivery Address"
                  placeholder="Main GT Road near Rawat Mor, Rawalpindi"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
              </div>
              <div className="space-y-1.5"></div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <CustomTable
            norounded
            headers={[
              "Select",
              "Edit",
              "Item Code",
              "Item Name",
              "Item Category",
              "UOM",
              "Batch Number",
              "Expiry Date",
              "Qty",
            ]}
            data={[
              [
                <Icon
                  icon="fluent:checkbox-checked-16-regular"
                  className="text-lg cursor-pointer text-primary"
                />,
                <Icon
                  icon="qlementine-icons:menu-burger-16"
                  className="text-lg cursor-pointer text-primary"
                />,
                "112060",
                "Punjab Aata",
                "Raw Material",
                "Kg",
                "881525/10",
                "25-Apr-2027",
                "500",
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
