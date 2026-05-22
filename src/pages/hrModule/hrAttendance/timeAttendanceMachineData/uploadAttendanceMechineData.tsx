import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import * as XLSX from "xlsx";
import CustomTable from "../../../../components/customTable";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { uploadAttendance } from "../../../../api/hrServices";
import { useAppNavigate } from "../../../../hooks/navigation";

interface AttendanceRow {
  employeeMachineNumber: string;
  attendanceDate: string;
  attendanceTime: string;
  attendanceMode: string;
  machineIP: string;
}

export default function UploadAttendanceMachineData() {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileLoading, setFileLoading] = useState(false);
  const [tableData, setTableData] = useState<AttendanceRow[]>([]);
  const { goBack } = useAppNavigate();
  const handleDownloadTemplate = () => {
    setDownloadLoading(true);
    try {
      const sampleData = [
        {
          employeeMachineNumber: "mch-1001",
          attendanceDate: "2024-05-23",
          attendanceTime: "09:00",
          attendanceMode: "IN",
          machineIP: "192.168.1.101",
        },
      ];
      const ws = XLSX.utils.json_to_sheet(sampleData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Attendance");
      XLSX.writeFile(wb, "attendance_template.xlsx");
      notifySuccess("Template downloaded");
    } catch (err) {
      notifyError("Failed to download template");
    } finally {
      setDownloadLoading(false);
    }
  };

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

        const rows: AttendanceRow[] = rawRows.map((row) => ({
          employeeMachineNumber: row.employeeMachineNumber || "",
          attendanceDate: row.attendanceDate || "",
          attendanceTime: row.attendanceTime || "",
          attendanceMode: row.attendanceMode || "",
          machineIP: row.machineIP || "",
        }));

        const required = [
          "employeeMachineNumber",
          "attendanceDate",
          "attendanceTime",
          "attendanceMode",
          "machineIP",
        ];
        const firstRow: any = rows[0] || {};
        const missing = required.filter((k) => !(k in firstRow));
        if (missing.length > 0) {
          notifyError(`Missing columns: ${missing.join(", ")}`);
          setFileLoading(false);
          setFileName("");
          return;
        }

        setTableData(rows);
        localStorage.setItem("attendance_upload_data", JSON.stringify(rows));
        notifySuccess(`${rows.length} records loaded from file`);
      } catch (err) {
        notifyError("Failed to parse file. Please use the correct template.");
        setFileName("");
      } finally {
        setFileLoading(false);
        e.target.value = "";
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    if (tableData.length === 0) {
      notifyError("Please select and parse a file first");
      return;
    }

    try {
      setUploadLoading(true);
      await uploadAttendance(tableData);
      notifySuccess(`${tableData.length} records uploaded successfully`);
      setTableData([]);
      setFileName("");
      localStorage.removeItem("attendance_upload_data");
    } catch (error: any) {
      notifyError(
        error?.response?.data?.message ||
          error?.message ||
          "Upload failed. Please try again.",
      );
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <>
      <div className="mt-2">
        {/* ── Header ── */}
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Data Upload / Attendance Machine Data
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
            </div>{" "}
            <button
              onClick={goBack}
              className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>
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

        {/* ── File Drop Area ── */}
        <div className="w-full mt-2">
          <div className="p-4 bg-[#ECF0F4] rounded-t-2xl">
            <p className="text-xs font-semibold text-heading1">
              Upload Attendance Machine Data
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 bg-white p-9 rounded-b-2xl">
            <Icon
              icon="hugeicons:file-add"
              className="text-5xl text-heading1/36"
            />
            <p className="text-xl font-semibold text-heading1">Drag & Drop</p>
            <p className="text-xs font-normal text-heading1/36">
              Supported formats: XLSX
            </p>

            {fileLoading ? (
              <p className="text-sm font-medium text-primary">
                Reading file...
              </p>
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
                accept=".xlsx, .xls, .csv"
                hidden
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
        {tableData.length > 0 && (
          <div className="pb-4 mt-2 bg-white rounded-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#304250]/10">
              <p className="text-xs font-semibold text-primary">
                Preview — {tableData.length} Records
              </p>
              <button
                onClick={() => {
                  setTableData([]);
                  setFileName("");
                  localStorage.removeItem("attendance_upload_data");
                }}
                className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-md cursor-pointer"
              >
                <Icon icon="proicons:delete" className="text-lg" />
              </button>
            </div>
            <CustomTable
              norounded
              height="auto"
              headers={[
                "Machine Number",
                "Attendance Date",
                "Attendance Time",
                "Attendance Mode",
                "Machine IP",
              ]}
              data={tableData.map((item) => [
                item.employeeMachineNumber || "-",
                item.attendanceDate || "-",
                item.attendanceTime || "-",
                item.attendanceMode || "-",
                item.machineIP || "-",
              ])}
            />
          </div>
        )}
      </div>
    </>
  );
}
