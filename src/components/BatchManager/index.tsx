import { useState } from "react";
import CustomCheckbox from "../customCheckbox";
import CustomInput from "../customInput";
import CustomDatePicker from "../datePicker";
import { getAllVendors } from "../../api/vendorServices";
import { useQuery } from "@tanstack/react-query";
import CustomSelectSearch from "../customSelectSearch";

interface Batch {
  batchNumber: string;
  expiryDate: string;
  balance: number;
  receivingDate: string;
  partyCategory: string;
}

interface Props {
  value: Batch[];
  onChange: (batches: Batch[]) => void;
  shouldShow: boolean;
}

export default function BatchManager({ value, onChange, shouldShow }: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<Batch>({
    batchNumber: "",
    expiryDate: "",
    balance: 0,
    receivingDate: "",
    partyCategory: "",
  });

  if (!shouldShow) return null;

  const {
    data: AllVendors,

    isLoading,
  } = useQuery({
    queryKey: ["getAllVendors"],
    queryFn: getAllVendors,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const tableData = AllVendors?.data?.vendors || [];

  const VendorOptions = tableData.map((emp: any) => ({
    label: emp.vendorName,
    value: emp._id,
  }));
  return (
    <>
      <div className="md:col-span-2 bg-[#ECF0F4] h-10  p-2 rounded-md">
        {/* Header */}
        <div className="flex justify-between  items-center mb-2">
          <p className="font-medium text-sm">Batches</p>

          <button
            type="button"
            className="text-xs bg-primary cursor-pointer text-white px-2 py-1 rounded"
            onClick={() => setOpen(true)}
          >
            + Add Batch
          </button>
        </div>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full mx-3  max-w-150 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xs font-semibold text-heading1">
                  Add Batch
                </h2>

                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2 p-4">
                <CustomInput
                  label="Batch Number"
                  placeholder="Batch Number"
                  value={form.batchNumber}
                  onChange={(e) =>
                    setForm({ ...form, batchNumber: e.target.value })
                  }
                />

                <CustomDatePicker
                  label="Expiry Date"
                  value={form.expiryDate}
                  onChange={(value) => setForm({ ...form, expiryDate: value })}
                />

                <CustomInput
                  label="Balance"
                  placeholder="Balance"
                  value={form.balance}
                  onChange={(e) =>
                    setForm({ ...form, balance: Number(e.target.value) })
                  }
                />

                <CustomDatePicker
                  label="Receiving Date"
                  value={form.receivingDate}
                  onChange={(value) =>
                    setForm({ ...form, receivingDate: value })
                  }
                />

                <CustomSelectSearch
                  loading={isLoading}
                  label="Party Category"
                  options={VendorOptions}
                  value={form.partyCategory}
                  onChange={(value: any) =>
                    setForm({ ...form, partyCategory: value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 ">
                <button
                  className="m-4 md:w-28 cursor-pointer w-full bg-primary text-white py-2 rounded text-sm"
                  onClick={() => {
                    onChange([...value, form]);

                    setForm({
                      batchNumber: "",
                      expiryDate: "",
                      balance: 0,
                      receivingDate: "",
                      partyCategory: "",
                    });

                    setOpen(false);
                  }}
                >
                  Add Batch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-4">
        {value?.map((b, i) => (
          <div
            key={i}
            className="flex justify-between border border-black/40 items-center p-2 rounded"
          >
            <div className="text-xs">
              <p>
                Batch No.: <strong>{b.batchNumber}</strong>
              </p>
              <p>
                Blance: <strong>{b.balance}</strong>
              </p>
              <p>
                Expiry Date <strong>{b.expiryDate}</strong>
              </p>
              <p>
                Receiving Date: <strong>{b.receivingDate}</strong>
              </p>
            </div>

            <button
              className="text-red-500 text-xs"
              onClick={() => {
                const updated = value.filter((_, idx) => idx !== i);
                onChange(updated);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
