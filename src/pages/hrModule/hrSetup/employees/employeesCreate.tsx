import { Icon } from "@iconify/react";
import CustomSelect from "../../../.../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import {
  addEmployee,
  getAllEmployees,
} from "../../../../api/employeesServices";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomImagePicker from "../../../../components/customImagePicker";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import {
  getAllEmployeeDesignation,
  getAllEmployeeGrades,
  getAllEmployeeType,
  getAllWorkCalendar,
} from "../../../../api/hrServices";
import { useQuery } from "@tanstack/react-query";
import { getAllDepartments } from "../../../../api/classificationServices";

const fetchHROptions = async () => {
  const [typeRes, designationRes, gradesRes, workCalendarres, departmentRep] =
    await Promise.all([
      getAllEmployeeType(),
      getAllEmployeeDesignation(),
      getAllEmployeeGrades(),
      getAllWorkCalendar(),
      getAllDepartments(),
    ]);

  return {
    employeeTypeOptions: (typeRes?.data?.data || []).map((emp: any) => ({
      label: emp.name,
      value: emp._id,
    })),
    employeeDesignation: (designationRes?.data?.data || []).map((emp: any) => ({
      label: emp.name,
      value: emp._id,
    })),
    employeeGrades: (gradesRes?.data?.data || []).map((emp: any) => ({
      label: emp.gradeName,
      value: emp._id,
    })),
    workCalendar: (workCalendarres?.data?.data || []).map((emp: any) => ({
      label: emp.name,
      value: emp._id,
    })),

    departOption: (departmentRep?.data?.data || []).map((depar: any) => ({
      label: depar.fullName,
      value: depar._id,
    })),
  };
};

export default function EmployeesCreate() {
  const [loading, setLoading] = useState(false);
  const { goBack } = useAppNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    religion: "",
    dob: "",
    fatherName: "",
    profilePic: "",
    cnic: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    hireDate: "",
    definePayroll: "",
    designation: "",
    employeeGrade: "",
    employeeType: "",
    workCalendar: "",
    machineId: "",
    email: "",
    department: "",
    jobLocation: "",
  });
  const { refetch } = useQuery({
    queryKey: ["getAllEmployees"],
    queryFn: getAllEmployees,
  });
  const { data: hrOptions, isLoading: hrLoading } = useQuery({
    queryKey: ["hrOptions"],
    queryFn: fetchHROptions,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const {
    employeeTypeOptions = [],
    employeeDesignation = [],
    employeeGrades = [],
    workCalendar = [],
    departOption = [],
  } = hrOptions ?? {};

  const validateForm = () => {
    const hasEmpty = Object.values(formData).some((val) => !val);
    if (hasEmpty) {
      notifyError("Please fill all required fields");
      return false;
    }
    return true;
  };
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const payload = {
      ...formData,
    };
    try {
      setLoading(true);
      await addEmployee(payload);
      console.log("🚀 ~ payload:", payload);
      notifySuccess("Employee Created Successfully");
      refetch();
      goBack();
    } catch (error: any) {
      notifyError(
        error?.response?.data?.message ||
          "Something went wrong while creating employee",
      );
    } finally {
      setLoading(false);
    }
  };
  const loadingState = {
    designation: hrLoading,
    department: hrLoading,
    employeeType: hrLoading,
    workCalendar: hrLoading,
    employeeGrade: hrLoading,
  };
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Employees
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
            onClick={goBack}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleSubmit}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-28"
          >
            {loading ? (
              <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="basil:add-outline" className="text-lg" />
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
              Create Personal Information
            </p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25">
            <CustomInput
              label="Name"
              placeholder="Enter Employee Name"
              value={formData.name}
              onChange={(e: any) => handleChange("name", e.target.value)}
            />
            <CustomSelect
              label="Gender"
              placeholder="Male / Female"
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
              value={formData.gender}
              onChange={(value: any) => handleChange("gender", value)}
            />
            <CustomInput
              label="Religion"
              placeholder="Islam"
              value={formData.religion}
              onChange={(e: any) => handleChange("religion", e.target.value)}
            />
            <CustomDatePicker
              label="Hire Date"
              placeholder="01-Mar-2026"
              value={formData.hireDate}
              onChange={(value: any) => handleChange("hireDate", value)}
            />
            <CustomInput
              label="Father Name"
              placeholder="Lorem Ipsum"
              value={formData.fatherName}
              onChange={(e: any) => handleChange("fatherName", e.target.value)}
            />
            <CustomDatePicker
              label="DOB"
              placeholder="01-Mar-2026"
              value={formData.dob}
              onChange={(value: any) => handleChange("dob", value)}
            />
            <CustomInput
              label="CNIC"
              placeholder="1234512345678"
              value={formData.cnic}
              onChange={(e: any) => handleChange("cnic", e.target.value)}
            />
            <CustomImagePicker
              label="Profile Image"
              value={formData.profilePic}
              placeholder="Pick Image"
              onChange={(file) => handleChange("profilePic", file)}
            />
          </div>
        </div>

        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Email / Phone / Address
            </p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-40.25 ">
            <CustomInput
              label="City"
              placeholder="Enter City"
              value={formData.city}
              onChange={(e: any) => handleChange("city", e.target.value)}
            />
            <CustomInput
              label="Phone Number"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={(e: any) => handleChange("phone", e.target.value)}
            />
            <CustomInput
              label="Country"
              placeholder="Enter Country"
              value={formData.country}
              onChange={(e: any) => handleChange("country", e.target.value)}
            />
            <CustomInput
              label="Address"
              placeholder="Lorem Ipsum"
              value={formData.address}
              onChange={(e: any) => handleChange("address", e.target.value)}
            />{" "}
            <CustomInput
              label="Email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e: any) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-2 bg-white rounded-2xl">
        <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
          <p className="text-xs font-semibold text-heading1">Job Detail</p>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25">
          <CustomSelectSearch
            label="Designation"
            placeholder="Select Designation"
            value={formData.designation}
            onChange={(value: any) => handleChange("designation", value)}
            options={employeeDesignation}
            loading={loadingState.designation}
          />
          <CustomSelectSearch
            label="Department Name"
            options={departOption}
            loading={loadingState.department}
            placeholder="Select Department"
            value={formData.department}
            onChange={(value: any) => handleChange("department", value)}
          />
          <CustomSelectSearch
            label="Employee Type"
            loading={hrLoading}
            options={employeeTypeOptions}
            placeholder="Select Employee Type"
            value={formData.employeeType}
            onChange={(value: any) => handleChange("employeeType", value)}
          />
          <CustomSelectSearch
            label="Work Calendar"
            placeholder="Select workCalendar"
            value={formData.workCalendar}
            onChange={(value: any) => handleChange("workCalendar", value)}
            options={workCalendar}
            loading={hrLoading}
          />
          <CustomSelectSearch
            label="Employee Grade"
            placeholder="Select Grade"
            loading={hrLoading}
            options={employeeGrades}
            value={formData.employeeGrade}
            onChange={(value: any) => handleChange("employeeGrade", value)}
          />
          <CustomInput
            label="Job Location"
            placeholder="Enter Location"
            value={formData.jobLocation}
            onChange={(e: any) => handleChange("jobLocation", e.target.value)}
          />
          <CustomSelect
            label="Define Payroll"
            placeholder="Select Payroll Type"
            value={formData.definePayroll}
            onChange={(value: any) => handleChange("definePayroll", value)}
            options={[
              { label: "Daily Wages", value: "daily wages" },
              { label: "Hourly Wages", value: "hourly wages" },
              {
                label: "Regular Monthly Payroll",
                value: "regular monthly payroll",
              },
            ]}
          />{" "}
          <CustomInput
            label="Employee Mechine No"
            placeholder="Employee Mechine No"
            value={formData.machineId}
            onChange={(e: any) => handleChange("machineId", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
