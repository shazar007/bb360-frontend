import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";

import CustomTable from "../../../../components/customTable";
import CustomSelect from "../../../../components/customSelect";
import CustomDatePicker from "../../../../components/datePicker";

import Filter from "../../../../components/customDatefilter";

import { getAllEmployees } from "../../../../api/employeesServices";
import { getAllDepartments } from "../../../../api/classificationServices";
import { getAllPayrollProcess } from "../../../../api/hrServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";

export default function TimeAttendanceRegister() {
  const [activeTab, setActiveTab] = useState("Payroll Action");
  const [openFilter, setOpenFilter] = useState(false);

  const [formData, setFormData] = useState({
    department: "",
    location: "",
    period: "",
    payroll: "",
    employeeName: "",
  });

  /* =========================
     Queries
  ========================= */

  const { data: departmentsData } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: getAllDepartments,
    staleTime: Infinity,
  });

  const { data: payrollData, isLoading } = useQuery({
    queryKey: ["getAllPayrollProcess"],
    queryFn: getAllPayrollProcess,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  /* =========================
     Options
  ========================= */
  const { data: allEmployees } = useQuery({
    queryKey: ["getAllEmployees"],
    queryFn: getAllEmployees,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const AllEmployee: any[] = allEmployees?.data?.data || [];
  const employeeOptions = AllEmployee.map((emp: any) => ({
    label: emp.name,
    value: emp._id,
  }));

  const departmentOptions =
    departmentsData?.data?.data?.map((dep: any) => ({
      label: dep.fullName,
      value: dep._id,
    })) || [];

  /* =========================
     Data
  ========================= */

  const payrollRows = payrollData?.data || [];

  return (
    <div className="mt-2">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold text-heading1 md:text-lg">
            Payroll Process Run
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          {activeTab === "Payroll Action" && (
            <>
              {/* Search */}
              <div className="relative w-full md:w-40">
                <input
                  placeholder="Search"
                  className="h-10 w-full rounded-sm bg-white pl-10 pr-4 placeholder:text-sm placeholder:text-heading1/36 focus:outline-none"
                />

                <Icon
                  icon="mynaui:search"
                  className="absolute left-3 top-2.5 text-[20px] text-heading1/36"
                />
              </div>

              {/* Filter */}
              <button
                onClick={() => setOpenFilter(!openFilter)}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 text-white shadow-[0_1px_12px_#0000001F] md:w-auto"
              >
                <Icon icon="mage:filter" className="h-5 w-5" />
                Filters
              </button>

              {/* Reset */}
              <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-white px-4 text-heading1 shadow-[0_1px_12px_#0000001F] md:w-auto">
                <Icon icon="ion:refresh-outline" className="h-5 w-5" />
                Reset
              </button>
            </>
          )}

          {activeTab === "Execute Function Log" && (
            <>
              <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 text-white md:w-auto">
                <Icon icon="ion:play-back-outline" className="h-5 w-5" />
                Back
              </button>

              <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-white px-6 text-heading1 shadow-[0_1px_12px_#0000001F] md:w-auto">
                <Icon icon="ion:print-outline" className="h-5 w-5" />
                Print
              </button>

              <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-white md:w-auto">
                <Icon icon="mynaui:save" className="h-5 w-5" />
                Save
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter */}
      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* Form */}
      <div className="mt-3 rounded-2xl bg-white">
        <div className="border-b border-[#304250]/10 bg-[#ECF0F4] px-4 py-3">
          <p className="text-xs font-semibold text-heading1">
            Payroll Process Run
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 gap-y-2 p-4 md:grid-cols-2 lg:grid-cols-3 lg:w-220 xl:w-250 xl:gap-x-40.25 xl:gap-y-2">
          <CustomSelect
            label="Department"
            placeholder="Select Department"
            options={departmentOptions}
            value={formData.department}
            onChange={(val: any) =>
              setFormData({
                ...formData,
                department: val,
              })
            }
          />

          <CustomSelect
            label="Location"
            placeholder="Select Location"
            options={[
              {
                label: "Factory",
                value: "Factory",
              },
              {
                label: "Head Office",
                value: "Head Office",
              },
            ]}
            value={formData.location}
            onChange={(val: any) =>
              setFormData({
                ...formData,
                location: val,
              })
            }
          />

          <CustomDatePicker
            label="Period"
            value={formData.period}
            onChange={(val: any) =>
              setFormData({
                ...formData,
                period: val,
              })
            }
          />

          <CustomSelect
            label="Payroll"
            placeholder="Select Payroll"
            options={[
              {
                label: "Daily Wages",
                value: "Daily Wages",
              },
              {
                label: "Monthly Payroll",
                value: "Monthly Payroll",
              },
              {
                label: "Regular Monthly Payroll",
                value: "regular monthly payroll",
              },
            ]}
            value={formData.payroll}
            onChange={(val: any) =>
              setFormData({
                ...formData,
                payroll: val,
              })
            }
          />

          <CustomSelectSearch
            label="Employee Name"
            // loading={isLoading}
            value={formData.employeeName}
            options={employeeOptions}
            onChange={(value: any) =>
              setFormData({ ...formData, employeeName: value })
            }
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-3 overflow-hidden rounded-2xl bg-white">
        {/* Tabs */}
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

        {/* Payroll Action */}
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
              "Payroll Period",
              "Location",
              "Department",
            ]}
            data={payrollRows.map((row: any) => [
              <Icon
                icon="basil:edit-outline"
                className="cursor-pointer text-lg text-primary"
              />,

              row.payroll || "-",
              row.actionStatus || "-",
              row.effectiveDate || "-",
              row.lastUpdateDate || "-",
              row.payrollPeriod || "-",
              row.location || "-",
              row.department || "-",
            ])}
          />
        )}

        {/* Execute Function Log */}
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
                className="cursor-pointer text-lg text-primary"
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
      </div>
    </div>
  );
}
