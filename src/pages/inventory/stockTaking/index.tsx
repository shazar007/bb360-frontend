import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import { printData } from "../../../utils/printData";
import CustomTable from "../../../components/customTable";
import { useAppNavigate } from "../../../hooks/navigation";
import { getStockTaking } from "../../../api/itemServices";
import CustomDatePicker from "../../../components/datePicker";
import CustomCheckbox from "../../../components/customCheckbox";
import { PrintByItem } from "../inventoryAdjustment/printByItem";

const headerInitialForm = {
  fromDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  toDate: dayjs().format("YYYY-MM-DD"),
};

export default function StockTaking() {
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState(headerInitialForm);
  const { goBack, goWithState } = useAppNavigate();
  const printAllRef = useRef(null);

  const {
    data: stockTakingData,
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["getStockTaking"],

    queryFn: () => getStockTaking(form.fromDate, form.toDate),
    enabled: true,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    staleTime: Infinity,
  });

  const stockTakingItems = stockTakingData?.data?.items || [];
  const fromDate = stockTakingData?.data?.period?.fromDate;
  const toDate = stockTakingData?.data?.period?.toDate;

  const updateRows = (updated: any[]) => {
    setRows(updated);
  };

  const toggleSelect = (index: number, value: boolean) => {
    const updated = rows.map((item, i) =>
      i === index ? { ...item, selected: value } : item,
    );
    updateRows(updated);
  };

  const handlePrintAll = useReactToPrint({
    contentRef: printAllRef,
    documentTitle: "Stock Taking",
  });
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Stock Taking
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:w-auto">
            <button
              onClick={goBack}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="ion:play-back-outline" />
              Back
            </button>

            <button
              onClick={handlePrintAll}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              <Icon icon="ion:print-outline" />
              Print / Save
            </button>
          </div>
        </div>
        <div className="mt-3 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] p-4 rounded-t-2xl">
            <p className="text-xs font-semibold">Select Stock Taking</p>
          </div>
          <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-10 items-end">
            <CustomDatePicker
              label="From Date"
              value={form.fromDate}
              onChange={(val: any) => {
                setForm((prev) => ({
                  ...prev,
                  fromDate: val || "",
                }));
              }}
            />
            <CustomDatePicker
              label="To Date"
              value={form.toDate}
              onChange={(val: any) => {
                setForm((prev) => ({
                  ...prev,
                  toDate: val || "",
                }));
              }}
            />
            <button
              onClick={() => {
                refetch();
              }}
              className="flex items-center justify-center w-full h-10 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              {!isLoading && isFetching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <PrintByItem
            ref={printAllRef}
            data={{
              fromDate: fromDate ? dayjs(fromDate).format("DD-MMM-YYYY") : "-",
              toDate: toDate ? dayjs(toDate).format("DD-MMM-YYYY") : "-",
              items: stockTakingItems,
            }}
            title="Stock Taking"
            sections={printData.stockTakingByAll}
          />
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <CustomTable
            loading={isLoading}
            norounded
            headers={[
              "Details",
              "Select",
              "Item Code",
              "Item Name",
              "Total Batches",
              "Item Category",
              "UOM",
              "Opening Balance",
              "Purchase",
              "Adjustment",
              "Sale",
              "Closing Stock",
              "Actual Stock",
            ]}
            data={stockTakingItems.map((item: any, index: any) => {
              return [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() =>
                    goWithState("/inventory/stock-taking/details", {
                      item,
                      fromDate: form.fromDate,
                      toDate: form.toDate,
                    })
                  }
                />,
                <CustomCheckbox
                  checked={item.selected}
                  onChange={(v) => toggleSelect(index, v)}
                />,
                item.itemCode || "-",
                item.itemName || "-",
                item.totalBatches || "-",
                item.itemCategory || "-",
                item.uom || "-",
                item.totals?.opening || "0",
                item.totals?.purchase || "0",
                item.totals?.adjustment || "0",
                item.totals?.sale || "0",
                item.totals?.closing || "0",
                item.totals?.actual || "0",
              ];
            })}
          />
        </div>
      </div>
    </>
  );
}
