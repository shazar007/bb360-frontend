import { useState } from "react";
import { Icon } from "@iconify/react";

import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import Filter from "../../../../components/customDatefilter";
import CustomDatePicker from "../../../../components/datePicker";

import SummaryTable from "./components";
export default function SalaryPayableProcess() {
  const [activeTab, setActiveTab] = useState("Pay Cost Detail");
  const [openFilter, setOpenFilter] = useState(false);
  const employeeWiseData = [
    {
      title: "40001 - Muhammad Waqas",

      rows: [
        {
          account: "Salaries & Benefits Exp",
          debit: "75,200",
          credit: "0",
        },

        {
          account: "Employee Salary Payable",
          debit: "0",
          credit: "75,200",
        },
      ],
    },

    {
      title: "40001 - Muhammad Waqas",

      rows: [
        {
          account: "Salaries & Benefits Exp",
          debit: "75,200",
          credit: "0",
        },

        {
          account: "Employee Salary Payable",
          debit: "0",
          credit: "75,200",
        },
      ],
    },
  ];

  const accountWiseData = [
    {
      rows: [
        {
          account: "Fuel Allowance Exp",
          debit: "75,200",
          credit: "0",
        },

        {
          account: "Employee Salary Payable",
          debit: "0",
          credit: "75,200",
        },

        {
          account: "Salaries & Benefits Exp",
          debit: "0",
          credit: "75,200",
        },
      ],
    },
  ];
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Salary Payable Process
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
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:refresh-outline" className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3 overflow-hidden bg-white rounded-2xl">
        <div className="px-4 py-3 bg-[#ECF0F4] border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-heading1">
            {activeTab === "Pay Cost Detail"
              ? "Salary Payable Process"
              : "Payroll Process"}
          </p>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2  gap-24 xl:gap-y-2 xl:gap-x-30.25 lg:gap-x-20.25 lg:w-150 gap-y-2">
          <CustomSelect label="Payroll" placeholder="Daily Wages" />
          <CustomDatePicker label="Period" placeholder="01-Mar-2026" />
        </div>
      </div>

      <div className="mt-3 overflow-hidden bg-white rounded-2xl">
        <div className="flex items-center gap-6 px-4 py-3 border-b border-[#304250]/10">
          <button
            onClick={() => setActiveTab("Pay Cost Detail")}
            className={`text-xs font-semibold cursor-pointer ${
              activeTab === "Pay Cost Detail" ? "text-primary" : "text-heading1"
            }`}
          >
            Pay Cost Detail
          </button>

          <button
            onClick={() => setActiveTab("Employee Wise Summary")}
            className={`text-xs font-semibold cursor-pointer ${
              activeTab === "Employee Wise Summary"
                ? "text-primary"
                : "text-heading1"
            }`}
          >
            Employee Wise Summary
          </button>

          <button
            onClick={() => setActiveTab("Account Wise Summary")}
            className={`text-xs font-semibold cursor-pointer ${
              activeTab === "Account Wise Summary"
                ? "text-primary"
                : "text-heading1"
            }`}
          >
            Account Wise Summary
          </button>
        </div>

        {activeTab === "Pay Cost Detail" && (
          <CustomTable
            norounded
            height="48vh"
            headers={[
              "Edit",
              "Element Name",
              "Input Value Name",
              "Employee",
              "Account",
              "Balance Or Cost",
              "Costed Value",
              "Debit Or Credit",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                />,

                "Fuel Allowance",

                "Pay Value",

                "1125 Bilal Hassan",

                "Fuel Allowance Exp",

                "Cost",

                "Rs.5,000",

                "Debit",
              ],
            ]}
          />
        )}

        {activeTab === "Employee Wise Summary" && (
          <SummaryTable grouped data={employeeWiseData} />
        )}

        {activeTab === "Account Wise Summary" && (
          <SummaryTable data={accountWiseData} />
        )}
      </div>
    </div>
  );
}
