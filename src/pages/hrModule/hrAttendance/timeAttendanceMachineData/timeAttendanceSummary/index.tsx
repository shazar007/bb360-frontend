import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomExpandableTable from "../../../../../components/customTable";
export default function TimeAttendanceSummary() {
  const [openDepartment, setOpenDepartment] = useState("accounts");

  const tableData = Array(6).fill({
    employee: "EMP-1236",
    workCalendar: "Day Shift",
    attendanceDate: "19-May-2026",
    timeIn: "10:32AM",
    timeOut: "06:45PM",
    workingHours: "8:30",
    breakHours: "00:30",
    overtimePaid: "Nill",
    overtimeApproved: "Nill",
  });

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

  return (
    <div className="mt-0 bg-white  overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-300 w-full">
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
                        {item.employee}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.workCalendar}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.attendanceDate}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.timeIn}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.timeOut}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.workingHours}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.breakHours}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                        {item.overtimePaid}
                      </td>

                      <td className="h-12 px-4 text-xs text-center text-heading1">
                        {item.overtimeApproved}
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
