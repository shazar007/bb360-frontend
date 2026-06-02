import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { getPayableProcessDetails } from "../../../../api/hrServices";

export default function PayableProcessDetails() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getPayableProcessDetails", id],
    queryFn: () => getPayableProcessDetails(id!),
    enabled: !!id,
  });
  const run = data?.data?.data?.run || {};
  const results = data?.data?.data?.results || [];

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Salary Payable Process Run
          </p>
        </div>
      </div>
      <div className="mb-6 bg-white rounded-lg">
        <CustomTable
          height="auto"
          noPagination
          loading={isLoading}
          headers={[
            "Period Name",
            "Payroll Type",
            "Status",
            "From Date",
            "To Date",
            "Total Gross",
            "Total Deductions",
            "Total Net Pay",
            "Created At",
            "Updated At",
          ]}
          data={[
            [
              run.periodName || "-",
              run.payrollType || "-",
              run.status || "-",
              run.fromDate ? new Date(run.fromDate).toLocaleDateString() : "-",
              run.toDate ? new Date(run.toDate).toLocaleDateString() : "-",
              run.totalGross ?? "-",
              run.totalDeductions ?? "-",
              run.totalNetPay ?? "-",
              run.createdAt ? new Date(run.createdAt).toLocaleString() : "-",
              run.updatedAt ? new Date(run.updatedAt).toLocaleString() : "-",
            ],
          ]}
        />
      </div>
      <div className="mb-6  rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Salary Payable Process Run Details
          </p>
        </div>
        <CustomTable
          height="auto"
          loading={isLoading}
          headers={[
            "Employee Name",
            "Department",
            "Designation",
            "Payroll Type",
            "Basic Salary",
            "Total Earnings",
            "Total Deductions",
            "Net Pay",
            "Created At",
            "Updated At",
          ]}
          data={results.map((item: any) => [
            item.employee?.name || "-",
            item.employee?.department?.fullName || "-",
            item.employee?.designation?.name || "-",
            item.payrollType || "-",
            item.basicSalary ?? "-",
            item.totalEarnings ?? "-",
            item.totalDeductions ?? "-",
            item.netPay ?? "-",
            item.createdAt ? new Date(item.createdAt).toLocaleString() : "-",
            item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "-",
          ])}
        />
      </div>
    </div>
  );
}
