import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelect from "../../../../components/customSelect";
import { useEffect, useState } from "react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../../../../api/itemServices";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  createPurchaseOrderApi,
  getAllOrders,
} from "../../../../api/purchaseOrder";
import { SyncLoader } from "react-spinners";
import { getAllVendors } from "../../../../api/vendorServices";

const tabs = ["Items Details", "Terms and Conditions", "Summary"];
export default function CreatePurchaseOrder() {
  const [activeTab, setActiveTab] = useState("Items Details");
  const { goBack } = useAppNavigate();
  const STORAGE_KEY = "purchase_order_items";
  const [tableData, setTableData] = useState<any[]>([]);
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [partyAccount, setPartyAccount] = useState("");
  const [partyCategory, setPartyCategory] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    itemName: "",
    itemCode: "",
    itemCategory: "",
    quantity: "",
    purchaseRate: "",
    amount: "",
    uom: "",
  });

  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  // const { refetch } = useQuery({
  //   queryKey: ["getAllOrder"],
  //   queryFn: getAllOrders,

  //   staleTime: Infinity,
  //   gcTime: 1000 * 60 * 10,

  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  const { data: AllVendors, isLoading } = useQuery({
    queryKey: ["getAllVendors"],
    queryFn: getAllVendors,
    staleTime: Infinity,
  });

  const partyAccounts =
    AllVendors?.data?.vendors?.map((v: any) => ({
      label: v.vendorName,
      value: v._id,
      id: v._id,
      category: v.vendorCategory || "",
    })) || [];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTableData(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData));
  }, [tableData]);

  useEffect(() => {
    const subtotal = tableData.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );

    const taxPercent = Number(taxPercentage || 0);

    const taxAmount = (subtotal * taxPercent) / 100;

    setTotalAmount((subtotal + taxAmount).toFixed(2));
  }, [tableData, taxPercentage]);

  const handleAddRow = () => {
    if (!form.itemName) {
      alert("Select item first");
      return;
    }

    setTableData((prev) => [
      ...prev,
      {
        ...form,
      },
    ]);

    setForm({
      itemName: "",
      itemCode: "",
      itemCategory: "",
      // batchNumber: "",
      quantity: "",
      purchaseRate: "",
      // unitPrice: "",
      amount: "",
      uom: "",
      // expiryDate: "",
    });

    setCreateOrder(false);
  };
  const items = AllItems?.data?.items || [];
  const itemOptions =
    items?.map((item: any) => ({
      label: item?.itemName ?? "",
      value: item?._id ?? "",
    })) || [];
  const [createOrder, setCreateOrder] = useState(false);

  const handleSaveOrder = async () => {
    try {
      setLoading(true);

      if (!partyAccount) {
        notifyError("Party Account is required");
        return;
      }

      if (!tableData.length) {
        notifyError("Add at least one item");
        return;
      }

      const payload = {
        partyAccount: partyAccount,
        partyCategory: partyCategory,
        deliveryAddress: deliveryAddress || "",
        tax: taxPercentage || "0",
        advanceAmount: Number(advanceAmount || 0),
        totalAmount: Number(totalAmount || 0),
        items: tableData.map((item: any) => ({
          item: item.itemName,
          quantity: Number(item.quantity || 0),
          purchaseRate: Number(item.purchaseRate || 0),
          amount: Number(item.amount || 0),
          // unitPrice: Number(item.unitPrice || 0),
        })),
      };

      console.log("🚀 FINAL PAYLOAD:", payload);

      await createPurchaseOrderApi(payload);

      notifySuccess("Purchase Order Created Successfully");

      setTableData([]);
      setPartyAccount("");
      setPartyCategory("");
      setDeliveryAddress("");
      setType("");

      localStorage.removeItem(STORAGE_KEY);
    } catch (error: any) {
      console.error(error);
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      // refetch();
    }
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Purchase / Purchase Order
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
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="ion:print-outline" className="w-5 h-5" />
              Print
            </button>
            <button
              onClick={handleSaveOrder}
              disabled={loading}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27 disabled:opacity-60"
            >
              {loading ? (
                <SyncLoader size={6} color="#fff" speedMultiplier={0.6} />
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
      <div className="mt-3">
        <div className="bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
            <p className="text-xs font-semibold text-heading1">
              Purchase Order
            </p>
          </div>
          <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-29.25">
            <div className="space-y-1.5">
              <CustomInput
                label="Purchase Order"
                placeholder="TO BE GENERATE"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                disabled
              />
              <CustomDatePicker
                label="Date"
                value="2026-03-01"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />

              <CustomInput
                label="Total Amount"
                placeholder="Enter Total Amount"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                value={totalAmount}
                disabled
              />
            </div>

            <div className="space-y-1.5">
              <CustomSelect
                label="Party Account"
                placeholder="Select Party"
                value={partyAccount}
                onChange={(val: any) => {
                  const selectedValue =
                    typeof val === "object" ? val?.value : val;

                  setPartyAccount(selectedValue);

                  const selected = partyAccounts.find(
                    (p: any) => p.value === selectedValue,
                  );
                  console.log("🚀 ~ CreatePurchaseOrder ~ selected:", selected);

                  setPartyCategory(selected?.category || "");
                }}
                options={partyAccounts}
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              />
              {/* <CustomSelect
                label="Party Reference"
                value={partyReference}
                options={[{ label: partyReference, value: partyReference }]}
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              /> */}
              <CustomInput
                label="Party Category"
                placeholder="Party Category"
                value={partyCategory}
                // onChange={(e) => setDeliveryAddress(e.target.value)}
                disabled
              />
            </div>

            <div className="space-y-1.5">
              <CustomInput
                label="Delivery Address"
                placeholder="Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
              <CustomSelect
                label="Type"
                placeholder="Local/Import"
                options={[
                  { label: "Local", value: "local" },
                  { label: "Import", value: "import" },
                ]}
                value={type}
                onChange={(val) => setType(val)}
              />
            </div>
            <div className="space-y-1.5">
              <CustomInput
                label="Advance Amount"
                placeholder="Enter Advance Amount"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
              />

              <CustomInput
                label="Tax%"
                type="number"
                placeholder="Enter Tax in percentage"
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(e.target.value)}
              />
            </div>
          </div>
        </div>{" "}
        <div className="flex items-center p-4 mt-3 bg-white rounded-2xl">
          <div className="flex items-center gap-8 overflow-auto md:w-full w-90">
            {tabs.map((tab: any, index: number) => (
              <p
                key={index}
                onClick={() => {
                  setActiveTab(tab);
                }}
                className={` text-xs cursor-pointer ${
                  activeTab === tab ? "text-primary" : "text-heading1"
                }`}
              >
                {tab}
              </p>
            ))}
            {activeTab === "Items Details" && (
              <div className="flex items-center gap-2 ml-auto">
                {/* <button className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center">
                  <Icon icon="proicons:delete" className="text-xl" />
                </button> */}
                <button
                  onClick={() => {
                    setCreateOrder(true);
                  }}
                  className="text-xs text-white bg-secondary rounded-md w-18 h-8.5 cursor-pointer"
                >
                  Add Row
                </button>
              </div>
            )}
          </div>
        </div>{" "}
        <div>
          {activeTab === "Items Details" && (
            <CustomTable
              norounded
              headers={[
                "Select",
                "Edit",
                "Item Code",
                "Item Name",
                "Item Category",
                "UOM",
                // "Batch Number",
                // "Expiry Date",
                "Quantity ",
                "Purchase Rate",
                // "Unit Price",
                "Amount",
              ]}
              data={tableData.map((item) => [
                <Icon
                  icon="fluent:checkbox-checked-16-regular"
                  className="text-primary text-xl"
                />,
                <Icon
                  icon="qlementine-icons:menu-burger-16"
                  className="text-primary text-xl"
                />,
                item.itemCode,
                items.find((i: any) => i._id === item.itemName)?.itemName ||
                  "-",
                item.itemCategory,
                item.uom || "-",
                // item.batchNumber || "-",
                // item.expiryDate || "-",
                item.quantity || "-",
                item.purchaseRate || "-",
                // item.unitPrice || "-",
                item.amount || "-",
              ])}
            />
          )}

          {activeTab === "Transaction Lines" && (
            <CustomTable
              norounded
              headers={[
                "Select",
                "Edit",
                "Item Name",
                "Item Name",
                "Item Balance",
                "UOM",
                "Quantity ",
                "Retail Price",
                "Discount % ",
                "Unit Price",
                "Amount",
                "Tax Code",
                "Tax Amount",
                "Gross Amount",
                "Item Weight",
                "Memo",
              ]}
              data={tableData.map((item) => [
                <Icon icon="fluent:checkbox-checked-16-regular" />,
                <Icon icon="qlementine-icons:menu-burger-16" />,
                item.itemName,
                item.itemCategory,
                "-",
                item.uom,
                item.quantity || "-",
                item.purchaseRate || "-",
                "-",
                item.unitPrice || "-",
                item.amount || "-",
                "-",
                "-",
                "-",
                "-",
                "-",
              ])}
            />
          )}
          {activeTab === "Related Transactions" && (
            <CustomTable
              norounded
              headers={[
                "Link Type",
                "Applied Date Posted",
                "Applied Transaction",
                "Original Transaction",
                "Org Transaction",
                "Org Transaction Type",
              ]}
              data={[
                [
                  <Icon
                    icon="fluent:checkbox-checked-16-regular"
                    className="text-lg cursor-pointer text-primary"
                  />,

                  "1200012",
                  "1200012",
                  "Honey 500 GM",
                  "20",
                  "20",
                ],
              ]}
            />
          )}
          {activeTab === "System Information" && (
            <div className="grid items-center grid-cols-2 gap-10 p-5 justify-evenly">
              <p className="text-xs text-center text-heading">Created By</p>
              <p className="text-xs text-center text-heading">Modified By</p>
              <p className="text-xs text-center text-heading">Created Date</p>
              <p className="text-xs text-center text-heading">Modified Date</p>
            </div>
          )}
          {activeTab === "Terms & Conditions" && (
            <p className="p-4"> Terms & Conditions</p>
          )}
          {activeTab === "Attachments" && (
            <CustomTable
              norounded
              headers={[
                "View",
                "Find File Name",
                "File Extension",
                "File Size",
                "Description",
              ]}
              data={[
                [
                  <Icon
                    icon="hugeicons:view"
                    className="text-lg cursor-pointer text-primary"
                  />,

                  "1200012",
                  "1200012",
                  "Honey 500 GM",
                  "20",
                ],
              ]}
            />
          )}
        </div>
      </div>
      {createOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Add Purchase Order
              </h2>

              <button
                onClick={() => {
                  setCreateOrder(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form>
              <div className="grid grid-cols-2 p-6 gap-y-4 gap-x-15">
                <CustomSelectSearch
                  options={itemOptions}
                  label="Item Name"
                  value={form.itemName}
                  placeholder="Enter Product Name"
                  onChange={(val) => {
                    console.log("🚀 ~ CreatePurchaseOrder ~ val:", val);

                    const selectedItem = items.find((i: any) => i._id === val);

                    setForm((prev) => ({
                      ...prev,
                      itemName: val,
                      itemCode: selectedItem?.itemCode || "",
                      itemCategory: selectedItem?.itemCategory || "",
                      uom: selectedItem?.uom || "",
                    }));
                  }}
                />
                <CustomInput
                  label="Item Code"
                  disabled
                  placeholder="Enter Item Code"
                  value={form.itemCode}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      itemCode: e.target.value,
                    }))
                  }
                />

                <CustomInput
                  label="Item Category"
                  value={form.itemCategory}
                  disabled
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      itemCategory: e.target.value,
                    }))
                  }
                />
                <CustomInput
                  label="UOM"
                  value={form.uom}
                  disabled
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, uom: e.target.value }))
                  }
                />

                {/* <CustomInput
                  label="Batch Number"
                  placeholder="Enter Batch Number"
                  value={form.batchNumber}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      batchNumber: e.target.value,
                    }))
                  }
                />
                <CustomDatePicker
                  label="Expiry Date"
                  value={form.expiryDate}
                  onChange={(v) =>
                    setForm((prev) => ({ ...prev, expiryDate: v }))
                  }
                /> */}
                <CustomInput
                  label="Quantity"
                  placeholder="Enter Quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, quantity: e.target.value }))
                  }
                />
                <CustomInput
                  label="Purchase Rate"
                  placeholder="Enter Purchase Rate"
                  value={form.purchaseRate}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      purchaseRate: e.target.value,
                    }));

                    let subTotal =
                      Number(form.quantity) * Number(e.target.value);
                    if (!isNaN(subTotal)) {
                      setForm((prev) => ({
                        ...prev,
                        amount: subTotal.toString(),
                      }));
                    }
                  }}
                />
                {/* <CustomInput
                  label="Unit Price"
                  placeholder="Enter Unit Price"
                  value={form.unitPrice}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, unitPrice: e.target.value }))
                  }
                /> */}
                <CustomInput
                  label="Amount"
                  placeholder="Enter Amount"
                  value={form.amount}
                  // onChange={(e) => {

                  //   }
                  // }}
                />
              </div>

              <div className="flex justify-end p-4">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
                >
                  <Icon icon="mynaui:save" className="text-xl" />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
