import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import { useState } from "react";

const tabs = [
  "Transaction Lines",
  "Landed Cost",
  "Accounting Lines",
  "Related Transactions",
  "System Information",
  "Terms & Conditions",
  "Attachments",
];
export default function CreateReceipt() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Purchase / Item Receipt Note
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              navigate("/purchase-module/purchase/item-receipt-note");
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
            <p className="font-semibold text-heading1 text-xs">Item Receipt</p>
          </div>
          <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-29.25">
            <div className="space-y-1.5">
              <CustomInput label="Transaction Number" placeholder="GENERATE" />
              <CustomSelect label="Transaction Date" />{" "}
              <CustomSelect label="Vendor" />
              <CustomSelect label="To Location" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Memo" />
              <CustomSelect label="Shipping Number" />{" "}
              <CustomSelect label="Currency" />
              <CustomSelect label="Projects" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Status" />
              <CustomSelect label="Subsidiary" />
              <CustomSelect label="Department" />
              <CustomSelect label="Class" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Reference Number" />
              <CustomSelect label="Driver Name" />
              <CustomSelect label="Driver Mobile Number" />

              <CustomSelect label="Vehicle Number" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl mt-3">
          <div className="flex p-4 md:w-full w-90 overflow-auto items-center gap-8">
            {tabs.map((tab: any) => (
              <p
                onClick={() => {
                  setActiveTab(tab);
                }}
                className={` text-xs cursor-pointer ${activeTab === tab ? "text-primary" : "text-heading1"}
                `}
              >
                {tab}
              </p>
            ))}
          </div>
          {activeTab === "Transaction Lines" && (
            <div>
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
                  "Details",
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
                    <Icon
                      icon="solar:box-broken"
                      className="text-lg cursor-pointer text-primary"
                    />,
                    "-",
                  ],
                ]}
              />
            </div>
          )}
          {activeTab === "Landed Cost" && (
            <div>
              <CustomTable
                norounded
                headers={[
                  "Select",
                  "Edit",
                  "Source",
                  "Source Transaction",
                  "Cost Category",
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
                    "1200012",
                    "Honey 500 GM",
                    "20",
                    "-",
                  ],
                ]}
              />
            </div>
          )}
          {activeTab === "Accounting Lines" && (
            <div>
              <CustomTable
                norounded
                headers={[
                  "Item",
                  "Item Description",
                  "Account",
                  "Debit",
                  "Credit",
                  "Line Type",
                ]}
                data={[["-", "-", "-", "-", "-", "-"]]}
              />
            </div>
          )}
          {activeTab === "Related Transactions" && (
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
                data={[["-", "1200012", "1200012", "Honey 500 GM", "20", "20"]]}
              />
            </div>
          )}{" "}
          {activeTab === "System Information" && (
            <div className="grid grid-cols-2 p-6 justify-around items-center gap-10">
              <p className="text-xs text-heading1 text-center">Created By</p>
              <p className="text-xs text-heading1 text-center">Modified By</p>

              <p className="text-xs text-heading1 text-center">Created Date</p>

              <p className="text-xs text-heading1 text-center">Modified Date</p>
            </div>
          )}
          {activeTab === "Terms & Conditions" && (
            <div>
              <div className="bg-[#ECF0F4] p-4">
                <p className="text-xs text-heading1">Terms & Conditions</p>
              </div>
            </div>
          )}
          {activeTab === "Attachments" && (
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
                    "1200012",
                    "Honey 500 GM",
                    "20",
                  ],
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
