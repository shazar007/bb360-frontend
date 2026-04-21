import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import CustomTable from "../../../../components/customTable";
import ItemModel from "../components/ItemModel";
import { useQuery } from "@tanstack/react-query";
import {
  deleteItem,
  updateItem,
  getAllItems,
} from "../../../../api/itemServices";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";

export default function ItemUpdate() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { data: AllItems, refetch,isLoading} = useQuery({
    queryKey: ["getAllItems"],
    queryFn: getAllItems,

    placeholderData: (prev) => prev,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const items = AllItems?.data?.items || [];

  const handleEdit = (index: number) => {
    setSelectedIndex(index);
    setIsEdit(true);
    setOpenMenuIndex(null);
  };
  const handleDeleteClick = (item: any) => {
    setSelectedId(item._id);
    setConfirm(true);
    setOpenMenuIndex(null);
  };
  console.log("DELETING ID:", selectedId);
  const handleDelete = () => {
    if (!selectedId) {
      console.log("NO ID FOUND ❌");
      return;
    }

    setDeleteLoading(true);

    console.log("DELETING ID:", selectedId);

    deleteItem(selectedId)
      .then(() => {
        notifySuccess("Item deleted successfully ✅");
        refetch();
      })
      .catch((err) => {
        console.log("DELETE ERROR:", err.response?.data);
        notifyError("Failed to delete item ❌");
      })
      .finally(() => {
        setDeleteLoading(false);
        setConfirm(false);
        setSelectedId(null);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Data Upload / Items Update
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
              className="flex items-center justify-center w-full h-10 gap-2 text-sm bg-white rounded-md cursor-pointer md:w-27 text-heading1"
            >
              Action
              <Icon icon="weui:arrow-filled" className="text-lg rotate-90" />
            </button>
          </div>
        </div>

        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-3">
            <p className="text-xs font-semibold text-primary">Items_List</p>
          </div>

          <CustomTable
            norounded
            loading={isLoading}
            height="60vh"
            headers={[
              "Edit",
              "Expand",
              "Product Code",
              "Product Name",
              "Item Category",
              "Units of Measure (UOM)",
              "Batch Number",
              "Expiry Date",
              "T.P",
              "M.R.P",
              "Status",
            ]}
            data={items.map((item: any, index: number) => [
              <div className="relative">
                <Icon
                  icon="qlementine-icons:menu-burger-16"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() =>
                    setOpenMenuIndex(openMenuIndex === index ? null : index)
                  }
                />

                {openMenuIndex === index && (
                  <div className="absolute z-10 w-32 py-2 bg-white rounded-md shadow-md -right-25 top-6">
                    <button
                      className="w-full px-2 py-1 text-left cursor-pointer hover:bg-gray-100"
                      onClick={() => handleEdit(index)}
                    >
                      Edit Product
                    </button>

                    <button
                      className="w-full px-2 py-1 text-left text-red-600 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleDeleteClick(item);
                        setConfirm(true);
                      }}
                    >
                      Delete Product
                    </button>
                  </div>
                )}
              </div>,

              <Icon
                icon="f7:chevron-right-square"
                className="text-lg cursor-pointer text-primary"
              />,

              item.itemCode,
              item.itemName,
              item.itemCategory,
              item.uom,
              item.batchNumber,
              item.expiryDate,
              item.tradePrice,
              item.mrp,

              <div className="bg-[#228422]/12 w-max px-2 py-0.5 rounded-sm text-[#228422]">
                Good
              </div>,
            ])}
          />
        </div>
      </div>

      {isEdit && selectedIndex !== null && (
        <ItemModel
          close={() => setIsEdit(false)}
          saveLoading={saveLoading}
          data={items[selectedIndex]}
          onSave={(values: any) => {
            const item = items[selectedIndex];

            if (!item?._id) {
              notifyError("Invalid Item ID ❌");
              return;
            }

            const { batchNumber, expiryDate, ...safeValues } = values;

            setSaveLoading(true);

            updateItem(item._id, safeValues)
              .then(() => {
                notifySuccess("Item updated successfully ✅");
                refetch();
              })
              .catch((err) => {
                notifyError(err.response?.data?.message || "Update failed ❌");
              })
              .finally(() => {
                setSaveLoading(false);
                setIsEdit(false);
              });
          }}
        />
      )}

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
                Delete Product
              </p>
              <p className="text-center text-heading1 ">
                Are you sure to delete the product?
              </p>
            </div>

            <div className="flex justify-between gap-2 p-4 mt-3">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => {
                  setConfirm(false);
                }}
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
                {deleteLoading ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  "   Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
