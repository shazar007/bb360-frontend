import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../../../../api/itemServices";
import CustomInput from "../../../../components/customInput";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { getAllDistributor } from "../../../../api/distributorServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import CustomDatePicker from "../../../../components/datePicker";
import CustomCheckbox from "../../../../components/customCheckbox";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import { CreateSalesInvoiceApi } from "../../../../api/sale";

const tabs = [
  "Transaction Lines",
  "Accounting Lines",
  "System Information",
  "Terms & Conditions",
];

const initialFormState = {
  itemId: "",
  itemName: "",
  itemCode: "",
  uom: "",
  itemBalance: "",
  orderedQty: "1",
  mrp: "",
  tp: "",
  discount: "",
  bonus: "",
  batchNumber: "",
  expiryDate: "", // ← add this
};

export default function CreateSalesInvoice() {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [distributorData, setDistributorData] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [addItem, setAddItem] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [distributorPercentage, setDistributorPercentage] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [saveRow, setSaveRow] = useState(false);
  const { goBack } = useAppNavigate();

  const { data: AllDistributors } = useQuery({
    queryKey: ["getAllDistributor"],
    queryFn: getAllDistributor,
    staleTime: 1000 * 60 * 5,
  });

  const qty = +form.orderedQty || 0;
  const tp = +form.tp || 0;
  const discount = +form.discount || 0;

  const totalTP = tp * qty;
  const discountValue = (totalTP * discount) / 100;
  const netAmount = totalTP - discountValue;

  const allDistributors = AllDistributors?.data?.distributors || [];

  const distributorOptions = [
    { label: "Select Distributor", value: "" },
    ...allDistributors.map((item: any) => ({
      label: item.distributorName,
      value: item._id,
    })),
  ];

  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
  });

  const items = AllItems?.data?.items || [];

  const itemOptions =
    items.map((item: any) => ({
      label: item.itemName,
      value: item._id,
    })) || [];

  const handleSave = async () => {
    if (!form.itemId) {
      notifyError("Please select item");
      return;
    }

    const orderedQtyNum = Number(form.orderedQty || 0);
    const itemBalanceNum = Number(form.itemBalance || 0);
    if (orderedQtyNum > itemBalanceNum) {
      notifyError("Ordered quantity cannot be greater than item balance");
      return;
    }

    try {
      setSaveRow(true);

      const newItem = {
        ...form,
        itemBalance: form.itemBalance || "",
        batchNumber: form.batchNumber || "",
        expiryDate: form.expiryDate || "",
        grossAmount: totalTP,
        totalAmount: netAmount,
        amount: netAmount,
      };

      setTableData((prev) => [...prev, newItem]);

      setForm(initialFormState);
      setAddItem(false);

      notifySuccess("Item added successfully");
    } catch (err) {
      notifyError("Something went wrong");
    } finally {
      setSaveRow(false);
    }
  };

  const handleSaveToServer = async () => {
    try {
      setLoading(true);

      if (!distributorData) {
        notifyError("Please select distributor");
        return;
      }

      if (!distributorPercentage) {
        notifyError("Please enter distributor percentage");
        return;
      }

      if (!taxPercentage) {
        notifyError("Please enter tax percentage");
        return;
      }

      if (!tableData.length) {
        notifyError("Add at least one item");
        return;
      }

      const payload = {
        distributor: distributorData._id,
        distributorPercentage: distributorPercentage,
        invoiceDate: invoiceDate,
        taxPct: taxPercentage,
        totalAmount: totalAmount,
        // notes: "Valid invoice",
        items: tableData.map((item: any) => {
          return {
            item: item.itemId,
            orderedQty: Number(item.orderedQty || 0),
            bonus: Number(item.bonus || 0),
            discountPct: Number(item.discountPct || 0),
            tp: Number(item.tp || 0),
            batchNumber: item.batchNumber || "",
            expiryDate: item.expiryDate || "",
          };
        }),
      };

      await CreateSalesInvoiceApi(payload);

      notifySuccess("Purchase Order Created Successfully");

      setTableData([]);
      setDistributorData(null);
      setTaxPercentage("");
      // setPartyCategory("");
      // setDeliveryAddress("");
      // setType("");

      // localStorage.removeItem(STORAGE_KEY);
    } catch (error: any) {
      console.error(error);
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      // refetch();
    }
  };
  const handleDeleteSelected = () => {
    setTableData((prev) => prev.filter((_, i) => !selectedRows.includes(i)));
    setSelectedRows([]);
    setConfirmDelete(false);
    notifySuccess(`${selectedRows.length} row(s) deleted`);
  };

  useEffect(() => {
    const subtotal = tableData.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );

    const distributorPercent = Number(distributorPercentage || 0);
    const taxPercent = Number(taxPercentage || 0);

    const distributorAmount = (subtotal * distributorPercent) / 100;
    const taxAmount = (subtotal * taxPercent) / 100;

    setTotalAmount((subtotal + distributorAmount + taxAmount).toFixed(2));
  }, [tableData, distributorPercentage, taxPercentage]);

  useEffect(() => {
    document.title = "Distributor Invoice — BB-360";
  }, []);

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Sales Invoice
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
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
              onClick={handleSaveToServer}
              disabled={loading}
            >
              {loading ? (
                <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
              ) : (
                <>
                  <Icon icon="mynaui:save" className="text-lg" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-white rounded-2xl">
        <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
          <p className="text-xs font-semibold text-heading1">Create Invoice</p>
        </div>
        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-4 ">
          <CustomSelectSearch
            label="Distributor Name"
            options={distributorOptions}
            value={selectedDistributor}
            onChange={(val) => {
              setSelectedDistributor(val);
              const selected = allDistributors.find((d: any) => d._id === val);
              setDistributorData(selected);
            }}
          />

          <CustomInput
            label="Contact Number"
            disabled
            value={distributorData?.contactNumber || ""}
            className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
          />
          <CustomInput
            label="Licence Status"
            disabled
            value={distributorData?.licenceStatus || ""}
            className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
          />

          <CustomInput
            label="Address"
            disabled
            value={distributorData?.address || ""}
            className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
          />

          <CustomDatePicker
            label="Date"
            value={invoiceDate}
            className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
            onChange={(val) => setInvoiceDate(val)}
          />

          <CustomInput
            label="Distributor Percentage"
            className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
            value={distributorPercentage}
            onChange={(e) => setDistributorPercentage(e.target.value)}
          />

          <CustomInput
            label="Tax %"
            className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
          />

          <CustomInput label="Total Amount" value={totalAmount} disabled />
        </div>
      </div>

      <div className="mt-3 bg-white rounded-2xl">
        <div className="flex items-center gap-8 p-4 overflow-auto">
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

          {(activeTab === "Transaction Lines" ||
            activeTab === "Accounting Lines") && (
            <div className="flex items-center gap-2 ml-auto ">
              <button
                className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-md cursor-pointer"
                onClick={() => {
                  if (selectedRows.length === 0) {
                    notifyError("No row selected");
                    return;
                  }
                  setConfirmDelete(true);
                }}
              >
                <Icon icon="proicons:delete" />
              </button>

              <button
                onClick={() => setAddItem(true)}
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
              "Select",
              "Edit",
              "Item Code",
              "Item Name",
              "UOM",
              "Item Balance",
              "Ordered Quantity",
              "Batch Number",
              "Expiry Date",
              "TP",
              "Discount %",
              "Bonus",
              "Gross Amount",
              "Amount",
            ]}
            data={tableData.map((item, index) => [
              <CustomCheckbox
                checked={selectedRows.includes(index)}
                onChange={(checked) => {
                  if (checked) {
                    setSelectedRows((prev) => [...prev, index]);
                  } else {
                    setSelectedRows((prev) => prev.filter((i) => i !== index));
                  }
                }}
              />,
              <Icon
                icon="qlementine-icons:menu-burger-16"
                className="text-lg cursor-pointer text-primary"
              />,
              item.itemCode,
              item.itemName,
              item.uom,
              item.itemBalance || "-",
              item.orderedQty || "-",
              item.batchNumber || "-", // ← Batch Number
              item.expiryDate || "-", // ← Expiry Date
              item.tp || "-",
              item.discount || "-",
              item.bonus || "-",
              item.grossAmount ?? "-",
              item.amount ?? "-",
            ])}
          />
        )}

        {activeTab === "Accounting Lines" && (
          <CustomTable
            norounded
            headers={["Date", "Ref", "Debit", "Credit", "Balance"]}
            data={[["-", "-", "-", "-", "-"]]}
          />
        )}

        {activeTab === "System Information" && (
          <div className="grid grid-cols-2 gap-5 p-5 text-xs text-center">
            <p>Created By</p>
            <p>Modified By</p>
            <p>Created Date</p>
            <p>Modified Date</p>
          </div>
        )}

        {activeTab === "Terms & Conditions" && (
          <p className="p-4 text-xs">Terms & Conditions</p>
        )}
      </div>

      {addItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 mx-2 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex justify-between p-4 border-b">
              <h2 className="text-sm font-semibold ">Add Item</h2>
              <button
                className="cursor-pointer "
                onClick={() => setAddItem(false)}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 mt-4">
              <CustomSelectSearch
                options={itemOptions}
                label="Item Name"
                placeholder="Select Item"
                value={form.itemId}
                onChange={(val) => {
                  const item = items.find((i: any) => i._id === val);
                  setForm((prev) => ({
                    ...prev,
                    itemId: val,
                    itemName: item?.itemName || "",
                    itemCode: item?.itemCode || "",
                    uom: item?.uom || "",
                    tp: item?.tp || "",
                    mrp: item?.mrp || "",
                    itemBalance: item?.balance || "",
                    batchNumber: item?.batchNumber || "",
                    expiryDate: item?.expiryDate || "",
                  }));
                }}
              />
              <CustomInput label="Item Code" value={form.itemCode} disabled />

              <CustomInput label="UOM" value={form.uom} disabled />

              <CustomInput
                label="Item Balance"
                value={form.itemBalance}
                onChange={(e) =>
                  setForm((p) => ({ ...p, itemBalance: e.target.value }))
                }
              />

              <CustomInput
                label="Ordered Quantity"
                value={form.orderedQty}
                onChange={(e) => {
                  const nextQty = e.target.value;
                  const nextQtyNum = Number(nextQty || 0);
                  const itemBalanceNum = Number(form.itemBalance || 0);

                  if (nextQty && nextQtyNum > itemBalanceNum) {
                    notifyError(
                      "Ordered quantity cannot be greater than item balance",
                    );
                    return;
                  }

                  setForm((p) => ({ ...p, orderedQty: nextQty }));
                }}
              />

              <CustomInput
                label="Batch Number"
                value={form.batchNumber}
                onChange={(e) =>
                  setForm((p) => ({ ...p, batchNumber: e.target.value }))
                }
              />
              <CustomDatePicker
                label="Expiry Date"
                value={form.expiryDate}
                onChange={(val) => setForm((p) => ({ ...p, expiryDate: val }))}
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />

              <CustomInput label="TP" value={form.tp} disabled />

              <CustomInput
                label="Discount %"
                value={form.discount}
                onChange={(e) =>
                  setForm((p) => ({ ...p, discount: e.target.value }))
                }
              />

              <CustomInput
                label="Bonus"
                value={form.bonus}
                onChange={(e) =>
                  setForm((p) => ({ ...p, bonus: e.target.value }))
                }
              />

              <CustomInput
                label="Gross Amount"
                value={String(totalTP)}
                disabled
              />

              <CustomInput label="Amount" value={String(netAmount)} disabled />
            </div>

            <div className="flex justify-end p-4 mt-4 ">
              <button
                onClick={handleSave}
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

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p
                onClick={() => setConfirmDelete(false)}
                className="cursor-pointer"
              >
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-72">
              <p className="text-2xl font-semibold text-center">Delete item</p>
              <p className="mt-1 text-center text-heading1">
                Are you sure you want to delete {selectedRows.length} selected
                Item?
              </p>
            </div>
            <div className="flex justify-between gap-2 p-4 mt-3">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                className="h-10 w-25 cursor-pointer rounded-md text-white bg-[#FF0000]"
                onClick={handleDeleteSelected}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
