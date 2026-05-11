import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useState } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomCheckbox from "../../../../components/customCheckbox";
import { useQuery } from "@tanstack/react-query";
import { getAllSalesReturns } from "../../../../api/saleRetrun";
import dayjs from "dayjs";

export default function SalesReturn() {
  const { goTo } = useAppNavigate();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { data: saleRetrun, isLoading } = useQuery({
    queryKey: ["getAllSalesReturns"],
    queryFn: getAllSalesReturns,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const allSalesReturns = saleRetrun?.data?.data || [];

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id),
    );
  };
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Sales Return
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full md:w-60">
            <input
              placeholder="Search Distributors..."
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
          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            <Icon icon="ion:refresh-outline" className="text-lg" />
            Reset
          </button>
          <button
            onClick={() => {
              goTo("/sale-module/sales/sales-return/create");
            }}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
          >
            <Icon icon="basil:add-outline" className="text-lg" />
            Create
          </button>
        </div>
      </div>
      <div className="pb-4 mt-2 bg-white rounded-2xl">
        <div className="flex justify-between items-center px-4.5 py-2">
          <p className="text-xs font-semibold text-primary">Sales_List</p>
        </div>
        <CustomTable
          norounded
          loading={isLoading}
          height="60vh"
          headers={[
            "Edit",
            "Select",
            "Retrun Number",
            "Date",
            "Distributor Code",
            "Distributor Name",
            "Item Description",
            "Quantity (Pcs)",
            "Amount",
          ]}
          data={allSalesReturns.map((saleReturn: any) => {
            return [
              <Icon
                icon="qlementine-icons:menu-burger-16"
                className="text-lg cursor-pointer text-primary"
              />,
              <CustomCheckbox
                checked={selectedRows.includes(saleReturn._id)}
                onChange={(checked: boolean) =>
                  toggleSelect(saleReturn._id, checked)
                }
              />,
              saleReturn.returnNumber,
              dayjs(saleReturn.returnDate).isValid()
                ? dayjs(saleReturn.returnDate).format("DD-MMM-YYYY")
                : "-",
              saleReturn.distributorCode,
              saleReturn.distributorName,
              saleReturn.description,
              saleReturn?.items?.reduce(
                (sum: number, item: any) => sum + Number(item?.returnQty || 0),
                0,
              ),
              saleReturn?.returnTotal || 0,
            ];
          })}
        />
      </div>
    </div>
  );
}
