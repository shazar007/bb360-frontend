import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import Filter from "../../../../components/customDatefilter";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import {
  selectDepartments,
  selectEmployees,
  selectUserId,
} from "../../../../redux/store";
import { useSelector } from "react-redux";
import CustomMonthPicker from "../../../../components/customMonthPicker";
import dayjs from "dayjs";
import {
  getAllSalaryPaymentProcess,
  SalaryPaymentProcessSubmit,
} from "../../../../api/hrServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllJobLocations } from "../../../../api/classificationServices";
import { SyncLoader } from "react-spinners";
import { notifyError, notifySuccess } from "../../../../components/toast";

export default function SalaryPaymentProcess() {
  const [openFilter, setOpenFilter] = useState(false);
  const employees = useSelector(selectEmployees);
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
  const { data: getJobLocations, isLoading } = useQuery({
    queryKey: ["getAllJobLocations"],
    queryFn: getAllJobLocations,
  });
  const AllJobLocations: any[] = getJobLocations?.data?.data || [];
  const locationsOptions = AllJobLocations?.map((emp) => ({
    label: emp.name,
    value: emp._id,
  }));
  const [period, setPeriod] = useState<any>(getCurrentPeriod());
  const employeeOptions = employees?.map((emp) => ({
    label: emp.name,
    value: emp._id,
  }));
  const departments = useSelector(selectDepartments);
  const departmentOptions = departments?.map((dep: any) => ({
    label: dep.fullName,
    value: dep._id,
  }));
  const [formData, setFormData] = useState({
    department: "",
    location: "",
    period: "",
    payroll: "",
    employeeName: "",
  });
  const filters = {
    employee: formData.employeeName || undefined,
    departmentId: formData.department || undefined,
    location: formData.location || undefined,
    payrollType: formData.payroll || undefined,
    periodMonth: period?.periodMonth,
    periodYear: period?.periodYear,
  };

  const { data: salaryPayment, isLoading: salaryPaymentLoading } = useQuery({
    queryKey: ["getAllSalaryPaymentProcess", filters],
    queryFn: () => getAllSalaryPaymentProcess(filters),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  const AllsalaryPayment: any[] = salaryPayment?.data?.data?.results || [];
  const runID: any[] = salaryPayment?.data?.data?.runIds?.[0] || [];

  const userId = useSelector(selectUserId);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => SalaryPaymentProcessSubmit(data),
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
    if (!runID) {
      notifyError("Please select at least one row");
      return;
    }

    if (!userId) {
      notifyError("User not found. Please login again.");
      return;
    }

    const payload = {
      runId: runID,
      userId: userId,
    };

    mutate(payload);
  };
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Salary Payment Process
          </p>
        </div>
        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <>
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
            </button>{" "}
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
          </>
        </div>
      </div>
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
      <div className="mt-3  bg-white rounded-2xl">
        <div className="px-4 py-3 bg-[#ECF0F4] border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-heading1">
            Salary Payment Process
          </p>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25 xl:w-250 lg:w-220 gap-y-2">
          <CustomMonthPicker
            value={period}
            onChange={setPeriod}
            label="Period"
          />

          <CustomSelect
            label="Payroll"
            placeholder="Select option"
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
            value={formData.payroll}
            onChange={(value: string) =>
              setFormData((prev) => ({
                ...prev,
                payroll: value,
              }))
            }
          />
          <CustomSelectSearch
            label="Employee Name"
            loading={employees.length === 0}
            value={formData.employeeName}
            options={employeeOptions}
            onChange={(value: any) =>
              setFormData({ ...formData, employeeName: value })
            }
          />
          <CustomSelectSearch
            label="Department"
            loading={departments.length === 0}
            value={formData.department}
            options={departmentOptions}
            onChange={(value: string) =>
              setFormData((prev) => ({
                ...prev,
                department: value,
              }))
            }
          />

          <CustomSelectSearch
            label="Location"
            loading={isLoading}
            value={formData.location}
            options={locationsOptions}
            onChange={(value: string) =>
              setFormData((prev) => ({
                ...prev,
                location: value,
              }))
            }
          />
        </div>
      </div>

      <div className="pb-4 mt-2 bg-white rounded-2xl">
        <div className="flex justify-between items-center px-4.5 py-2">
          <p className="text-xs font-semibold text-primary">
            Salary Payment Process
          </p>
        </div>

        <CustomTable
          norounded
          loading={salaryPaymentLoading}
          height="50vh"
          headers={[
            "Employee Name",
            "Department",
            "Designation",
            "Payroll Type",
            "Basic Salary",
            "Fuel Allowance",
            "House Rent Allowance",
            "Medical Allowance",
            "Bonus",
            "Overtime",
            "Income Tax",
            "Provident Fund",
            "Loan Recovery",
            "Other Deductions",
            "Total Earnings",
            "Total Deductions",
            "Net Pay",
            "Absence Deduction",
          ]}
          data={AllsalaryPayment?.map((item: any) => [
            item.employee?.name || "-",
            item.employee?.department?.fullName || "-",
            item.employee?.designation?.name || "-",
            item.payrollType || "-",

            `Rs.${item?.basicSalary || 0}`,
            `Rs.${item?.fuelAllowance || 0}`,
            `Rs.${item?.houseRentAllowance || 0}`,
            `Rs.${item?.medicalAllowance || 0}`,
            `Rs.${item?.bonus || 0}`,
            `Rs.${item?.overtime || 0}`,
            `Rs.${item?.incomeTax || 0}`,
            `Rs.${item?.providentFund || 0}`,
            `Rs.${item?.loanRecovery || 0}`,
            `Rs.${item?.otherDeductions || 0}`,

            `Rs.${item?.totalEarnings || 0}`,
            `Rs.${item?.totalDeductions || 0}`,
            `Rs.${item?.netPay || 0}`,
            `Rs.${item?.absenceDeduction || 0}`,
          ])}
        />
      </div>
    </div>
  );
}
