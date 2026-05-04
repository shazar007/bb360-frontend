import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import CustomTable from "../../../components/customTable";
import CustomCheckbox from "../../../components/customCheckbox";
import CustomInput from "../../../components/customInput";
import CustomDatePicker from "../../../components/datePicker";
import { useAppNavigate } from "../../../hooks/navigation";

export default function MaterialIssueNoteCreate() {
  const [issueNoteCreate, setIssueNoteCreate] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const { goBack } = useAppNavigate();
  const [saveRow, setSaveRow] = useState(false);

  const toggleSelect = (index: number, value: boolean) => {
    const updated = [...tableData];
    updated[index].selected = value;
    setTableData(updated);
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Material Issue Note Create
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={goBack}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary rounded-md text-white cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>{" "}
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="ion:print-outline" className="w-5 h-5" />
              Print
            </button>{" "}
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary rounded-md text-white cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mynaui:save" className="w-5 h-5" />
              Save
            </button>
          </div>
        </div>
        <div className="w-full mt-2 ">
          <div className="p-4 bg-[#ECF0F4] rounded-t-2xl">
            <p className="text-xs font-semibold text-heading1">
              Material Issue Note
            </p>
          </div>
          <div className="bg-white rounded-b-2xl">
            {" "}
            <div className="grid grid-cols-3 p-6 gap-y-4 gap-x-20">
              <CustomInput label="Transaction Number" name="itemCode" />
              <CustomInput label="Created From" name="itemName" />
              <CustomInput label="Status" name="itemName" />
              <CustomInput label="Transaction Date" name="itemName" />
              <CustomInput label="Transaction Name" name="itemName" />
            </div>
          </div>
        </div>
        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-2">
            <p className="text-xs font-semibold text-primary">
              Transaction Lines
            </p>

            <div className="flex items-center gap-2">
              <button className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center">
                <Icon icon="proicons:delete" className="text-xl" />
              </button>

              <button
                onClick={() => {
                  setIssueNoteCreate(true);
                }}
                className="text-xs text-white bg-secondary rounded-md w-18 h-8.5 cursor-pointer"
              >
                Add Row
              </button>
            </div>
          </div>

          <CustomTable
            norounded
            height="auto"
            headers={[
              "Edit",
              "Select",
              "Item Code",
              "Item Name",
              "UOM",
              "Quantity",
              "Quantity Adjusted ",
            ]}
            data={tableData.map((item, index) => [
              <Icon
                icon="basil:edit-outline"
                className="text-xl cursor-pointer text-primary"
              />,

              <CustomCheckbox
                checked={item.selected}
                onChange={(v) => toggleSelect(index, v)}
              />,

              item.itemName,
              item.itemCategory,

              item.uom,
              item.tp,
              item.mrp,
            ])}
          />
        </div>
      </div>
      {issueNoteCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Add Inverntory
              </h2>

              <button
                onClick={() => {
                  setIssueNoteCreate(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 p-6 gap-y-4 gap-x-15">
              <CustomInput label="Distributor Name" name="distributorName" />{" "}
              <CustomInput label="City" name="city" />
              <CustomInput label="Licence Number" name="licenceNumber" />
              <CustomInput label="Contact Number" name="contactNumber" />
              <CustomDatePicker
                label="Licence Expiry Date"
                name="licenceExpiryDate"
              />
              <CustomInput label="Address" name="address" />
            </div>

            <div className="flex justify-end p-4">
              <button
                // onClick={handleSave}
                className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
              >
                {saveRow ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  <>
                    {" "}
                    <Icon icon="mynaui:save" className="text-xl" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
