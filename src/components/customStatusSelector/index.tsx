import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { updateStatusLeave } from "../../api/hrServices";
import { Icon } from "@iconify/react";

const statuses = ["Approved", "Rejected", "Cancelled"];

const statusStyle: any = {
  Pending: "bg-yellow-100 text-yellow-600 border-yellow-400",
  Approved: "bg-green-100 text-green-600 border-green-500",
  Rejected: "bg-red-100 text-red-600 border-red-500",
  Cancelled: "bg-blue-100 text-blue-600 border-blue-500",
};

export default function StatusSelector({ id, defaultValue, refetch }: any) {
  const [selectedStatus, setSelectedStatus] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const isDisabled = statuses.includes(selectedStatus);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleSelect = (value: string) => {
    setPendingStatus(value);
    setOpen(false);
    setConfirmOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!pendingStatus) return;

    try {
      setLoading(true);

      await updateStatusLeave(id, { status: pendingStatus });

      setSelectedStatus(pendingStatus);
      setConfirmOpen(false);
      setPendingStatus(null);

      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative inline-block w-40 ">
        <button
          onClick={() => {
            if (isDisabled) return;
            toggleDropdown();
          }}
          disabled={isDisabled}
          className={`w-full px-3 py-1.5 border rounded-md text-sm flex justify-between items-center ${
            statusStyle[selectedStatus] || "bg-white"
          } ${isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {selectedStatus}
          <Icon icon="mdi:chevron-down" className="text-xl" />
        </button>

        {open && (
          <div className="absolute left-0 z-20 w-full py-2 mt-1 bg-white rounded-md shadow-lg">
            {statuses.map((item) => (
              <div
                key={item}
                onClick={() => handleSelect(item)}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p
                onClick={() => setConfirmOpen(false)}
                className="cursor-pointer"
              >
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-80">
              <p className="text-2xl font-semibold text-center">
                Confirm Status Update
              </p>

              <p className="mt-2 text-center text-heading1 ">
                Change status to <b>{pendingStatus}</b>?
              </p>
            </div>
            <div className="flex gap-3 p-4 mt-4">
              <button
                onClick={() => setConfirmOpen(false)}
                className="w-full h-10 bg-gray-200 rounded-md cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmUpdate}
                disabled={loading}
                className="flex items-center justify-center w-full h-10 text-white rounded-md cursor-pointer bg-primary"
              >
                {loading ? <SyncLoader color="#fff" size={6} /> : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
