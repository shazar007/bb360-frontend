import { Icon } from "@iconify/react";
import CustomSelect from "../../../.../../../components/customSelect";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../../api/employeesServices";
import CustomCheckbox from "../../../../components/customCheckbox";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomDatePicker from "../../../../components/datePicker";
import { addEmployeePerformanceEvaluation } from "../../../../api/hrServices";
import { SyncLoader } from "react-spinners";

const tabs = ["Employee Evaluation Lines"];

export default function EmployeePerformanceEvaluationCreate() {
  const navigate = useAppNavigate();
  const [activeTab, setActiveTab] = useState("Employee Evaluation Lines");
  const [openModel, setOpenModel] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    transactionDate: "",
    supervisor: "",
  });
  const [rowForm, setRowForm] = useState({
    criteria: "",
    parent: "",
    total: "",
    score: "",
    comment: "",
  });

  const [tableRows, setTableRows] = useState<any[]>([]);
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

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRowChange = (key: string, value: any) => {
    setRowForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddRow = () => {
    if (
      !rowForm.criteria ||
      !rowForm.parent ||
      !rowForm.total ||
      !rowForm.score
    ) {
      notifyError("Please fill all required fields");
      return;
    }

    setTableRows((prev) => [...prev, rowForm]);

    notifySuccess("Row added successfully");

    setRowForm({
      criteria: "",
      parent: "",
      total: "",
      score: "",
      comment: "",
    });

    setOpenModel(false);
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      notifyError("Please select row first");
      return;
    }

    const filtered = tableRows.filter(
      (_: any, index: number) => !selectedRows.includes(index),
    );

    setTableRows(filtered);

    setSelectedRows([]);

    notifySuccess("Selected rows deleted");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addEmployeePerformanceEvaluation,

    onSuccess: () => {
      notifySuccess("Performance Evaluation created successfully");

      navigate.goBack();
    },

    onError: (err: any) => {
      console.log(err);
      notifyError("Something went wrong");
    },
  });

  const handleSave = () => {
    if (!formData.employeeId) {
      notifyError("Employee is required");
      return;
    }

    if (!formData.transactionDate) {
      notifyError("Transaction date is required");
      return;
    }

    if (!formData.supervisor) {
      notifyError("Supervisor is required");
      return;
    }

    if (tableRows.length === 0) {
      notifyError("Please add at least one row");
      return;
    }

    const payload = {
      employeeId: formData.employeeId,
      transactionDate: formData.transactionDate,
      supervisor: formData.supervisor,
      evaluationLines: tableRows,
    };

    console.log("Payload =>", payload);

    mutate(payload);
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Create Employee Performance Evaluation
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <button
              onClick={() => navigate.goBack()}
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
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary disabled:opacity-50"
            >
              <Icon icon="mynaui:save" className="w-5 h-5" />
              {isPending ? (
                <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-2 bg-white rounded-2xl">
            <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
              <p className="text-xs font-semibold text-heading1">
                Create Performance Criteria
              </p>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25 xl:w-260 lg:w-full gap-y-2">
              <CustomSelectSearch
                label="Employee"
                loading={isLoading}
                placeholder="Select Employee"
                value={formData.employeeId}
                options={employeeOptions}
                onChange={(value: any) => handleChange("employeeId", value)}
              />

              <CustomDatePicker
                label="Transaction Date"
                placeholder="01-Mar-2026"
                value={formData.transactionDate}
                onChange={(e: any) =>
                  handleChange("transactionDate", e?.target?.value || e)
                }
              />

              <CustomSelect
                label="Supervisor"
                value={formData.supervisor}
                options={[
                  {
                    label: "Ahamd",
                    value: "Ahamd",
                  },
                  {
                    label: "Ali",
                    value: "Ali",
                  },
                ]}
                placeholder="Enter supervisor"
                onChange={(value: any) => handleChange("supervisor", value)}
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
                  onClick={handleDeleteSelected}
                  className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-md cursor-pointer"
                >
                  <Icon icon="proicons:delete" />
                </button>

                <button
                  onClick={() => {
                    setOpenModel(true);
                  }}
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
                "Select",
                "Criteria",
                "Parent",
                "Total",
                "Comment",
                "Score",
              ]}
              data={tableRows.map((item: any, index: number) => [
                <CustomCheckbox
                  checked={selectedRows.includes(index)}
                  onChange={() => handleSelectRow(index)}
                />,

                item.criteria,
                item.parent,
                item.total,
                item.comment,
                item.score,
              ])}
            />
          )}
        </div>
      </div>
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3 max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">Add Row</h2>

              <button
                onClick={() => {
                  setOpenModel(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 p-4 gap-x-10 gap-y-5">
              <CustomInput
                label="Criteria"
                placeholder="Enter Criteria"
                value={rowForm.criteria}
                onChange={(e: any) =>
                  handleRowChange("criteria", e.target.value)
                }
              />

              <CustomInput
                label="Parent"
                placeholder="Enter Parent"
                value={rowForm.parent}
                onChange={(e: any) => handleRowChange("parent", e.target.value)}
              />

              <CustomInput
                label="Total"
                placeholder="Enter Total"
                value={rowForm.total}
                onChange={(e: any) => handleRowChange("total", e.target.value)}
              />

              <CustomInput
                label="Score"
                placeholder="Enter Score"
                value={rowForm.score}
                onChange={(e: any) => handleRowChange("score", e.target.value)}
              />

              <CustomInput
                label="Comment"
                placeholder="Enter Comment"
                value={rowForm.comment}
                onChange={(e: any) =>
                  handleRowChange("comment", e.target.value)
                }
              />
            </div>

            <div className="flex justify-end p-4 border-t">
              <button
                onClick={handleAddRow}
                className="h-10 px-6 text-sm cursor-pointer text-white rounded-md bg-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
