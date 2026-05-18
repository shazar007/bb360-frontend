import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import { useEffect, useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";

const tabs = [
  "Classification",
  "Contact Person",
  "Financial Information",
  "Comments",
  "Attachments",
  "System Information",
];
export default function CreateVendor() {
  const [activeTab, setActiveTab] = useState("Classification");

  const { goBack } = useAppNavigate();
  useEffect(() => {
    document.title = "Vendors — BB-360";
  }, []);
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Vendor / Define Vendor
          </p>
        </div>

        <div className="flex items-center w-full gap-2 md:w-auto">
          <button
            onClick={goBack}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
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
            <p className="text-xs font-semibold text-heading1">
              Vendors - Primary Information
            </p>
          </div>
          <div className="p-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 md:gap-6 lg:gap-29.25">
            <div className="space-y-2">
              <CustomInput label="Name" placeholder="write the Name" />
              <CustomInput label="Company / Person" />
              <CustomSelect label="Vendor Type" />
              <CustomInput label="Area" />
            </div>
            <div className="space-y-2">
              <CustomInput label="Payment Terms" />
              <CustomInput label="Payable Accounts" />
              <CustomSelect label="Vendor Status" />
              <CustomInput label="Bill Address" />
            </div>
            <div className="space-y-2">
              <CustomSelect label="City" />
              <CustomInput label="State" />
              <CustomInput label="Location" />
              <CustomInput label="Department" />
            </div>
            <div className="space-y-2">
              <CustomSelect label="Class" />
              <CustomInput label="Phone Number" />
              <CustomInput label="Ship Address" />
            </div>
          </div>
        </div>
        <div className="mt-3 bg-white rounded-2xl">
          <div className="flex items-center gap-8 p-4 overflow-auto md:w-full w-90">
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
              <div className="grid items-center justify-around grid-cols-2 gap-10 p-6">
                <p className="text-xs text-center text-heading1">Created By</p>
                <p className="text-xs text-center text-heading1">Modified By</p>

                <p className="text-xs text-center text-heading1">
                  Created Date
                </p>

                <p className="text-xs text-center text-heading1">
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
