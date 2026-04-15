import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../../../../api/itemServices";
import CustomInput from "../../../../components/customInput";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { getAllDistributor } from "../../../../api/distributorServices";

const tabs = [
  "Transaction Lines",
  "Accounting Lines",
  "System Information",
  "Terms & Conditions",
];
export default function CreateSalesInvoice() {
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const { goBack } = useAppNavigate();
  const [addItem, setAddItem] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [distributorData, setDistributorData] = useState<any>(null);
  const [form, setForm] = useState({
    itemId: "",
    itemName: "",
    itemCode: "",
    uom: "",
    itemBalance: "",
    orderedQty: "1",
    mrp: "",
    tp: "",
    discount: "",
    grossAmount: "",
    amount: "",
    bonus: "",
  });

  const { data: AllDistributors, refetch } = useQuery({
    queryKey: ["getAllDistributor"],
    queryFn: getAllDistributor,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const calculateTP = +form.tp * +form.orderedQty;
  const discountPercent = +form.discount || 0;
  const grossAmount = (calculateTP * discountPercent) / 100;
  const grossAmount_afterDiscount = calculateTP - grossAmount;
  const finalAmount = grossAmount_afterDiscount;
  const allDistributors = AllDistributors?.data?.distributors || [];

  const distributorOptions = [
    { label: "Select Distributor", value: "" },
    ...allDistributors.map((item:any) => ({
      label: item.distributorName,
      value: item._id, // ya distributorCode bhi use kar sakte ho
    })),
  ];

  const { data: AllItems } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,
  });

  const handleSave = () => {
    if (!form.itemId) {
      alert("Please select item");
      return;
    }

    const newItem = {
      ...form,
    };

    setTableData((prev) => [...prev, newItem]);

    // reset form
    setForm({
      itemId: "",
      itemName: "",
      itemCode: "",
      uom: "",
      itemBalance: "",
      orderedQty: "1",
      mrp: "",
      tp: "",
      discount: "",
      grossAmount: "",
      amount: "",
      bonus: "",
    });

    setAddItem(false);
  };

  const items = AllItems?.data?.items || [];

  const itemOptions =
    items?.map((item: any) => ({
      label: item?.itemName,
      value: item?._id,
    })) || [];

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

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
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
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              <Icon icon="mynaui:save" className="text-lg" />
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Invoice
            </p>
          </div>
          <div className="p-4 grid grid-cols-3 gap-y-5 gap-x-29.25">
            <CustomInput label="Invoice Number" placeholder="GENERATE" disabled />
            <CustomSelectSearch
              label="Distributor Name"
              options={distributorOptions}
              value={selectedDistributor}
              onChange={(val) => {
                setSelectedDistributor(val);
                const selected = allDistributors.find((d:any) => d._id === val);
                setDistributorData(selected);
              }}
            />
            <CustomInput
              label="Contact Number"
              disabled
              value={distributorData?.contactNumber || ""}
            />

            <CustomInput
              label="Address"
              disabled
              value={distributorData?.address || ""}
            />

            <CustomInput
              label="Licence Status"
              disabled
              value={distributorData?.licenceStatus || ""}
            />
            <CustomInput
              label="Distributor Discount"
              // value={distributorData?.licenceStatus || ""}
            />
            <CustomInput
              label="Tax Amount %"
              disabled
              // value={distributorData?.licenceStatus || ""}
            />
          </div>
        </div>{" "}
        <div className="mt-3 bg-white rounded-2xl">
          <div className="flex items-center gap-8 p-4 overflow-auto md:w-full w-90">
            {tabs.map((tab: any, index: number) => (
              <p
                key={index}
                onClick={() => {
                  setActiveTab(tab);
                }}
                className={`text-xs cursor-pointer ${
                  activeTab === tab ? "text-primary" : "text-heading1"
                }`}
              >
                {tab}
              </p>
            ))}

            {(activeTab === "Transaction Lines" ||
              activeTab === "Accounting Lines") && (
              <div className="flex items-center gap-2 ml-auto">
                <button className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center">
                  <Icon icon="proicons:delete" className="text-xl" />
                </button>

                <button
                  onClick={() => setAddItem(true)}
                  className="text-xs text-white bg-secondary rounded-md w-18 h-8.5 cursor-pointer"
                >
                  Add Row
                </button>
              </div>
            )}
          </div>

          <div>
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
                  "Ordered Quantity ",
                  "M.R.P ",
                  "T.P",
                  "Bonus",
                  "Discount % ",
                  "Gross Amount",
                  "Amount",
                ]}
                data={tableData.map((item, index) => [
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
                  item.uom,
                  item.itemBalance || "-",
                  item.orderedQty || "-",
                  item.mrp || "-",
                  item.tp || "-",
                  item.bonus || "-",
                  item.discount || "-",
                  item.grossAmount || "-",
                  item.amount || "-",
                ])}
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
              <div className="grid items-center grid-cols-2 gap-10 p-5 justify-evenly">
                <p className="text-xs text-center text-heading">Created By</p>
                <p className="text-xs text-center text-heading">Modified By</p>
                <p className="text-xs text-center text-heading">Created Date</p>
                <p className="text-xs text-center text-heading">
                  Modified Date
                </p>
              </div>
            )}
            {activeTab === "Terms & Conditions" && (
              <p className="p-4"> Terms & Conditions</p>
            )}
          </div>
        </div>
      </div>

      {addItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full p-6 bg-white shadow-xl max-w-250 rounded-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between pb-2 border-b border-[#757575]">
              <h2 className="text-xs font-semibold text-heading1">Add Item</h2>

              <button
                onClick={() => {
                  setAddItem(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* AUTO FILLED */}

              <CustomInput label="Item Code" value={form.itemCode} disabled />

              <CustomSelectSearch
                options={itemOptions}
                label="Item Name"
                value={form.itemId}
                placeholder="Enter Product Name"
                onChange={(val) => {
                  const selectedItem = items.find((i: any) => i._id === val);

                  setForm((prev) => ({
                    ...prev,
                    itemId: val,
                    itemName: selectedItem?.itemName || "",
                    itemCode: selectedItem?.itemCode || "",
                    uom: selectedItem?.uom || "",
                    tp: selectedItem?.tp || "",
                    mrp: selectedItem?.mrp || "",
                  }));
                }}
              />

              <CustomInput label="UOM" value={form.uom} disabled />

              {/* EDITABLE */}
              <CustomInput
                label="Item Balance"
                value={form.itemBalance}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, itemBalance: e.target.value }))
                }
              />

              <CustomInput
                label="Ordered Quantity"
                value={form.orderedQty}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, orderedQty: e.target.value }))
                }
              />

              <CustomInput
                label="MRP"
                value={form.mrp}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, mrp: e.target.value }))
                }
              />

              <CustomInput
                label="TP"
                // value={String(calculateTP)}
                value={String(form.tp)}

                disabled
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, tp: e.target.value }))
                }
              />

              <CustomInput
                label="Discount %"
                value={form.discount}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, discount: e.target.value }))
                }
              />

              <CustomInput
                label="Gross Amount"
                value={String(grossAmount_afterDiscount)}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, grossAmount: e.target.value }))
                }
              />

              <CustomInput
                label="Amount"
                value={String(finalAmount)}
                disabled
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
              <CustomInput
                label="Bonus"
                value={form.bonus}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, bonus: e.target.value }))
                }
              />
            </div>

            {/* FOOTER */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="h-10 text-sm flex items-center gap-1 text-white bg-primary rounded-md w-27.5 justify-center cursor-pointer"
              >
                <Icon icon="mynaui:save" className="text-xl" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
