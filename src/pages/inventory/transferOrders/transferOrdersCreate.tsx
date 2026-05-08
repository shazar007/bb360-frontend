import { Icon } from "@iconify/react";
import CustomCheckbox from "../../../components/customCheckbox";
import CustomTable from "../../../components/customTable";
import CustomInput from "../../../components/customInput";
import { useState } from "react";
import { useAppNavigate } from "../../../hooks/navigation";
import { SyncLoader } from "react-spinners";
import CustomDatePicker from "../../../components/datePicker";
import { notifyError, notifySuccess } from "../../../components/toast";
import CustomSelectSearch from "../../../components/customSelectSearch";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../../../api/itemServices";

const rowInitialForm = {
  itemCode: "",
  uom: "",
  receivedQuantity: 0,
  amount: 0,
  item: "",
};

const headerInitialForm = {
  transactionName: "",
  transactionDate: "",
  createdFrom: "",
  notes: "",
  receivedFrom: "",
};
const tabs = ["Transaction Lines", "Accounting Lines", "System Information"];
export default function TransferOrdersCreate() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const [stockTrackCreate, setStockTrackCreate] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const { goBack } = useAppNavigate();
  const [form, setForm] = useState(headerInitialForm);

  const [saveLoading] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [rowForm, setRowForm] = useState(rowInitialForm);
  const handleHeaderChange = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddRowToTable = () => {
    if (!rowForm.itemCode || rowForm.receivedQuantity <= 0) {
      return notifyError("Please select an item and enter quantity");
    }

    if (editIndex !== null) {
      const updatedTable = [...tableData];
      updatedTable[editIndex] = {
        ...rowForm,
        selected: false,
      };

      setTableData(updatedTable);
      setEditIndex(null);
      notifySuccess("Item updated successfully");
    } else {
      setTableData([...tableData, { ...rowForm, selected: false }]);
      notifySuccess("Item added to list");
    }

    setRowForm(rowInitialForm);
    setStockTrackCreate(false);
  };
  const handleDeleteSelected = () => {
    const remaining = tableData.filter((item) => !item.selected);
    if (remaining.length === tableData.length) {
      return notifyError("Please select rows to delete");
    }
    setTableData(remaining);
  };
  const toggleSelect = (index: number, value: boolean) => {
    const updated = [...tableData];
    updated[index].selected = value;
    setTableData(updated);
  };
  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const items = AllItems?.data?.items || [];
  const itemOptions = items.map((item: any) => ({
    label: item?.itemName ?? "",
    value: item?._id ?? "",
  }));
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Transfer Orders
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

            <button
              //   onClick={handleFinalSave}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              {saveLoading ? (
                <SyncLoader color="#fff" size={6} />
              ) : (
                <>
                  <Icon icon="mynaui:save" className="w-5 h-5" /> Save
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Transfer Order
            </p>
          </div>

          <div className="p-6 bg-white rounded-b-2xl">
            <div className="grid grid-cols-4 gap-y-4 gap-x-20">
              <CustomInput
                label="Transaction Name"
                value={form.transactionName}
                onChange={(e) =>
                  handleHeaderChange("transactionName", e.target.value)
                }
              />
              <CustomDatePicker
                label="Transaction Date"
                onChange={(val: any) =>
                  handleHeaderChange("transactionDate", val)
                }
              />
              <CustomInput
                label="Created From"
                value={form.createdFrom}
                onChange={(e) =>
                  handleHeaderChange("createdFrom", e.target.value)
                }
              />
              <CustomInput
                label="Notes"
                value={form.notes}
                onChange={(e) => handleHeaderChange("notes", e.target.value)}
              />{" "}
              <CustomInput
                label="Received From"
                value={form.receivedFrom}
                onChange={(e) =>
                  handleHeaderChange("receivedFrom", e.target.value)
                }
              />
            </div>
          </div>
        </div>
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
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-md cursor-pointer"
                >
                  <Icon icon="proicons:delete" />
                </button>

                <button
                  onClick={() => {
                    setStockTrackCreate(true);
                  }}
                  className="h-8 px-3 text-xs text-white rounded-md cursor-pointer bg-secondary"
                >
                  Add Row
                </button>
              </div>
            )}
          </div>
          {activeTab === "Transaction Lines" && (
            <CustomTable
              norounded
              headers={[
                "Edit",
                "Select",
                "Item Code",
                "Item Name",
                "UOM",
                "Received Quantity",
                "Amount",
              ]}
              data={tableData.map((item, index) => [
                <Icon
                  icon="basil:edit-outline"
                  className="text-xl cursor-pointer text-primary"
                  onClick={() => {
                    setRowForm(item);
                    setEditIndex(index);
                    setStockTrackCreate(true);
                  }}
                />,
                <CustomCheckbox
                  checked={item.selected}
                  onChange={(v) => toggleSelect(index, v)}
                />,
                item.itemCode,
                item.itemName,
                item.uom,
                item.receivedQuantity,
                item.amount,
              ])}
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
            <div className="grid grid-cols-2 gap-5 p-4 text-xs text-center">
              <p>Created By</p>
              <p>Modified By</p>
              <p>Created Date</p>
              <p>Modified Date</p>
            </div>
          )}
        </div>
      </div>{" "}
      {stockTrackCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-sm font-bold"> Transfer Orders</h2>
              <button
                className="cursor-pointer"
                onClick={() => setStockTrackCreate(false)}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 p-4">
              <CustomSelectSearch
                options={itemOptions}
                label="Search Item"
                value={rowForm.item}
                onChange={(val) => {
                  const selected = items.find((i: any) => i._id === val);
                  setRowForm((p) => ({
                    ...p,
                    item: val,
                    itemName: selected?.itemName || "",
                    itemCode: selected?.itemCode || "",
                    uom: selected?.uom || "",
                  }));
                }}
              />
              <CustomInput label="UOM" value={rowForm.uom} disabled />
              <CustomInput
                label="Quantity to Issue"
                type="string"
                value={rowForm.receivedQuantity}
                onChange={(e) =>
                  setRowForm({
                    ...rowForm,
                    receivedQuantity: Number(e.target.value),
                  })
                }
              />
              <CustomInput
                label="Amount / Value"
                type="string"
                value={rowForm.amount}
                onChange={(e) =>
                  setRowForm({ ...rowForm, amount: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex justify-end gap-3 p-4 pt-0 rounded-b-2xl">
              <button
                onClick={handleAddRowToTable}
                className="flex items-center gap-2 px-6 py-2 text-white rounded-md cursor-pointer bg-primary"
              >
                <Icon icon="mynaui:save" /> Add to List
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
