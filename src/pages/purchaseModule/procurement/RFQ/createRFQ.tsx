import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import CustomToggles from "../../../../components/custontogles";

const tabs = [
  "Transaction Lines",
  "Related Transactions",
  "System Information",
  "Terms & Conditions",
  "Attachments",
];
export default function CreateRFQ() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Procurement / Request for Quotation (RFQ)
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                navigate("/purchase-module/procurement/rfq");
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
      </div>
      <div className="mt-3">
        <div className="bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
            <p className="font-semibold text-heading1 text-xs">
              Purchase Order
            </p>
          </div>
          <div className="p-4 grid grid-cols-4 gap-29.25">
            <div className="space-y-1.5">
              <CustomInput label="Transaction Number" placeholder="GENERATE" />
              <CustomDatePicker label="Transaction Date" />{" "}
              <CustomSelect label="Vendor" />
              <CustomSelect label="Location" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Memo" />
              <CustomSelect label="Currency" />
              <CustomSelect label="Exchange Rate" />
              <CustomSelect label="Status" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Subsidiary" />
              <CustomSelect label="Department" />
              <CustomSelect label="Class" />
              <CustomSelect label="Payment Terms" />
            </div>
            <div className="space-y-1.5">
              <CustomSelect label="Reference Number" />
              <CustomSelect label="Expected Delivery Date" />
              <CustomSelect label="Projects" />
              <CustomToggles label="Inbound" />
            </div>
          </div>
        </div>{" "}
        <div className="bg-white rounded-2xl mt-3">
          <div className="flex p-4 md:w-full w-90 overflow-auto items-center gap-8">
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
          </div>
          <div>
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
              <CustomTable
                norounded
                headers={[
                  "Link Type",
                  "Applied Date Posted",
                  "Applied Transaction",
                  "Original Transaction",
                  "Org Transaction",
                  "Org Transaction Type",
                ]}
                data={[
                  [
                    <Icon
                      icon="fluent:checkbox-checked-16-regular"
                      className="text-lg cursor-pointer text-primary"
                    />,

                    "1200012",
                    "1200012",
                    "Honey 500 GM",
                    "20",
                    "20",
                  ],
                ]}
              />
            )}
            {activeTab === "System Information" && (
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
            )}
            {activeTab === "Terms & Conditions" && <p>Terms & Conditions</p>},
            {activeTab === "Attachments" && (
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
                    ,
                    "1200012",
                    "1200012",
                    "Honey 500 GM",
                    "20",
                  ],
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
