import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { AxiosResponse } from "axios";

import { useFormik } from "formik";
import Dummay from "../../../assets/Holiday SVG.png";
import {
  applyLeave,
  deleteLeave,
  getAllLeaves,
  updateLeave,
  updateLeavesStatus,
} from "../../../api/hrServices";
import { notifyError, notifySuccess } from "../../../components/toast";
import SearchById from "../../../components/SearchBar/searchById";
import CustomTable from "../../../components/customTable";
import CustomInput from "../../../components/customInput";
import CustomSelect from "../../../components/customSelect";
import CustomDatePicker from "../../../components/datePicker";
import { SyncLoader } from "react-spinners";
import { useDebounce } from "../../../hooks/deBounce";
import { LeaveSchema } from "../../../utils/constant";

const titles = [
  "Employee Id",
  "Employee Name",
  "Leave Tye",
  "From",
  "To",
  "Duration",
  "Approved By",
  "Status",
  "Action",
];

export default function Leaves() {
  useEffect(() => {
    document.title = "HR-Management | Leaves";
  }, []);
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const debouncedSearchId = useDebounce(searchId, 500);
  const debouncedSearchName = useDebounce(searchName, 500);

  const [editing, setEditing] = useState<any>(null);
  const [openModel, setOpenModel] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [isloadingDelete, setLoadingDelete] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const searchValue = debouncedSearchId || debouncedSearchName;

  const { data, refetch, isFetching } = useQuery<AxiosResponse<any>>({
    queryKey: ["Leaves", searchValue],
    queryFn: () => getAllLeaves(searchValue),
    placeholderData: (previousData) => previousData,
  });
  const tableData =
    data?.data?.map((v: any) => [
      v.employeeId,
      v.employeeName,
      v.leaveType,
      v.startDate ? dayjs(v.startDate).format("YYYY-MM-DD") : "--",
      v.endDate ? dayjs(v.endDate).format("YYYY-MM-DD") : "--",
      v.startDate && v.endDate
        ? `${dayjs(v.endDate).diff(dayjs(v.startDate), "day") + 1} days`
        : "--",
      v?.approvedBy || "Not Approved",
      <StatusDropdown
        key={v._id}
        initialValue={v.status || "Pending"}
        order={v}
        onStatusChange={async (orderId, status, approvedBy) => {
          try {
            await updateLeavesStatus(orderId, { status, approvedBy });
            notifySuccess("Status Updated Successfully");
            refetch();
          } catch (error: any) {
            notifyError("Failed to update status: " + error.message);
          }
        }}
      />,
      <div className="relative">
        <Icon
          icon="ph:dots-three-outline-vertical-duotone"
          className="text-2xl text-[#0755E9] cursor-pointer"
          onClick={() => setOpenActionId(openActionId === v._id ? null : v._id)}
        />

        {openActionId === v._id && (
          <div className="absolute right-0 z-50 w-40 mt-2 bg-white rounded-lg shadow-lg">
            <button
              disabled={v.status === "Approved" || v.status === "Rejected"}
              onClick={() => {
                setEditing(v);
                setOpenModel(true);
                setOpenActionId(null);
              }}
              className="px-4 py-2 text-sm w-full hover:bg-[#E5EBF7] cursor-pointer flex items-center gap-2 disabled:text-[#7d7d7d]/48"
            >
              Edit
            </button>

            <button
              disabled={v.status === "Approved" || v.status === "Rejected"}
              onClick={() => {
                setDeleteConfirmation(true);
                setEditing(v);
              }}
              className="px-4 py-2 text-sm w-full hover:bg-[#E5EBF7] cursor-pointer flex items-center gap-2 disabled:text-[#7d7d7d]/48"
            >
              Delete
            </button>
          </div>
        )}
      </div>,
    ]) || [];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeId: editing?.employeeId || "",
      employeeName: editing?.employeeName || "",
      leaveType: editing?.leaveType || "",
      startDate: editing?.startDate ? dayjs(editing.startDate) : null,
      endDate: editing?.endDate ? dayjs(editing.endDate) : null,
      reason: editing?.reason || "",
    },
    validationSchema: LeaveSchema,
    onSubmit: (values) => {
      setLoading(true);

      const payload = {
        ...values,
        startDate: values.startDate?.toISOString(),
        endDate: values.endDate?.toISOString(),
      };

      if (editing) {
        updateLeave(editing._id, payload)
          .then(() => {
            notifySuccess("Leaves updated successfully");
            setOpenModel(false);
            setEditing(null);
            formik.resetForm();
            refetch();
          })
          .catch(() => notifyError("Failed to update Leaves."))
          .finally(() => setLoading(false));
      } else {
        applyLeave(payload)
          .then(() => {
            notifySuccess("Leaves added successfully");
            setOpenModel(false);
            formik.resetForm();
            refetch();
          })
          .catch((error: any) => {
            const message =
              error?.response?.data?.message || "Failed to add Leaves.";
            notifyError(message);
          })
          .finally(() => setLoading(false));
      }
    },
  });
  const handleDelete = () => {
    if (!editing?._id) return;
    setLoadingDelete(true);
    deleteLeave(editing._id)
      .then(() => {
        notifySuccess("Leaves deleted successfully");
        setDeleteConfirmation(false);
        setEditing(null);
        refetch();
      })
      .catch((error) => {
        console.error("Failed to delete Leaves:", error);
        const message =
          error.response?.data?.message ||
          "Failed to delete Leaves. Please try again.";

        notifyError(message);
      })
      .finally(() => {
        setLoadingDelete(false);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="bg-[#F7F7F7] md:h-[calc(100vh-108px)] h-auto rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-5 md:gap-4">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Leaves
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
            <SearchById
              value={searchId}
              onChange={setSearchId || setSearchName}
            />
            <button
              onClick={() => {
                setEditing(null);
                setOpenModel(true);
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-30"
            >
              <Icon icon="basil:add-outline" className="text-lg text-white" />
              <p className="text-sm text-white">Add Leave</p>
            </button>
          </div>
        </div>
        <div className="mt-4">
          {" "}
          <CustomTable headers={titles} norounded data={tableData} />
        </div>
      </div>
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="relative bg-white rounded-xl mx-3 w-250 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                {" "}
                {editing ? "Update Leaves" : "Add Leaves"}
              </h2>
              <button
                className="cursor-pointer"
                onClick={() => setOpenModel(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-6 p-4">
              <div className="flex flex-wrap gap-6">
                <div className="flex-1 space-y-4 min-w-70">
                  <div>
                    <CustomInput
                      label="Employee Id"
                      placeholder="Enter Employee Id"
                      value={formik.values.employeeId}
                      onChange={formik.handleChange}
                      name="employeeId"
                    />{" "}
                    {formik.touched.employeeId &&
                      formik.errors.employeeId &&
                      typeof formik.errors.employeeId === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.employeeId}
                        </div>
                      )}
                  </div>
                  <div>
                    {" "}
                    <CustomInput
                      label="Employee Name"
                      placeholder="Enter name"
                      value={formik.values.employeeName}
                      onChange={formik.handleChange}
                      name="employeeName"
                    />{" "}
                    {formik.touched.employeeName &&
                      formik.errors.employeeName &&
                      typeof formik.errors.employeeName === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.employeeName}
                        </div>
                      )}
                  </div>
                  <div>
                    <CustomSelect
                      placeholder="Select Leave Type"
                      label="Leave Type"
                      value={formik.values.leaveType}
                      options={[
                        { value: "Casual Leave", label: "Casual Leave" },
                        { value: "Sick Leave", label: "Sick Leave" },
                        { value: "Annual Leave", label: "Annual Leave" },
                        { value: "Maternity Leave", label: "Maternity Leave" },
                        { value: "Paternity Leave", label: "Paternity Leave" },
                      ]}
                      onChange={(val) => formik.setFieldValue("leaveType", val)}
                    />
                    {formik.touched.leaveType &&
                      formik.errors.leaveType &&
                      typeof formik.errors.leaveType === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.leaveType}
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex-1 space-y-4 min-w-70">
                  <div>
                    <CustomDatePicker
                      label="Start Date"
                      value={formik.values.startDate}
                      onChange={(date) =>
                        formik.setFieldValue("startDate", date)
                      }
                    />
                    {formik.touched.startDate &&
                      formik.errors.startDate &&
                      typeof formik.errors.startDate === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.startDate}
                        </div>
                      )}
                  </div>

                  <div>
                    <CustomDatePicker
                      label="End Date"
                      value={formik.values.endDate}
                      onChange={(date) => formik.setFieldValue("endDate", date)}
                    />
                    {formik.touched.endDate &&
                      formik.errors.endDate &&
                      typeof formik.errors.endDate === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.endDate}
                        </div>
                      )}
                  </div>

                  <div>
                    {" "}
                    <CustomInput
                      label="Reason"
                      placeholder="Enter Reason"
                      value={formik.values.reason}
                      onChange={formik.handleChange}
                      name="reason"
                    />{" "}
                    {formik.touched.reason &&
                      formik.errors.reason &&
                      typeof formik.errors.reason === "string" && (
                        <div className="text-xs text-red-500">
                          * {formik.errors.reason}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={isloading}
                  className="h-10 w-full md:w-35 text-white bg-primary text-sm rounded-md gap-3 cursor-pointer flex justify-center items-center"
                >
                  {isloading ? (
                    <SyncLoader color="#fff" size={6} />
                  ) : editing ? (
                    "Update Leaves"
                  ) : (
                    "Add Leaves"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p
                onClick={() => setDeleteConfirmation(false)}
                className="cursor-pointer"
              >
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-60">
              <p className="text-2xl font-semibold text-center">
                Delete Distributor
              </p>
              <p className="text-center text-heading1">
                Are you sure to delete this distributor?
              </p>
            </div>
            <div className="flex justify-between gap-2 p-4 pt-0">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => setDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                className="h-10 w-25 cursor-pointer rounded-md text-white bg-[#FF0000]"
                onClick={handleDelete}
              >
                {isloadingDelete ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface StatusDropdownProps {
  initialValue: "Pending" | "Approved" | "Rejected";
  order: any;
  onStatusChange: (orderId: string, status: string, approvedBy: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  initialValue,
  order,
  onStatusChange,
}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>(initialValue);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<
    "Approved" | "Rejected" | null
  >(null);

  const { user } = useSelector((state: any) => state.user);

  const openConfirm = (status: "Approved" | "Rejected") => {
    setPendingStatus(status);
    setConfirmOpen(true);
    setOpen(false);
  };

  const handleConfirm = () => {
    if (!pendingStatus) return;

    const approvedBy = user?.employeeId;
    onStatusChange(order._id, pendingStatus, approvedBy);

    setStatus(pendingStatus);
    setConfirmOpen(false);
    setPendingStatus(null);
  };

  const statusStyles: { [key: string]: string } = {
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <>
      {/* STATUS DROPDOWN */}
      <div className="relative w-30">
        <div
          onClick={() => setOpen(!open)}
          className={`p-2 rounded cursor-pointer flex justify-between items-center ${statusStyles[status]}`}
        >
          {status}
          <Icon icon="formkit:down" height={18} width={18} />
        </div>

        {open && status === "Pending" && (
          <div className="absolute left-0 z-20 w-full mt-1 bg-white rounded drop-shadow-xl">
            <div
              onClick={() => openConfirm("Approved")}
              className="p-2 text-green-700 cursor-pointer hover:bg-gray-100"
            >
              Approve
            </div>
            <div
              onClick={() => openConfirm("Rejected")}
              className="p-2 text-red-700 cursor-pointer hover:bg-gray-100"
            >
              Reject
            </div>
          </div>
        )}
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#E5EBF7] mx-3 rounded-xl w-120">
            <div className="flex justify-between p-6">
              <p className="text-xl font-medium">Confirm {pendingStatus}</p>

              <p
                onClick={() => setConfirmOpen(false)}
                className="cursor-pointer text-primary"
              >
                {" "}
                ✕
              </p>
            </div>
            <div className="p-6 bg-white rounded-b-xl">
              <img src={Dummay} className="h-auto mx-auto mb-5 w-30" />

              <p className="text-[#131313] md:text-2xl text-base text-center">
                Are you sure to confirm the leaves?{" "}
              </p>
              <p className="text-[#7d7d7d] md:text-sm text-xs text-center">
                Once you confirm the approval it will not be revert
              </p>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => {
                    setConfirmOpen(false);
                    setPendingStatus(null);
                  }}
                  className="px-4 py-2 cursor-pointer bg-[#F2FAFD] rounded hover:bg-[#F2FAFD]"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirm}
                  className={`px-4 py-2 rounded cursor-pointer text-white ${
                    pendingStatus === "Approved"
                      ? "bg-[#0755E9] hover:bg-[#0755E9]"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
