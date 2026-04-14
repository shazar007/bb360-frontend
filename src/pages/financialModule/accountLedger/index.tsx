import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import CustomSelect from "../../../components/customSelect";
import CustomDatePicker from "../../../components/datePicker";
import { useAppNavigate } from "../../../hooks/navigation";

export default function AccountLedger() {
  const { goBack } = useAppNavigate();
  return (
    <div className="mt-2">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Account Ledger
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
          {/* Back */}
          <button
            onClick={goBack}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>

          {/* Print */}
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-[#f6f6f6] rounded-2xl mt-3">
        <div className="bg-white rounded-2xl mt-2">
          {/* Header */}
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">Select_Ledger</p>
          </div>

          {/* Body */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-50.25">
            {/* Column 1 */}
            <div className="space-y-1.5">
              <CustomSelect
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="Ledger Type"
                placeholder="Vendors/Distributors"
              />
              <CustomSelect
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="Select Party"
                placeholder="Noor Sons"
              />
            </div>

            {/* Column 2 */}
            <div className="space-y-1.5">
              <CustomDatePicker
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="From Date"
                placeholder="01-Mar-2026"
              />
              <CustomDatePicker
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="To Date"
                placeholder="01-Mar-2026"
              />
            </div>

            {/* Column 3 */}
            <div className="space-y-1.5">
              <CustomSelect
                className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
                label="Date Filter"
                placeholder="This Week"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-3">
          <div className="bg-white rounded-2xl">
            {/* Table Title */}
            <div className="p-4 border-b border-[#304250]/20">
              <p className="text-sm font-semibold text-primary">
                Account_Ledger
              </p>
            </div>

            <CustomTable
              norounded
              headers={[
                "Date",
                "Ref #",
                "Description",
                "Debit",
                "Credit",
                "Closing Balance",
              ]}
              data={[
                [
                  "10-Apr-2026",
                  "INV-2258",
                  "Item Receipt",
                  "420,256",
                  "420,256",
                  "1,420,256",
                ],
                [
                  "12-Apr-2026",
                  "0000215",
                  "Received the foc stock for eid",
                  "420,256",
                  "420,256",
                  "2,520,256",
                ],
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
