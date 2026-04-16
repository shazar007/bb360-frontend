import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../../../../api/itemServices";
import CustomInput from "../../../../components/customInput";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { getAllDistributor } from "../../../../api/distributorServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";

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
};

export default function CreateSalesInvoice() {
  const [form, setForm] = useState(initialFormState);
  const [activeTab, setActiveTab] = useState("Transaction Lines");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [distributorData, setDistributorData] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [addItem, setAddItem] = useState(false);
  const { goBack } = useAppNavigate();

  const { data: AllDistributors } = useQuery({
    queryKey: ["getAllDistributor"],
    queryFn: getAllDistributor,
    staleTime: 1000 * 60 * 5,
  });

  /* ================= CALCULATIONS ================= */
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

  /* ================= SAVE ================= */
  const handleSave = () => {
    if (!form.itemId) {
      alert("Please select item");
      return;
    }
 
    const newItem = {
      ...form,
      grossAmount: totalTP,
      amount: netAmount,
    };

    setTableData((prev) => [...prev, newItem]);
    setForm(initialFormState);
    setAddItem(false);
  };

  useEffect(() => {
    document.title = "Distributor Invoice — BB-360";
  }, []);

return (
  <>
    {/* HEADER */}
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
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md bg-secondary md:w-27"
          >
            <Icon icon="ion:play-back-outline" className="text-lg" />
            Back
          </button>

          <button className="flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 shadow">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          <button className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md bg-primary md:w-27">
            <Icon icon="mynaui:save" className="text-lg" />
            Save
          </button>
        </div>
      </div>
    </div>

    {/* DISTRIBUTOR SECTION */}
    <div className="mt-3 bg-white rounded-2xl">
      <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
        <p className="text-xs font-semibold text-heading1">
          Create Invoice
        </p>
      </div>

      <div className="p-4 grid grid-cols-3 gap-5">
        <CustomInput label="Invoice Number" placeholder="GENERATE" disabled />

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

        <CustomInput label="Distributor Discount" />
        <CustomInput label="Tax Amount %" />
      </div>
    </div>

    {/* TABS + TABLE */}
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
          <div className="flex items-center gap-2 ml-auto">
            <button className="h-8 w-8 bg-red-500 text-white rounded-md flex items-center justify-center">
              <Icon icon="proicons:delete" />
            </button>

            <button
              onClick={() => setAddItem(true)}
              className="text-xs text-white bg-secondary rounded-md px-3 h-8"
            >
              Add Row
            </button>
          </div>
        )}
      </div>

      {/* TABLE CONTENT */}
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
            "Qty",
            "MRP",
            "TP",
            "Bonus",
            "Discount %",
            "Gross Amount",
            "Amount",
          ]}
          data={tableData.map((item) => [
            <Icon icon="fluent:checkbox-checked-16-regular" className="text-primary" />,
            <Icon icon="qlementine-icons:menu-burger-16" className="text-primary" />,
            item.itemCode,
            item.itemName,
            item.uom,
            item.itemBalance || "-",
            item.orderedQty || "-",
            item.mrp || "-",
            item.tp || "-",
            item.bonus || "-",
            item.discount || "-",
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

    {/* MODAL */}
    {addItem && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white w-full max-w-2xl p-6 rounded-xl">
          <div className="flex justify-between border-b pb-2">
            <h2 className="text-sm font-semibold">Add Item</h2>
            <button onClick={() => setAddItem(false)}>✕</button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <CustomInput label="Item Code" value={form.itemCode} disabled />

            <CustomSelectSearch
              options={itemOptions}
              label="Item Name"
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
                }));
              }}
            />

            <CustomInput label="UOM" value={form.uom} disabled />

            <CustomInput
              label="Item Balance"
              value={form.itemBalance}
              onChange={(e) =>
                setForm((p) => ({ ...p, itemBalance: e.target.value }))
              }
            />

            <CustomInput
              label="Qty"
              value={form.orderedQty}
              onChange={(e) =>
                setForm((p) => ({ ...p, orderedQty: e.target.value }))
              }
            />

            <CustomInput label="MRP" value={form.mrp} />

            <CustomInput label="TP" value={form.tp} disabled />

            <CustomInput
              label="Discount %"
              value={form.discount}
              onChange={(e) =>
                setForm((p) => ({ ...p, discount: e.target.value }))
              }
            />

            <CustomInput
              label="Gross Amount"
              value={String(totalTP)}
              disabled
            />

            <CustomInput
              label="Amount"
              value={String(netAmount)}
              disabled
            />

            <CustomInput
              label="Bonus"
              value={form.bonus}
              onChange={(e) =>
                setForm((p) => ({ ...p, bonus: e.target.value }))
              }
            />
          </div>

          <div className="flex justify-end mt-4">
            <button onClick={handleSave} className="btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
}
