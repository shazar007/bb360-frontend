import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomSelect from "../../../../components/customSelect";
import CustomDatePicker from "../../../../components/datePicker";
import Filter from "../../../../components/customDatefilter";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { selectDepartments, selectEmployees } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { CreatePayrollProcessRun } from "../../../../api/hrServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import { getAllJobLocations } from "../../../../api/classificationServices";
export default function TimeAttendanceRegister() {
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    location: "",
    toDate: "",
    fromDate: "",
    payrollType: "",
    employeeName: "",
  });
  const departments = useSelector(selectDepartments);
  const departmentOptions = departments.map((dep: any) => ({
    label: dep.fullName,
    value: dep._id,
  }));
  const employees = useSelector(selectEmployees);
  const employeeOptions = employees.map((emp) => ({
    label: emp.name,
    value: emp._id,
  }));
  const handleReset = () => {
    setFormData({
      department: "",
      location: "",
      toDate: "",
      fromDate: "",
      payrollType: "",
      employeeName: "",
    });
  };

  const { mutate } = useMutation({
    mutationFn: CreatePayrollProcessRun,

    onMutate: () => {
      setLoading(true); // start loading
    },

    onSuccess: () => {
      notifySuccess("Payroll process run successfully");
    },

    onError: (error: any) => {
      notifyError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to run payroll process",
      );
    },

    onSettled: () => {
      setLoading(false); // stop loading ALWAYS
    },
  });
  const handleProcessRun = () => {
    if (!formData.fromDate) {
      notifyError("From date is required");
      return;
    }
    if (!formData.toDate) {
      notifyError("To date is required");
      return;
    }
    if (!formData.payrollType) {
      notifyError("Payroll type is required");
      return;
    }
    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);
    if (from > to) {
      notifyError("From date must be before To date");
      return;
    }
    const periodMonth = from.getMonth() + 1;
    const periodYear = from.getFullYear();
    const periodName = from.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const payload: Record<string, any> = {
      periodName,
      periodMonth,
      periodYear,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
    };
    if (formData.department) payload.department = formData.department;
    if (formData.location) payload.location = formData.location;
    if (formData.payrollType) payload.payrollType = formData.payrollType;
    if (formData.employeeName) payload.employeeName = formData.employeeName;
    mutate(payload);
  };
  const { data: getJobLocations, isLoading } = useQuery({
    queryKey: ["getAllJobLocations"],
    queryFn: getAllJobLocations,
  });
  const AllJobLocations: any[] = getJobLocations?.data?.data || [];
  const jobLocationOptions = AllJobLocations.map((job: any) => ({
    label: job.name,
    value: job._id,
  }));
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold text-heading1 md:text-lg">
            Payroll Process Run
          </p>
        </div>

        <div className="flex flex-col w-full gap-2 md:w-auto md:flex-row md:items-center">
          <div className="relative w-full md:w-40">
            <input
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-white rounded-sm placeholder:text-sm placeholder:text-heading1/36 focus:outline-none"
            />
            <Icon
              icon="mynaui:search"
              className="absolute left-3 top-2.5 text-[20px] text-heading1/36"
            />
          </div>
          <button
            onClick={handleProcessRun}
            disabled={loading}
            className="flex h-10 w-full cursor-pointer  items-center justify-center gap-2 rounded-md bg-primary px-4 text-white shadow-[0_1px_12px_#0000001F] disabled:opacity-60 md:w-32"
          >
            {loading ? (
              <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
            ) : (
              "Process Run"
            )}
          </button>
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="flex h-10 w-full items-center cursor-pointer justify-center gap-2 rounded-md bg-secondary px-6 text-white shadow-[0_1px_12px_#0000001F] md:w-auto"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button>
          <button
            onClick={handleReset}
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-4 text-heading1 shadow-[0_1px_12px_#0000001F] md:w-auto"
          >
            <Icon icon="ion:refresh-outline" className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
      <div className="mt-3 bg-white rounded-2xl">
        <div className="border-b border-[#304250]/10 bg-[#ECF0F4] px-4 py-3">
          <p className="text-xs font-semibold text-heading1">
            Payroll Process Run
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 gap-y-2 p-4 md:grid-cols-2 lg:grid-cols-3 lg:w-220 xl:w-250 xl:gap-x-40.25 xl:gap-y-2">
          <CustomSelectSearch
            label="Department"
            placeholder="Select Department"
            loading={departments.length === 0}
            options={departmentOptions}
            value={formData.department}
            onChange={(val: any) =>
              setFormData({ ...formData, department: val })
            }
          />
          <CustomSelectSearch
            label="Location"
            placeholder="Select Location"
            loading={isLoading}
            options={jobLocationOptions}
            value={formData.location}
            onChange={(val: any) => setFormData({ ...formData, location: val })}
          />
          <CustomDatePicker
            label="From *"
            value={formData.fromDate}
            onChange={(val: any) => {
              setFormData({ ...formData, fromDate: val });
            }}
          />
          <CustomSelect
            label="Payroll"
            placeholder="Select Payroll"
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
            value={formData.payrollType}
            onChange={(val: any) =>
              setFormData({ ...formData, payrollType: val })
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
          <CustomDatePicker
            label="To *"
            value={formData.toDate}
            onChange={(val: any) => {
              setFormData({ ...formData, toDate: val });
            }}
          />
        </div>

        {/* <div className="mt-3 overflow-hidden bg-white rounded-2xl">
        <div className="flex flex-wrap gap-4 p-4">
          {["Payroll Action", "Execute Function Log"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer text-xs font-semibold ${
                activeTab === tab ? "text-primary" : "text-heading1"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "Payroll Action" && (
          <CustomTable
            loading={isLoading}
            norounded
            height="48vh"
            headers={[
              "Edit",
              "Payroll",
              "Action Status",
              "Effective Date",
              "Last Update Date",
              "Payroll toDate",
              "Location",
              "Department",
            ]}
            data={payrollRows.map((row: any) => [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              row.payroll || "-",
              row.actionStatus || "-",
              row.effectiveDate || "-",
              row.lastUpdateDate || "-",
              row.payrolltoDate || "-",
              row.location || "-",
              row.department || "-",
            ])}
          />
        )}
        {activeTab === "Execute Function Log" && (
          <CustomTable
            norounded
            height="48vh"
            headers={[
              "Edit",
              "Formula",
              "Run Type",
              "Run Date",
              "Employee Name",
              "Created Date",
              "Run Result",
            ]}
            data={payrollRows.map((row: any) => [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,

              row.formula || "-",
              row.runType || "-",
              row.runDate || "-",
              row.employeeName || "-",
              row.createdDate || "-",

              <div className="leading-4">{row.runResult || "-"}</div>,
            ])}
          />
        )}
      </div> */}
      </div>
    </div>
  );
}
