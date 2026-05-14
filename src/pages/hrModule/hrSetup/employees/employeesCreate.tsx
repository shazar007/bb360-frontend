import { Icon } from "@iconify/react";
import CustomSelect from "../../../.../../../components/customSelect";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import { addEmployee } from "../../../../api/employeesServices";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomImagePicker from "../../../../components/customImagePicker";

export default function EmployeesCreate() {
  const [loading, setLoading] = useState(false);
  const { goBack } = useAppNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    religion: "",
    hireDate: "",
    fatherName: "",
    dob: "",
    cnic: "",
    city: "",
    image: "",
    country: "",
    phoneNumber: "",
    address: "",
    designation: "",
    employeeGrade: "",
    departmentName: "",
    locationName: "",
    employeeType: "",
    definePayroll: "",
    status: "",
  });
  const validateForm = () => {
    let newErrors: any = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key] = "This field is required";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      notifyError("Please fill all required fields");
      return false;
    }
    return true;
  };
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    const payload = {
      name: formData.name,
      gender: formData.gender,
      religion: formData.religion,
      hireDate: formData.hireDate,
      fatherName: formData.fatherName,
      dob: formData.dob,
      cnic: Number(formData.cnic),
      city: formData.city,
      country: formData.country,
      phoneNumber: Number(formData.phoneNumber),
      address: formData.address,
      designation: formData.designation,
      employeeGrade: formData.employeeGrade,
      departmentName: formData.departmentName,
      locationName: formData.locationName,
      employeeType: formData.employeeType,
      image: formData.image,
      definePayroll: formData.definePayroll,
      status: formData.status,
    };
    console.log("Payload =>", payload);
    try {
      setLoading(true);
      await addEmployee(payload);
      notifySuccess("Employee Created Successfully");
      // console.log("API Response =>", data);
    } catch (error: any) {
      console.log("API Error =>", error);
      notifyError(
        error?.response?.data?.message ||
          "Something went wrong while creating employee",
      );
    } finally {
      setLoading(false);
    }
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
              placeholder="Lorem Ipsum"
              value={formData.name}
              onChange={(e: any) => handleChange("name", e.target.value)}
            />

            <CustomSelect
              label="Gender"
              placeholder="Male / Female"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
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
              placeholder="12345-1234567-8"
              value={formData.cnic}
              onChange={(e: any) => handleChange("cnic", e.target.value)}
            />
            <CustomImagePicker
              label="Image"
              value={formData.image}
              placeholder="Pick Image"
              onChange={(file) => handleChange("image", file)}
            />
          </div>
        </div>

        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Email / Phone / Address
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 xl:gap-y-2 xl:gap-x-40.25 w-full lg:w-[46.5%]">
            <CustomInput
              label="City"
              placeholder="Enter City"
              value={formData.city}
              onChange={(e: any) => handleChange("city", e.target.value)}
            />
            <CustomInput
              label="Phone Number"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={(e: any) => handleChange("phoneNumber", e.target.value)}
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
            />
          </div>
        </div>
      </div>

      <div className="mt-2 bg-white rounded-2xl">
        <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
          <p className="text-xs font-semibold text-heading1">Job Detail</p>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25">
          <CustomSelect
            label="Designation"
            placeholder="Select Designation"
            value={formData.designation}
            onChange={(value: any) => handleChange("designation", value)}
            options={[
              { label: "Software Engineer", value: "software_engineer" },
              { label: "Frontend Developer", value: "frontend_developer" },
              { label: "Backend Developer", value: "backend_developer" },
              { label: "HR Manager", value: "hr_manager" },
            ]}
          />
          <CustomInput
            label="Department Name"
            placeholder="Enter Department Name"
            value={formData.departmentName}
            onChange={(e: any) =>
              handleChange("departmentName", e.target.value)
            }
          />
          <CustomSelect
            label="Employee Type"
            placeholder="Select Employee Type"
            value={formData.employeeType}
            onChange={(value: any) => handleChange("employeeType", value)}
            options={[
              { label: "Permanent", value: "permanent" },
              { label: "Contract", value: "contract" },
              { label: "Intern", value: "intern" },
              { label: "Part Time", value: "part_time" },
            ]}
          />
          <CustomInput
            label="Status"
            placeholder="Enter Status"
            value={formData.status}
            onChange={(e: any) => handleChange("status", e.target.value)}
          />{" "}
          <CustomDatePicker
            label="Employee Grade"
            placeholder="01-Mar-2026"
            value={formData.employeeGrade}
            onChange={(value: any) => handleChange("employeeGrade", value)}
          />
          <CustomInput
            label="Job Location"
            placeholder="Enter Location"
            value={formData.locationName}
            onChange={(e: any) => handleChange("locationName", e.target.value)}
          />
          <CustomSelect
            label="Define Payroll"
            placeholder="Select Payroll Type"
            value={formData.definePayroll}
            onChange={(value: any) => handleChange("definePayroll", value)}
            options={[
              { label: "Monthly Payroll", value: "monthly" },
              { label: "Weekly Payroll", value: "weekly" },
              { label: "Daily Wage", value: "daily" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
