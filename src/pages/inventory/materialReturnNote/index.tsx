import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import { useAppNavigate } from "../../../hooks/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteMaterialReturnNote,
  getAllMaterialReturnNotes,
} from "../../../api/inventoryServices";
import { notifyError, notifySuccess } from "../../../components/toast";
import { useState } from "react";
import dayjs from "dayjs";
import { SyncLoader } from "react-spinners";

export default function MaterialReturnNote() {
  const { goTo } = useAppNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [confirm, setConfirm] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["getAllMaterialReturnNotes"],
    queryFn: getAllMaterialReturnNotes,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const allMaterialReturnNotes = data?.data?.notes || [];
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteMaterialReturnNote,

    onSuccess: () => {
      notifySuccess("Deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["getAllMaterialReturnNotes"],
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

  const handlePrint = (item: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const itemsHtml = (item.items || [])
      .map(
        (i: any) => `
        <tr>
          <td>${i.itemCode || i.item?.itemCode || "-"}</td>
          <td>${i.itemName || i.item?.itemName || "-"}</td>
          <td>${i.uom || i.item?.uom || "-"}</td>
          <td>${i.receivedQuantity || "-"}</td>
          <td>${i.amount || "-"}</td>
        </tr>
      `,
      )
      .join("");

    printWindow.document.write(`
    <html>
      <head>
        <title>Material Return Note - ${item.transactionNumber || ""}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma; padding: 30px; color: #333; }
          h2 { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }

          .info-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 20px;
          }

          .row { margin: 4px 0; font-size: 14px; }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }

          th {
            background: #f8f9fa;
            font-size: 12px;
            text-transform: uppercase;
          }

          tr:nth-child(even) { background-color: #fafafa; }

          @media print {
            body { padding: 0; }
          }
        </style>
      </head>

      <body>
        <h2>Material Return Note</h2>

        <div class="info-section">
          <div>
            <div class="row"><b>Transaction No:</b> ${item.transactionNumber || "-"}</div>
            <div class="row"><b>Date:</b> ${item.transactionDate ? dayjs(item.transactionDate).format("DD-MMM-YYYY") : "-"}</div>
            <div class="row"><b>Status:</b> ${item.status || "-"}</div>
          </div>

          <div>
            <div class="row"><b>Created From:</b> ${item.createdFrom || "-"}</div>
            <div class="row"><b>Received From:</b> ${item.receivedFrom || "-"}</div>
            <div class="row"><b>Transaction Name:</b> ${item.transactionName || "-"}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>UOM</th>
              <th>Qty Received</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${
              itemsHtml ||
              `<tr><td colspan="5" style="text-align:center;">No Items Found</td></tr>`
            }
          </tbody>
        </table>

        ${
          item.notes
            ? `<div style="margin-top:20px;"><b>Notes:</b> ${item.notes}</div>`
            : ""
        }

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() { window.close(); };
          };
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between gap-2 md:gap-0">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Material Return Note
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
                goTo("/manufacturing-module/material-return-note/create");
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
            height="auto"
            loading={isLoading}
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
              allMaterialReturnNotes?.map((item: any, index: number) => [
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
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </div>,

                <Icon
                  icon="hugeicons:view"
                  onClick={() => handlePrint(item)}
                  className="text-lg cursor-pointer text-primary"
                />,
                <Icon
                  icon="ion:print-outline"
                  onClick={() => handlePrint(item)}
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
                Delete Material Return Note
              </p>
              <p className="text-center text-heading1 ">
                Are you sure to delete the Material Return Note?
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
