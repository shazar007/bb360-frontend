import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import CustomSelect from "../../../components/customSelect";
import CustomInput from "../../../components/customInput";
import CustomDatePicker from "../../../components/datePicker";

export default function DebitCreditNote() {
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Debit / Credit Note
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer  shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer  shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="mynaui:save" className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>

      <div className="bg-[#f6f6f6] rounded-2xl mt-3">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">Select_Data</p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-50.25">
            <div className="space-y-2">
              <CustomSelect
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="Type"
                placeholder="Debit / Credit"
              />
              <CustomDatePicker
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="Date"
                placeholder="01-Mar-2026"
              />
            </div>

            <div className="space-y-2">
              <CustomSelect
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="A/C Type"
                placeholder="Vendor / Distributor"
              />
              <CustomSelect
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="A/C Payable"
                placeholder="Noorsons Distributor"
              />
            </div>

            <div className="space-y-2">
              <CustomInput
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="Reference Number"
                placeholder="INC22584"
              />
              <CustomInput
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="Description"
                placeholder="Lorem Ipsum..."
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <CustomTable
            norounded
            headers={[
              "Select",
              "Edit",
              "Product Code",
              "Product Name",
              "Item Category",
              "UOM",
              "Batch Number",
              "Expiry Date",
              "Received Quantity",
              "Return Quantity",
              "Adjustment",
              "Return Amount",
              "Reason",
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
                "Olive Oil 500ml",
                "Staples",
                "ml",
                "881525/10",
                "25-Mar-2026",
                "498",
                "02",
                "-600",
                "4,200",
                "Expired",
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
