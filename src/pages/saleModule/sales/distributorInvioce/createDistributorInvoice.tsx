import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import { useEffect, useState } from "react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";

const tabs = [
  "Transaction Lines",
  "Accounting Lines",
  "System Information",
  "Terms & Conditions",
];
export default function CreateDistributorInvoice() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const { goBack } = useAppNavigate();
  useEffect(() => {
    document.title = "Distributor Invoice — BB-360";
  }, []);
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Distributor Invoice
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
              Create Invoice
            </p>
          </div>
          <div className="p-4 grid grid-cols-3 gap-y-5 gap-x-29.25">
            <CustomInput label="Purchase Order" placeholder="GENERATE" />
            <CustomSelect label="Distributor Name" />
            <CustomInput label="Contact Number" />
            <CustomDatePicker label="Invoice Date" />
            <CustomInput label="Address" />
            <CustomInput label="Licence Status" />
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
                className={`text-xs cursor-pointer ${
                  activeTab === tab ? "text-primary" : "text-heading1"
                }`}
              >
                {tab}
              </p>
            ))}

            {(activeTab === "Transaction Lines" ||
              activeTab === "Accounting Lines") && (
              <div className="flex items-center gap-2 ml-auto">
                <button className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center">
                  <Icon icon="proicons:delete" className="text-xl" />
                </button>
                <button className="text-xs text-white bg-secondary rounded-md w-18 h-8.5 cursor-pointer">
                  Add Row
                </button>
              </div>
            )}
          </div>

          <div>
            {activeTab === "Transaction Lines" && (
              <CustomTable
                norounded
                headers={[
                  "Select",
                  "Edit",
                  "Item Code",
                  "Item Name",
                  "UOM",
                  "Item Balance",
                  "Ordered Quantity ",
                  "M.R.P ",
                  "T.P",
                  "Discount % ",
                  "Gross Amount",
                  "Tax Amount %",
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
                    "112026",
                    "Olive Oil Pure Natural - 500ml",
                    "ml",
                    "480",
                    "-",
                    "2,500",
                    "100",
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
