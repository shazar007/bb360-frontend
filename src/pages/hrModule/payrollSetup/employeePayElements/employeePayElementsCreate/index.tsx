import { Icon } from "@iconify/react";
import CustomInput from "../../../../../components/customInput";
import { useAppNavigate } from "../../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../../components/toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import CustomSelectSearch from "../../../../../components/customSelectSearch";
import {
  addPayElementEntries,
  getAllPayElementEntries,
} from "../../../../../api/hrServices";
import { selectEmployees } from "../../../../../redux/store";
import { useSelector } from "react-redux";
type FormState = {
  employee: string;
  houseRentAllowance: number;
  fuelAllowance: number;
  incomeTax: number;
  basicSalary: number;
  medicalAllowance: number;
  providentFund: number;
};
export default function EmployeePayElementsCreate() {
  const { goBack } = useAppNavigate();
  const { refetch } = useQuery({
    queryKey: ["getAllPayElementEntries"],
    queryFn: getAllPayElementEntries,
  });
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    employee: "",
    houseRentAllowance: 0,
    fuelAllowance: 0,
    incomeTax: 0,
    basicSalary: 0,
    medicalAllowance: 0,
    providentFund: 0,
  });
  const handleChange2 = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? 0 : Number(value),
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await addPayElementEntries(form);
      notifySuccess("Employee Pay Elements Added Successfully");
      refetch();
      goBack();
    } catch (error: any) {
      console.log(error);
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const employees = useSelector(selectEmployees);

  const employeeOptions = employees.map((emp) => ({
    label: emp.name,
    value: emp._id,
  }));
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Employee Pay Elements
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
            onClick={handleSave}
            disabled={loading}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary disabled:opacity-50"
          >
            {loading ? (
              <SyncLoader color="#fff" size={8} />
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
        <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
          <p className="text-xs font-semibold text-heading1">
            Create Employee Pay Elements
          </p>
        </div>
        <div className="bg-white rounded-b-2xl">
          <div className="p-4 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25 xl:w-7xl lg:w-230 gap-y-2">
            <CustomSelectSearch
              label="Employee Name"
              loading={employees.length === 0}
              placeholder="Select Employee"
              options={employeeOptions}
              value={form.employee}
              onChange={(option: any) =>
                handleChange2("employee", option?.value ?? option)
              }
            />
            <CustomInput
              label="House Rent Allowance"
              name="houseRentAllowance"
              value={form.houseRentAllowance}
              onChange={handleChange}
              placeholder="Rs.60,000"
            />

            <CustomInput
              label="Fuel Allowance"
              name="fuelAllowance"
              value={form.fuelAllowance}
              onChange={handleChange}
              placeholder="Rs.60,000"
            />

            <CustomInput
              label="Income Tax"
              name="incomeTax"
              value={form.incomeTax}
              onChange={handleChange}
              placeholder="Rs.60,000"
            />

            <CustomInput
              label="Basic Salary"
              name="basicSalary"
              value={form.basicSalary}
              onChange={handleChange}
              placeholder="Rs.60,000"
            />

            <CustomInput
              label="Medical Allowance"
              name="medicalAllowance"
              value={form.medicalAllowance}
              onChange={handleChange}
              placeholder="Rs.60,000"
            />

            <CustomInput
              label="Provident Fund"
              name="providentFund"
              value={form.providentFund}
              onChange={handleChange}
              placeholder="Rs.60,000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
