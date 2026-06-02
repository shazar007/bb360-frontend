import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { useAppNavigate } from "../../../hooks/navigation";

import CustomInput from "../../../components/customInput";
import CustomTable from "../../../components/customTable";

import { PrintByItem } from "../inventoryAdjustment/printByItem";
import { printData } from "../../../utils/printData";

export default function StockTakingDetails() {
  const { goBack } = useAppNavigate();

  const { state } = useLocation();
  const item = state?.item;
  const inputFields = itemFields(item);

  const fromDate = state?.fromDate;
  const toDate = state?.toDate;

  const printItemRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const printFn = useReactToPrint({
    contentRef: printItemRef,
    documentTitle: "Stock Taking Details",
  });

  const handlePrintItem = (item: any) => {
    setSelectedItem({ ...item, fromDate, toDate });

    setTimeout(printFn, 200);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold text-heading1 md:text-lg">
            Batches Details
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <button
            onClick={goBack}
            className={`${buttonClass} w-full bg-secondary text-sm text-white md:w-27`}
          >
            <Icon icon="ion:play-back-outline" />
            Back
          </button>

          <button
            onClick={() => handlePrintItem(item)}
            className={`${buttonClass} bg-white px-6 shadow`}
          >
            <Icon icon="ion:print-outline" />
            Print
          </button>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-white">
        <div className="rounded-t-2xl bg-[#ECF0F4] p-4">
          <p className="text-xs font-semibold text-heading1">Stock Item</p>
        </div>

        <div className="grid grid-cols-1 gap-10 p-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-29.25">
          {inputFields.map((field) => (
            <CustomInput
              key={field.label}
              label={field.label}
              value={field.value || "-"}
              disabled
            />
          ))}
        </div>
      </div>

      <div style={{ display: "none" }}>
        <PrintByItem
          ref={printItemRef}
          data={selectedItem}
          title="Stock Taking Item Details"
          sections={printData.stockTakingByItem}
        />
      </div>

      <div className="mt-3 rounded-2xl bg-bgprimary">
        <CustomTable
          height="700px"
          headers={stockTakingDetailsTableHeader}
          data={item?.batches?.map((batch: any) => [
            batch.batchNumber || "-",
            batch.opening || "0",
            batch.purchase || "0",
            batch.adjustment || "0",
            batch.sale || "0",
            batch.closing || "0",
            batch.actualStock || "0",
          ])}
        />
      </div>
    </div>
  );
}

const stockTakingDetailsTableHeader = [
  "Batches",
  "Opening Balance",
  "Purchase",
  "Adjustment",
  "Sale",
  "Closing Stock",
  "Actual Stock",
];

const itemFields = (item: any) => [
  {
    label: "Item Code",
    value: item?.itemCode,
  },
  {
    label: "Item Name",
    value: item?.itemName,
  },
  {
    label: "Item Category",
    value: item?.itemCategory,
  },
];

const buttonClass =
  "flex h-10 items-center justify-center gap-2 rounded-md cursor-pointer";
