import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useEffect, useState } from "react";

export default function CreateReceivingChallan() {
  const [createChallan, setCreateChallan] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<any>(null);
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
    updated[editIndex] = editRow;

    setRows(updated);

    // 💾 save draft locally
    localStorage.setItem("receiving_challan", JSON.stringify(updated));

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
    setEditRow((prev: any) => ({
      ...prev,
      [key]: value,
    }));
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
                <CustomInput label="Purchase Order" placeholder="GENERATE" />
                <CustomDatePicker label=" Date" />{" "}
              </div>
              <div className="space-y-1.5">
                <CustomSelect label="Party Account" />
                <CustomSelect label="Party Reference" />
              </div>
              <div className="space-y-1.5">
                <CustomSelect label="Delivery Address " />
                <CustomSelect label="Type" />
              </div>
              <div className="space-y-1.5"></div>
            </div>
          </div>

          <div className="pb-4 mt-2 bg-white rounded-2xl">
            <div className="flex justify-between items-center px-4.5 py-2">
              <p className="text-xs font-semibold text-primary">Items_Temp</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCreateChallan(true)}
                  className="text-xs text-white bg-secondary rounded-md w-18 h-8.5 cursor-pointer"
                >
                  Add Row
                </button>
              </div>
            </div>
            <CustomTable
              norounded
              headers={[
                "Edit",
                "Product Code",
                "Product Name",
                "Item Category",
                "UOM",
                "Batch Number",
                "Expiry Date",
                "Ordered Quantity",
                "Delivered Qty",
                "Received Quantity",
                "Rejected Quantity",
                "Reason",
              ]}
              data={rows.map((item, index) => [
                <Icon
                  onClick={() => handleEdit(item, index)}
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                />,
                item.productCode,
                item.productName,
                item.itemCategory,
                item.uom,
                item.batchNumber,
                item.expiryDate,
                item.orderedQty,
                item.deliveredQty,
                item.receivedQty,
                item.rejectedQty,
                item.reason,
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
                  label="Product Name"
                  disabled
                  value={editRow?.productName || ""}
                />
                <CustomInput
                  label="Item Category"
                  disabled
                  value={editRow?.itemCategory || ""}
                />{" "}
                <CustomInput label="UOM" disabled value={editRow?.uom || ""} />{" "}
                <CustomInput
                  label="Batch Number"
                  disabled
                  value={editRow?.batchNumber || ""}
                />{" "}
                <CustomInput
                  label="Expiry Date"
                  disabled
                  value={editRow?.expiryDate || ""}
                />{" "}
                <CustomInput
                  label="Ordered Quantity"
                  disabled
                  value={editRow?.orderedQty || ""}
                />{" "}
                <CustomInput
                  label="Delivered Qty (Challan)"
                  value={editRow?.deliveredQty || ""}
                  onChange={(e) => handleChange("deliveredQty", e.target.value)}
                />{" "}
                <CustomInput
                  label="Received Quantity"
                  value={editRow?.receivedQty || ""}
                  onChange={(e) => handleChange("receivedQty", e.target.value)}
                />
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
