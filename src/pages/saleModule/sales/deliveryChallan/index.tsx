import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { GetSalesInvoiceApi } from "../../../../api/sale";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function DeliveryChallan() {
  const { goTo } = useAppNavigate();
  const navigate = useNavigate();
  const {
    data: SaleInvoices,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getAllSalesInvoice"],
    queryFn: GetSalesInvoiceApi,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const saleInvoicesData: any = SaleInvoices?.data || [];

  const goWithState = (path: any, state = {}) => {
    navigate(path, { state });
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Delivery Challan
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
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
            <Icon icon="mage:filter" className="text-lg" />
            Filters
          </button>
        </div>
      </div>

      <div className="mt-2 bg-white rounded-2xl pb-4">
        <CustomTable
          norounded
          loading={isLoading}
          height="60vh"
          headers={[
            "Edit",
            "View",
            "Report",
            "Invoice Number",
            "Create Date",
            // "Dispatch Date",
            "Distributor Name",
            "Contact Number",
            "Delivery Address",
            "Quantity (Pcs)",
          ]}
          data={saleInvoicesData?.map((item: any) => [
            <Icon
              icon="basil:edit-outline"
              className="text-primary text-lg cursor-pointer"
              onClick={() =>
                goWithState("/sale-module/sales/delivery-challan/create", {
                  item,
                })
              }
            />,
            <Icon
              icon="hugeicons:view"
              className="text-primary text-lg cursor-pointer"
            />,
            <Icon
              icon="ion:print-outline"
              className="text-primary text-lg cursor-pointer"
            />,
            item?.invoiceNumber,
            item?.createdAt,
            // item?.dispatchDate,
            item?.distributorName,
            item?.contactNumber,
            item?.address,
            item?.items?.reduce(
              (sum: number, ite: any) => sum + Number(ite?.orderedQty || 0),
              0,
            ),
          ])}
        />
      </div>
    </div>
  );
}
