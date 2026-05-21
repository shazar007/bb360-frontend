export default function AttendanceRegisterSummary() {
  return (
    <div className="pb-6 overflow-x-auto">
      <div className="min-w-225">
        <div className="grid grid-cols-1 border-y border-[#D8DEE6] bg-[#ECF0F4]">
          <div className="flex items-center h-12 px-4 text-xs font-semibold border-r text-heading1 border-[#D8DEE6]">
            Attendance Register Summary
          </div>
        </div>

        <div className="grid grid-cols-1 border-b border-[#E5E7EB]">
          <div className="flex items-center h-12 px-4 text-xs text-heading1 bg-[#ECF0F4]">
            New
          </div>
        </div>

        <div className="h-[30vh] bg-white" />
      </div>
    </div>
  );
}
