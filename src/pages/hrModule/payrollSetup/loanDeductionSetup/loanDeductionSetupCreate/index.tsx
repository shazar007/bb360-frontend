import { Icon } from "@iconify/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CustomInput from "../../../../../components/customInput";
import { useAppNavigate } from "../../../../../hooks/navigation";
import { notifySuccess, notifyError } from "../../../../../components/toast";
import { addLoanDeductions } from "../../../../../api/hrServices";

type LoanDeductionPayload = {
  payroll: string;
  payrollPeriod: string;
};

export default function LoanDeductionSetupCreate() {
  const navigate = useAppNavigate();

  const [form, setForm] = useState<LoanDeductionPayload>({
    payroll: "",
    payrollPeriod: "",
  });

  const handleChange = (key: keyof LoanDeductionPayload, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoanDeductionPayload) => addLoanDeductions(data),

    onSuccess: () => {
      notifySuccess("Loan Deduction Setup saved successfully");
      navigate.goBack();
    },

    onError: (err: any) => {
      console.log(err);
      notifyError("Something went wrong");
    },
  });

  const handleSave = () => {
    const payload: LoanDeductionPayload = {
      payroll: form.payroll,
      payrollPeriod: form.payrollPeriod,
    };

    console.log("Payload =>", payload);

    mutate(payload);
  };

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Add / Edit Loan Deduction Setup
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={() => navigate.goBack()}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md bg-secondary"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md shadow">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md bg-primary disabled:opacity-50"
          >
            <Icon icon="mynaui:save" className="w-5 h-5" />
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Add / Edit Loan Deduction Setup
            </p>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <CustomInput
              label="Payroll"
              placeholder="Monthly Payroll..."
              value={form.payroll}
              onChange={(e: any) => handleChange("payroll", e.target.value)}
            />

            <CustomInput
              label="Payroll Period"
              placeholder="June 2025"
              value={form.payrollPeriod}
              onChange={(e: any) =>
                handleChange("payrollPeriod", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
