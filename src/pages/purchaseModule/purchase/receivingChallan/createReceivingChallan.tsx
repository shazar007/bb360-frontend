import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { useAppNavigate } from "../../../../hooks/navigation";

export default function CreateReceivingChallan() {
  // const navigate = useNavigate();
  const { goBack } = useAppNavigate();
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Purchase / Receiving Challan
          </p>
        </div>

        <div className="flex flex-wrap items-center w-full gap-2 md:w-auto">
          <button
            onClick={goBack}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            {" "}
            <Icon icon="ion:play-back-outline" className="text-lg" />
            Back
          </button>
          {/* Print */}
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
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
            <p className="text-xs font-semibold text-heading1">Item Receipt</p>
          </div>
          <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-29.25">
            <div className="space-y-1.5">
              <CustomInput label="Purchase Order" placeholder="GENERATE" />
              <CustomDatePicker label=" Date" />{" "}
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Party Account" />
              <CustomSelect label="Party Reference" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Delivery Address " />
              <CustomSelect label="Type" />
            </div>
            <div className="space-y-1.5"></div>
          </div>
        </div>

        <div>
          <CustomTable
            norounded
            headers={[
              "Select",
              "Edit",
              "Product Code",
              "Product Name",
              "Item Category",
              "UOM ",
              "Batch Number",
              "Expiry Date",
              "Ordered Quantity ",
              "Delivered Qty (Challan)",
              "Received Quantity ",
              "Rejected Quantity ",
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
                "Punjab Aata",
                "Raw Material",
                "Kg",
                "881525/10",

                "25-Apr-2027",
                "500",
                "500",
                "498",
                "02",
                "Damaged",
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
