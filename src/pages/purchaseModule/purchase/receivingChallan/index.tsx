import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import Filters from "../../../../components/filter";
import { useRef, useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";
import { getAllPurchaseReceiving } from "../../../../api/purchaseReceiving";
import { useQuery } from "@tanstack/react-query";
import { InvoiceTemplate } from "../../../../components/temp-Invoice";
import { useReactToPrint } from "react-to-print";
export default function ReceivingChallan() {
  const [open, setOpen] = useState(false);
  const printRef = useRef(null);
  const { goTo } = useAppNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const {
    data: PurchaseReceiving,

    isLoading,
  } = useQuery({
    queryKey: ["getAllOrder"],
    queryFn: getAllPurchaseReceiving,

    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const AllPurchaseReceiving = PurchaseReceiving?.data?.data || [];
  console.log("🚀 ~ AllPurchaseReceiving:", AllPurchaseReceiving);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Invoice",
  });
  const triggerPrint = (item: any) => {
    setSelectedOrder(item);

    setTimeout(() => {
      handlePrint();
    }, 300);
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
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-60">
              <input
                placeholder="Search"
                className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
              />
              <Icon
                icon="mynaui:search"
                className="absolute text-[20px] text-heading1/36 top-2.5 left-3"
              />
            </div>

            <button
              onClick={() => setOpen(true)}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="mage:filter" className="text-lg" />
              Filters
            </button>
            <button
              onClick={() =>
                goTo(`/purchase-module/purchase/receiving-challan/create`)
              }
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-37"
            >
              <Icon icon="basil:add-outline" className="text-lg" />
              Create Challan
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <InvoiceTemplate ref={printRef} data={selectedOrder} />
        </div>
        <div className="mt-2">
          <CustomTable
            height="60vh"
            loading={isLoading}
            headers={[
              "Details",
              "View",
              "Report",
              "Challan Number",
              "Purchase Order Number",
              "Create Date",
              "Receiving Date",
              "Delivery Address",
              "Transaction Type",
            ]}
            data={AllPurchaseReceiving.map((item: any, index: number) => [
              <Icon
                key={`edit-${index}`}
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              <Icon
                onClick={() => triggerPrint(item)}
                key={`view-${index}`}
                icon="hugeicons:view"
                className="text-lg cursor-pointer text-primary"
              />,

              <Icon
                onClick={() => triggerPrint(item)}
                key={`print-${index}`}
                icon="ion:print-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              item?.prNumber || "-",
              item?.purchaseOrder?.poNumber || "-",
              item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-",

              item.date
                ? new Date(item.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-",

              item.deliveryAddress || "-",

              item.type || "Item Receipt",
            ])}
          />
        </div>
      </div>
      <Filters isOpen={open} onClose={() => setOpen(false)} title="Filters" />
    </>
  );
}
