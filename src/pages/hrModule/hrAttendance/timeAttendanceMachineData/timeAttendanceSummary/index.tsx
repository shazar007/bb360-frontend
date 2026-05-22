import { useState } from "react";
import { Icon } from "@iconify/react";
import { getAttendanceSummary } from "../../../../../api/hrServices";
import { useQuery } from "@tanstack/react-query";
export default function TimeAttendanceSummary() {
  const [openDepartment, setOpenDepartment] = useState("accounts");

  const departments = [
    {
      id: "it",
      name: "Department: Information & Technology",
    },

    {
      id: "accounts",
      name: "Department: Accounts",
    },

    {
      id: "rnd",
      name: "Department: R&D",
    },

    {
      id: "sales",
      name: "Department: Sales",
    },

    {
      id: "marketing",
      name: "Department: Marketing",
    },
  ];
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
  console.log("🚀 ~ tableData:", tableData);
  return (
    <div className="mt-0 overflow-hidden bg-white">
      <div className="overflow-x-auto">
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
            {departments.map((department) => (
              <>
                <tr key={department.id} className="bg-[#ECF0F4]">
                  <td
                    colSpan={9}
                    className="h-12 px-3 text-xs font-semibold text-heading1"
                  >
                    <button
                      onClick={() =>
                        setOpenDepartment(
                          openDepartment === department.id ? "" : department.id,
                        )
                      }
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon
                        icon={
                          openDepartment === department.id
                            ? "mdi:minus-box-outline"
                            : "mdi:plus-box-outline"
                        }
                        className="text-base"
                      />

                      {department.name}
                    </button>
                  </td>
                </tr>

                {openDepartment === department.id &&
                  tableData.map((item, index) => (
                    <tr key={index} className="border-b border-[#E5E7EB]">
                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.employee?.employeeId}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.workCalendar?.name}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.attendanceDate}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.timeIn}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.timeIn}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.workCalendar?.workHoursPerDay}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.totalBreakHours}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.overtimePaid ? "Yes" : "False"}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1">
                        {item.overtimeApproved ? "Yes" : "False"}
                      </td>
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
