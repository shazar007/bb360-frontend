import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import { useState } from "react";
import CustomToggles from "../../../../components/custontogles";

const tabs = [
  "Transaction Lines",
  "Related Transactions",
  "System Information",
  "Terms & Conditions",
  "Attachments",
];
export default function CreateVendorBill() {
  const [activeTab, setActiveTab] = useState("Classification");
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Purchase / Purchase Order
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              navigate("/purchase-module/vender-define/venders");
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
              Purchase Order Closed
            </p>
          </div>
          <div className="p-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 md:gap-6 lg:gap-29.25">
            <div className="space-y-1.5">
              <CustomInput
                label="Transaction Number"
                placeholder="write the Name"
              />
              <CustomInput label="Transaction Date" />
              <CustomSelect label="Vendor" />
              <CustomInput label="Location" />
            </div>
            <div className="space-y-1.5">
              <CustomInput label="Memo" />
              <CustomInput label="Currency" />
              <CustomSelect label="Exchange Rate" />
              <CustomInput label="Status" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Subsidiary" />
              <CustomInput label="Department" />
              <CustomInput label="Class" />
              <CustomInput label="Payment Terms" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Reference Number" />
              <CustomInput label="Expected Delivery Date" />
              <CustomInput label="Project" />
              <CustomToggles label="Inbound" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl mt-3 ">
          <div className="flex justify-between items-center p-4">
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
            {activeTab === "Transaction Lines" && (
              <button
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                className="bg-secondary text-white h-8.5 w-16 text-xs  cursor-pointer rounded"
              >
                Add Row
              </button>
            )}
          </div>
          {activeTab === "Classification" && (
            <div>
              <div className="bg-[#ECF0F4] p-4">
                <p className="text-xs font-semibold text-heading1">
                  Classification
                </p>
              </div>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between p-4 items-center gap-5 md:gap-6 lg:gap-29.25">
                <CustomSelect label="Subsidiary" />
                <CustomSelect label="Class" />
                <CustomSelect label="Currency" />
              </div>
            </div>
          )}
          {activeTab === "Contact Person" && (
            <>
              <div>
                <CustomTable
                  norounded
                  headers={[
                    "Select",
                    "Edit",
                    "Name",
                    "Designation",
                    "Phone",
                    "Email",
                    "Is Primary Contact",
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
                      "1200012",
                      "Honey 500 GM",
                      "20",
                      "Carton 12",
                      "10",
                      "-",
                      <Icon
                        icon="solar:box-broken"
                        className="text-lg cursor-pointer text-primary"
                      />,
                    ],
                  ]}
                />
              </div>
            </>
          )}
          {activeTab === "Financial Information" && (
            <>
              <div className="bg-[#ECF0F4] p-4">
                <p className="text-xs font-semibold text-heading1">
                  Financial Information
                </p>
              </div>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between p-4 items-center gap-5 md:gap-6 lg:gap-29.25">
                <CustomInput label="GST No" />
                <CustomInput label="Tax Code" />
                <CustomSelect label="NTN No" />
                <CustomSelect label="Credit Limit" />
              </div>
            </>
          )}
          {activeTab === "Comments" && (
            <>
              <div className="bg-[#ECF0F4] p-4">
                <p className="text-xs font-semibold text-heading1">Comments</p>
              </div>
            </>
          )}
          {activeTab === "Attachments" && (
            <>
              <div>
                <CustomTable
                  norounded
                  headers={["File Extension", "File Size", "Designation"]}
                  data={[["1200012", "Honey 500 GM", "20"]]}
                />
              </div>
            </>
          )}
          {activeTab === "System Information" && (
            <>
              <div className="bg-[#ECF0F4] p-4">
                <p className="text-xs font-semibold text-heading1">
                  System Information
                </p>
              </div>
              <div className="grid grid-cols-2 p-6 justify-around items-center gap-10">
                <p className="text-xs text-heading1 text-center">Created By</p>
                <p className="text-xs text-heading1 text-center">Modified By</p>

                <p className="text-xs text-heading1 text-center">
                  Created Date
                </p>

                <p className="text-xs text-heading1 text-center">
                  Modified Date
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
