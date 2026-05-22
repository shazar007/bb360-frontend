import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomInput from "../../../../components/customInput";

const dummyData = [
  {
    id: 1,
    payroll: "Regular Monthly Payroll",
    period: "30-Jun-2026",
  },
];
export default function LoanDeductionSetup() {
  const [openFilter, setOpenFilter] = useState(false);
  const { goTo, goBack } = useAppNavigate();
  // const queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    payroll: "",
    period: "",
  });

  // const { data } = useQuery({
  //   queryKey: ["loan-deduction-setup"],
  //   queryFn: getLoanDeductionSetup,
  // });

  // const tableData = data?.data?.length > 0 ? data.data : dummyData;
  const tableData = dummyData;

  const handleEdit = (item: any) => {
    setForm({
      payroll: item.payroll || "",
      period: item.period || "",
    });

    setOpenModal(true);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      // await updateLoanDeductionSetup(editId, form);

      notifySuccess("Updated Successfully");

      setOpenModal(false);

      // await queryClient.invalidateQueries({
      //   queryKey: ["loan-deduction-setup"],
      // });

      goBack();
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Loan Deduction Setup
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <div className="relative w-full md:w-40">
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
              onClick={() => setOpenFilter(!openFilter)}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo("/hr-module/payroll-setup/loan-deduction-setup/create");
              }}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

        <div className="mt-3 bg-white rounded-2xl overflow-hidden">
          <CustomTable
            norounded
            height="60vh"
            headers={["Edit", "Payroll", "Payroll Period"]}
            data={tableData.map((item) => [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
                onClick={() => handleEdit(item)}
              />,
              item.payroll,
              item.period,
            ])}
          />
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Employee
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
              <CustomInput
                label="Payroll"
                name="payroll"
                value={form.payroll}
                onChange={handleChange}
              />

              <CustomInput
                label="Payroll Period"
                name="period"
                value={form.period}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end p-4">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex items-center justify-center cursor-pointer h-10 gap-2 px-8 text-white rounded-md bg-primary"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
