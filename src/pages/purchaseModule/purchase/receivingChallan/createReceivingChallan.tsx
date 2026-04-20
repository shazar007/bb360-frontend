import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useEffect, useState } from "react";
import { useGetPurchaseOrderByPoNumber } from "../../../../api/queries";
import { SyncLoader } from "react-spinners";
import { notifyError } from "../../../../components/toast";
import CustomDatePicker from "../../../../components/datePicker";

export default function CreateReceivingChallan() {
  const [createChallan, setCreateChallan] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<any>(null);
  const [poNumber, setPoNumber] = useState("");
  const [rows, setRows] = useState<any[]>([
    {
      id: 1,
      productCode: "112060",
      productName: "Punjab Aata",
      itemCategory: "Raw Material",
      uom: "Kg",
      batchNumber: "881525/10",
      expiryDate: "25-Apr-2027",
      orderedQty: 500,
      deliveredQty: 500,
      receivedQty: 498,
      rejectedQty: 2,
      reason: "Damaged",
    },
  ]);

  const {
    data: order,
    isLoading,
    refetch,
    error,
  } = useGetPurchaseOrderByPoNumber(poNumber, {
    enabled: false, // 🚨 stops auto API call
    retry: false,
  });
  let purchaseOrderData = (order as any)?.data?.po;

  // const handleIdChange = () => {
  //   refetch(); // manually trigger API
  // };
  useEffect(() => {
    if (purchaseOrderData?.items) {
      const mapped = purchaseOrderData.items.map((item: any) => ({
        ...item,

        // ✅ FIX ITEM ID SOURCE
        itemId: item.item?._id || item._id,

        orderedQty: item.quantity,

        // editable fields
        batchNumber: item.batchNumber || "",
        expiryDate: item.expiryDate || "",
        deliveredQty: "",
        rejectedQty: "",
        reason: "",
      }));

      setRows(mapped);
    }
  }, [purchaseOrderData]);
  const handleIdChange = async () => {
    if (!poNumber.trim()) {
      notifyError("Enter PO Number");
      return;
    }

    const res = await refetch();

    if (res.error) {
      const message =
        (res.error as any)?.response?.data?.message || "Something went wrong";

      notifyError(message);
    }
  };

  const { goBack } = useAppNavigate();
  useEffect(() => {
    const saved = localStorage.getItem("receiving_challan");
    if (saved) {
      setRows(JSON.parse(saved));
    }
  }, []);
  const handleSave = () => {
    if (editIndex === null) return;

    const updated = [...rows];

    updated[editIndex] = {
      ...editRow,
      deliveredQty: Number(editRow.deliveredQty) || 0,
      rejectedQty: Number(editRow.rejectedQty) || 0,
    };

    setRows(updated);
    setCreateChallan(false);
  };
  const handleEdit = (item: any, index: number) => {
    setCreateChallan(true);
    setEditIndex(index);
    setEditRow({ ...item });
  };
  const handleChange = (key: string, value: any) => {
    setEditRow((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleSubmit = () => {
    const payload = {
      purchaseOrder: purchaseOrderData._id,
      taxAmount: purchaseOrderData.tax,
      totalAmount: purchaseOrderData.totalAmount,

      items: rows.map((item: any) => ({
        item: item.itemId, // ✅ FIXED

        orderedQty: item.orderedQty,
        deliveredQty: Number(item.deliveredQty) || 0,
        rejectedQty: Number(item.rejectedQty) || 0,
        reason: item.reason || "",

        // editable
        batchNumber: item.batchNumber,
        expiryDate: item.expiryDate
          ? new Date(item.expiryDate).toISOString()
          : null,

        // readonly fields (still sent)
        itemCode: item.itemCode,
        itemName: item.itemName,
        itemCategory: item.itemCategory,
        uom: item.uom,
        description: item.description,
        quantity: item.quantity,
        purchaseRate: item.purchaseRate,
        amount: item.amount,
      })),
    };

    console.log(payload);
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Purchase / Receiving Challan
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
            {/* Print */}
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="ion:print-outline" className="w-5 h-5" />
              Print
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
            >
              <Icon icon="mynaui:save" className="text-xl" />
              Save
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
            <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-29.25">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <CustomInput
                      label="Purchase Order"
                      placeholder="Enter Purchase Order Number"
                      value={poNumber}
                      onChange={(e: any) => {
                        setPoNumber(e.target.value);
                      }}
                      className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                    />
                  </div>

                  <button
                    onClick={handleIdChange}
                    className="flex items-center justify-center px-3 h-10 text-xs text-white bg-secondary rounded-md cursor-pointer min-w-[80px] mt-4"
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

                <CustomInput
                  label="Order Date"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  value={
                    purchaseOrderData?.date
                      ? new Date(purchaseOrderData.date).toLocaleDateString()
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <CustomInput
                  label="Party Account"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  value={
                    purchaseOrderData?.partyAccount
                      ? purchaseOrderData.partyAccount?.vendorName
                      : ""
                  }
                  disabled
                />
                <CustomInput
                  label="Party Category"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  value={
                    purchaseOrderData?.partyAccount
                      ? purchaseOrderData.partyAccount?.vendorCategory
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <CustomInput
                  label="Delivery Address"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  value={
                    purchaseOrderData ? purchaseOrderData.deliveryAddress : ""
                  }
                  disabled
                />
                <CustomInput
                  label="Type"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  value={purchaseOrderData ? purchaseOrderData.type : ""}
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <CustomInput
                  label="Tax%"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  value={purchaseOrderData ? purchaseOrderData.tax : ""}
                  disabled
                />
                <CustomInput
                  label="Total Amount"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  value={purchaseOrderData ? purchaseOrderData.totalAmount : ""}
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
                "Ordered Quantity",
                "Delivered Qty",
                "Rejected/Less Quantity",
                "Reason",
                "Amount",
              ]}
              data={rows.map((item: any, index: number) => [
                <Icon
                  onClick={() => handleEdit(item, index)}
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                />,
                item.itemCode,
                item.itemName,
                item.itemCategory,
                item.uom,
                item.batchNumber,
                item.expiryDate,
                item.orderedQty,
                item.deliveredQty,
                item.rejectedQty,
                item.reason,
                item.amount,
              ])}
            />
            ;
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
              <div className="grid grid-cols-2 p-6 gap-y-4 gap-x-15">
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
                  onChange={(value) => handleChange("expiryDate", value)}
                />
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
                  onChange={(e) => handleChange("rejectedQty", e.target.value)}
                />{" "}
                <CustomInput
                  label="Reason"
                  value={editRow?.reason || ""}
                  onChange={(e) => handleChange("reason", e.target.value)}
                />{" "}
              </div>
              <div className="flex justify-end p-4">
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
