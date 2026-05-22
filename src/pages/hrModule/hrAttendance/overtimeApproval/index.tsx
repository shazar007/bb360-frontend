import CustomTable from "../../../../components/customTable";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceSummary } from "../../../../api/hrServices";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";

export default function OvertimeApproval() {
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

            {/* <button
            
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F]"
            >
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button> */}

            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
              <Icon icon="ion:print-outline" className="w-5 h-5" />
              Approved Overtime
            </button>
          </div>
        </div>

        <div className="mt-3 overflow-hidden bg-white rounded-2xl">
          <CustomTable
            norounded
            loading={attendanceLoading}
            height="55vh"
            headers={[
              "Department",
              "Employee",
              "Work Calendar",
              "Attendance Date",
              "Time In",
              "Time Out",
              "Working Hours",
              "Break Hours",
              "Overtime Approved",
              "Overtime Paid",
            ]}
            data={(tableData || []).map((item: any) => [
              item.employee?.department?.fullName || "-",
              item.employee?.name || "-", // FIXED
              item.workCalendar?.name || "-",
              dayjs(item.attendanceDate).format("DD-MMM-YYYY"),
              item.timeIn || "-",
              item.timeOut || "-",
              item.totalWorkingHours || "-",
              item.totalBreakHours || "-",
              item.overtimeApproved ? "Yes" : "No",
              item.overtimePaid ? "Yes" : "No",
            ])}
          />
        </div>
      </div>
    </>
  );
}
