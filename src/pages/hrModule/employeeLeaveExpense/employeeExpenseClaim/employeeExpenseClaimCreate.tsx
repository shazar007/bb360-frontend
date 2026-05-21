import { Icon } from "@iconify/react";
import CustomSelect from "../../../.../../../components/customSelect";
import CustomDate from "../../../.../../../components/datePicker";
import { useEffect, useState } from "react";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomCheckbox from "../../../../components/customCheckbox";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { getAllEmployees } from "../../../../api/employeesServices";
import { getAllDepartments } from "../../../../api/classificationServices";
import {
  addExpenseClaim,
  getAllExpenseClaim,
} from "../../../../api/hrServices";

const tabs = ["Employee Evaluation Lines", "System Information", "Attachments"];

export default function EmployeeExpenseClaimCreate() {
  const { goBack } = useAppNavigate();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("Employee Evaluation Lines");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    department: "",
    status: "",
    expenseDate: "",
    location: "",
  });
  const [rowForm, setRowForm] = useState({
    employeeName: "",
    expenseCategory: "",
    expenseAmount: "",
    criteria: "",
    total: "",
  });

  const { refetch } = useQuery({
    queryKey: ["getAllExpenseClaim"],
    queryFn: getAllExpenseClaim,
  });

  useEffect(() => {
    const storedRows = localStorage.getItem("expenseClaimRows");
    if (storedRows) {
      setRows(JSON.parse(storedRows));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenseClaimRows", JSON.stringify(rows));
  }, [rows]);

  const handleAddRow = () => {
    if (!rowForm.employeeName) {
      return notifyError("Employee Name is required");
    }
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = rowForm;
      setRows(updatedRows);
      localStorage.setItem("expenseClaimRows", JSON.stringify(updatedRows));
      notifySuccess("Row Updated Successfully");
      setEditIndex(null);
    } else {
      const updatedRows = [...rows, rowForm];
      setRows(updatedRows);
      localStorage.setItem("expenseClaimRows", JSON.stringify(updatedRows));
      notifySuccess("Row Added Successfully");
    }
    setRowForm({
      employeeName: "",
      expenseCategory: "",
      expenseAmount: "",
      criteria: "",
      total: "",
    });

    setOpenModal(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        ...formData,
        rows,
      };
      await addExpenseClaim(payload);
      notifySuccess("Expense Claim Created");
      localStorage.removeItem("expenseClaimRows");
      setRows([]);
      await refetch();
      goBack();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleCheckbox = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };
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
  const { data: alldepartment, isLoading: departLoading } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: getAllDepartments,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const AllgetDepartment: any[] = alldepartment?.data?.data || [];
  const departmentOptions = AllgetDepartment.map((emp: any) => ({
    label: emp.fullName,
    value: emp._id,
  }));
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Employee Expense Claim
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={goBack}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            {loading ? (
              <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="mynaui:save" className="w-5 h-5" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Employee Expense Claim
            </p>
          </div>

          <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10 lg:gapx-x-29.25 gap-y-4">
            <CustomSelectSearch
              label="Department"
              loading={departLoading}
              placeholder="Select Department"
              value={formData.department}
              options={departmentOptions}
              onChange={(value: any) =>
                setFormData({ ...formData, department: value })
              }
            />

            <CustomSelect
              label="Status"
              placeholder="Select Status"
              value={formData.status}
              options={[
                { label: "Pending", value: "Pending" },
                { label: "Approved", value: "Approved" },
                { label: "Rejected", value: "Rejected" },
                { label: "In Progress", value: "In Progress" },
              ]}
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  status: value,
                })
              }
            />

            <CustomDate
              label="Expense Date"
              value={formData.expenseDate}
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  expenseDate: value,
                })
              }
            />
            <CustomSelect
              label="Location"
              placeholder="Select Location"
              value={formData.location}
              options={[
                { label: "Head Office", value: "Head Office" },
                { label: "Branch Office", value: "Branch Office" },
                { label: "Warehouse", value: "Warehouse" },
                { label: "Remote", value: "Remote" },
                { label: "Client Site", value: "Client Site" },
              ]}
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  location: value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-3 bg-white rounded-2xl">
        <div className="flex flex-wrap items-center gap-4 p-4">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <p
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs sm:text-sm cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "text-primary font-medium"
                    : "text-heading1"
                }`}
              >
                {tab}
              </p>
            ))}
          </div>

          {activeTab === "Employee Evaluation Lines" && (
            <div className="flex items-center justify-end w-full gap-2 ml-auto sm:w-auto">
              <button
                onClick={() => {
                  const filteredRows = rows.filter(
                    (_: any, index: number) => !selectedRows.includes(index),
                  );

                  setRows(filteredRows);

                  setSelectedRows([]);

                  localStorage.setItem(
                    "expenseClaimRows",
                    JSON.stringify(filteredRows),
                  );

                  notifySuccess("Selected Rows Deleted");
                }}
                className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-md cursor-pointer"
              >
                <Icon icon="proicons:delete" />
              </button>

              <button
                onClick={() => setOpenModal(true)}
                className="h-8 px-3 text-xs text-white rounded-md cursor-pointer sm:text-sm bg-secondary"
              >
                Add Row
              </button>
            </div>
          )}
        </div>
        {activeTab === "Employee Evaluation Lines" && (
          <CustomTable
            norounded
            headers={[
              "Edit",
              "Select",
              "Employee Name",
              "Expense Category",
              "Expense Amount",
              "Criteria",
              "Total",
            ]}
            data={rows.map((row: any, index) => [
              <Icon
                icon="basil:edit-outline"
                className="text-xl cursor-pointer text-primary"
                onClick={() => {
                  setRowForm(row);
                  setEditIndex(index);
                  setOpenModal(true);
                }}
              />,
              <CustomCheckbox
                checked={selectedRows.includes(index)}
                onChange={() => handleCheckbox(index)}
              />,
              row.employeeName,
              row.expenseCategory,
              row.expenseAmount,
              row.criteria,
              row.total,
            ])}
          />
        )}
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3  max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                {editIndex !== null
                  ? "Update Employee Expense Claim"
                  : "Create Employee Expense Claim"}
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                  setEditIndex(null);

                  setRowForm({
                    employeeName: "",
                    expenseCategory: "",
                    expenseAmount: "",
                    criteria: "",
                    total: "",
                  });
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 mt-4 md:grid-cols-2">
              <CustomSelectSearch
                label="Employee Name"
                loading={isLoading}
                placeholder="Select Employee"
                value={rowForm.employeeName}
                options={employeeOptions}
                onChange={(value: any) =>
                  setRowForm({
                    ...rowForm,
                    employeeName: value,
                  })
                }
              />
              <CustomInput
                label="Expense Category"
                value={rowForm.expenseCategory}
                onChange={(e: any) =>
                  setRowForm({
                    ...rowForm,
                    expenseCategory: e.target.value,
                  })
                }
              />

              <CustomInput
                label="Expense Amount"
                value={rowForm.expenseAmount}
                onChange={(e: any) =>
                  setRowForm({
                    ...rowForm,
                    expenseAmount: e.target.value,
                  })
                }
              />

              <CustomInput
                label="Criteria"
                value={rowForm.criteria}
                onChange={(e: any) =>
                  setRowForm({
                    ...rowForm,
                    criteria: e.target.value,
                  })
                }
              />

              <CustomInput
                label="Total"
                value={rowForm.total}
                onChange={(e: any) =>
                  setRowForm({
                    ...rowForm,
                    total: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2 p-4">
              <button
                onClick={handleAddRow}
                className="h-10 px-6 text-white rounded-md cursor-pointer bg-primary"
              >
                {editIndex !== null ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
