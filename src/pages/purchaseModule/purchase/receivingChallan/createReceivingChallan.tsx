import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useEffect, useState } from "react";
import { useGetPurchaseOrderByPoNumber } from "../../../../api/queries";
import { SyncLoader } from "react-spinners";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomDatePicker from "../../../../components/datePicker";
import {
  createReceivingChallan,
  getAllPurchaseReceiving,
} from "../../../../api/purchaseReceiving";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function CreateReceivingChallan() {
  const [loading, setLoading] = useState(false);
  const [receivingDate, setReceivingDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );
  const [createChallan, setCreateChallan] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<any>(null);
  const [tableItems, setTableItems] = useState<any[]>([]);
  const [poNumber, setPoNumber] = useState("");

  const { refetch } = useQuery({
    queryKey: ["getAllOrder"],
    queryFn: getAllPurchaseReceiving,

    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const {
    data: order,
    isLoading,
    refetch: reloadPoNumber,
  } = useGetPurchaseOrderByPoNumber(poNumber, {
    enabled: false,
    retry: false,
  });

  let purchaseOrderData = (order as any)?.data?.po;
  createReceivingChallan;
  const handleIdChange = async () => {
    if (!poNumber.trim()) {
      notifyError("Enter PO Number");
      return;
    }

    const res = await reloadPoNumber();

    if (res.error) {
      const message =
        (res.error as any)?.response?.data?.message || "Something went wrong";

      notifyError(message);
    }
  };

  const { goBack } = useAppNavigate();
  const handleSave = () => {
    if (editIndex === null) return;

    const updated = [...tableItems];

    updated[editIndex] = {
      ...updated[editIndex],
      ...editRow,

      deliveredQty: Number(editRow?.deliveredQty || 0),
      rejectedQty: Number(editRow?.rejectedQty || 0),
      reason: editRow?.reason?.trim() || "N/A",
    };

    setTableItems(updated);

    setCreateChallan(false);
    setEditIndex(null);
    setEditRow(null);
  };

  const handleEdit = (item: any, index: number) => {
    setCreateChallan(true);
    setEditIndex(index);
    setEditRow({ ...item });
  };
  const handleChange = (key: string, value: any) => {
    setEditRow((prev: any) => {
      const updatedRow = {
        ...prev,
        [key]: value,
      };

      if (key === "deliveredQty") {
        updatedRow.rejectedQty =
          Number(updatedRow.quantity || 0) - Number(value || 0);
      }

      return updatedRow;
    });
  };
  const adjustedTotalAmount = tableItems.reduce((sum: number, item: any) => {
    const rejectedQty = Number(item?.rejectedQty || 0);
    const rate = Number(item?.purchaseRate || 0);

    return sum + rejectedQty * rate;
  }, 0);

  const finalTotalAmount =
    Number(purchaseOrderData?.totalAmount || 0) - adjustedTotalAmount;
  useEffect(() => {
    if (purchaseOrderData?.items && tableItems.length === 0) {
      setTableItems(purchaseOrderData.items);
    }
  }, [purchaseOrderData]);
  const handleSaveInvoice = async () => {
    if (loading) return;

    if (!receivingDate) {
      notifyError("Receiving Date is required");
      return;
    }
    if (!editRow?.batchNumber?.trim()) {
      notifyError("Batch Number is required");
      return;
    }

    if (!editRow?.expiryDate) {
      notifyError("Expiry Date is required");
      return;
    }

    if (!tableItems.length) {
      notifyError("No items available");
      return;
    }

    const invalidItem = tableItems.find((item: any) => {
      return (
        item.deliveredQty === "" ||
        item.deliveredQty === null ||
        item.deliveredQty === undefined
      );
    });

    if (invalidItem) {
      notifyError("Please fill Delivered Quantity for all items");
      return;
    }

    try {
      if (!purchaseOrderData) {
        notifyError("No Purchase Order Data Found");
        return;
      }

      setLoading(true);

      const payload = {
        purchaseOrder: String(purchaseOrderData?._id || purchaseOrderData?.id),
        taxPercentage: Number(purchaseOrderData?.taxPercentage || 0),
        totalAmount: finalTotalAmount,
        status: "completed",
        date: receivingDate,
        items: tableItems.map((item: any) => ({
          item: String(item?.item?._id || item?.item),
          itemCode: item?.itemCode || "",
          itemName: item?.itemName || "",
          itemCategory: item?.itemCategory || "",
          uom: item?.uom || "",
          batchNumber: item?.batchNumber || "",
          expiryDate: item?.expiryDate || null,
          orderedQty: Number(item?.orderedQty || item?.quantity || 0),
          deliveredQty: Number(item?.deliveredQty || 0),

          rejectedQty:
            Number(item?.quantity || 0) - Number(item?.deliveredQty || 0),
          purchaseRate: item?.purchaseRate || "",
          reason: item?.reason?.trim() || "N/A",
          amount: Number(item?.amount || 0),
        })),
      };

      await createReceivingChallan(payload);

      notifySuccess("Receiving Challan Created Successfully");

      await refetch();
      goBack();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to save receiving challan";

      notifyError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Purchase / Receiving Challan Create
            </p>
          </div>

          <div className="flex flex-wrap items-center w-full gap-2 md:w-auto">
            <button
              onClick={goBack}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              {" "}
              <Icon icon="ion:play-back-outline" className="text-lg" />
              Back
            </button>
            {/* <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="ion:print-outline" className="w-5 h-5" />
              Print
            </button> */}
            <button
              onClick={handleSaveInvoice}
              disabled={loading}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27 disabled:opacity-60"
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
          <div className="bg-white rounded-2xl">
            <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
              <p className="text-xs font-semibold text-heading1">
                Item Receipt
              </p>
            </div>
            <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-29.25">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <CustomInput
                      label="Purchase Order"
                      placeholder="Enter Purchase Order Number"
                      value={poNumber}
                      onChange={(e: any) => {
                        setPoNumber(e.target.value);
                      }}
                    />
                  </div>

                  <button
                    onClick={handleIdChange}
                    className="flex items-center justify-center h-10 px-3 mt-4 text-xs text-white rounded-md cursor-pointer bg-secondary min-w-20"
                  >
                    {isLoading ? (
                      <SyncLoader
                        color="#FFFFFF"
                        size={6}
                        speedMultiplier={0.6}
                      />
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>

                <CustomDatePicker
                  label="Receiving Date"
                  value={receivingDate}
                  onChange={(val) => setReceivingDate(val)}
                />
              </div>
              <div className="space-y-2">
                <CustomInput
                  label="Party Account"
                  value={
                    purchaseOrderData?.partyAccount
                      ? purchaseOrderData.partyAccount?.vendorName
                      : ""
                  }
                  disabled
                />
                <CustomInput
                  label="Party Category"
                  value={
                    purchaseOrderData?.partyAccount
                      ? purchaseOrderData.partyAccount?.vendorCategory
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="space-y-2">
                <CustomInput
                  label="Delivery Address"
                  value={
                    purchaseOrderData ? purchaseOrderData.deliveryAddress : ""
                  }
                  disabled
                />
                <CustomInput
                  label="Type"
                  value={purchaseOrderData ? purchaseOrderData.type : ""}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <CustomInput
                  label="Tax%"
                  value={
                    purchaseOrderData ? purchaseOrderData.taxPercentage : ""
                  }
                  disabled
                />
                <CustomInput
                  label="Total Amount"
                  value={finalTotalAmount}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="pb-4 mt-2 bg-white rounded-2xl">
            <div className="flex justify-between items-center px-4.5 py-2">
              <p className="text-xs font-semibold text-primary">Items_Temp</p>
            </div>
            <CustomTable
              norounded
              headers={[
                "Edit",
                "Item Code",
                "Item Name",
                "Item Category",
                "UOM",
                "Batch Number",
                "Expiry Date",
                "Purchase Rate",
                "Ordered Quantity",
                "Delivered Qty",
                "Rejected/Less Quantity",
                "Reason",
                "Amount",
              ]}
              data={tableItems?.map((item: any, index: number) => [
                <Icon
                  onClick={() => handleEdit(item, index)}
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                />,
                item.itemCode,
                item.itemName,
                item.itemCategory,
                item.uom,
                item.batchNumber || "",
                item.expiryDate
                  ? new Date(item.expiryDate).toISOString().split("T")[0]
                  : "",
                item.purchaseRate,
                item.quantity,
                item.deliveredQty || "",
                item.rejectedQty || "",
                item.reason || "",
                finalTotalAmount,
              ])}
            />
          </div>
        </div>
      </div>
      {createChallan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Edit Receiving Challan
              </h2>

              <button
                onClick={() => {
                  setCreateChallan(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>{" "}
            <form>
              {" "}
              <div className="grid grid-cols-2 p-4 gap-y-4 gap-x-15">
                <CustomInput
                  label="Item Code"
                  disabled
                  value={editRow?.itemCode || ""}
                />
                <CustomInput
                  label="Item Name"
                  disabled
                  value={editRow?.itemName || ""}
                />
                <CustomInput
                  label="Item Category"
                  disabled
                  value={editRow?.itemCategory || ""}
                />{" "}
                <CustomInput label="UOM" disabled value={editRow?.uom || ""} />{" "}
                <CustomInput
                  label="Batch Number"
                  value={editRow?.batchNumber || ""}
                  onChange={(e) => handleChange("batchNumber", e.target.value)}
                />{" "}
                <CustomDatePicker
                  label="Expiry Date"
                  value={editRow?.expiryDate || ""}
                  onChange={(val) => handleChange("expiryDate", val)}
                />{" "}
                <CustomInput
                  label="Ordered Quantity"
                  disabled
                  value={editRow?.quantity || ""}
                />{" "}
                <CustomInput
                  label="Delivered Qty (Challan)"
                  value={editRow?.deliveredQty || ""}
                  onChange={(e) => handleChange("deliveredQty", e.target.value)}
                />{" "}
                <CustomInput
                  label="Rejected Quantity"
                  value={editRow?.rejectedQty || ""}
                  disabled
                />
                <CustomInput
                  label="Reason"
                  value={editRow?.reason || ""}
                  onChange={(e) => handleChange("reason", e.target.value)}
                />{" "}
              </div>
              <div className="flex justify-end p-4 pt-0">
                <button
                  onClick={handleSave}
                  type="button"
                  className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
                >
                  <Icon icon="mynaui:save" className="text-xl" />
                  Save
                </button>
              </div>{" "}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
