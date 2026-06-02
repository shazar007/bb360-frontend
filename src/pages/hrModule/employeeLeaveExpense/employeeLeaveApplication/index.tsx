import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { SyncLoader } from "react-spinners";
import {
  getAllLeaveApplication,
  updateLeaveApplication,
} from "../../../../api/hrServices";
import dayjs from "dayjs";
import StatusSelector from "../../../../components/customStatusSelector";
import CustomSelect from "../../../../components/customSelect";

export default function EmployeeLeaveApplication() {
  const [loading, setLoading] = useState(false);
  const { goTo } = useAppNavigate();
  const [editData, setEditData] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {
    isLoading,
    refetch,
    data: LeaveApplication,
  } = useQuery({
    queryKey: ["getAllLeaveApplication"],
    queryFn: getAllLeaveApplication,
  });

  const rows = LeaveApplication?.data?.data;
  const handleUpdate = async () => {
    if (!editData?._id) return;
    try {
      setLoading(true);
      const payload = {
        _id: editData._id,
        absenceReason: editData.absenceReason,
        dateStart: editData.dateStart,
        halfDayLeave: editData.halfDayLeave,
        absenceType: editData.halfDayLeave,
        dateEnd: editData.dateEnd,
      };
      await updateLeaveApplication(editData._id, payload);
      setIsEditOpen(false);
      setEditData(null);
      await refetch();
      console.log("Updated successfully");
    } catch (error: any) {
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
              Employee Leave Application
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
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo(
                  "/hr-module/employee-leave-expense/leave-application/create",
                );
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-3">
            <CustomTable
              loading={isLoading}
              height="auto"
              headers={[
                "Edit",
                "Employee",
                "Absence Type",
                "Absence Reason",
                "Date Start",
                "Date End",
                "Total Days",
                "Status",
              ]}
              data={(rows ?? []).map((row: any) => [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() => {
                    setEditData({
                      ...row,
                      halfDayLeave: row.halfDayLeave ?? false,
                    });
                    setIsEditOpen(true);
                  }}
                />,

                `${row.employeeId?.name || "-"} - ${row.employeeId?.employeeId || "-"}`,
                row.absenceType || "-",
                row.absenceReason || "-",
                row.dateStart
                  ? dayjs(row.dateStart).format("DD-MMM-YYYY")
                  : "-",
                row.dateEnd ? dayjs(row.dateEnd).format("DD-MMM-YYYY") : "-",
                row.totalDays || "-",
                <StatusSelector
                  id={row._id}
                  defaultValue={row.status}
                  refetch={refetch}
                />,
              ])}
            />
          </div>
        </div>
      </div>
      {isEditOpen && editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3  max-w-200 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Employee Leave Application
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

            <div className="grid-cols-1 p-4 space-y-2">
              <CustomInput
                label="Reason"
                value={editData.absenceReason || ""}
                onChange={(e) =>
                  setEditData({ ...editData, absenceReason: e.target.value })
                }
                placeholder="Reason"
              />
              <CustomSelect
                label="Half Day Leave"
                value={editData.halfDayLeave}
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                onChange={(value: any) =>
                  setEditData({ ...editData, halfDayLeave: value })
                }
              />
              <CustomInput
                label="Absence Type"
                value={editData.absenceType || ""}
                onChange={(e) =>
                  setEditData({ ...editData, absenceType: e.target.value })
                }
                placeholder="Absence Type"
              />{" "}
              <CustomDatePicker
                label="Start Date"
                value={editData.dateStart || ""}
                onChange={(value: any) =>
                  setEditData({ ...editData, dateStart: value })
                }
                placeholder="Start Date"
              />
              <CustomDatePicker
                label="End Date"
                value={editData.dateEnd || ""}
                onChange={(value: any) =>
                  setEditData({ ...editData, dateEnd: value })
                }
                placeholder="End Date"
              />
            </div>

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
