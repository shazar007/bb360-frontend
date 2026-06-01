import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import Filter from "../../../../components/customDatefilter";
import {
  getPayrollProcessRun,
  SalaryPayableProcessSubmit,
} from "../../../../api/hrServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomMonthPicker from "../../../../components/customMonthPicker";
import dayjs from "dayjs";
import CustomCheckbox from "../../../../components/customCheckbox";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import StatusSelector from "../../../../components/customStatusSelector";
import CustomSelectStatus from "./components/customSelectStatus";

const today = new Date();
const initialFilters = {
  payrollType: "MONTHLY",
  periodMonth: today.getMonth() + 1,
  periodYear: today.getFullYear(),
};

export default function SalaryPayableProcess() {
  const [activeTab] = useState("Pay Cost Detail");
  const [selectedId, setSelectedId] = useState<string>("");
  const getCurrentPeriod = () => {
    const now = dayjs();
    const year = now.year();
    const month = now.month() + 1;
    const daysInMonth = now.daysInMonth();

    return {
      periodName: now.format("MMM YYYY"),
      periodMonth: month,
      periodYear: year,
      fromDate: `${year}-${String(month).padStart(2, "0")}-01`,
      toDate: `${year}-${String(month).padStart(2, "0")}-${daysInMonth}`,
    };
  };
  const [period, setPeriod] = useState<any>(getCurrentPeriod());
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState({
    payrollType: "MONTHLY",
  });

  const isReady = !!(filters.payrollType && period);
  const apiFilters = {
    payrollType: filters.payrollType,
    periodMonth: period?.periodMonth,
    periodYear: period?.periodYear,
    fromDate: period?.fromDate,
    toDate: period?.toDate,
  };
  useEffect(() => {
    if (period && filters.payrollType) {
      refetch();
    }
  }, [period, filters.payrollType]);
  const {
    data: procesRun,
    isLoading: hprocesRunLoading,
    refetch,
  } = useQuery({
    queryKey: ["getPayrollProcessRun", filters.payrollType, period],
    queryFn: () => getPayrollProcessRun(apiFilters),
    enabled: isReady,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const AllprocesRun: any[] = procesRun?.data?.data || [];
  console.log("🚀 ~ AllprocesRun:", AllprocesRun);
  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedId(id);
    } else {
      setSelectedId("");
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => SalaryPayableProcessSubmit(data),
    onSuccess: () => {
      notifySuccess("Submitted successfully");
    },
    onError: (error: any) => {
      notifyError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });
  const handleSubmit = () => {
    if (!selectedId) {
      notifyError("Please select at least one record");
      return;
    }

    const payload = {
      runId: selectedId,
    };

    mutate(payload);
  };
  return (
    <>
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

            <button
              onClick={() => setFilters(initialFilters)}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]"
            >
              <Icon icon="ion:refresh-outline" className="w-5 h-5" />
              Reset
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full md:w-25 flex items-center justify-center h-10 gap-2 px-4 bg-primary rounded-md text-white cursor-pointer"
            >
              {isPending ? (
                <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>

        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

        <div className="mt-3 bg-white rounded-2xl">
          <div className="px-4 py-3 bg-[#ECF0F4] border-b border-[#304250]/10">
            <p className="text-xs font-semibold text-heading1">
              {activeTab === "Pay Cost Detail"
                ? "Salary Payable Process"
                : "Payroll Process"}
            </p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-24 xl:gap-y-2 xl:gap-x-30.25 lg:gap-x-20.25 lg:w-150 gap-y-2">
            <CustomSelect
              label="Payroll"
              placeholder="Select Payroll Type"
              options={[
                {
                  label: "Hourly",
                  value: "HOURLY",
                },
                { label: "Daily", value: "DAILY" },
                {
                  label: "Monthly",
                  value: "MONTHLY",
                },
              ]}
              value={filters.payrollType}
              onChange={(val: any) =>
                setFilters({ ...filters, payrollType: val })
              }
            />

            <CustomMonthPicker
              value={period}
              onChange={setPeriod}
              label="Period"
            />
            {/* <CustomDatePicker
              label="Period"
              placeholder="01-Mar-2026"
              value={`${filters.periodYear}-${String(filters.payrollMonth).padStart(2, "0")}-01`}
              onChange={(val: any) => {
                if (val) {
                  const date = new Date(val);
                  setFilters({
                    ...filters,
                    payrollMonth: date.getMonth() + 1,
                    periodYear: date.getFullYear(),
                  });
                }
              }}
            /> */}
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <div className="flex items-center gap-6 px-4 py-3 border-b border-[#304250]/10">
            {[
              "Pay Cost Detail",
              "Employee Wise Summary",
              "Account Wise Summary",
            ].map((tab) => (
              <button
                key={tab}
                // onClick={() => setActiveTab(tab)}
                className={`text-xs font-semibold cursor-pointer ${
                  activeTab === tab ? "text-primary" : "text-heading1"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Pay Cost Detail" && (
            <CustomTable
              norounded
              height="auto"
              loading={hprocesRunLoading}
              headers={[
                "Select",
                "Period Name",
                "Payroll Type",
                "Department",
                "Location",
                "From Date",
                "To Date",
                // "Total Gross",
                // "Total Deductions",
                // "Total Net Pay",
                "Status",
              ]}
              data={AllprocesRun.map((item: any) => [
                <CustomCheckbox
                  checked={selectedId === item._id}
                  onChange={(checked: boolean) =>
                    handleCheckboxChange(item._id, checked)
                  }
                />,
                item.periodName || "-",
                item.payrollType || "-",
                item.department || "-",
                item.location || "-",
                item.fromDate
                  ? new Date(item.fromDate).toLocaleDateString()
                  : "-",
                item.toDate ? new Date(item.toDate).toLocaleDateString() : "-",

                <CustomSelectStatus
                  id={item._id}
                  defaultValue={item.status}
                  refetch={refetch}
                />,
              ])}
            />
          )}
        </div>
      </div>
    </>
  );
}
