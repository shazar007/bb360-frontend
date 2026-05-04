import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import { useAppNavigate } from "../../../hooks/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteInventoryAdjustment,
  getAllInventoryAdjustments,
} from "../../../api/inventoryServices";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../../components/toast";

export default function InventoryAdjustment() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const { goTo } = useAppNavigate();
  const { data, refetch } = useQuery({
    queryKey: ["getAllInventoryAdjustments"],
    queryFn: getAllInventoryAdjustments,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(".menu-container")) return;

      setOpenMenuId(null);
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  const allInventoryAdjustments = data?.data?.adjustments || [];
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteInventoryAdjustment,

    onSuccess: () => {
      notifySuccess("Deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["getAllInventoryAdjustments"],
      });
    },

    onError: () => {
      notifyError("Delete failed");
    },
  });
  const handleDelete = () => {
    if (!deleteItem) return;

    deleteMutation.mutate(deleteItem._id);

    setConfirm(false);
    setDeleteItem(null);
    refetch();
  };
  const handlePrint = (item: any) => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Print Inventory Adjustment</title>
        <style>
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
        <h2>Inventory Adjustment</h2>

        <div class="row"><b>Transaction Number:</b> ${item.transactionNumber || "-"}</div>
        <div class="row"><b>Date:</b> ${item.transactionDate || "-"}</div>
        <div class="row"><b>Created From:</b> ${item.createdFrom || "-"}</div>
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
        
            ${(item.items || [])
              .map(
                (i: any) => `
                <tr>
                  <td>${i.itemCode || "-"}</td>
                  <td>${i.itemName || "-"}</td>
                  <td>${i.uom || "-"}</td>
                  <td>${i.quantity || "-"}</td>
                  <td>${i.quantityAdjusted || "-"}</td>
                </tr>
              `,
              )
              .join("")}
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
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Inventory Adjustment
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo("/inventory/inventory-adjustment/create");
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary rounded-md text-white cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Upload
            </button>

            <button
              onClick={() => {
                goTo("/inventory/inventory-adjustment/create");
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-3">
            <CustomTable
              height="700px"
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
              data={allInventoryAdjustments.map((item: any, index: number) => [
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
                ,
                <Icon
                  icon="hugeicons:view"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() => handlePrint(item)}
                />,

                <Icon
                  icon="ion:print-outline"
                  onClick={() => handlePrint(item)}
                  className="text-lg cursor-pointer text-primary"
                />,

                item.transactionNumber || "-",
                item.transactionDate
                  ? dayjs(item.transactionDate).format("DD MMM YYYY")
                  : "-",
                item.createdFrom || "-",
                item.transactionName || "-",
                item.status || "-",
              ])}
            />
          </div>
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
                Delete Inventory Adjustment
              </p>
              <p className="text-center text-heading1 ">
                Are you sure to delete the Inventory Adjustment?
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
                className="h-10 w-25 cursor-pointer rounded-md text-white bg-[#FF0000]"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
