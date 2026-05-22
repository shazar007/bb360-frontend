import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import CustomInput from "../../../../components/customInput";
import { getAllEmployees } from "../../../../api/employeesServices";
import { getAllDepartments } from "../../../../api/classificationServices";
import { getAllWorkCalendar } from "../../../../api/hrServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";
const dummyOvertimeApproval = [
  {
    id: 1,
    department: "Sales",
    employee: "Ali Khan",
    workCalendar: "Morning",
    attendanceDate: "21-May-2026",
    timeIn: "09:00",
    timeOut: "06:00",
    workingHours: "8h",
    breakHours: "1h",
    shiftHours: "9h",
    overtimeApproved: "2h",
    overtimePaid: "Yes",
  },
];
export default function OvertimeApproval() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["overtime-approval"],
  //   queryFn: getOvertimeApproval,
  // });
  // const finalData = data?.data?.data;
  const finalData = dummyOvertimeApproval;
  const [formData, setFormData] = useState({
    department: "",
    employee: "",
    workCalendar: "",
    attendanceDate: "",
    timeIn: "",
    timeOut: "",
    workingHours: "",
    breakHours: "",
    shiftHours: "",
    overtimeApproved: "",
    overtimePaid: "",
  });
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        department: selectedItem.department || "",
        employee: selectedItem.employee || "",
        workCalendar: selectedItem.workCalendar || "",
        attendanceDate: selectedItem.attendanceDate || "",
        timeIn: selectedItem.timeIn || "",
        timeOut: selectedItem.timeOut || "",
        workingHours: selectedItem.workingHours || "",
        breakHours: selectedItem.breakHours || "",
        shiftHours: selectedItem.shiftHours || "",
        overtimeApproved: selectedItem.overtimeApproved || "",
        overtimePaid: selectedItem.overtimePaid || "",
      });
    }
  }, [selectedItem]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    // mutationFn: updateOvertimeApproval,

    onSuccess: () => {
      notifySuccess("Updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["overtime-approval"],
      });

      setOpenEdit(false);
    },

    onError: (error) => {
      console.log("❌ UPDATE ERROR:", error);
      notifyError("Update failed");
    },
  });
  const handleUpdate = () => {
    const payload = {
      id: selectedItem?.id,
      ...formData,
    };

    console.log("📦 FINAL PAYLOAD:", payload);

    // mutate(payload);
  };

  const { data: alldepartment } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: getAllDepartments,
  });

  const AllgetDepartment = alldepartment?.data?.data || [];
  const departmentOptions = AllgetDepartment.map((dep: any) => ({
    label: dep.fullName || dep.name || "Unnamed",
    value: dep._id,
  }));
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
  const { data: allworkCalendar } = useQuery({
    queryKey: ["getAllWorkCalendar"],
    queryFn: getAllWorkCalendar,
  });

  const workCalendarOptions = (allworkCalendar?.data?.data || []).map(
    (cal: any) => ({
      label: cal.name,
      value: cal._id,
    }),
  );
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Overtime Approval
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
              <Icon icon="ion:print-outline" className="w-5 h-5" />
              Approved Overtime
            </button>
          </div>
        </div>

        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

        <div className="mt-3 bg-white rounded-2xl overflow-hidden">
          <CustomTable
            norounded
            loading={false}
            height="55vh"
            headers={[
              "Edit",
              "Department",
              "Employee",
              "Work Calendar",
              "Attendance Date",
              "Time In",
              "Time Out",
              "Working Hours",
              "Break Hours",
              "Shift Hours",
              "Overtime Approved",
              "Overtime Paid",
            ]}
            data={(finalData || []).map((item: any) => [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
                onClick={() => {
                  setSelectedItem(item);
                  setOpenEdit(true);
                }}
              />,

              item.department || "-",
              item.employee || "-",
              item.workCalendar || "-",
              item.attendanceDate || "-",
              item.timeIn || "-",
              item.timeOut || "-",
              item.workingHours || "-",
              item.breakHours || "-",
              item.shiftHours || "-",
              item.overtimeApproved || "-",

              <div
                className={`px-2 py-1 text-xs rounded w-fit ${
                  item.overtimePaid === "Yes"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.overtimePaid || "-"}
              </div>,
            ])}
          />
        </div>
      </div>
      {openEdit && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3 max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-sm font-semibold text-heading1">
                Update Overtime Approval
              </h2>

              <button
                onClick={() => setOpenEdit(false)}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              <CustomSelectSearch
                label="Employee"
                loading={isLoading}
                placeholder="Select Employee"
                value={formData.employee}
                options={employeeOptions}
                onChange={(value: any) => {
                  const selectedEmployee = AllEmployee.find(
                    (emp: any) => emp._id === value,
                  );

                  setFormData((prev) => ({
                    ...prev,
                    employee: value,
                    department:
                      selectedEmployee?.department?._id ||
                      selectedEmployee?.department ||
                      "",
                    workCalendar:
                      selectedEmployee?.workCalendar?._id ||
                      selectedEmployee?.workCalendar ||
                      "",
                  }));
                }}
              />
              <CustomSelectSearch
                label="Department"
                value={formData.department}
                options={departmentOptions}
                disabled
              />
              <CustomSelectSearch
                label="Work Calendar"
                value={formData.workCalendar}
                options={workCalendarOptions}
                disabled
              />

              <CustomInput
                label="Time In"
                placeholder="09:00"
                value={formData.timeIn}
                onChange={(e: any) =>
                  setFormData({ ...formData, timeIn: e.target.value })
                }
              />

              <CustomInput
                label="Time Out"
                placeholder="18:00"
                value={formData.timeOut}
                onChange={(e: any) =>
                  setFormData({ ...formData, timeOut: e.target.value })
                }
              />

              <CustomInput
                label="Overtime Approved"
                placeholder="e.g. 2h"
                value={formData.overtimeApproved}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    overtimeApproved: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2 p-4">
              <button
                onClick={handleUpdate}
                disabled={isPending}
                className="px-4 py-2 bg-primary text-white rounded cursor-pointer"
              >
                {isPending ? (
                  <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
