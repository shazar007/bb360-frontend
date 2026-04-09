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
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const [addItem, setAddItem] = useState(false);
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
                onClick={() => {
                  setAddItem(true);
                }}
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                className="bg-secondary text-white h-8.5 w-16 text-xs  cursor-pointer rounded"
              >
                Add Row
              </button>
            )}{" "}
            {activeTab === "Attachments" && (
              <button
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                className="bg-secondary text-white h-8.5 w-16 text-xs  cursor-pointer rounded"
              >
                Upload
              </button>
            )}
          </div>
          {activeTab === "Transaction Lines" && (
            <CustomTable
              norounded
              headers={[
                "Select",
                "Edit",
                "Item Name",
                "Item Description",
                "Item Balance",
                "UOM",
                "Quantity ",
                "Retail Price",
                "Discount % ",
                "Unit Price",
                "Amount",
                "Tax Code",
                "Tax Amount",
                "Gross Amount",
                "Item Weight",
                "Memo",
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
                  "-",
                  "-",

                  "-",
                ],
              ]}
            />
          )}
          {activeTab === "Related Transactions" && (
            <>
              <div>
                <CustomTable
                  norounded
                  headers={[
                    "Link Type",
                    "Applied Date Posted",
                    "Applied Transaction",
                    "Original Transaction",
                    "Org Transaction Id",
                    "Org Transaction Type",
                  ]}
                  data={[
                    ["-", "1200012", "1200012", "Honey 500 GM", "20", "10"],
                  ]}
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
              <div className="grid grid-cols-2 items-center p-5 justify-evenly gap-10">
                <p className="text-xs text-heading text-center">Created By</p>
                <p className="text-xs text-heading text-center">Modified By</p>
                <p className="text-xs text-heading text-center">Created Date</p>
                <p className="text-xs text-heading text-center">
                  Modified Date
                </p>
              </div>
            </>
          )}
          {activeTab === "Terms & Conditions" && (
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
                  headers={[
                    "View",
                    "Find File Name",
                    "File Extension",
                    "File Size",
                    "Description",
                  ]}
                  data={[
                    [
                      <Icon
                        icon="hugeicons:view"
                        className="text-lg cursor-pointer text-primary"
                      />,
                      "1200012",
                      "Honey 500 GM",
                      "20",
                    ],
                  ]}
                />
              </div>
            </>
          )}
          {addItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-170 rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b p-4">
                  <h2 className="text-xs font-semibold text-heading1">
                    Search Item
                  </h2>
                  <button
                    onClick={() => setAddItem(false)}
                    className="text-heading1 text-xl cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 relative space-y-4 py-4 px-6">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded-md pr-4 pl-10 py-2 bg-[#ECF0F4] focus:outline-none"
                  />
                  <Icon
                    icon="mynaui:search"
                    className="text-heading2 absolute top-6 left-9 text-xl placeholder:text-xs placeholder:text-heading2"
                  />
                </div>
                <div className="pb-3">
                  <CustomTable
                    norounded
                    headers={["code", "Item Name"]}
                    data={[["112026", "Olive Oil Pure Natural - 500ml"]]}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
