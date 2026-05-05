import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import CustomCheckbox from "../../../components/customCheckbox";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import CustomInput from "../../../components/customInput";
import CustomDatePicker from "../../../components/datePicker";
import { useAppNavigate } from "../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../components/toast";
import CustomSelect from "../../../components/customSelect";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../../../api/itemServices";
import CustomSelectSearch from "../../../components/customSelectSearch";
import {
  addInventoryAdjustment,
  getAllInventoryAdjustments,
} from "../../../api/inventoryServices";

export default function InventoryAdjustmentCreate() {
  const [addInventoryAdjustmentModel, setAddInventoryAdjustment] =
    useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { refetch } = useQuery({
    queryKey: ["getAllInventoryAdjustments"],
    queryFn: getAllInventoryAdjustments,
    enabled: false,
  });
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { goBack } = useAppNavigate();

  const [saveRow, setSaveRow] = useState(false);
  const [rowForm, setRowForm] = useState({
    item: "",
    itemCode: "",
    itemName: "",
    uom: "",
    quantity: "",
    quantityAdjusted: "",
  });
  const [form, setForm] = useState({
    transactionNumber: "",
    createdFrom: "",
    status: "",
    transactionDate: "",
    transactionName: "",
  });
  useEffect(() => {
    const stored = localStorage.getItem("inventoryAdjustment");
    if (stored) {
      setTableData(JSON.parse(stored));
    }
  }, []);

  const toggleSelect = (index: number, value: boolean) => {
    const updated = [...tableData];
    updated[index].selected = value;
    setTableData(updated);

    localStorage.setItem("inventoryAdjustment", JSON.stringify(updated));
  };
  const handleSave = () => {
    if (!rowForm.itemCode || !rowForm.quantity) {
      return notifyError("Please fill required fields");
    }

    setSaveRow(true);

    const newRow = {
      ...rowForm,
      selected: false,
    };

    let updated;

    if (editIndex !== null) {
      updated = [...tableData];
      updated[editIndex] = newRow;
      setEditIndex(null);
    } else {
      updated = [...tableData, newRow];
    }

    setTimeout(() => {
      setTableData(updated);
      localStorage.setItem("inventoryAdjustment", JSON.stringify(updated));

      // ✅ ONLY reset modal form
      setRowForm({
        item: "",
        itemCode: "",
        itemName: "",
        uom: "",
        quantity: "",
        quantityAdjusted: "",
      });

      setAddInventoryAdjustment(false);
      setSaveRow(false);
    }, 500);
  };
  const handleDeleteSelected = () => {
    const hasSelected = tableData.some((item) => item.selected);

    if (!hasSelected) {
      notifyError("Please select at least one row");
      return;
    }

    const updated = tableData.filter((item) => !item.selected);

    setTableData(updated);
    localStorage.setItem("inventoryAdjustment", JSON.stringify(updated));
  };

  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  const items = AllItems?.data?.items || [];
  const itemOptions =
    items?.map((item: any) => ({
      label: item?.itemName ?? "",
      value: item?._id ?? "",
    })) || [];
  const handleSubmit = async () => {
    if (tableData.length === 0) {
      notifyError("Add at least one item");
      return;
    }

    if (!form.transactionName || !form.transactionDate) {
      notifyError("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        transactionName: form.transactionName,
        transactionDate: form.transactionDate,
        createdFrom: form.createdFrom,
        status: form.status,
        notes: "Created from Inventory Adjustment Create Page",
        items: tableData.map((row) => ({
          item: row.item,
          quantityAdjusted: Number(row.quantityAdjusted || 0),
        })),
      };

      await addInventoryAdjustment(payload);

      notifySuccess("Saved successfully");

      // ✅ reset only main form
      setForm({
        transactionNumber: "",
        createdFrom: "",
        status: "",
        transactionDate: "",
        transactionName: "",
      });

      setTableData([]);
      localStorage.removeItem("inventoryAdjustment");

      goBack(); // ✅ only once
    } catch (error) {
      notifyError("Something went wrong");
    } finally {
      setLoading(false);
      refetch();
    }
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Inventory Adjustment / Create
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={goBack}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary rounded-md text-white cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>{" "}
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md  text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="ion:print-outline" className="w-5 h-5" />
              Print
            </button>{" "}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-30 bg-primary "
            >
              {loading ? (
                <SyncLoader color="#fff" size={6} />
              ) : (
                <>
                  <Icon icon="mynaui:save" className="w-5 h-5" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
        <div className="w-full mt-2 ">
          <div className="p-4 bg-[#ECF0F4] rounded-t-2xl">
            <p className="text-xs font-semibold text-heading1">
              Upload Inventory
            </p>
          </div>
          <div className="bg-white rounded-b-2xl">
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 lg:grid-cols-4 gap-y-4 gap-x-20">
              <CustomInput
                label="Created From"
                placeholder="Enter Created From"
                value={form.createdFrom}
                onChange={(e: any) =>
                  setForm({ ...form, createdFrom: e.target.value })
                }
              />
              <CustomSelect
                label="Status"
                options={[
                  { label: "Posted", value: "posted" },
                  { label: "Draft", value: "draft" },
                  { label: "Cancelled", value: "cancelled" },
                ]}
                value={form.status}
                onChange={(val: any) =>
                  setForm((prev) => ({
                    ...prev,
                    status: val?.value || val,
                  }))
                }
              />
              <CustomDatePicker
                label="Transaction Date"
                value={form.transactionDate}
                onChange={(val: any) => {
                  console.log("DATE PICKED:", val);

                  setForm((prev) => ({
                    ...prev,
                    transactionDate: val || "",
                  }));
                }}
              />
              <CustomInput
                label="Transaction Name"
                placeholder="Enter Transaction Name"
                value={form.transactionName}
                onChange={(e: any) =>
                  setForm({ ...form, transactionName: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-2">
            <p className="text-xs font-semibold text-primary">Inventory_Temp</p>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDeleteSelected}
                className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center"
              >
                <Icon icon="proicons:delete" className="text-xl" />
              </button>
              <button
                onClick={() => {
                  setAddInventoryAdjustment(true);
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
                className="text-lg cursor-pointer text-primary"
                onClick={() => {
                  setForm(item);
                  setEditIndex(index);
                  setAddInventoryAdjustment(true);
                }}
              />,
              <CustomCheckbox
                checked={item.selected}
                onChange={(v) => toggleSelect(index, v)}
              />,

              item.itemCode,
              item.itemName,
              item.uom,
              item.quantity,
              item.quantityAdjusted,
            ])}
          />
        </div>
      </div>
      {addInventoryAdjustmentModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 mx-2 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Inventory Adjustment Create
              </h2>

              <button
                onClick={() => setAddInventoryAdjustment(false)}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:p-8  p-4">
              <CustomSelectSearch
                options={itemOptions}
                label="Item Name"
                value={rowForm.item}
                onChange={(val) => {
                  const selectedItem = items.find((i: any) => i._id === val);

                  setRowForm((prev) => ({
                    ...prev,
                    item: val,
                    itemName: selectedItem?.itemName || "",
                    itemCode: selectedItem?.itemCode || "",
                    uom: selectedItem?.uom || "",
                    quantity: selectedItem?.balance || 0,
                  }));
                }}
              />

              <CustomInput label="UOM" value={rowForm.uom} disabled />

              <CustomInput label="Quantity" value={rowForm.quantity} disabled />

              <CustomInput
                label="Quantity Adjusted"
                value={rowForm.quantityAdjusted}
                onChange={(e: any) =>
                  setRowForm({ ...rowForm, quantityAdjusted: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end p-4">
              <button
                onClick={handleSave}
                className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
              >
                {saveRow ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  <>
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
