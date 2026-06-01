import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";

export default function DefineEmployeeSalaryUpload() {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Define Employee Salary
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
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="basil:add-outline" className="text-lg" />
              Upload
            </button>

            <button
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-45"
            >
              <Icon icon="basil:add-outline" className="text-lg" />
              Download Template
            </button>
          </div>
        </div>

        <div className="w-full mt-2">
          <div className="p-4 bg-[#ECF0F4] rounded-t-2xl">
            <p className="text-xs font-semibold text-heading1">
              Pay Salary Increment Temp
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 bg-white p-9 rounded-b-2xl">
            <Icon
              icon="hugeicons:file-add"
              className="text-5xl text-heading1/36"
            />

            <p className="text-xl font-semibold text-heading1">Drag & Drop</p>

            <p className="text-xs font-normal text-heading1/36">
              Supported formats XLSX
            </p>

            {fileName ? (
              <p className="text-sm font-medium text-green-600">
                Selected: {fileName}
              </p>
            ) : null}

            <label
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            >
              Choose File
              <input
                type="file"
                accept=".xlsx,.xls"
                hidden
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-2">
            <p className="text-xs font-semibold text-primary">Increment_Temp</p>
          </div>

          <CustomTable
            norounded
            loading={false}
            height="auto"
            headers={[
              "Edit",
              "Employee ID",
              "Employee Name",
              "Current Salary",
              "Change %",
              "Change Amount",
              "New Salary",
              "Effective From Date",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="text-lg cursor-pointer text-primary"
                />,

                "EMP-1226",

                "Mohamed Sayah",

                "50,000",

                "20%",

                "10,000",

                "60,000",

                "20-May-2026",
              ],
            ]}
          />
        </div>
      </div>
    </>
  );
}
