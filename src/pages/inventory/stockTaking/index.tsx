import { Icon } from "@iconify/react";
import { SyncLoader } from "react-spinners";
import CustomTable from "../../../components/customTable";
import dayjs from "dayjs";
import { useAppNavigate } from "../../../hooks/navigation";
import { useState } from "react";

export default function StockTaking() {
  const { goTo } = useAppNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [confirm, setConfirm] = useState(false);
  const isDeleting = false;
  const allStockTakings = [
    {
      transactionNumber: "STK-0001",
      transactionDate: "2026-05-01",
      fromLocation: "Warehouse A",
      toLocation: "Factory B",
      transactionName: "Stock Transfer April",
      status: "Posted",
    },
    {
      transactionNumber: "STK-0002",
      transactionDate: "2026-05-02",
      fromLocation: "Main Store",
      toLocation: "Warehouse A",
      transactionName: "Internal Adjustment",
      status: "Draft",
    },
    {
      transactionNumber: "STK-0003",
      transactionDate: "2026-05-03",
      fromLocation: "Warehouse B",
      toLocation: "Factory A",
      transactionName: "Raw Material Shift",
      status: "Cancelled",
    },
  ];
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Stock Taking
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

            <button className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27">
              <Icon icon="mage:filter" className="text-lg" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo("/inventory/stock-taking/create");
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              <Icon icon="basil:add-outline" className="text-lg" />
              Create
            </button>
          </div>
        </div>

        <div className="mt-3">
          <CustomTable
            height="60vh"
            // loading={isLoading}
            headers={[
              "Edit",
              "View",
              "Report",
              "Transaction Number",
              "Transaction Date",
              "From Location",
              "To Location",
              "Transaction Name",
              "Status",
            ]}
            data={
              allStockTakings?.map((item: any, index: number) => [
                <div
                  className="relative inline-block menu-container"
                  key={index}
                >
                  <Icon
                    icon="basil:edit-outline"
                    className="text-lg cursor-pointer text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === index ? null : index);
                    }}
                  />

                  {openMenuId === index && (
                    <div className="absolute py-2 mt-2 bg-white rounded-md shadow-lg -right-15 z-999 w-22">
                      <div
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          console.log("Edit", item);
                          setOpenMenuId(null);
                        }}
                      >
                        Edit
                      </div>

                      <div
                        className="px-4 py-2 text-red-500 cursor-pointer hover:bg-red-100"
                        onClick={() => {
                          setDeleteItem(item);
                          setConfirm(true);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </div>,

                <Icon
                  icon="hugeicons:view"
                  // onClick={() => handlePrint(item)}
                  className="text-lg cursor-pointer text-primary"
                />,
                <Icon
                  icon="ion:print-outline"
                  // onClick={() => handlePrint(item)}
                  className="text-lg cursor-pointer text-primary"
                />,
                item?.transactionNumber || "-",

                item.transactionDate
                  ? dayjs(item.transactionDate).format("DD MMM YYYY")
                  : "-",
                item?.fromLocation || "-",
                item?.toLocation || "-",

                item?.transactionName || "-",
                item?.status || "-",
              ]) || []
            }
          />
        </div>
      </div>
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-100 rounded-xl b">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p onClick={() => setConfirm(false)} className="cursor-pointer">
                {" "}
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-60">
              <p className="text-2xl font-semibold text-center">
                Delete Material Return Note
              </p>
              <p className="text-center text-heading1 ">
                Are you sure to delete the Material Return Note?
              </p>
            </div>

            <div className="flex justify-between gap-2 p-4 mt-3">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  boxShadow: "0px 1px 12px 0px #0000001F",
                }}
                className="h-10 w-25 cursor-pointer rounded-md text-white bg-[#FF0000] flex items-center justify-center"
                // onClick={handleDelete}
                // disabled={isDeleting}
              >
                {isDeleting ? (
                  <SyncLoader size={8} color="#ffffff" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
