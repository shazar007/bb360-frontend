import { Icon } from "@iconify/react";
import Filters from "../../../../components/filter";
import CustomTable from "../../../../components/customTable";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { useReactToPrint } from "react-to-print";
import { useAppNavigate } from "../../../../hooks/navigation";
import {
  getAllOrders,
  updatePurchaseOrder,
} from "../../../../api/purchaseOrder";
import { useQuery } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomInput from "../../../../components/customInput";
import { InvoiceTemplate } from "../../../../components/temp-Invoice";

export default function PurchaseOrder() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const printRef = useRef(null);

  const [form, setForm] = useState({
    poNumber: "",
    date: "",
    partyAccount: "",
    partyCategory: "",
    deliveryAddress: "",
    type: "",
  });
  const {
    data: AllOrders,

    isLoading,
  } = useQuery({
    queryKey: ["getAllOrder"],
    queryFn: getAllOrders,

    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const ordersData = AllOrders?.data?.data || [];
  const { goTo, goWithState } = useAppNavigate();
  const handleCreate = () => {
    goTo("/purchase-module/purchase/purchase-order/create-order");
  };
  const handleEdit = (item: any, index: number) => {
    setEditIndex(item._id);
    setOpenModal(true);

    setForm({
      poNumber: item.poNumber || "",
      date: item.date || item.createdAt || "",
      partyAccount: item.partyAccount?._id || "",
      partyCategory: item.partyCategory || "",
      deliveryAddress: item.deliveryAddress || "",
      type: item.type || "",
    });

    setTableData(
      item.items?.map((it: any) => ({
        itemId: it.item,
        itemName: it.itemName,
        itemCode: it.itemCode,
        itemCategory: it.itemCategory,
        uom: it.uom,
        quantity: it.quantity,
        purchaseRate: it.purchaseRate,
        unitPrice: it.unitPrice,
        amount: it.amount,
      })) || [],
    );
  };
  const handleSave = async () => {
    try {
      if (!editIndex) {
        notifyError("Invalid Order ID");
        return;
      }

      const payload = {
        poNumber: form.poNumber,
        date: form.date,
        partyAccount: form.partyAccount,
        partyCategory: form.partyCategory,
        deliveryAddress: form.deliveryAddress,
        type: form.type,
        items: tableData.map((item: any) => ({
          item: item.itemId,
          quantity: Number(item.quantity || 0),
          purchaseRate: Number(item.purchaseRate || 0),
          unitPrice: Number(item.unitPrice || 0),
        })),
      };

      await updatePurchaseOrder(editIndex, payload);

      notifySuccess("Updated Successfully");
      setOpenModal(false);
      setEditIndex(null);
      // refetch();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Update failed");
    }
  };
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
      {" "}
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Purchase / Purchase Order
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
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="ion:refresh-outline" className="text-lg" />
              Reset
            </button>
            <button
              onClick={handleCreate}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              <Icon icon="basil:add-outline" className="text-lg" />
              Create
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <InvoiceTemplate ref={printRef} data={selectedOrder} />
        </div>
        <div className="mt-2">
          <CustomTable
            loading={isLoading}
            height="60vh"
            headers={[
              "Details",
              "View",
              "Report",
              "Purchase Order",
              "Date",
              "Party Account",
              "Party Category",
              "Deliver Address",
              "Type",
            ]}
            data={ordersData.map((item: any, index: number) => [
              <Icon
                icon="basil:edit-outline"
                className="text-lg text-primary cursor-pointer"
                onClick={() =>
                  goWithState(
                    "/purchase-module/purchase/purchase-order/detail",
                    { item },
                  )
                }
              />,
              <div
                key={`view-${index}`}
                onClick={() => triggerPrint(item)}
                className="cursor-pointer flex justify-center"
              >
                <Icon icon="hugeicons:view" className="text-lg text-primary" />
              </div>,

              <div
                key={`print-${index}`}
                className="cursor-pointer flex justify-center"
                onClick={() => triggerPrint(item)}
              >
                <Icon
                  icon="ion:print-outline"
                  className="text-lg text-primary"
                />
              </div>,

              item.poNumber || "-",
              dayjs(item.createdAt).isValid()
                ? dayjs(item.createdAt).format("DD-MMM-YYYY")
                : "-",
              item.partyAccount?.vendorName || "-",
              item.partyCategory || "-",
              item.deliveryAddress || "-",
              item.type || "-",
            ])}
          />
        </div>
      </div>
      <Filters isOpen={open} onClose={() => setOpen(false)} title="Filters" />
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Edit Order
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 p-6 gap-y-4 gap-x-15">
              <CustomInput
                label="PO Number"
                value={form.poNumber}
                onChange={(e) =>
                  setForm((p) => ({ ...p, poNumber: e.target.value }))
                }
                placeholder="Enter PO Number"
              />

              <CustomInput
                label="Party Account"
                value={form.partyAccount}
                placeholder="Party Account Number"
                onChange={(e) =>
                  setForm((p) => ({ ...p, partyAccount: e.target.value }))
                }
              />

              <CustomInput
                value={form.deliveryAddress}
                onChange={(e) =>
                  setForm((p) => ({ ...p, deliveryAddress: e.target.value }))
                }
                label="Delivery Address"
                placeholder="Enter Delivery Address"
              />
            </div>
            <div className="flex justify-end p-4">
              <button
                type="button"
                onClick={handleSave}
                className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
              >
                <Icon icon="mynaui:save" className="text-xl" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
