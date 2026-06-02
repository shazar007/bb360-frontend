import { useState } from "react";
import { Icon } from "@iconify/react";

import CustomTable from "../../../../components/customTable";

import Filter from "../../../../components/customDatefilter";
import PolicyRulesBuilder from "../../../../components/policyRulesBuilder";
import LateArrivalCountDetails from "./components/lateArrivalCountDetails";
const dummyLateDeductions = [
  {
    id: 1,
    employeeName: "John Doe",
    department: "Sales",
    workCalendar: "Morning",
    totalDaysPresent: 22,
    lateArrivalCount: 4,
    totalLateMinutes: 84,
    exemptionsApplied: 1,
    deductionDays: 0.5,
    calculatedFineAmount: 2500,
    status: "Pending",
  },
  {
    id: 2,
    employeeName: "Ali Khan",
    department: "HR",
    workCalendar: "Evening",
    totalDaysPresent: 20,
    lateArrivalCount: 2,
    totalLateMinutes: 40,
    exemptionsApplied: 0,
    deductionDays: 0.2,
    calculatedFineAmount: 1200,
    status: "Approved",
  },
];
export default function LateDeduction() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openLateArrivalDetails, setOpenLateArrivalDetails] = useState(false);
  const [openPolicyBuilder, setOpenPolicyBuilder] = useState(false);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["late-deductions"],
  //   queryFn: getLateDeductions,
  // });
  // const finalData =
  // data && data.length > 0 ? data : dummyLateDeductions;
  const finalData = dummyLateDeductions;
  const tableData = finalData.map((item: any) => [
    <Icon
      icon="basil:edit-outline"
      className="text-lg cursor-pointer text-primary"
    />,

    item.employeeName,
    item.department,
    item.workCalendar,
    item.totalDaysPresent,

    <p
      onClick={() => setOpenLateArrivalDetails(true)}
      className="text-[#0088FF] cursor-pointer underline"
    >
      {item.lateArrivalCount}
    </p>,

    `${item.totalLateMinutes} mins`,

    <div className="flex items-center justify-center w-20 h-7 border rounded-md border-[#a5a7a9]">
      {item.exemptionsApplied}
    </div>,

    item.deductionDays,
    item.calculatedFineAmount,
    item.status,
  ]);

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Late Deduction
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
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {openLateArrivalDetails && (
        <LateArrivalCountDetails
          onClose={() => setOpenLateArrivalDetails(false)}
        />
      )}

      {openPolicyBuilder && (
        <PolicyRulesBuilder onClose={() => setOpenPolicyBuilder(false)} />
      )}

      <div className="mt-3 bg-white rounded-2xl overflow-hidden">
        <CustomTable
          norounded
          // loading={isLoading}
          height="auto"
          headers={[
            "Edit",
            "Employee",
            "Department",
            "Work Calendar",
            "Total Days Present",
            "Late Arrival Count",
            "Total Late Minutes",
            "Exemptions Applied",
            "Deduction Days",
            "Calculated Fine Amount",
            "Status",
          ]}
          data={tableData}
        />
      </div>
    </div>
  );
}
