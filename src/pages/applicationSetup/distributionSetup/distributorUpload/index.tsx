import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { addDistributorApi } from "../../../../api/distributorServices";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { SyncLoader } from "react-spinners";
import type { AxiosError } from "axios";
const STORAGE_KEY = "temp_distributor_upload";
export default function DistributorUpload() {
  const [addDistributor, setAddDistributor] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileLoading, setFileLoading] = useState(false);
  const [saveRow, setSaveRow] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    itemCode: "",
    itemFullName: "",
    itemCategory: "",
    unitsType: "",
    tp: "",
    mrp: "",
    batchNumber: "",
    expiryDate: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTableData(JSON.parse(saved));
    } else {
      setTableData([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData || []));
  }, [tableData]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (!form.distributorName) {
        notifyError("Distributor Name is required");
        return;
      }

      setSaveRow(true);

      const newItem = {
        ...form,
        selected: false,
      };

      setTableData((prev) => {
        const updated = [...prev];

        if (editIndex !== null) {
          updated[editIndex] = newItem;
        } else {
          updated.push(newItem);
        }

        return updated;
      });

      setForm({
        distributorCode: "",
        distributorName: "",
        contactNumber: "",
        address: "",
        city: "",
        licenceNumber: "",
        licenceExpiryDate: "",
      });

      setEditIndex(null);
      setAddDistributor(false);

      notifySuccess(
        editIndex !== null ? "Updated Distributor" : "Added Distributor",
      );
    } catch (err) {
      notifyError("Something went wrong");
    } finally {
      setSaveRow(false);
    }
  };

  const [uploadLoading, setUploadLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setUploadLoading(true);

      if (!tableData.length) {
        notifyError("No data found");
        return;
      }

      let successCount = 0;
      let failCount = 0;

      for (let item of tableData) {
        if (!item.distributorName || !item.contactNumber) {
          failCount++;
          continue;
        }

        const requestBody = {
          distributorName: item.distributorName,
          contactNumber: item.contactNumber,
          address: item.address,
          city: item.city,
          licenceNumber: item.licenceNumber,
          licenceExpiryDate: item.licenceExpiryDate,
        };

        try {
          await addDistributorApi(requestBody);
          successCount++;
        } catch (err) {
          const error = err as AxiosError<any>;

          console.log("ERROR RESPONSE:", error.response?.data);

          notifyError(error.response?.data?.message || "Upload failed");
        }
      }

      if (successCount > 0) {
        notifySuccess(`${successCount} uploaded successfully`);
      }

      if (failCount > 0) {
        notifyError(`${failCount} failed`);
      }

      if (failCount === 0) {
        localStorage.removeItem(STORAGE_KEY);
        setTableData([]);
      }
    } catch (err) {
      notifyError("Something went wrong");
    } finally {
      setUploadLoading(false);
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
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

        console.log("RAW EXCEL DATA:", jsonData);

        const formatExcelDate = (val: any) => {
          if (!val) return "";

          if (typeof val === "string" && val.includes("/")) {
            const [m, d, y] = val.split("/");
            return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
          }

          if (typeof val === "number") {
            const excelEpoch = new Date(1899, 11, 30);
            const jsDate = new Date(excelEpoch.getTime() + val * 86400000);
            return jsDate.toISOString().split("T")[0];
          }

          const d = new Date(val);
          return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
        };

        const formatted = jsonData.map((row: any) => ({
          distributorName:
            row["distributor Name"] ||
            row["distributorName"] ||
            row["Distributor Name"] ||
            "",
          contactNumber:
            row["contactNumber"] || row["Contact Number"]
              ? String(row["contactNumber"])
              : "",
          address: row["Address"] || row["address"] || "",
          city: row["city"] || row["City"] || "",
          licenceNumber: row["licenceNumber"] || row["Licence Number"] || "",
          licenceExpiryDate: formatExcelDate(
            row["licenceExpiryDate"] ||
              row["licence Expiry Date"] ||
              row["Licence Expiry Date"],
          ),
          selected: false,
        }));

        console.log("FORMATTED:", formatted);

        setTableData([...formatted]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted));

        notifySuccess("File loaded successfully");
      } catch (err) {
        notifyError("Invalid file format");
      } finally {
        setFileLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  };
  const handleDownloadTemplate = () => {
    try {
      setDownloadLoading(true);

      const template = [
        {
          "Distributor Name": "",
          "Contact Number": "",
          Address: "",
          City: "",
          "Licence Number": "",
          "Licence Expiry Date": "",
        },
      ];

      const ws = XLSX.utils.json_to_sheet(template);
      const wb = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(wb, ws, "Template");

      XLSX.writeFile(wb, "distributor-template.xlsx");

      notifySuccess("Template downloaded");
    } catch (err) {
      notifyError("Failed to download template");
    } finally {
      setDownloadLoading(false);
    }
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Data Upload / Distributor Upload
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
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              {" "}
              {uploadLoading ? (
                <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
              ) : (
                <>
                  {" "}
                  <Icon icon="basil:add-outline" className="text-lg" />{" "}
                  Upload{" "}
                </>
              )}
            </button>
            <button
              onClick={handleDownloadTemplate}
              disabled={downloadLoading}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-45"
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
        <div className="w-full mt-2 ">
          <div className="p-4 bg-[#ECF0F4] rounded-t-2xl">
            <p className="text-xs font-semibold text-heading1">
              Upload Distributor
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
              <p className="text-sm font-medium text-primary">
                Uploading file...
              </p>
            ) : fileName ? (
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
                accept=".xlsx, .xls"
                hidden
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-2">
            <p className="text-xs font-semibold text-primary">
              Distributor_Temp
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAddDistributor(true);
                }}
                className="text-xs text-white bg-secondary rounded-md w-18 h-8.5 cursor-pointer"
              >
                Add Row
              </button>
            </div>
          </div>
          <CustomTable
            norounded
            height="auto"
            headers={[
              "Edit",
              "Distributor Name",
              "Contact Number",
              "Address",
              "City",
              "Licence Number",
              "Licence Expiry Date",
            ]}
            data={tableData.map((item: any, index: number) => [
              <Icon
                icon="basil:edit-outline"
                className="text-xl cursor-pointer text-primary"
                onClick={() => {
                  setForm(item);
                  setEditIndex(index);
                  setAddDistributor(true);
                }}
              />,
              item.distributorName,
              item.contactNumber,
              item.address,
              item.city,
              item.licenceNumber,
              item.licenceExpiryDate,
            ])}
          />
        </div>
      </div>
      {addDistributor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Add Distributor
              </h2>

              <button
                onClick={() => {
                  setAddDistributor(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 p-6 gap-y-4 gap-x-15">
              <CustomInput
                label="Distributor Name"
                name="distributorName"
                value={form.distributorName}
                onChange={handleChange}
              />{" "}
              <CustomInput
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
              <CustomInput
                label="Licence Number"
                name="licenceNumber"
                value={form.licenceNumber}
                onChange={handleChange}
              />
              <CustomInput
                label="Contact Number"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
              />
              <CustomDatePicker
                label="Licence Expiry Date"
                name="licenceExpiryDate"
                value={form.licenceExpiryDate}
                onChange={(value: any) =>
                  setForm((prev: any) => ({
                    ...prev,
                    licenceExpiryDate: value,
                  }))
                }
              />
              <CustomInput
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end p-4">
              <button
                onClick={handleSave}
                className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
              >
                {saveRow ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  <>
                    {" "}
                    <Icon icon="mynaui:save" className="text-xl" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-100 rounded-xl b">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p
                onClick={() => {
                  setTableData([]);
                  setConfirm(false);
                }}
                className="cursor-pointer"
              >
                {" "}
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-60">
              <p className="text-2xl font-semibold text-center">
                Delete Product
              </p>
              <p className="text-center text-heading1 ">
                Are you sure to delete the product?
              </p>
            </div>

            <div className="flex justify-between gap-2 p-4 mt-3">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => {
                  setTableData([]);
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  boxShadow: "0px 1px 12px 0px #0000001F",
                }}
                className="h-10 w-25 cursor-pointer rounded-md text-white bg-[#FF0000]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
