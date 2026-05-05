import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import CustomInput from "../../../components/customInput";
import CustomSelect from "../../../components/customSelect";
import CustomDatePicker from "../../../components/datePicker";
import CustomTable from "../../../components/customTable";
import { useAppNavigate } from "../../../hooks/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../../components/toast";
import {
  addInventoryTransfer,
  getAllInventoryTransfers,
} from "../../../api/inventoryServices";
import { SyncLoader } from "react-spinners";
import CustomSelectSearch from "../../../components/customSelectSearch";
import { getAllItems } from "../../../api/itemServices";
import CustomCheckbox from "../../../components/customCheckbox";

const tabs = ["Transaction Lines", "Accounting Lines", "System Information"];

export default function InventoryTransferCreate() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const rowInitialForm = {
    item: "",
    itemCode: "",
    itemName: "",
    uom: "",
    quantity: "",
    quantityAdjusted: "",
  };

  const headerInitialForm = {
    transactionName: "",
    transactionDate: "",
    createdFrom: "",
    transferTo: "",
    status: "",
    notes: "",
  };
  const { refetch } = useQuery({
    queryKey: ["getAllInventoryTransfers"],
    queryFn: getAllInventoryTransfers,
    enabled: false,
  });
  const [form, setForm] = useState(headerInitialForm);
  const [rowForm, setRowForm] = useState(rowInitialForm);
  const [loading, setLoading] = useState(false);

  const { goBack } = useAppNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("inventory-transfer-rows");
    if (stored) setRows(JSON.parse(stored));
  }, []);

  const updateRows = (updated: any[]) => {
    setRows(updated);
    localStorage.setItem("inventory-transfer-rows", JSON.stringify(updated));
  };

  const handleSaveRow = () => {
    let updated = [...rows];

    if (editIndex !== null) {
      updated[editIndex] = rowForm;
    } else {
      updated.push(rowForm);
    }

    updateRows(updated);

    setRowForm(rowInitialForm);
    setEditIndex(null);
    setOpenModal(false);
  };

  const deleteSelectedRows = () => {
    const filtered = rows.filter((item) => !item.selected);
    updateRows(filtered);
  };

  const toggleSelect = (index: number, value: boolean) => {
    const updated = rows.map((item, i) =>
      i === index ? { ...item, selected: value } : item,
    );
    updateRows(updated);
  };
  const buildPayload = () => {
    return {
      transactionName: form.transactionName,
      transactionDate: form.transactionDate,
      createdFrom: form.createdFrom,
      transferTo: form.transferTo,
      notes: form.notes,

      items: rows.map((row) => ({
        item: row.item,
        quantityAdjusted: Number(row.quantityAdjusted || 0),
      })),
    };
  };
  const createMutation = useMutation({
    mutationFn: addInventoryTransfer,
    onSuccess: () => {
      setLoading(false);
      localStorage.removeItem("inventory-transfer-rows");
      setRows([]);

      setForm(headerInitialForm);
      setRowForm(rowInitialForm);
      setEditIndex(null);
      refetch();
      notifySuccess("Created successfully");
      goBack();
    },

    onError: () => {
      setLoading(false);
      notifyError("Create failed");
    },
  });

  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
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
              Inventory Transfer
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:w-auto">
            <button
              onClick={goBack}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="ion:play-back-outline" />
              Back
            </button>

            <button className="flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md shadow cursor-pointer">
              <Icon icon="ion:print-outline" />
              Print
            </button>
            <button
              onClick={() => {
                const payload = buildPayload();

                if (!payload.items.length) {
                  notifyError("Add at least one item");
                  return;
                }

                setLoading(true);
                createMutation.mutate(payload);
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              {loading ? (
                <SyncLoader color="#fff" size={6} />
              ) : (
                <>
                  <Icon icon="mynaui:save" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-3 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] p-4 rounded-t-2xl">
            <p className="text-xs font-semibold">Create Inventory Transfer</p>
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
              <CustomSelect
                label="Transfer To"
                options={[
                  { label: "Factory", value: "Factory" },
                  { label: "Warehouse", value: "Warehouse" },
                ]}
                value={form.transferTo}
                onChange={(val: any) =>
                  setForm((prev) => ({
                    ...prev,
                    transferTo: val?.value || val,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <div className="flex flex-wrap items-center gap-4 p-4">
            <div className="flex flex-wrap gap-4">
              {tabs.map((tab) => (
                <p
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs sm:text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? "text-primary font-medium"
                      : "text-heading1"
                  }`}
                >
                  {tab}
                </p>
              ))}
            </div>
            {activeTab === "Transaction Lines" && (
              <div className="flex items-center gap-2 ml-auto w-full sm:w-auto justify-end">
                <button
                  onClick={deleteSelectedRows}
                  className="flex items-center cursor-pointer justify-center w-8 h-8 text-white bg-red-500 rounded-md"
                >
                  <Icon icon="proicons:delete" />
                </button>

                <button
                  onClick={() => {
                    setRowForm(rowInitialForm);
                    setEditIndex(null);
                    setOpenModal(true);
                  }}
                  className="h-8 px-3 text-xs cursor-pointer sm:text-sm text-white rounded-md bg-secondary"
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
                "Quantity",
                "Quantity Adjusted",
              ]}
              data={rows.map((item, index) => [
                <Icon
                  icon="basil:edit-outline"
                  className="text-xl cursor-pointer text-primary"
                  onClick={() => {
                    setRowForm({
                      item: item.item,
                      itemCode: item.itemCode,
                      itemName: item.itemName,
                      uom: item.uom,
                      quantity: item.quantity,
                      quantityAdjusted: item.quantityAdjusted,
                    });
                    setEditIndex(index);
                    setOpenModal(true);
                  }}
                />,
                <CustomCheckbox
                  checked={item.selected}
                  onChange={(v) => toggleSelect(index, v)}
                />,
                item.itemCode || "-",
                item.itemName || "-",
                item.uom || "-",
                item.quantity || "-",
                item.quantityAdjusted || "-",
              ])}
            />
          )}
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-250 mx-2 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 px-6 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Inventory Transfer Create
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:p-8  p-4">
              <CustomSelectSearch
                options={itemOptions}
                value={rowForm.item}
                label="Item Name"
                onChange={(val) => {
                  const selected = items.find((i: any) => i._id === val);

                  setRowForm((p) => ({
                    ...p,
                    item: val,
                    itemName: selected?.itemName || "",
                    itemCode: selected?.itemCode || "",
                    uom: selected?.uom || "",
                    quantity: selected?.balance || "",
                  }));
                }}
              />

              <CustomInput
                label="UOM"
                value={rowForm.uom}
                onChange={(e: any) =>
                  setRowForm({ ...rowForm, uom: e.target.value })
                }
              />

              <CustomInput
                label="Quantity"
                value={rowForm.quantity}
                onChange={(e: any) =>
                  setRowForm({ ...rowForm, quantity: e.target.value })
                }
              />

              <CustomInput
                label="Quantity Adjusted"
                value={rowForm.quantityAdjusted}
                onChange={(e: any) =>
                  setRowForm({ ...rowForm, quantityAdjusted: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end pb-6 pr-6 mt-4">
              <button
                onClick={handleSaveRow}
                className="px-4 py-2 text-white rounded-md cursor-pointer bg-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
