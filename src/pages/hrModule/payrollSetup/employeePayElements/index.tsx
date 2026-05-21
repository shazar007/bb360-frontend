import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import PolicyRulesBuilder from "../../../../components/policyRulesBuilder";
import { useAppNavigate } from "../../../../hooks/navigation";
export default function EmployeePayElements() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openPolicyBuilder, setOpenPolicyBuilder] = useState(false);
  const { goTo } = useAppNavigate();
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Employee Pay Elements
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
            onClick={() => setOpenPolicyBuilder(true)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-3 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Policy Rules Builder
          </button>

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

      {/* FILTER */}
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
      {/* POLICY BUILDER MODAL */}
      {openPolicyBuilder && (
        <PolicyRulesBuilder onClose={() => setOpenPolicyBuilder(false)} />
      )}

      {/* TABLE */}
      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          norounded
          height="60vh"
          headers={[
            "Edit",
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
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              "EMP-121",

              "Bilal Hassan",

              "Rs.65,000",

              "Rs.25,000",

              "Rs.10,000",

              "Rs.10,000",

              "Rs.-5,000",

              "Rs.-9,000",

              "Rs.90,000",
            ],
          ]}
        />
      </div>
    </div>
  );
}
