// attendanceDashboard/index.tsx

import CustomTable from "../../../../../components/customTable";

export default function AttendanceDashboard() {
  const topCards = [
    {
      title: "Overall Attendance",
      value: (
        <>
          42<span className="text-heading2">/47</span>
        </>
      ),
    },

    {
      title: "Approved Leaves",
      value: "5",
    },

    {
      title: "Unapproved Leaves",
      value: "2",
    },
  ];

  return (
    <>
      <div className="p-4 bg-white rounded-2xl">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {topCards.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 bg-[#F6F6F6] rounded-md h-10"
            >
              <p className="text-xs font-semibold text-heading1">
                {item.title}
              </p>

              <div className="flex items-center justify-center px-2 text-xs font-semibold bg-white rounded-md text-heading1 h-7 min-w-7">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 overflow-hidden border border-[#E9E9E9] rounded-2xl shadow-[0_1px_12px_#0000000D]">
          <div className="px-4 py-3 bg-white border-b border-[#EFEFEF]">
            <p className="text-xs font-semibold text-primary">
              Employees Wise Attendance
            </p>
          </div>

          <CustomTable
            norounded
            height="45vh"
            headers={[
              "Employee ID",
              "Employee Name",
              "Department",
              "Location",
              "Status",
            ]}
            data={[["-", "-", "-", "-", "-"]]}
          />
        </div>
      </div>
    </>
  );
}
