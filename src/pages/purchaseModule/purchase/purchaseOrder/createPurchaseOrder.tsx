import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
// import CustomToggles from "../../../../components/custontogles";
import { useAppNavigate } from "../../../../hooks/navigation";

const tabs = ["Items Details", "Terms and Conditions", "Summary"];
export default function CreatePurchaseOrder() {
  const [activeTab, setActiveTab] = useState("Items Details");
  const { goBack } = useAppNavigate();
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Purchase / Purchase Order
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
      </div>
      <div className="mt-3">
        <div className="bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
            <p className="text-xs font-semibold text-heading1">
              Purchase Order
            </p>
          </div>
          <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-29.25">
            {/* Column 1 */}
            <div className="space-y-1.5">
              <CustomInput
                label="Purchase Order"
                placeholder="TO BE GENERATE"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                disabled
              />
              <CustomDatePicker
                label="Date"
                value="2026-03-01"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />
            </div>

            {/* Column 2 */}
            <div className="space-y-1.5">
              <CustomSelect
                label="Party Account"
                placeholder="Xyz Company"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />
              <CustomSelect
                label="Party Reference"
                placeholder="Manufacturing Dep"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />
            </div>

            {/* Column 3 */}
            <div className="space-y-1.5">
              <CustomInput
                label="Delivery Address"
                placeholder="Address"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />
              <CustomSelect
                label="Type"
                placeholder="Local/Import"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />
            </div>
            <div className="space-y-1.5"></div>
          </div>
        </div>{" "}
        <div className="mt-3 bg-white rounded-2xl">
          <div className="flex items-center gap-8 p-4 overflow-auto md:w-full w-90">
            {tabs.map((tab: any, index: number) => (
              <p
                key={index}
                onClick={() => {
                  setActiveTab(tab);
                }}
                className={` text-xs cursor-pointer ${
                  activeTab === tab ? "text-primary" : "text-heading1"
                }`}
              >
                {tab}
              </p>
            ))}
            {(activeTab === "Items Details" || activeTab === "") && (
              <div className="flex items-center gap-2 ml-auto">
                {/* <button className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center">
                  <Icon icon="proicons:delete" className="text-xl" />
                </button> */}
                <button className="text-xs text-white bg-secondary rounded-md w-18 h-8.5 cursor-pointer">
                  Add Row
                </button>
              </div>
            )}
          </div>
          <div>
            {activeTab === "Items Details" && (
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
                  "Quantity",
                  "Purchase Rate",
                  "Unit Price",
                  "Amount",
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
                    "650",
                    "680",
                    "325,000",
                  ],
                ]}
              />
            )}
            {activeTab === "Terms and Conditions" && (
              <>
                {/* Header */}
                <div className="bg-[#ECF0F4] p-4">
                  <p className="text-xs font-semibold text-heading1">
                    Terms & Condition
                  </p>
                </div>

                {/* Input Area */}
                <div className="p-4">
                  <textarea
                    placeholder="Type Here..."
                    className="w-full h-32 p-3 text-sm rounded-md bg-[#ECF0F4] focus:outline-none resize-none"
                  />
                </div>
              </>
            )}
            {activeTab === "Summary" && (
              <div className="grid items-center grid-cols-2 gap-10 p-5 justify-evenly">
                <p className="text-xs text-center text-heading">Created By</p>
                <p className="text-xs text-center text-heading">Modified By</p>
                <p className="text-xs text-center text-heading">Created Date</p>
                <p className="text-xs text-center text-heading">
                  Modified Date
                </p>
              </div>
            )}
            {activeTab === "Terms & Conditions" && (
              <p className="p-4"> Terms & Conditions</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
