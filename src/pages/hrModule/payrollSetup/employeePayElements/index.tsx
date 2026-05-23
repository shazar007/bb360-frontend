import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import PolicyRulesBuilder from "../../../../components/policyRulesBuilder";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { useQuery } from "@tanstack/react-query";
import {
  deletePayElement,
  getAllPayElementEntries,
} from "../../../../api/hrServices";
import CustomCheckbox from "../../../../components/customCheckbox";
import { SyncLoader } from "react-spinners";

export default function EmployeePayElements() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openPolicyBuilder, setOpenPolicyBuilder] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  console.log("🚀 ~ selectedId:", selectedId);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { goTo } = useAppNavigate();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getAllPayElementEntries"],
    queryFn: getAllPayElementEntries,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const AllPayElementEntries = data?.data?.data;
  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };
  const handleDelete = async () => {
    try {
      if (!selectedId) {
        notifyError("Please select at least one item first");
        return;
      }

      setDeleteLoading(true);

      await deletePayElement(selectedId);

      notifySuccess("Deleted successfully");

      setSelectedId(null);
      setOpenDeleteModal(false);

      refetch();
    } catch (error) {
      notifyError("Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Employee Pay Elements
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

            {/* <button
              onClick={() => setOpenFilter(!openFilter)}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => setOpenPolicyBuilder(true)}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-3 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Policy Rules Builder
            </button> */}

            <button
              onClick={() => {
                goTo("/hr-module/payroll-setup/employee-pay-elements/create");
              }}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Add Elements
            </button>
          </div>
        </div>

        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

        {openPolicyBuilder && (
          <PolicyRulesBuilder onClose={() => setOpenPolicyBuilder(false)} />
        )}

        <div className="mt-3 bg-white rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center py-2 px-4 w-full">
            <p className="text-xs font-semibold text-primary"> Pay Elements</p>
            <button
              onClick={() => {
                if (!selectedId) {
                  return notifyError("Please select at least one item first");
                }

                setOpenDeleteModal(true);
              }}
              className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center"
            >
              <Icon icon="proicons:delete" className="text-xl" />
            </button>
          </div>
          <CustomTable
            loading={isLoading}
            norounded
            headers={[
              "Action",
              "Employee ID",
              "Employee Name",
              "Basic Salary",
              "House Rent Allowance",
              "Medical Allowance",
              "Fuel Allowance",
              "Provident Fund",
              "Income Tax",
              "Total Earnings",
            ]}
            data={AllPayElementEntries?.map((item: any) => [
              <CustomCheckbox
                checked={selectedId === item._id}
                onChange={() => handleSelect(item._id)}
              />,

              item.employee?.employeeId,

              item.employee?.name,

              `Rs.${item.basicSalary.toLocaleString()}`,

              `Rs.${item.houseRentAllowance.toLocaleString()}`,

              `Rs.${item.medicalAllowance.toLocaleString()}`,

              `Rs.${item.fuelAllowance.toLocaleString()}`,

              `Rs.${item.providentFund.toLocaleString()}`,

              `Rs.${item.incomeTax.toLocaleString()}`,

              `Rs.${item.totalEarnings.toLocaleString()}`,
            ])}
          />
        </div>
      </div>
      {openDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p
                onClick={() => setOpenDeleteModal(false)}
                className="cursor-pointer"
              >
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-60">
              <p className="text-2xl font-semibold text-center">
                Employee Pay Elements
              </p>
              <p className="text-center text-heading1 ">
                Are you sure to delete the Employee Pay Elements ?
              </p>
            </div>
            <div className="flex justify-between gap-2 p-4 pt-0">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => setOpenDeleteModal(false)}
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
