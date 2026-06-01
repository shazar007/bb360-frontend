import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import Filter from "../../../../components/customDatefilter";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { selectDepartments, selectEmployees } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

export default function SalaryPaymentProcess() {
  const [openFilter, setOpenFilter] = useState(false);
  const employees = useSelector(selectEmployees);
  const employeeOptions = employees.map((emp) => ({
    label: emp.name,
    value: emp._id,
  }));
  const departments = useSelector(selectDepartments);
  const departmentOptions = departments.map((dep: any) => ({
    label: dep.name,
    value: dep._id,
  }));
  const [formData, setFormData] = useState({
    department: "",
    location: "",
    period: "",
    payroll: "",
    employeeName: "",
  });
  const handleSubmit = () => {
    const rawPayload = {
      employeeId: formData.employeeName,
      departmentId: formData.department,
      location: formData.location,
      period: formData.period,
      payrollType: formData.payroll,
    };

    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(([_, value]) => value),
    );
    console.log("PAYLOAD:", payload);
  };
  // const { data: salaryPayment, isLoading: salaryPaymentLoading } = useQuery({
  //   queryKey: ["getAllSalaryPaymentProcess"],
  //   queryFn: () => getAllSalaryPaymentProcess,
  //   staleTime: Infinity,
  //   gcTime: 1000 * 60 * 10,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });
  // const AllsalaryPayment: any[] = salaryPayment?.data?.data || [];
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
            </button>
            <button
              onClick={handleSubmit}
              className="w-full md:w-25 flex items-center justify-center h-10 gap-2 px-4 bg-primary rounded-md text-white cursor-pointer shadow-[0_1px_12px_#0000001F]"
            >
              Save
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
          <CustomSelect
            label="Location"
            placeholder="Select location"
            options={[
              { label: "Factory", value: "factory" },
              { label: "Office", value: "office" },
              { label: "Warehouse", value: "warehouse" },
            ]}
            value={formData.location}
            onChange={(value: string) =>
              setFormData((prev) => ({
                ...prev,
                location: value,
              }))
            }
          />
          <CustomDatePicker
            label="Period"
            value={formData.period}
            onChange={(value: string) =>
              setFormData((prev) => ({
                ...prev,
                period: value,
              }))
            }
          />
          <CustomSelect
            label="Payroll"
            placeholder="Daily Wages"
            options={[
              { label: "Daily Wages", value: "daily" },
              { label: "Monthly Salary", value: "monthly" },
            ]}
            value={formData.payroll}
            onChange={(value: string) =>
              setFormData((prev) => ({
                ...prev,
                payroll: value,
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
          // loading={salaryPaymentLoading}
          height="50vh"
          headers={[
            "Edit",
            "Sequence ID",
            "Employee Name",
            "Payroll Period",
            "Department",
            "Payment Mode",
            "Basic Salary",
            "Earnings",
            "Deductions",
            "Net Salary",
            "Payable",
            "Pay Amount",
          ]}
          // data={AllsalaryPayment?.map((item: any, index: number) => [
          //   <Icon
          //     key={`edit-${index}`}
          //     icon="basil:edit-outline"
          //     className="text-lg cursor-pointer text-primary"
          //     onClick={() => console.log(item)}
          //   />,

          //   item.employeeCode || "-",
          //   item.employeeName || "-",
          //   item.allowanceType || "-",

          //   item.fromDate ? new Date(item.fromDate).toLocaleDateString() : "-",

          //   item.toDate ? new Date(item.toDate).toLocaleDateString() : "-",

          //   item.amountType || "-",

          //   `Rs.${item.amount || 0}`,
          //   `Rs.${item.gross || 0}`,
          //   `Rs.${item.deduction || 0}`,
          //   `Rs.${item.netPay || 0}`,
          //   `Rs.${item.total || 0}`,
          // ])}
        />
      </div>
    </div>
  );
}
