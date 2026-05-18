import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import Filter from "./components/filter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CustomInput from "../../../../components/customInput";
import { getAllCPLApproved } from "../../../../api/hrServices";
import { SyncLoader } from "react-spinners";
import dayjs from "dayjs";
const fallbackData = [
  {
    _id: "1",
    department: "IT",
    employee: "Ali Raza Awan",
    workCalendar: "00002",
    shiftHours: "8",
    attendanceDate: "2026-03-25",
    timeIn: "09:00",
    timeOut: "18:00",
    workingHours: "8",
    cplApproved: "Yes",
  },
];
export default function CplLeaveApproval() {
  const { goTo } = useAppNavigate();
  const [editData, setEditData] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: ["getAllCPLApproved"],
  //   queryFn: getAllCPLApproved,
  // });
  const rows = fallbackData;
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        _id: editData._id,
        department: editData.department,
        employee: editData.employee,
        workCalendar: editData.workCalendar,
        shiftHours: editData.shiftHours,
        attendanceDate: editData.attendanceDate,
        timeIn: editData.timeIn,
        timeOut: editData.timeOut,
        workingHours: editData.workingHours,
        cplApproved: editData.cplApproved,
      };

      console.log("UPDATE CPL PAYLOAD:", payload);

      // await updateCplApproval(payload)

      // await refetch();
      setIsEditOpen(false);
      setEditData(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              CPL Approval
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <div className="relative w-full md:w-60">
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

            <button
              onClick={() => {
                goTo("/hr-module/employee-leave-expense/cpl-approval/create");
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Manual Approved CPL
            </button>
          </div>
        </div>
        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-3">
            <CustomTable
              // loading={isLoading}
              height="60vh"
              headers={[
                "Edit",
                "Department",
                "Employee",
                "Work Calendar",
                "Shift Hours",
                "Attendance Date",
                "Time In",
                "Time Out",
                "Working Hours",
                "CPL Approved",
              ]}
              data={rows.map((row: any) => [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() => {
                    setEditData(row);
                    setIsEditOpen(true);
                  }}
                />,
                row.department || "-",
                row.employee || "-",
                row.workCalendar || "-",
                row.shiftHours || "-",
                dayjs(row.attendanceDate).format("DD-MMM-YYYY"),
                row.timeIn || "-",
                row.timeOut || "-",
                row.workingHours || "-",
                row.cplApproved || "-",
              ])}
            />
          </div>
        </div>
      </div>
      {isEditOpen && editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3  max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update CPL Approval
              </h2>

              <button
                onClick={() => {
                  setIsEditOpen(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 p-4 bg-white gap-y-2 gap-x-5 md:grid-cols-2 rounded-xl">
              <CustomInput
                label="Department"
                value={editData.department || ""}
                onChange={(e: any) =>
                  setEditData({ ...editData, department: e.target.value })
                }
              />

              <CustomInput
                label="Employee"
                value={editData.employee || ""}
                onChange={(e: any) =>
                  setEditData({ ...editData, employee: e.target.value })
                }
              />

              <CustomInput
                label="Shift Hours"
                value={editData.shiftHours || ""}
                onChange={(e: any) =>
                  setEditData({ ...editData, shiftHours: e.target.value })
                }
              />

              <CustomInput
                label="Time In"
                value={editData.timeIn || ""}
                onChange={(e: any) =>
                  setEditData({ ...editData, timeIn: e.target.value })
                }
              />

              <CustomInput
                label="Time Out"
                value={editData.timeOut || ""}
                onChange={(e: any) =>
                  setEditData({ ...editData, timeOut: e.target.value })
                }
              />
            </div>{" "}
            <div className="flex justify-end gap-2 p-4">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary disabled:opacity-60"
              >
                {loading ? (
                  <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
