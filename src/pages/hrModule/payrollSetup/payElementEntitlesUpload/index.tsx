import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import * as XLSX from "xlsx";
import CustomTable from "../../../../components/customTable";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  getAllPayElementEntries,
  uploadPayElementEntries,
} from "../../../../api/hrServices";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";

interface PayElementRow {
  employee: string;
  basicSalary: number;
  houseRentAllowance: number;
  medicalAllowance: number;
  fuelAllowance: number;
  providentFund: number;
  incomeTax: number;
}

const STORAGE_KEY = "pay_element_entries_data";

export default function PayElementEntitlesUpload() {
  const [fileName, setFileName] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const { goTo } = useAppNavigate();
  const [tableData, setTableData] = useState<PayElementRow[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const handleDownloadTemplate = () => {
    setDownloadLoading(true);
    try {
      const sample = [
        {
          employee: "",

          basicSalary: 0,
          houseRentAllowance: 0,
          medicalAllowance: 0,
          fuelAllowance: 0,
          providentFund: 0,
          incomeTax: 0,
        },
      ];

      const ws = XLSX.utils.json_to_sheet(sample);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "PayElements");

      XLSX.writeFile(wb, "pay_elements_template.xlsx");

      notifySuccess("Template downloaded");
    } catch {
      notifyError("Failed to download template");
    } finally {
      setDownloadLoading(false);
    }
  };

  // ================= FILE UPLOAD =================
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileLoading(true);
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rawRows: any[] = XLSX.utils.sheet_to_json(sheet);

        const rows: PayElementRow[] = rawRows.map((row) => ({
          employee: String(row.employee || ""),

          basicSalary: Number(row.basicSalary || 0),
          houseRentAllowance: Number(row.houseRentAllowance || 0),
          medicalAllowance: Number(row.medicalAllowance || 0),
          fuelAllowance: Number(row.fuelAllowance || 0),
          providentFund: Number(row.providentFund || 0),
          incomeTax: Number(row.incomeTax || 0),
        }));

        setTableData(rows);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));

        notifySuccess(`${rows.length} records loaded`);
      } catch {
        notifyError("Invalid file format");
        setFileName("");
      } finally {
        setFileLoading(false);
        e.target.value = "";
      }
    };

    reader.readAsArrayBuffer(file);
  };
  const { refetch } = useQuery({
    queryKey: ["getAllPayElementEntries"],
    queryFn: getAllPayElementEntries,
  });
  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (tableData.length === 0) {
      notifyError("Please select file first");
      return;
    }

    try {
      setUploadLoading(true);
      if (!tableData?.length) {
        notifyError("No data to upload");
        return;
      }
      await uploadPayElementEntries(tableData);
      notifySuccess("Uploaded successfully");
      refetch();
      setTableData([]);
      setFileName("");
      goTo("/hr-module/payroll-setup/employee-pay-elements");

      localStorage.removeItem(STORAGE_KEY);
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Upload failed");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Pay Element Entries Upload
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
            onClick={handleUpload}
            disabled={uploadLoading}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27 disabled:opacity-60"
          >
            {uploadLoading ? (
              <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="basil:add-outline" className="text-lg" />
                Upload
              </>
            )}
          </button>

          <button
            onClick={handleDownloadTemplate}
            disabled={downloadLoading}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-45 disabled:opacity-60"
          >
            {downloadLoading ? (
              <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="basil:add-outline" className="text-lg" />
                Download Template
              </>
            )}
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

          {fileLoading ? (
            <p className="text-sm font-medium text-primary">Reading file...</p>
          ) : fileName ? (
            <p className="text-sm font-medium text-green-600">
              ✓ Selected: {fileName} ({tableData.length} records)
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

      <CustomTable
        norounded
        loading={fileLoading}
        height="55vh"
        headers={[
          "Employee ID",
          "Basic Salary",
          "House Rent Allowance",
          "Medical Allowance",
          "Fuel Allowance",
          "Provident Fund",
          "Income Tax",
        ]}
        data={tableData.map((item) => [
          item.employee || "-",
          `Rs.${Number(item.basicSalary || 0).toLocaleString()}`,
          `Rs.${Number(item.houseRentAllowance || 0).toLocaleString()}`,
          `Rs.${Number(item.medicalAllowance || 0).toLocaleString()}`,
          `Rs.${Number(item.fuelAllowance || 0).toLocaleString()}`,
          `Rs.${Number(item.providentFund || 0).toLocaleString()}`,
          `Rs.${Number(item.incomeTax || 0).toLocaleString()}`,
        ])}
      />
    </div>
  );
}
