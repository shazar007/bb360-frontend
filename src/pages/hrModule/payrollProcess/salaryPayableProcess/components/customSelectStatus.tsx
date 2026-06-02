import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import { notifyError, notifySuccess } from "../../../../../components/toast";
import { approvePayrollRun } from "../../../../../api/hrServices";

interface Props {
  id: string;
  defaultValue: string;
  refetch?: () => void;
}

export default function CustomSelectStatus({
  id,
  defaultValue,
  refetch,
}: Props) {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState(defaultValue);

  useEffect(() => {
    setStatus(defaultValue);
  }, [defaultValue]);
  const { mutate, isPending } = useMutation({
    mutationFn: () => approvePayrollRun(id),
    onSuccess: () => {
      notifySuccess("Status updated to Approved");
      setStatus("Approved");
      setShowConfirm(false);
      setOpen(false);
      refetch?.();
    },
    onError: (err: any) => {
      notifyError(
        err?.response?.data?.message || err?.message || "Failed to update",
      );
    },
  });

  const handleSelect = (value: string) => {
    if (value === "Approved") {
      setShowConfirm(true);
    } else {
      setStatus(value);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="relative inline-block w-40 ">
        <div
          onClick={() => {
            if (status === "APPROVED") return;
            setOpen(!open);
          }}
          className={`px-3 py-2 text-xs flex justify-between border rounded-md  items-center gap-2 transition ${
            status === "APPROVED"
              ? "bg-green-100 text-green-600 border-green-500 cursor-not-allowed"
              : status === "PAYABLE_POSTED"
                ? "bg-yellow-100 text-yellow-600 border-yellow-500 cursor-not-allowed"
                : status === "CALCULATED"
                  ? "bg-blue-100 text-blue-600 border-blue-500 cursor-pointer"
                  : "bg-gray-100 text-gray-600 border-gray-300 cursor-pointer"
          }`}
        >
          <span className="text-xs">{status}</span>

          <Icon icon="mdi:chevron-down" className="text-xl" />
        </div>

        {open && !["APPROVED", "PAYABLE_POSTED"].includes(status) && (
          <div className="absolute z-50 mt-1 w-40 bg-white rounded shadow">
            {["Approved"].map((item) => (
              <div
                key={item}
                onClick={() => handleSelect(item)}
                className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-100"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p
                onClick={() => setShowConfirm(false)}
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
                Are you sure you want to <b>approve?</b>?
              </p>
            </div>
            <div className="flex justify-end gap-3 p-4 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="w-20 h-10 bg-gray-200 rounded-md cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => mutate()}
                disabled={isPending}
                className="flex items-center justify-center w-28 h-10 text-white rounded-md cursor-pointer bg-primary"
              >
                {isPending ? (
                  <SyncLoader color="#fff" size={6} />
                ) : (
                  "Yes, Approve"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
