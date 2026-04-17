import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import CustomDatePicker from "../../../../components/datePicker";
import CustomInput from "../../../../components/customInput";
import { useEffect, useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";

const tabs = [
  "Transaction Lines",
  "Accounting Lines",
  "System Information",
  "Terms & Conditions",
];
export default function CreateVendorBill() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const { goBack } = useAppNavigate();
  useEffect(() => {
    document.title = "Create Bills — BB-360";
  }, []);
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Payable / Purchase Invoice
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
          <button
            onClick={goBack}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            <Icon icon="ion:play-back-outline" className="text-lg" />
            Back
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="streamline-flex:story-post" className="w-5 h-5" />
            Post
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
        <div className="bg-[#f6f6f6] rounded-2xl mt-3">
          <div className="bg-white rounded-2xl mt-2">
            <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
              <p className="text-xs font-semibold text-heading1">Invoice</p>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-50.25 text-secondary">
              <div className="space-y-1.5 ">
                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4] "
                  label="Invoice Number"
                  placeholder="PO-000121 "
                  disabled
                />

                <CustomDatePicker
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Invoice Date"
                  value="2026-03-01"
                  disabled
                />
              </div>

              <div className="space-y-1.5">
                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Vendor Name"
                  placeholder="Globify Trader Karachi"
                  disabled
                />

                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Address"
                  placeholder="Main GT Road near Rawat Mor, Rawalpindi"
                  disabled
                />
              </div>

              <div className="space-y-1.5">
                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Contact Number"
                  placeholder="+92 322 2234 254"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl ">
          <div className="flex items-center justify-between p-4">
            <div className="flex  w-90 md:w-[60%]  overflow-auto items-center gap-8">
              {tabs.map((tab) => (
                <p
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs cursor-pointer ${
                    activeTab === tab
                      ? "text-primary font-semibold"
                      : "text-heading1"
                  }`}
                >
                  {tab}
                </p>
              ))}
            </div>
          </div>
          {activeTab === "Transaction Lines" && (
            <CustomTable
              norounded
              headers={[
                "Select",
                "Edit",
                "Item Code",
                "Item Name",
                "UOM",
                "Ordered Quantity",
                "Received Quantity",
                "Retail Price",
                "T.P",
                "Discount %",
                "Gross Amount",
                "Tax Amount",
                "Amount",
              ]}
              data={[
                [
                  <Icon
                    icon="fluent:checkbox-checked-16-regular"
                    className="text-lg text-primary"
                  />,
                  <Icon
                    icon="qlementine-icons:menu-burger-16"
                    className="text-lg text-primary"
                  />,
                  "-",
                  "-",
                  "-",
                  "-",
                  "-",
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
              headers={["Date", "Ref Number", "Debit", "Credit", "Balance"]}
              data={[["-", "-", "-", "-", "-"]]}
            />
          )}
          {activeTab === "System Information" && (
            <>
              <div className="bg-[#ECF0F4] p-4">
                <p className="text-xs font-semibold text-heading1">
                  System Information
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 text-center">
                <div>
                  <p className="text-xs text-heading1">Created By</p>
                </div>
                <div>
                  <p className="text-xs text-heading1">Modified By</p>
                </div>
                <div>
                  <p className="text-xs text-heading1">Created Date</p>
                </div>
                <div>
                  <p className="text-xs text-heading1">Modified Date</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "Terms & Conditions" && (
            <>
              <div className="bg-[#ECF0F4] p-4">
                <p className="text-xs font-semibold text-heading1">
                  Terms & Condition
                </p>
              </div>

              <div className="p-4">
                <textarea
                  placeholder="Type Here..."
                  className="w-full h-32 p-3 text-sm rounded-md bg-[#ECF0F4] focus:outline-none resize-none"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
