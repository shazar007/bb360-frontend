import { useState } from "react";
import { Icon } from "@iconify/react";

import CustomTable from "../../../../components/customTable";

import TimeAttendanceSummary from "./timeAttendanceSummary";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomTimePicker from "../../../../components/timePicker";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEmployees } from "../../../../api/employeesServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
export default function TimeAttendanceMachineData() {
  const [activeTab, setActiveTab] = useState("machine");
  const [openFilter, setOpenFilter] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    employeeId: "",
    machineNumber: "",
    attendanceDate: "",
    employeeName: "",
    attendanceTime: "",
    attendanceMode: "",
    machineIp: "",
  });
  const { goTo } = useAppNavigate();
  const { data: allEmployees, isLoading } = useQuery({
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
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async () => {
    try {
      setSaveLoading(true);

      console.log("Payload =>", form);

      if (editId) {
        // await updateAttendanceMachineData(editId, form);
        notifySuccess("Updated Successfully");
      } else {
        // await createAttendanceMachineData(form);
        notifySuccess("Created Successfully");
      }

      await queryClient.invalidateQueries({
        queryKey: ["attendance-machine-data"],
      });

      setOpenModel(false);
      setEditId(null);

      setForm({
        employee: "",
        employeeName: "",
        employeeId: "",
        machineNumber: "",
        attendanceDate: "",
        attendanceTime: "",
        attendanceMode: "",
        machineIp: "",
      });
    } catch (error: any) {
      console.log(error);
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSaveLoading(false);
    }
  };
  const handleEdit = (item: any) => {
    setEditId(item.id || item._id);

    const emp = AllEmployee.find((e) => e._id === item.employee);

    setForm({
      employee: item.employee || "",
      employeeId: emp?.employeeId || emp?.employeeCode || item.employeeId || "",
      employeeName: emp?.name || item.employeeName || "",
      machineNumber: item.machineNumber || "",
      attendanceDate: item.attendanceDate || "",
      attendanceTime: item.attendanceTime || "",
      attendanceMode: item.attendanceMode || "",
      machineIp: item.machineIp || "",
    });

    setOpenModel(true);
  };
  const dummyData = [
    {
      id: 1,
      employee: "123",
      employeeId: "EMP-0003",
      employeeName: "Ali Khan",

      machineNumber: "MN-01",
      attendanceDate: "2026-05-20",
      attendanceTime: "10:00",
      attendanceMode: "Auto",
      machineIp: "192.168.1.1",
    },
  ];
  const tableData = dummyData;

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Time Attendance Machine Data
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <div className="relative w-full md:w-30">
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
            {activeTab === "machine" && (
              <>
                <button
                  onClick={() => {
                    goTo(
                      "/hr-module/hr-attendance/time-attendance-machine-data/upload",
                    );
                  }}
                  className="flex items-center justify-center w-full h-10 gap-1 px-2 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
                >
                  <Icon icon="basil:add-outline" className="w-5 h-5" />
                  Upload
                </button>

                <button
                  onClick={() => {
                    setOpenModel(true);
                  }}
                  className="flex items-center justify-center w-full h-10 gap-1 px-2 text-white rounded-md cursor-pointer md:w-auto bg-primary"
                >
                  <Icon icon="basil:add-outline" className="w-5 h-5" />
                  Create
                </button>
              </>
            )}
          </div>
        </div>
        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

        <div className="mt-3 overflow-hidden bg-white rounded-2xl">
          <div className="flex flex-wrap gap-4 p-4">
            <button
              onClick={() => setActiveTab("machine")}
              className={`text-xs font-semibold cursor-pointer ${
                activeTab === "machine" ? "text-primary" : "text-heading1"
              }`}
            >
              Time Attendance Machine Data
            </button>

            <button
              onClick={() => setActiveTab("summary")}
              className={`text-xs font-semibold cursor-pointer ${
                activeTab === "summary" ? "text-primary" : "text-heading1"
              }`}
            >
              Time Attendance Summary
            </button>
          </div>

          {activeTab === "machine" && (
            <CustomTable
              norounded
              height="55vh"
              headers={[
                "Edit",
                "Employee Machine Number",
                "Attendance Date",
                "Attendance Datetime",
                "Attendance Mode",
                "Machine Ip",
              ]}
              data={tableData.map((item) => [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() => handleEdit(item)}
                />,

                item.machineNumber,
                item.attendanceDate,
                item.attendanceTime,
                item.attendanceMode,
                item.machineIp,
              ])}
            />
          )}

          {activeTab === "summary" && <TimeAttendanceSummary />}
        </div>
      </div>{" "}
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3  max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                {editId
                  ? "Update Attendance Machine Data"
                  : "Create Attendance Machine Data"}
              </h2>

              <button
                onClick={() => {
                  setOpenModel(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 p-4 gap-x-10 gap-y-5">
              <CustomSelectSearch
                key={form.employee}
                label="Employee"
                loading={isLoading}
                placeholder="Select Employee"
                value={form.employee}
                options={employeeOptions}
                onChange={(value) => {
                  const emp = AllEmployee.find((e) => e._id === value);

                  setForm((prev) => ({
                    ...prev,
                    employee: value,
                    employeeId: emp?.employeeId || emp?.employeeCode || "",
                    employeeName: emp?.name || "",
                  }));
                }}
              />
              <CustomInput
                name="machineNumber"
                value={form.machineNumber}
                onChange={handleChange}
                placeholder="Enter Employee Machine Number"
                label="Employee Machine Number"
              />

              <CustomDatePicker
                name="attendanceDate"
                value={form.attendanceDate}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, attendanceDate: val }))
                }
                label="Attendance Date"
              />
              <CustomTimePicker
                name="attendanceTime"
                value={form.attendanceTime}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, attendanceTime: val }))
                }
                label="Attendance Time"
              />
              <CustomInput
                name="attendanceMode"
                value={form.attendanceMode}
                onChange={handleChange}
                placeholder="Attendance Mode"
                label="Attendance Mode"
              />
              <CustomInput
                name="machineIp"
                value={form.machineIp}
                onChange={handleChange}
                placeholder="Machine Ip"
                label="Machine Ip"
              />
            </div>
            <div className="flex items-center justify-end p-4">
              <button
                onClick={handleSave}
                disabled={saveLoading}
                type="submit"
                className="h-10 text-sm flex justify-center items-center gap-2 text-white rounded-md cursor-pointer bg-primary w-27.5 disabled:opacity-60"
              >
                {saveLoading ? (
                  <SyncLoader color="#fff" size={6} />
                ) : (
                  <>
                    <Icon icon="mynaui:save" className="text-xl" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
