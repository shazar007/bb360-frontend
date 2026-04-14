import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import CustomTable from "../../../../components/customTable";
import { useEffect, useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../../../../api/itemServices";

export default function CreateSalesReturn() {
  const { goBack } = useAppNavigate();
 const { goTo } = useAppNavigate();
  const [addItem, setAddItem] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);

  const [form, setForm] = useState({
    itemId: "",
    itemName: "",
    itemCode: "",
    itemCategory: "",
    uom: "",
    batchNumber: "",
    returnedQty: "",
    taxAmount: "",
    amount: "",
  });

  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
  });

  const items = AllItems?.data?.items || [];

  const itemOptions =
    items?.map((item: any) => ({
      label: item?.itemName,
      value: item?._id,
    })) || [];

  useEffect(() => {
    document.title = "Sales Return — BB-360";
  }, []);

  const handleAddRow = () => {
    if (!form.itemId) return alert("Select Item");

    setTableData((prev) => [...prev, form]);

    setShowPrint(true);
    setAddItem(false);

    setForm({
      itemId: "",
      itemName: "",
      itemCode: "",
      itemCategory: "",
      uom: "",
      batchNumber: "",
      returnedQty: "",
      taxAmount: "",
      amount: "",
    });
  };

  return (
    <>
      {/* HEADER */}
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Sales Return
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
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
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md bg-primary md:w-27 cursor-pointer"
            >
              <Icon icon="streamline-flex:story-post" className="w-5 h-5" />
              Post
            </button>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-[#f6f6f6] rounded-2xl mt-3">
        <div className="mt-3">
          <div className="bg-white rounded-2xl">
            <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
              <p className="text-xs font-semibold text-heading1">
                Enter Sales_Return
              </p>
            </div>

            {/* ✅ RESPONSIVE GRID LIKE HELPING CODE */}
            <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-29.25">
              {/* COLUMN 1 */}
              <div className="space-y-1.5">
                <CustomInput
                  label="Sales Return Order"
                  placeholder="TO BE GENERATE"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                  // disabled
                />
                <CustomDatePicker
                  label="Date"
                  value=""
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
              </div>

              {/* COLUMN 2 */}
              <div className="space-y-1.5">
                <CustomSelect
                  label="Distributor Name"
                  placeholder="-"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
                <CustomInput
                  label="Contact Number"
                  placeholder="autofill"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
              </div>

              {/* COLUMN 3 */}
              <div className="space-y-1.5">
                <CustomSelect
                  label="Condition Check"
                  placeholder="Damage/Expired/No Sale"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
                <CustomSelect
                  label="Restock"
                  placeholder="Yes/No"
                  className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                />
              </div>

              {/* COLUMN 4 → DESCRIPTION ONLY */}
              <div className="space-y-1.5">
                <CustomInput
                  label="Description"
                  placeholder="Write here..."
                  className="w-full h-24 px-3 rounded-md bg-[#ECF0F4]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-3 bg-white rounded-2xl">
          <div className="flex items-center justify-between p-4">
            <p className="text-xs text-primary">Transaction Lines</p>

            <button
              onClick={() => setAddItem(true)}
              className="text-xs text-white bg-secondary rounded-md w-18 h-8.5"
            >
              Add Row
            </button>
          </div>

          <CustomTable
            norounded
            headers={[
              "Select",
              "Edit",
              "Item Code",
              "Item Name",
              "Item Category",
              "UOM",
              "Batch Number",
              "Check Batch Number",
              "Returned Quantity",
              "Tax Amount",
              "Amount",
            ]}
            data={
              tableData.length === 0
                ? []
                : tableData.map((item) => [
                    <Icon
                      icon="fluent:checkbox-checked-16-regular"
                      className="text-lg text-primary"
                    />,
                    <Icon
                      icon="qlementine-icons:menu-burger-16"
                      className="text-lg text-primary"
                    />,
                    item.itemCode,
                    item.itemName,
                    item.itemCategory,
                    item.uom,
                    item.batchNumber,
                    <span className="text-green-600 bg-green-100 px-2 rounded">
                      Matched
                    </span>,
                    item.returnedQty,
                    item.taxAmount,
                    item.amount,
                  ])
            }
          />
        </div>
      </div>

      {/* ADD ITEM MODAL */}
      {addItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-250 p-6 rounded-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#757575]">
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

            <div className="grid grid-cols-2 gap-4 mt-4">
              <CustomSelectSearch
                options={itemOptions}
                label="Item Name"
                value={form.itemId}
                onChange={(val) => {
                  const selected = items.find((i: any) => i._id === val);

                  setForm((prev) => ({
                    ...prev,
                    itemId: val,
                    itemName: selected?.itemName,
                    itemCode: selected?.itemCode,
                    itemCategory: selected?.itemCategory,
                    uom: selected?.uom,
                  }));
                }}
              />

              <CustomInput label="Item Code" value={form.itemCode} disabled />
              <CustomInput
                label="Item Category"
                value={form.itemCategory}
                disabled
              />
              <CustomInput label="UOM" value={form.uom} disabled />

              <CustomInput
                label="Batch Number"
                value={form.batchNumber}
                onChange={(e) =>
                  setForm({ ...form, batchNumber: e.target.value })
                }
              />

              <CustomInput
                label="Returned Quantity"
                value={form.returnedQty}
                onChange={(e) =>
                  setForm({ ...form, returnedQty: e.target.value })
                }
              />

              <CustomInput
                label="Tax Amount"
                value={form.taxAmount}
                onChange={(e) =>
                  setForm({ ...form, taxAmount: e.target.value })
                }
              />

              <CustomInput
                label="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddRow}
                className="bg-primary text-white px-6 py-2 rounded-md cursor-pointer"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POST MODAL */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            {/* HEADER */}
            <div className="flex items-center justify-end p-3 border-b border-[#E5E7EB]">
              <button
                onClick={() => setShowPostModal(false)}
                className="text-lg cursor-pointer text-heading1"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 text-center">
              <h2 className="text-lg font-semibold text-heading1 mb-2">
                Post to ledger
              </h2>
              <p className="text-sm text-heading1/70">
                Are you sure to post this return to the ledger?
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between gap-4 px-6 pb-6">
              <button
                onClick={() => setShowPostModal(false)}
                className="px-5 py-2 rounded-md bg-[#F3F4F6] text-heading1 shadow-sm cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowPostModal(false);
                  goTo("/sale-module/sales/sales-return"); // ✅ redirect
                }}
                className="px-6 py-2 rounded-md bg-primary text-white cursor-pointer shadow-md"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
