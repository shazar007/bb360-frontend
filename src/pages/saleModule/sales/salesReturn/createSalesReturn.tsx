import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import CustomTable from "../../../../components/customTable";
import { useEffect, useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  createSalesReturnApi,
  getAllSalesReturns,
} from "../../../../api/saleRetrun";
import CustomCheckbox from "../../../../components/customCheckbox";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import { GetSalesInvoiceByInvoiceNo } from "../../../../api/sale";
import dayjs from "dayjs";
import { getAllItems } from "../../../../api/itemServices";

export default function CreateSalesReturn() {
  const { goBack } = useAppNavigate();
  const { goTo } = useAppNavigate();
  const [addItem, setAddItem] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);

  const [invoiceNumber, setinvoiceNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [description, setDescription] = useState("");

  const { refetch: reload } = useQuery({
    queryKey: ["getAllSalesReturns"],
    queryFn: getAllSalesReturns,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const toggleSelect = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };
  useEffect(() => {
    const stored = localStorage.getItem("salesReturn");

    if (stored) {
      const parsed = JSON.parse(stored);

      setTableData(parsed.items || []);
    }
  }, []);
  const [form, setForm] = useState({
    itemId: "",
    itemName: "",
    itemCode: "",
    batchNumber: "",
    expiryDate: "",
    returnedQty: "",
    amount: "",
    conditionCheck: "",
    restock: "",
  });

  const {
    data: AllItems,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,

    placeholderData: (prev) => prev,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const items = AllItems?.data?.items || [];

  const handleAddRow = () => {
    setTableData((prev) => [...prev, form]);

    setShowPrint(true);
    setAddItem(false);
    setForm({
      itemId: "",
      itemName: "",
      itemCode: "",
      batchNumber: "",
      expiryDate: "",
      returnedQty: "",
      amount: "",
      conditionCheck: "",
      restock: "",
    });
  };

  const optionsData = {
    conditionCheck: [
      { label: "Expiry", value: "expiry" },
      { label: "No Sale", value: "noSale" },
      { label: "Damage", value: "damage" },
    ],
    reStock: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
  };
  const buildPayload = (data: any[]) => {
    return {
      returnDate: new Date().toISOString(),

      description,

      returnTotal: data.reduce(
        (sum, item) =>
          sum + Number(item.amount || 0) * Number(item.returnedQty || 0),
        0,
      ),

      items: data.map((item) => ({
        item: item.itemId,

        itemCode: item.itemCode,

        itemName: item.itemName,

        batchNumber: item.batchNumber,

        expiryDate: item.expiryDate,

        returnQty: Number(item.returnedQty),

        conditionCheck: item.conditionCheck,

        restock: item.restock,

        taxAmount: Number(item.taxAmount || 0),

        amount: Number(item.amount || 0),
      })),
    };
  };
  const handlePost = async () => {
    try {
      if (tableData.length === 0) {
        notifyError("Please add at least one item");
        return;
      }
      setLoading(true);
      const payload = buildPayload(tableData);
      console.log("🚀 ~ payload:", payload);
      // await createSalesReturnApi(payload);
      // localStorage.removeItem("salesReturn");
      // setTableData([]);
      // setSelectedRows([]);
      // setShowPostModal(false);
      // notifySuccess("Posted Successfully");
    } catch (err) {
      console.error(err);
      notifyError("Something went wrong");
    } finally {
      // setLoading(false);
      // reload();
      // goTo("/sale-module/sales/sales-return");
    }
  };
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      notifyError("Please select at least one row first");
      return;
    }

    const updated = tableData.filter(
      (_, index) => !selectedRows.includes(index),
    );

    setTableData(updated);
    setSelectedRows([]);

    if (updated.length === 0) {
      localStorage.removeItem("salesReturn");
      return;
    }

    const payload = buildPayload(updated);
    localStorage.setItem("salesReturn", JSON.stringify(payload));
  };
  const handleSearch = async () => {
    if (!invoiceNumber.trim()) {
      notifyError("Enter Purchase Order Number");
      return;
    }

    const res = await refetch();

    if (res.error) {
      const message =
        (res.error as any)?.response?.data?.message || "Something went wrong";

      notifyError(message);
      return;
    }
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Sales Return
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <button
              onClick={goBack}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md bg-secondary md:w-27"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>

            {showPrint && (
              <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
                <Icon icon="ion:print-outline" className="w-5 h-5" />
                Print
              </button>
            )}

            <button
              onClick={() => setShowPostModal(true)}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              <Icon icon="streamline-flex:story-post" className="w-5 h-5" />
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-3">
          <div className="bg-white rounded-2xl">
            <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
              <p className="text-xs font-semibold text-heading1">
                Enter Sales_Return
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 gap-y-2 md:gap-x-10  p-4 md:grid-cols-2 lg:grid-cols-3 ">
              <CustomInput
                label="Distributor Name"
                disabled
                // value={InvoiceData?.distributor?.distributorName || ""}
              />
              <CustomDatePicker
                label="Retrun Date"
                disabled
                // value={
                //   InvoiceData?.createdAt
                //     ? dayjs(InvoiceData.createdAt).format("YYYY-MMM-DD")
                //     : ""
                // }
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />

              <CustomInput
                label="Description"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                placeholder="Enter Description"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />

              <CustomInput
                label="Contact Number"
                disabled
                // value={InvoiceData?.contactNumber || ""}
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />

              <CustomInput
                label="Return Total"
                placeholder="50"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />
            </div>
          </div>
        </div>
        <div className="mt-3 bg-white rounded-2xl">
          <div className="flex items-center justify-between p-4">
            <p className="text-xs text-primary">Transaction Lines</p>
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleDeleteSelected}
                className="h-8.5 w-8.5 text-white rounded-md bg-[#FF0000] flex items-center justify-center"
              >
                <Icon icon="proicons:delete" className="text-xl" />
              </button>
              <button
                onClick={() => setAddItem(true)}
                className="text-xs text-white bg-secondary rounded-md w-18 h-8.5"
              >
                Add Row
              </button>
            </div>
          </div>

          <CustomTable
            norounded
            headers={[
              "Select",
              "Edit",
              "Item Code",
              "Item Name",
              "Batch Number",
              "Expiry Date",
              "Returned Quantity",
              "Condition Check",
              "Re-Stock",
              "Amount",
            ]}
            data={
              tableData.length === 0
                ? []
                : tableData.map((item, index) => [
                    <CustomCheckbox
                      checked={selectedRows.includes(index)}
                      onChange={() => toggleSelect(index)}
                    />,

                    <Icon
                      icon="qlementine-icons:menu-burger-16"
                      className="text-lg text-primary"
                    />,
                    item.itemCode,
                    item.itemName,
                    item.batchNumber,
                    dayjs(item.expiryDate).isValid()
                      ? dayjs(item.expiryDate).format("DD-MMM-YYYY")
                      : "-",
                    item.returnedQty,
                    item.conditionCheck,
                    item.restock,
                    item.amount,
                  ])
            }
          />
        </div>
      </div>

      {addItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full bg-white shadow-xl max-w-250 rounded-2xl">
            <div className="flex items-center justify-between p-4 border-b border-heading2">
              <h2 className="text-xs font-semibold text-heading1">
                Item Entry
              </h2>
              <button
                onClick={() => {
                  setAddItem(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4">
              <CustomSelectSearch
                options={items.map((item: any) => ({
                  label: item.itemName,
                  value: item._id,
                }))}
                label="Item Name"
                value={form.itemId}
                onChange={(val) => {
                  const selected = items.find((i: any) => i._id === val);

                  setForm((prev) => ({
                    ...prev,
                    itemId: val,
                    itemName: selected?.itemName || "",
                    itemCode: selected?.itemCode || "",
                    batchNumber: selected?.batchNumber || "",
                    expiryDate: selected?.expiryDate || "",
                    amount: selected?.amount || "",
                  }));
                }}
              />
              <CustomInput label="Item Code" value={form.itemCode} disabled />
              <CustomInput
                label="Batch Number"
                value={form.batchNumber}
                disabled
              />
              <CustomDatePicker
                label="Expiry Date"
                value={
                  form.expiryDate
                    ? dayjs(form.expiryDate).format("YYYY-MMM-DD")
                    : ""
                }
                disabled
              />
              <CustomInput
                label="Returned Quantity"
                value={form.returnedQty}
                onChange={(e) =>
                  setForm({ ...form, returnedQty: e.target.value })
                }
              />{" "}
              <CustomSelect
                label="Condition Check"
                options={optionsData.conditionCheck}
                value={form.conditionCheck}
                onChange={(val) => setForm({ ...form, conditionCheck: val })}
              />
              <CustomSelect
                label="Restock"
                placeholder="Yes/No"
                options={optionsData.reStock}
                value={form.restock}
                onChange={(val) => setForm({ ...form, restock: val })}
              />
              <CustomInput label="Amount" value={form.amount} />
            </div>

            <div className="flex justify-end p-4 pt-0">
              <button
                onClick={handleAddRow}
                className="px-6 py-2 text-white rounded-md cursor-pointer bg-primary"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}

      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-end p-4 border-b border-[#E5E7EB]">
              <button
                onClick={() => setShowPostModal(false)}
                className="text-lg cursor-pointer text-heading1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 text-center">
              <h2 className="mb-2 text-lg font-semibold text-heading1">
                Post to ledger
              </h2>
              <p className="text-sm text-heading1/70">
                Are you sure to post this return to the ledger?
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 pt-0">
              <button
                onClick={() => setShowPostModal(false)}
                className="px-5 py-2 rounded-md bg-[#F3F4F6] text-heading1 shadow-sm cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handlePost}
                disabled={loading}
                className={`px-6 h-10 text-white rounded-md shadow-md cursor-pointer bg-primary flex items-center justify-center gap-2 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
