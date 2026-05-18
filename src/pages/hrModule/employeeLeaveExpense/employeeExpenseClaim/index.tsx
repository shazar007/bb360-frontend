import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { useQuery } from "@tanstack/react-query";

export default function EmployeeExpenseClaim() {
  const { goTo } = useAppNavigate();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: ["employeeExpenseClaim"],
  //   queryFn: getEmployeeExpenseClaim,
  // });
  const [formData, setFormData] = useState({
    transactionDate: "",
    transactionNumber: "",
    locationName: "",
    createdFrom: "",
    grossAmount: "",
    documentStatus: "",
    approvedBy: "",
    approvedDate: "",
    itemRate: "",
    byproductAmount: "",
    isWhatIssue: "",
    gatePassReturnable: "",
  });
  const handleEdit = (index: number) => {
    const row = rows[index];

    setFormData(row);
    setEditIndex(index);
    setOpenModal(true);
  };
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        id: rows[editIndex!].id,
      };

      // await updateEmployeeExpenseClaim(payload); // your API

      const updatedRows = [...rows];
      updatedRows[editIndex!] = formData;

      setRows(updatedRows);

      setOpenModal(false);
      setEditIndex(null);

      notifySuccess("Updated Successfully");
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Employee Expense Claim
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
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
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo("/hr-module/employee-leave-expense/expense-claim/create");
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
              loading={false}
              height="60vh"
              headers={[
                "Edit",
                "Transaction Date",
                "Transaction Number",
                "Location Name",
                "Created From",
                "Gross Amount",
                "Documents Status ",
                "Approved By",
                "Approved Date",
                "Item Rate",
                "Byproduct Amount",
                "Is What Issue",
                "Gate Pass Returnable ",
              ]}
              data={rows.map((row: any, index: number) => [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() => handleEdit(index)}
                />,

                row.transactionDate,
                row.transactionNumber,
                row.locationName,
                row.createdFrom,
                row.grossAmount,
                row.documentStatus,
                row.approvedBy,
                row.approvedDate,
                row.itemRate,
                row.byproductAmount,
                row.isWhatIssue,
                row.gatePassReturnable,
              ])}
            />
          </div>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl p-5 bg-white rounded-xl">
            <h2 className="mb-4 text-lg font-semibold">
              {editIndex !== null
                ? "Update Expense Claim"
                : "Create Expense Claim"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                value={formData.transactionNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    transactionNumber: e.target.value,
                  })
                }
                placeholder="Transaction Number"
                className="p-2 border rounded"
              />

              <input
                value={formData.locationName}
                onChange={(e) =>
                  setFormData({ ...formData, locationName: e.target.value })
                }
                placeholder="Location"
                className="p-2 border rounded"
              />

              <input
                value={formData.grossAmount}
                onChange={(e) =>
                  setFormData({ ...formData, grossAmount: e.target.value })
                }
                placeholder="Gross Amount"
                className="p-2 border rounded"
              />

              <input
                value={formData.documentStatus}
                onChange={(e) =>
                  setFormData({ ...formData, documentStatus: e.target.value })
                }
                placeholder="Status"
                className="p-2 border rounded"
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (editIndex !== null) {
                    const updated = [...rows];
                    updated[editIndex] = formData;
                    setRows(updated);
                  } else {
                    setRows([...rows, formData]);
                  }

                  setOpenModal(false);
                }}
                className="px-4 py-2 text-white rounded bg-primary"
              >
                {loading ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
