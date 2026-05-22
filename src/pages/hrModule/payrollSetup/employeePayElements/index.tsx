import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import PolicyRulesBuilder from "../../../../components/policyRulesBuilder";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { useQuery } from "@tanstack/react-query";
import CustomInput from "../../../../components/customInput";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { getAllEmployees } from "../../../../api/employeesServices";
const dummySalaryData = [
  {
    id: 1,
    employeeId: "EMP-121",
    employeeName: "Bilal Hassan",
    basicSalary: 65000,
    houseRentAllowance: 25000,
    medicalAllowance: 10000,
    fuelAllowance: 10000,
    providentFund: -5000,
    incomeTax: -9000,
    totalEarnings: 90000,
  },

  {
    id: 2,
    employeeId: "EMP-122",
    employeeName: "Ali Hassan",
    basicSalary: 50000,
    houseRentAllowance: 20000,
    medicalAllowance: 7000,
    fuelAllowance: 5000,
    providentFund: -4000,
    incomeTax: -6000,
    totalEarnings: 72000,
  },
];
export default function EmployeePayElements() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openPolicyBuilder, setOpenPolicyBuilder] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    employeeName: "",
    basicSalary: "",
    houseRentAllowance: "",
    medicalAllowance: "",
    fuelAllowance: "",
    providentFund: "",
    incomeTax: "",
    totalEarnings: "",
  });
  const { goTo } = useAppNavigate();
  // const { data, refetch } = useQuery({
  //   queryKey: ["salary-data"],
  //   queryFn: getAllSalaryData,
  // });

  const handleEdit = (item: any) => {
    setForm({
      employeeId: item.employeeId || "",
      employeeName: item.employeeName || "",
      basicSalary: item.basicSalary || "",
      houseRentAllowance: item.houseRentAllowance || "",
      medicalAllowance: item.medicalAllowance || "",
      fuelAllowance: item.fuelAllowance || "",
      providentFund: item.providentFund || "",
      incomeTax: item.incomeTax || "",
      totalEarnings: item.totalEarnings || "",
    });

    setOpenModal(true);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      // await updateSalary(editId, form);

      notifySuccess("Salary Updated Successfully");

      setOpenModal(false);

      // await refetch();
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    } finally {
      setLoading(false);
    }
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
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Employee Pay Elements
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

            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => setOpenPolicyBuilder(true)}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-3 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Policy Rules Builder
            </button>

            <button
              onClick={() => {
                goTo("/hr-module/payroll-setup/employee-pay-elements/create");
              }}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Add Elements
            </button>
          </div>
        </div>

        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

        {openPolicyBuilder && (
          <PolicyRulesBuilder onClose={() => setOpenPolicyBuilder(false)} />
        )}

        <div className="mt-3 bg-white rounded-2xl overflow-hidden">
          <CustomTable
            headers={[
              "Action",
              "Employee ID",
              "Employee Name",
              "Basic Salary",
              "House Rent Allowance",
              "Medical Allowance",
              "Fuel Allowance",
              "Provident Fund",
              "Income Tax",
              "Total Earnings",
            ]}
            data={dummySalaryData?.map((item) => [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
                onClick={() => handleEdit(item)}
              />,

              item.employeeId,

              item.employeeName,

              `Rs.${item.basicSalary.toLocaleString()}`,

              `Rs.${item.houseRentAllowance.toLocaleString()}`,

              `Rs.${item.medicalAllowance.toLocaleString()}`,

              `Rs.${item.fuelAllowance.toLocaleString()}`,

              `Rs.${item.providentFund.toLocaleString()}`,

              `Rs.${item.incomeTax.toLocaleString()}`,

              `Rs.${item.totalEarnings.toLocaleString()}`,
            ])}
          />
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Employee
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
              <CustomSelectSearch
                label="Employee"
                loading={isLoading}
                placeholder="Select Employee"
                value={form.employeeName}
                options={employeeOptions}
                onChange={(value: any) => {
                  const selectedEmployee = AllEmployee.find(
                    (emp: any) => emp._id === value,
                  );

                  setForm((prev) => ({
                    ...prev,

                    employee: value,

                    employeeId:
                      selectedEmployee?.employeeId ||
                      selectedEmployee?.employeeCode ||
                      "",
                  }));
                }}
              />

              <CustomInput
                type="text"
                label="Employee Id"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                placeholder="Employee ID"
                disabled
              />
              <CustomInput
                type="number"
                label="Basic Salary"
                name="basicSalary"
                value={form.basicSalary}
                onChange={handleChange}
                placeholder="Basic Salary"
              />
              <CustomInput
                type="number"
                label="House Rent Allowance"
                name="houseRentAllowance"
                value={form.houseRentAllowance}
                onChange={handleChange}
                placeholder="House Rent Allowance"
              />
              <CustomInput
                type="number"
                label="Medical Allowance"
                name="medicalAllowance"
                value={form.medicalAllowance}
                onChange={handleChange}
                placeholder="Medical Allowance"
              />
              <CustomInput
                type="number"
                label="Fuel Allowance"
                name="fuelAllowance"
                value={form.fuelAllowance}
                onChange={handleChange}
                placeholder="Fuel Allowance"
              />
              <CustomInput
                type="number"
                label="Provident Fund"
                name="providentFund"
                value={form.providentFund}
                onChange={handleChange}
                placeholder="Provident Fund"
              />
              <CustomInput
                type="number"
                label="Income Tax"
                name=""
                value={form.incomeTax}
                onChange={handleChange}
                placeholder="Income Tax"
              />
              <CustomInput
                type="number"
                name="totalEarnings"
                value={form.totalEarnings}
                onChange={handleChange}
                placeholder="Total Earnings"
              />
            </div>
            <div className="flex justify-end p-4">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex items-center justify-center cursor-pointer h-10 gap-2 px-8 text-white rounded-md bg-primary"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
