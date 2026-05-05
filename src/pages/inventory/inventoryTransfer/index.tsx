import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import { useAppNavigate } from "../../../hooks/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteInventoryTransfer,
  getAllInventoryTransfers,
} from "../../../api/inventoryServices";
import dayjs from "dayjs";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../../components/toast";
import { SyncLoader } from "react-spinners";

export default function InventoryTransfer() {
  const { goTo } = useAppNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [confirm, setConfirm] = useState(false);

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
  console.log("🚀 ~ allInventoryTransfer:", allInventoryTransfer);
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

  const handlePrint = (item: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsHtml = (item.items || [])
      .map((i: any) => {
        return `
        <tr>
          <td>${i.itemCode || i.item?.itemCode || "-"}</td>
          <td>${i.itemName || i.item?.itemName || "-"}</td>
          <td>${i.uom || i.item?.uom || "-"}</td>
          <td>${i.quantity || "-"}</td>
          <td>${i.quantityAdjusted || "-"}</td>
        </tr>
      `;
      })
      .join("");

    printWindow.document.write(`
    <html>
      <head>
        <title>Inventory Transfer</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }

          h2 {
            text-align: center;
          }

          .row {
            margin: 6px 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }

          th {
            background: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Inventory Transfer</h2>

        <div class="row"><b>Transaction Number:</b> ${item.transactionNumber || "-"}</div>
        <div class="row"><b>Date:</b> ${
          item.transactionDate
            ? dayjs(item.transactionDate).format("DD MMM YYYY")
            : "-"
        }</div>
        <div class="row"><b>Created From:</b> ${item.createdFrom || "-"}</div>
        <div class="row"><b>Transfer To:</b> ${item.transferTo || "-"}</div>
        <div class="row"><b>Transaction Name:</b> ${item.transactionName || "-"}</div>
        <div class="row"><b>Status:</b> ${item.status || "-"}</div>
        <div class="row"><b>Notes:</b> ${item.notes || "-"}</div>

        <table>
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>UOM</th>
              <th>Quantity</th>
              <th>Adjusted</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml || `<tr><td colspan="5" style="text-align:center;">No Items</td></tr>`}
          </tbody>
        </table>

        <script>
          window.print();
          window.onafterprint = () => window.close();
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };
  const isDeleting = deleteMutation.isPending;

  return (
    <>
      <div className="mt-8">
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
                  onClick={() => handlePrint(item)}
                />,

                <Icon
                  icon="ion:print-outline"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() => handlePrint(item)}
                />,

                item?.transactionNumber || "-",

                item.transactionDate
                  ? dayjs(item.transactionDate).format("DD MMM YYYY")
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
                Delete Inventory Transfer
              </p>
              <p className="text-center text-heading1 ">
                Are you sure to delete the Inventory Transfer?
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
