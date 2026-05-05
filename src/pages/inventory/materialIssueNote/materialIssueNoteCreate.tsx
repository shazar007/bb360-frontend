import { Icon } from "@iconify/react";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import CustomTable from "../../../components/customTable";
import CustomCheckbox from "../../../components/customCheckbox";
import CustomInput from "../../../components/customInput";
import CustomDatePicker from "../../../components/datePicker";
import { useAppNavigate } from "../../../hooks/navigation";
import { notifySuccess, notifyError } from "../../../components/toast";
import CustomSelectSearch from "../../../components/customSelectSearch";
import { getAllItems } from "../../../api/itemServices";
import { useQuery } from "@tanstack/react-query";
import CustomSelect from "../../../components/customSelect";
import { addMaterialIssueNote } from "../../../api/inventoryServices";
import { useQueryClient } from "@tanstack/react-query";

const rowInitialForm = {
  itemCode: "",
  item: "",
  uom: "",
  issuedQuantity: 0,
  amount: 0,
};

const headerInitialForm = {
  transactionName: "",
  transactionDate: "",
  createdFrom: "",
  transferTo: "",
  notes: "",
};

export default function MaterialIssueNoteCreate() {
  const queryClient = useQueryClient();
  const { goBack } = useAppNavigate();
  const [issueNoteCreate, setIssueNoteCreate] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [form, setForm] = useState(headerInitialForm);
  const [tableData, setTableData] = useState<any[]>([]);

  const [rowForm, setRowForm] = useState(rowInitialForm);

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

  const handleHeaderChange = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSelect = (index: number, value: boolean) => {
    const updated = [...tableData];
    updated[index].selected = value;
    setTableData(updated);
  };

  const handleAddRowToTable = () => {
    if (!rowForm.itemCode || rowForm.issuedQuantity <= 0) {
      return notifyError("Please select an item and enter quantity");
    }

    if (editIndex !== null) {
      const updatedTable = [...tableData];
      updatedTable[editIndex] = { ...rowForm, selected: false };
      setTableData(updatedTable);
      setEditIndex(null);
      notifySuccess("Item updated in list");
    } else {
      setTableData([...tableData, { ...rowForm, selected: false }]);
      notifySuccess("Item added to list");
    }

    setRowForm(rowInitialForm);
    setIssueNoteCreate(false);
  };

  const handleDeleteSelected = () => {
    const remaining = tableData.filter((item) => !item.selected);
    if (remaining.length === tableData.length) {
      return notifyError("Please select rows to delete");
    }
    setTableData(remaining);
  };

  const handleFinalSave = async () => {
    if (tableData.length === 0) return notifyError("Add at least one item");

    setSaveLoading(true);

    const payload = {
      transactionName: form.transactionName,
      transactionDate: form.transactionDate,
      createdFrom: form.createdFrom,
      transferTo: form.transferTo,
      notes: form.notes,
      items: tableData.map((row) => ({
        item: row.item,
        issuedQuantity: Number(row.issuedQuantity),
        amount: Number(row.amount),
      })),
    };

    console.log("Final Payload:", payload);
    await addMaterialIssueNote(payload);

    setTimeout(() => {
      setSaveLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["getAllMaterialIssueNotes"],
      });
      notifySuccess("Material Issue Note Saved Successfully");

      goBack();
    }, 1500);
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
          <div className="flex flex-wrap items-center justify-end w-full gap-2 md:w-auto">
            <button
              onClick={goBack}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-28 bg-secondary"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" /> Back
            </button>
            <button
              onClick={handleFinalSave}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md shadow-md cursor-pointer md:w-28 bg-primary"
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

        <div className="w-full mt-4">
          <div className="p-4 bg-[#ECF0F4] rounded-t-2xl">
            <p className="text-xs font-semibold text-heading1">
              Material Issue Note
            </p>
          </div>
          <div className="p-4 bg-white rounded-b-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-20">
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
              <CustomSelect
                label="Transfer To"
                options={[
                  { label: "Factory", value: "Factory" },
                  { label: "Warehouse", value: "Warehouse" },
                ]}
                value={form.transferTo}
                onChange={(val: any) =>
                  handleHeaderChange("transferTo", val?.value || val)
                }
              />
              <CustomInput
                label="Notes"
                value={form.notes}
                onChange={(e) => handleHeaderChange("notes", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="pb-4 mt-4 overflow-hidden bg-white shadow-sm rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-3">
            <p className="text-sm font-semibold text-primary">
              Transaction Lines
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDeleteSelected}
                className="flex items-center justify-center text-white bg-red-600 rounded-md cursor-pointer h-9 w-9"
              >
                <Icon icon="proicons:delete" className="text-xl" />
              </button>
              <button
                onClick={() => setIssueNoteCreate(true)}
                className="px-4 text-xs font-medium text-white rounded-md cursor-pointer bg-secondary h-9"
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
              "Qty Issued",
              "Amount",
            ]}
            data={tableData.map((item, index) => [
              <Icon
                icon="basil:edit-outline"
                className="text-xl cursor-pointer text-primary"
                onClick={() => {
                  setRowForm(item);
                  setEditIndex(index);
                  setIssueNoteCreate(true);
                }}
              />,
              <CustomCheckbox
                checked={item.selected}
                onChange={(v) => toggleSelect(index, v)}
              />,
              item.itemCode,
              item.itemName,
              item.uom,
              item.issuedQuantity,
              item.amount,
            ])}
          />
        </div>
      </div>

      {issueNoteCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 mx-2 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-sm font-bold">Material Issue Note Create</h2>
              <button
                className="cursor-pointer"
                onClick={() => setIssueNoteCreate(false)}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:p-8">
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
                value={rowForm.issuedQuantity}
                onChange={(e) =>
                  setRowForm({
                    ...rowForm,
                    issuedQuantity: Number(e.target.value),
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

            <div className="flex justify-end gap-3 p-5 rounded-b-2xl">
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
