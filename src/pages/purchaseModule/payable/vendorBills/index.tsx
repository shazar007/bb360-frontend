import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";

import { useEffect } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllPurchaseInvoice } from "../../../../api/purchaseInvoice";
import dayjs from "dayjs";

export default function VendorBills() {
  useEffect(() => {
    document.title = "Create Bills — BB-360";
  }, []);
  const { data: AllInvoice, isLoading } = useQuery({
    queryKey: ["getAllOrder"],
    queryFn: getAllPurchaseInvoice,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const allInvoices = AllInvoice?.data?.data ?? [];
  const { goTo } = useAppNavigate();
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Payable / Purchase Invoice
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
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            {" "}
            <Icon icon="mage:filter" className="text-lg" />
            Filters
          </button>{" "}
          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            {" "}
            <Icon icon="ion:refresh-outline" className="text-lg" />
            Reset
          </button>
          <button
            onClick={() =>
              goTo("/purchase-module/payable/vendor-bills/create-vendor-bill")
            }
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
          >
            {" "}
            <Icon icon="streamline-flex:story-post" className="text-lg" />
            Create
          </button>
        </div>
      </div>
      <div className="mt-2">
        <CustomTable
          loading={isLoading}
          height="60vh"
          headers={[
            "Edit",
            "View",
            "Report",
            "Transaction Date",
            "Purchase Number",
            "Vendor",
            "Tax Amount",
            "Amount",
          ]}
          data={(allInvoices ?? []).map((item: any) => [
            <Icon
              icon="basil:edit-outline"
              className="text-lg cursor-pointer text-primary"
              onClick={() =>
                goTo("/purchase-module/payable/vendor-bills/create-vendor-bill")
              }
            />,

            <Icon
              icon="hugeicons:view"
              className="text-lg cursor-pointer text-primary"
            />,

            <Icon
              icon="ion:print-outline"
              className="text-lg cursor-pointer text-primary"
            />,

            dayjs(item?.transactionDate || item?.date).format("YYYY-MMM-DD"),

            item?.poNumber || "-",

            item?.vendorName || "-",

            item?.taxAmount ?? 0,

            item?.totalAmount ?? 0,
          ])}
        />
      </div>
    </div>
  );
}
