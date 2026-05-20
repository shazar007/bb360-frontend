import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import { useAppNavigate } from "../../../hooks/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteInventoryTransfer,
  getAllInventoryTransfers,
} from "../../../api/inventoryServices";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { notifyError, notifySuccess } from "../../../components/toast";
import { SyncLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import { PrintByAll } from "../inventoryAdjustment/printByAll";
import { PrintByItem } from "../inventoryAdjustment/printByItem";

export default function InventoryTransfer() {
  const { goTo } = useAppNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [confirm, setConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const printAllRef = useRef(null);
  const printItemRef = useRef(null);
  const { data, isLoading } = useQuery({
    queryKey: ["getAllInventoryTransfers"],
    queryFn: getAllInventoryTransfers,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const allInventoryTransfer = data?.data?.transfers || [];
  console.log(
    "🚀 ~ InventoryTransfer ~ allInventoryTransfer:",
    allInventoryTransfer,
  );
  const handlePrintAll = useReactToPrint({
    contentRef: printAllRef,
    documentTitle: "Inventory Transfer",
  });
  const handlePrintItem = (item: any) => {
    setSelectedItem(item);

    setTimeout(() => {
      printFn();
    }, 200);
  };

  const printFn = useReactToPrint({
    contentRef: printItemRef,
    documentTitle: "Inventory Transfer",
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteInventoryTransfer,

    onSuccess: () => {
      notifySuccess("Deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["getAllInventoryTransfers"],
        exact: false,
      });

      setConfirm(false);
      setDeleteItem(null);
    },

    onError: () => {
      notifyError("Delete failed");
    },
  });

  const handleDelete = () => {
    if (!deleteItem) return;
    deleteMutation.mutate(deleteItem._id);
  };

  const isDeleting = deleteMutation.isPending;

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Inventory Transfer
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
              onClick={handlePrintAll}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Print
            </button>
            <button
              onClick={() => {
                goTo("/inventory/inventory-transfer/create");
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              <Icon icon="basil:add-outline" className="text-lg" />
              Create
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <PrintByAll
            ref={printAllRef}
            data={allInventoryTransfer}
            title="Inventory Transfer"
            columns={[
              {
                label: "Transaction Number",
                key: "transactionNumber",
              },
              {
                label: "Item Name",
                render: (row: any) =>
                  row?.items?.map((i: any) => i?.item?.itemName).join(", ") ||
                  "-",
              },

              {
                label: "Transaction Date",
                render: (row: any) =>
                  dayjs(row.transactionDate).format("DD-MMM-YYYY"),
              },
              {
                label: "Created From",
                key: "createdFrom",
              },
              {
                label: "Transaction Name",
                key: "transactionName",
              },
              {
                label: "Status",
                key: "status",
              },
            ]}
          />
        </div>
        <div style={{ display: "none" }}>
          <PrintByItem
            ref={printItemRef}
            data={selectedItem}
            title="Inventory Transfer"
             sections={[
              {
                title: "Basic Info",
                type: "info",

                fields: [
                  {
                    label: "Transaction Number",
                    key: "transactionNumber",
                  },

                  {
                    label: "Date",
                    render: (item: any) =>
                      item?.transactionDate
                        ? new Date(item.transactionDate).toLocaleDateString()
                        : "-",
                  },

                  {
                    label: "Created From",
                    key: "createdFrom",
                  },

                  {
                    label: "Transaction Name",
                    key: "transactionName",
                  },
                   {
                    label: "Transfer To",
                    key: "transferTo",
                  },

                  {
                    label: "Status",
                    key: "status",
                  },

                  {
                    label: "Notes",
                    key: "notes",
                  },

                  {
                    label: "Created By",
                    render: (item: any) => item?.createdBy?.name || "-",
                  },
                ],
              },

              // ITEMS TABLE
              {
                title: "Items",
                type: "table",

                columns: [
                  {
                    label: "Item Code",
                    render: (row: any) => row?.item?.itemCode || "-",
                  },

                  {
                    label: "Item Name",
                    render: (row: any) => row?.item?.itemName || "-",
                  },

                  {
                    label: "UOM",
                    render: (row: any) => row?.item?.uom || "-",
                  },

                ],

                data: (item: any) => item?.items || [],
              },

              // BATCHES TABLE
              {
                title: "Batches",
                type: "table",

                columns: [
                  {
                    label: "Batch Number",
                    key: "batchNumber",
                  },

                  {
                    label: "Balance",
                    key: "balance",
                  },

                  {
                    label: "Transfer Quantity",
                    key: "transferQuantity",
                  },
                ],

                data: (item: any) =>
                  (item?.items || []).flatMap((i: any) => i?.batches || []),
              },
            ]}
          />
        </div>

        <div className="mt-3">
          <CustomTable
            loading={isLoading}
            height="60vh"
            headers={[
              "Edit",
              "View",
              "Report",
              "Transaction Number",
              "Transaction Date",
              "Created From",
              "Transaction Name",
              "Status",
            ]}
            data={
              allInventoryTransfer?.map((item: any, index: number) => [
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
                          setOpenMenuId(null);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </div>,

                <Icon
                  icon="hugeicons:view"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() => handlePrintItem(item)}
                />,

                <Icon
                  icon="ion:print-outline"
                  onClick={() => handlePrintItem(item)}
                  className="text-lg cursor-pointer text-primary"
                />,

                item?.transactionNumber || "-",

                item.transactionDate
                  ? dayjs(item.transactionDate).format("DD-MMM-YYYY")
                  : "-",
                item?.createdFrom || "-",
                item?.transactionName || "-",
                item?.status || "-",
              ]) || []
            }
          />
        </div>
      </div>
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p onClick={() => setConfirm(false)} className="cursor-pointer">
                {" "}
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-60">
              <p className="text-2xl font-semibold text-center">
                Delete Inventory Transfer
              </p>
              <p className="text-center text-heading1 ">
                Are you sure to delete the Inventory Transfer?
              </p>
            </div>

            <div className="flex justify-between gap-2 p-4 pt-0">
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
                onClick={handleDelete}
                disabled={isDeleting}
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
