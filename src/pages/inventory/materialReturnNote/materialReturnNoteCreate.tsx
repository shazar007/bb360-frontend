import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomInput from "../../../components/customInput";
import CustomSelect from "../../../components/customSelect";
import CustomDatePicker from "../../../components/datePicker";
import CustomTable from "../../../components/customTable";
import { useAppNavigate } from "../../../hooks/navigation";
const tabs = ["Transaction Lines", "Accounting Lines", "System Information"];

export default function MaterialReturnNoteCreate() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const { goBack } = useAppNavigate();
  return (
    <div className="mt-8">
      {/* 🔹 Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Material Return Note
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={goBack}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            <Icon icon="ion:play-back-outline" className="text-lg" />
            Back
          </button>

          <button className="flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md shadow cursor-pointer text-heading1">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          <button className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27">
            <Icon icon="mynaui:save" className="text-lg" />
            Save
          </button>
        </div>
      </div>

      {/* 🔹 FORM SECTION */}
      <div className="mt-3 bg-white rounded-2xl"> 
        <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
          <p className="text-xs font-semibold text-heading1">
            Create Material Return Note
          </p>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-50.25">
          {/* Column 1 */}
          <div className="space-y-1.5">
            <CustomInput
              className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              label="Transaction Number"
              value="To Be Generate"
              disabled
            />

            <CustomDatePicker
              className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              label="Transaction Date"
              placeholder="01-Mar-2026"
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-1.5">
            <CustomSelect
              className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              label="Created From"
              placeholder="Head Office"
            />

            <CustomInput
              className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              label="Transaction Name"
              placeholder="test field"
            />
          </div>

          {/* Column 3 */}
          <div className="space-y-1.5">
            <CustomSelect
              className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              label="Transfer To"
              placeholder="Factory"
            />

            <CustomSelect
              className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              label="Status"
              placeholder="Pending"
            />
          </div>
        </div>
      </div>

      {/* 🔹 TABS */}
      <div className="mt-3 bg-white rounded-2xl">
        <div className="flex items-center gap-8 p-4">
          {tabs.map((tab) => (
            <p
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs cursor-pointer ${
                activeTab === tab ? "text-primary" : "text-heading1"
              }`}
            >
              {tab}
            </p>
          ))}

          {activeTab === "Transaction Lines" && (
            <div className="flex items-center gap-2 ml-auto ">
              <button className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-md cursor-pointer">
                <Icon icon="proicons:delete" />
              </button>

              <button className="h-8 px-3 text-xs text-white rounded-md cursor-pointer bg-secondary">
                Add Row
              </button>
            </div>
          )}
        </div>

        {/* 🔹 TABLE */}
        {activeTab === "Transaction Lines" && (
          <CustomTable
            norounded
            headers={[
              "Edit",
              "Select",
              "Item Code",
              "Item Name",
              "UOM",
              "Item Balance",
              "Received Quantity",
              "Amount",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="text-primary text-lg"
                />,
                <Icon
                  icon="fluent:checkbox-checked-16-regular"
                  className="text-primary text-lg"
                />,
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
              ],
            ]}
          />
        )}

        {activeTab === "Accounting Lines" && (
          <CustomTable
            norounded
            headers={["Date", "Ref", "Debit", "Credit"]}
            data={[["-", "-", "-", "-"]]}
          />
        )}

        {activeTab === "System Information" && (
          <div className="p-4 text-xs grid grid-cols-2 gap-5 text-center">
            <p>Created By</p>
            <p>Modified By</p>
            <p>Created Date</p>
            <p>Modified Date</p>
          </div>
        )}
      </div>
    </div>
  );
}
