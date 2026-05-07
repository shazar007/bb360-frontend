import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";
import { useEffect, useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useGetPurchaseRecevingPoNumber } from "../../../../api/queries";
import { SyncLoader } from "react-spinners";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  createPurchaseInvoice,
  getAllPurchaseInvoice,
} from "../../../../api/purchaseInvoice";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const tabs = [
  "Transaction Lines",
  "Accounting Lines",
  "System Information",
  "Terms & Conditions",
];

export default function CreateVendorBill() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const { goBack } = useAppNavigate();
  const [loading, setLoading] = useState(false);
  const [poNumber, setPoNumber] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<any>(null);
  const queryClient = useQueryClient();
  const [tableItems, setTableItems] = useState<any[]>([]);
  const {
    data: order,
    isLoading,
    refetch,
  } = useGetPurchaseRecevingPoNumber(poNumber, {
    enabled: false,
    retry: false,
  });
  const purchaseOrderData = (order as any)?.data;
  useEffect(() => {
    if (purchaseOrderData?.items) {
      setTableItems(purchaseOrderData.items);
    }
  }, [purchaseOrderData]);

  useEffect(() => {
    document.title = "Purchase Invoice — BB-360";
  }, []);

  const handleSearch = async () => {
    if (!poNumber.trim()) {
      notifyError("Enter Purchase Order Number");
      return;
    }

    const res = await refetch();

    if (res.status === "error") {
      const message =
        (res.error as any)?.response?.data?.message || "Something went wrong";

      notifyError(message);
      return;
    }
  };

  const handleEdit = (item: any, index: number) => {
    setEditIndex(index);
    setEditRow({ ...item });
    setCreateModal(true);
  };

  const handleChange = (key: string, value: any) => {
    setEditRow((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (editIndex === null) return;

    purchaseOrderData.items[editIndex] = editRow;

    setCreateModal(false);
    setEditIndex(null);
    setEditRow(null);
  };
  const formatDate = (date: string) => {
    if (!date) return "";

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };
  const handleSavePurchaseInvoice = async () => {
    try {
      if (!purchaseOrderData) {
        notifyError("No Purchase Order Data Found");
        return;
      }

      setLoading(true);

      const payload = {
        purchaseReceiving: purchaseOrderData?._id
          ? String(purchaseOrderData._id)
          : "",
        invoiceDate: purchaseOrderData?.date || "",
      };

      await createPurchaseInvoice(payload);

      notifySuccess("Purchase Invoice Created Successfully");

      setPoNumber("");
      setTableItems([]);
      setEditRow(null);
      setEditIndex(null);

      queryClient.invalidateQueries({ queryKey: ["getAllOrder"] });

      goBack();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Failed to save invoice");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Payable / Purchase Invoice
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={goBack}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            <Icon icon="ion:play-back-outline" className="text-lg" />
            Back
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Post
          </button>

          <button
            onClick={handleSavePurchaseInvoice}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
          >
            {loading ? (
              <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="mynaui:save" className="text-lg" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-2 bg-white rounded-2xl">
            <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
              <p className="text-xs font-semibold text-heading1">Invoice</p>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-30.25 text-secondary">
              <div className="space-y-2">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <CustomInput
                      className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                      label="Purchase Receving"
                      value={poNumber}
                      onChange={(e: any) => setPoNumber(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={handleSearch}
                    className="h-10 px-4 text-xs text-white rounded-md cursor-pointer bg-secondary"
                  >
                    {isLoading ? (
                      <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>

                <CustomInput
                  label="Invoice Date"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  value={
                    purchaseOrderData?.date
                      ? new Date(purchaseOrderData.date).toLocaleDateString()
                      : ""
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Party Account"
                  value={purchaseOrderData?.partyAccount?.vendorName || ""}
                  disabled
                />

                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Party Categroy"
                  value={purchaseOrderData?.partyAccount?.vendorCategory || "-"}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Delivery Address"
                  value={purchaseOrderData?.deliveryAddress}
                  disabled
                />

                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Type"
                  value={purchaseOrderData?.type || ""}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Tax%"
                  value={purchaseOrderData?.taxPercentage || "0"}
                  disabled
                />{" "}
                <CustomInput
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  label="Total Amount"
                  value={purchaseOrderData?.totalAmount || "0"}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <div className="flex items-center justify-between p-4">
            <div className="flex w-90 md:w-[60%] overflow-auto items-center gap-8">
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
          </div>

          {activeTab === "Transaction Lines" && (
            <CustomTable
              norounded
              headers={[
                "Edit",
                "Item Code",
                "Item Name",
                "Item Catgory",
                "UOM",
                "Batch Number",
                "Expiry Date",
                "Ordered Quantity",
                "Delivered Qty",
                "Purchase Rate",
                "Amount",
              ]}
              data={
                poNumber.trim() && purchaseOrderData?.items?.length
                  ? purchaseOrderData.items.map((item: any, index: number) => [
                      <Icon
                        onClick={() => handleEdit(item, index)}
                        icon="qlementine-icons:menu-burger-16"
                        className="text-lg cursor-pointer text-primary"
                      />,
                      item.itemCode,
                      item.itemName,
                      item.itemCategory,
                      item.uom,
                      item.batchNumber,
                      formatDate(item.expiryDate),
                      item.orderedQty || "",
                      item.deliveredQty || "",
                      item.purchaseRate || "",
                      item.amount,
                    ])
                  : []
              }
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
            <>
              <div className="bg-[#ECF0F4] p-4">
                <p className="text-xs font-semibold text-heading1">
                  System Information
                </p>
              </div>

              <div className="grid grid-cols-1 gap-10 p-6 text-center md:grid-cols-2">
                <div>
                  <p className="text-xs text-heading1">Created By</p>
                </div>
                <div>
                  <p className="text-xs text-heading1">Modified By</p>
                </div>
                <div>
                  <p className="text-xs text-heading1">Created Date</p>
                </div>
                <div>
                  <p className="text-xs text-heading1">Modified Date</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "Terms & Conditions" && (
            <>
              <div className="bg-[#ECF0F4] p-4">
                <p className="text-xs font-semibold text-heading1">
                  Terms & Condition
                </p>
              </div>

              <div className="p-4">
                <textarea
                  placeholder="Type Here..."
                  className="w-full h-32 p-3 text-sm rounded-md bg-[#ECF0F4] focus:outline-none resize-none"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {createModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full bg-white shadow-xl max-w-250 rounded-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Edit Purchase Invoice
              </h2>

              <button
                onClick={() => setCreateModal(false)}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 p-6 gap-y-4 gap-x-15">
              <CustomInput
                label="Item Code"
                value={editRow?.itemCode}
                disabled
              />
              <CustomInput
                label="Item Name"
                value={editRow?.itemName}
                disabled
              />
              <CustomInput label="UOM" value={editRow?.uom} disabled />
              <CustomInput
                label="Ordered Quantity"
                value={editRow?.orderedQty}
                disabled
              />

              <CustomInput
                label="Delivered Quantity"
                value={editRow?.deliveredQty || ""}
                onChange={(e) => handleChange("deliveredQty", e.target.value)}
              />

              <CustomInput
                label="Purchase Rate"
                value={editRow?.purchaseRate || ""}
                onChange={(e) => handleChange("purchaseRate", e.target.value)}
              />

              <CustomInput label="Amount" value={editRow?.amount} disabled />
            </div>

            <div className="flex justify-end p-4">
              <button
                onClick={handleSave}
                className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
              >
                <Icon icon="mynaui:save" className="text-xl" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
