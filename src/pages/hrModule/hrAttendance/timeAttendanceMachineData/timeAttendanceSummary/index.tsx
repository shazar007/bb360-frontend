import { useState } from "react";
import { Icon } from "@iconify/react";
import { getAttendanceSummary } from "../../../../../api/hrServices";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import dayjs from "dayjs";
export default function TimeAttendanceSummary() {
  const [openDepartment, setOpenDepartment] = useState("accounts");

  const { data: attendanceSummary, isLoading: attendanceLoading } = useQuery({
    queryKey: ["getAttendanceSummary"],
    queryFn: getAttendanceSummary,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const tableData: any[] = attendanceSummary?.data?.data || [];
  const groupedDepartments = tableData.reduce((acc: any, item: any) => {
    const departmentName =
      item.employee?.department?.fullName || "Unknown Department";

    if (!acc[departmentName]) {
      acc[departmentName] = [];
    }

    acc[departmentName].push(item);

    return acc;
  }, {});
  return (
    <div className="mt-0 overflow-hidden bg-white">
      <div className="overflow-x-auto">
        {attendanceLoading ? (
          <div className="flex justify-center p-4 my-2">
            <div className="flex items-center justify-center">
              <SyncLoader size={18} color="#14CCC3" />
            </div>
          </div>
        ) : (
          <table className="w-full min-w-300">
            <thead>
              <tr className="bg-[#ECF0F4]">
                {[
                  "Employee",
                  "Work Calendar",
                  "Attendance Date",
                  "Time In",
                  "Time Out",
                  "Total Working Hours",
                  "Total Break Hours",
                  "Overtime Paid",
                  "Overtime Approved",
                ].map((item, index) => (
                  <th
                    key={index}
                    className="h-12 px-4 text-[12px] font-semibold border text-center text-heading1 border-r border-[#D8DEE6] last:border-r-0 first:border-l-0"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Object.entries(groupedDepartments).map(
                ([departmentName, employees]: any, deptIndex) => (
                  <>
                    <tr key={deptIndex} className="bg-[#ECF0F4]">
                      <td
                        colSpan={9}
                        className="h-12 px-3 text-xs font-semibold text-heading1"
                      >
                        <button
                          onClick={() =>
                            setOpenDepartment(
                              openDepartment === departmentName
                                ? ""
                                : departmentName,
                            )
                          }
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Icon
                            icon={
                              openDepartment === departmentName
                                ? "mdi:minus-box-outline"
                                : "mdi:plus-box-outline"
                            }
                            className="text-base"
                          />
                          Department: {departmentName}
                        </button>
                      </td>
                    </tr>

                    {openDepartment === departmentName &&
                      employees.map((item: any, index: number) => (
                        <tr key={index} className="border-b border-[#E5E7EB]">
                          <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                            {item.employee?.employeeId || "-"}
                          </td>

                          <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                            {item.workCalendar?.name || "-"}
                          </td>

                          <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                            {dayjs(item.attendanceDate).format("DD-MMM-YYYY")}
                          </td>

                          <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                            {item.timeIn || "-"}
                          </td>

                          <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                            {item.timeOut || "-"}
                          </td>

                          <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                            {item.totalWorkingHours || "-"}
                          </td>

                          <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                            {item.totalBreakHours || "-"}
                          </td>

                          <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                            {item.overtimePaid ? "Yes" : "No"}
                          </td>

                          <td className="h-12 px-4 text-xs text-center text-heading1">
                            {item.overtimeApproved ? "Yes" : "No"}
                          </td>
                        </tr>
                      ))}
                  </>
                ),
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
