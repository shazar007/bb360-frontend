import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomSelect from "../../../../components/customSelect";
import Filter from "../../../../components/customDatefilter";
import CustomDatePicker from "../../../../components/datePicker";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import { selectDepartments, selectEmployees } from "../../../../redux/store";
import { useSelector } from "react-redux";

export default function DepartmentWiseEmployeeSummary() {
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    payrollName: "",
    location: "",
    period: "",
  });
  const [rowForm, setRowForm] = useState({
    employeeName: "",
  });
  const departments = useSelector(selectDepartments);

  const departmentOptions = departments.map((dep: any) => ({
    label: dep.name,
    value: dep._id,
  }));
  const employees = useSelector(selectEmployees);

  const employeeOptions = employees.map((emp) => ({
    label: emp.name,
    value: emp._id,
  }));
  const handleSave = async () => {
    const payload = {
      department: formData.department,
      payrollName: formData.payrollName,
      location: formData.location,
      employee: rowForm.employeeName,
      period: formData.period,
    };
    console.log("Payload =>", payload);
    try {
      setLoading(true);
      // const response = await addDepartmentWiseEmployeeSummary(payload);
      notifySuccess("Department Wise Employee Summary added successfully");
    } catch (error) {
      console.error("API Error =>", error);
      notifyError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const payrollOptions = [
    { label: "Monthly Wages", value: "monthly_wages" },
    { label: "Weekly Wages", value: "weekly_wages" },
    { label: "Daily Wages", value: "daily_wages" },
  ];
  const locationOptions = [
    { label: "Head Office", value: "head_office" },
    { label: "Branch Office", value: "branch_office" },
    { label: "Remote", value: "remote" },
  ];
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Department Wise Employee Summary
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
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full md:w-28 cursor-pointer flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md"
          >
            {loading ? (
              <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
      <div className="mt-3 bg-white rounded-2xl">
        <div className="px-4 py-3 bg-[#ECF0F4] border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-heading1">
            Select Department Wise Employee Summary
          </p>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25 xl:w-260 lg:w-full gap-y-2">
          <CustomSelectSearch
            label="Department"
            options={departmentOptions}
            loading={departments.length === 0}
            value={formData.department}
            onChange={(value: any) =>
              setFormData({
                ...formData,
                department: value,
              })
            }
          />
          <CustomSelect
            label="Payroll Name"
            options={payrollOptions}
            value={formData.payrollName}
            onChange={(value: any) =>
              setFormData({
                ...formData,
                payrollName: value,
              })
            }
          />
          <CustomSelect
            label="Location"
            options={locationOptions}
            value={formData.location}
            onChange={(value: any) =>
              setFormData({
                ...formData,
                location: value,
              })
            }
          />
          <CustomSelectSearch
            label="Employee Name"
            loading={employees.length === 0}
            placeholder="Select Employee"
            value={rowForm.employeeName}
            options={employeeOptions}
            onChange={(value: any) =>
              setRowForm({
                ...rowForm,
                employeeName: value,
              })
            }
          />
          <CustomDatePicker
            label="Period"
            placeholder="01-Mar-2026"
            value={formData.period}
            onChange={(date: any) =>
              setFormData({
                ...formData,
                period: date,
              })
            }
          />{" "}
        </div>
      </div>
    </div>
  );
}
