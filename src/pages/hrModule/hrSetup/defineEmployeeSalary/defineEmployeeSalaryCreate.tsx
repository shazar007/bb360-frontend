import { Icon } from "@iconify/react";
<<<<<<< HEAD
import { useState } from "react";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";
=======
// import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
>>>>>>> 19e7878ec52d34d5cd49e0f1448c6fbd7fa11a83
import CustomDatePicker from "../../../../components/datePicker";
import CustomTable from "../../../../components/customTable";

export default function DefineEmployeeSalaryCreate() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",
    creationDate: "",
    salary: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.employee) {
      notifyError("Employee is required");
      return false;
    }

    if (!formData.creationDate) {
      notifyError("Creation Date is required");
      return false;
    }

    if (!formData.salary) {
      notifyError("Salary is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      employee_id: formData.employee,
      creationDate: formData.creationDate,
      salary: formData.salary,
    };

    console.log("Payload => ", payload);

    try {
      setLoading(true);

      // const response = await createEmployeeSalary(payload);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      notifySuccess("Employee Salary Created Successfully");

      console.log(payload);
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 bg-bgprimary rounded-2xl">
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Create Employee Salary
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
              style={{
                boxShadow: "0px 1px 12px 0px #0000001F",
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="mage:filter" className="text-lg" />
              Filters
            </button>

            <button
              style={{
                boxShadow: "0px 1px 12px 0px #0000001F",
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-40"
            >
              <Icon icon="basil:add-outline" className="text-lg" />
              Upload Increment
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                boxShadow: "0px 1px 12px 0px #0000001F",
              }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27 disabled:opacity-50"
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <Icon icon="basil:add-outline" className="text-lg" />
                  Create
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Employee Salary
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25">
            <CustomSelectSearch
              label="Employee"
              placeholder="Select Employee"
              value={formData.employee}
              onChange={(value: any) => handleChange("employee", value)}
              options={[
                {
                  label: "Ali Hassan",
                  value: "1",
                },
                {
                  label: "Bilal Ahmed",
                  value: "2",
                },
                {
                  label: "Usman Khan",
                  value: "3",
                },
              ]}
            />
            <CustomInput
              label="Salary"
              placeholder="Enter Salary"
              value={formData.salary}
              onChange={(value: any) => handleChange("salary", value)}
            />
            <CustomDatePicker
              label="Creation Date"
              value={formData.creationDate}
              onChange={(value: any) => handleChange("creationDate", value)}
            />
          </div>
        </div>
        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-3">
            <CustomTable
              loading={false}
              height="60vh"
              headers={[
                "Edit",
                "Employee ID",
                "Employee Name",
                "Creation Date",
                "Salary",
              ]}
              data={[
                [
                  <Icon
                    icon="basil:edit-outline"
                    className="text-lg cursor-pointer text-primary"
                  />,

                  "EMP-1226",

                  "Mohamed Sayah",
                  "13-March-2025",
                  "50,000",
                ],
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
