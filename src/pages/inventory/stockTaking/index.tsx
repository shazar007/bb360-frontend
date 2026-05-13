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
import { getItemByCategory } from "../../../api/itemServices";
import CustomCheckbox from "../../../components/customCheckbox";

const tabs = ["Transaction Lines", "Accounting Lines", "System Information"];

export default function StockTaking() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const rowInitialForm = {
    item: "",
    itemCode: "",
    itemName: "",
    uom: "",
    batchNumber: "",
    quantity: "",
    quantityAdjusted: "",
  };

  const headerInitialForm = {
    fromDate: "",
    toDate: "",
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
      fromDate: form.fromDate,
      toDate: form.toDate,

      items: rows.map((row) => ({
        item: row.item,
        batchNumber: row.batchNumber,
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
      notifySuccess("Inventory Transfer is Created successfully");
      goBack();
    },

    onError: () => {
      setLoading(false);
      notifyError("Inventory Transfer is Create failed");
    },
  });

  const { data: AllItems } = useQuery({
    queryKey: ["getItemByCategory", "finished"],
    queryFn: () => getItemByCategory("finished"),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const items = AllItems?.data?.items || [];
  // console.log("🚀 ~ InventoryTransferCreate ~ all items:", AllItems)

  const itemOptions = items.map((item: any) => ({
    label: item?.itemName ?? "",
    value: item?._id ?? "",
  }));

  // const batchOptions =
  //   items
  //     ?.find((i: any) => i._id === rowForm.item)
  //     ?.batches?.map((b: any) => ({
  //       label: b.batchNumber,
  //       value: b.batchNumber,
  //       balance: b.balance,
  //     })) || [];

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Stock Taking
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
            <p className="text-xs font-semibold">Select Stock Taking</p>
          </div>
          <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-10 items-end">
            <CustomDatePicker
              label="From Date"
              value={form.fromDate}
              onChange={(val: any) => {
                // console.log("DATE PICKED:", val);
                setForm((prev) => ({
                  ...prev,
                  fromDate: val || "",
                }));
              }}
            />
            <CustomDatePicker
              label="To Date"
              value={form.toDate}
              onChange={(val: any) => {
                // console.log("DATE PICKED:", val);
                setForm((prev) => ({
                  ...prev,
                  toDate: val || "",
                }));
              }}
            />
            <button
              // onClick={goBack}
              className="flex items-center justify-center w-full h-10 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <CustomTable
            norounded
            headers={[
              "Edit",
              "Select",
              "Item Code",
              "Item Category",
              "UOM",
              "Opening Balance",
              "Purchase",
              "Adjustment",
              "Sale",
              "Closing Stock",
              "Actual Stock",
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
                    batchNumber: item.batchNumber,
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
        </div>
      </div>
    </>
  );
}
