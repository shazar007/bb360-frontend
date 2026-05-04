import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useEffect, useState } from "react";
import CustomCheckbox from "../../../../components/customCheckbox";
import { addItems } from "../../../../api/itemServices";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import CustomDatePicker from "../../../../components/datePicker";
import { SyncLoader } from "react-spinners";
import type { AxiosError } from "axios";
import * as XLSX from "xlsx";
const STORAGE_KEY = "temp_items_upload";

export default function DataUpload() {
  const [addItem, setAddItem] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileLoading, setFileLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
    itemName: "",
    itemCategory: "",
    uom: "",
    tp: "",
    mrp: "",
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData));
  }, [tableData]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.itemName) {
      notifyError("Please fill required fields");
      return;
    }

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
      itemName: "",
      itemCategory: "",
      uom: "",
      tp: "",
      mrp: "",
      expiryDate: "",
    });

    setEditIndex(null);
    setAddItem(false);

    notifySuccess(editIndex !== null ? "Item updated" : "Item added");
  };
  const handleDelete = () => {
    const isAnySelected = tableData.some((item) => item.selected);

    if (!isAnySelected) {
      notifyError("Please select at least one item first");
      return;
    }

    const filtered = tableData.filter((item) => !item.selected);
    setTableData(filtered);
    setConfirm(false);

    notifySuccess("Selected items deleted");
  };

  const toggleSelect = (index: number, value: boolean) => {
    const updated = [...tableData];
    updated[index].selected = value;
    setTableData(updated);
  };
  const formatExcelDate = (val: any) => {
    if (!val) return null;

    if (typeof val === "string" && val.includes("-")) {
      return val;
    }

    if (typeof val === "string" && val.includes("/")) {
      const [month, day, year] = val.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    if (typeof val === "number") {
      const excelEpoch = new Date(1899, 11, 30);
      const jsDate = new Date(excelEpoch.getTime() + val * 86400000);

      return jsDate.toISOString().split("T")[0];
    }
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split("T")[0];
    }

    return null;
  };
  const handleUpload = async () => {
    try {
      if (!tableData.length) {
        notifyError("No data to upload");
        return;
      }

      setLoading(true);

      const payload = tableData.map((item) => ({
        itemName: item.itemName?.trim(),
        itemCategory: item.itemCategory,
        uom: item.uom,
        tp: Number(item.tp),
        mrp: Number(item.mrp),
        expiryDate: formatExcelDate(item.expiryDate),
      }));

      console.log("FINAL PAYLOAD:", payload);

      await addItems(payload);

      notifySuccess("Item Uploaded successfully");

      localStorage.removeItem(STORAGE_KEY);
      setTableData([]);
    } catch (err: unknown) {
      const error = err as AxiosError<any>;

      console.log("ERROR RESPONSE:", error.response?.data);

      notifyError(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
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
          itemName:
            row["Item Name"] || row["itemName"] || row["ItemName"] || "",
          itemCategory: row["Item Category"] || row["itemCategory"] || "",
          uom: row["Units"] || row["uom"] || "",
          tp: row["tp"] || "",
          mrp: row["mrp"] || "",
          expiryDate: formatExcelDate(row["Expiry Date"] || row["expiryDate"]),
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
  const formatDisplayDate = (date: string) => {
    if (!date) return "";

    const d = new Date(date);
    if (isNaN(d.getTime())) return date;

    return d.toLocaleDateString();
  };
  const handleDownloadTemplate = () => {
    try {
      setDownloadLoading(true);

      const template = [
        {
          "Item Name": "",
          "Item Category": "",
          Units: "",
          tp: "",
          mrp: "",
          "Expiry Date": "",
        },
      ];

      const ws = XLSX.utils.json_to_sheet(template);
      const wb = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(wb, ws, "Template");

      XLSX.writeFile(wb, "Items-template.xlsx");

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
              Data Upload / Product Update
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
              disabled={loading}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                </>
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
            <p className="text-xs font-semibold text-heading1">Upload Items</p>
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
            <p className="text-xs font-semibold text-primary">Items_Temp</p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirm(true)}
                className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center"
              >
                <Icon icon="proicons:delete" className="text-xl" />
              </button>

              <button
                onClick={() => setAddItem(true)}
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
              "Select",
              "Product Name",
              "Item Category",
              "Expiry Date",
              "Units",
              "TP",
              "MRP",
            ]}
            data={tableData.map((item, index) => [
              <Icon
                icon="basil:edit-outline"
                className="text-xl cursor-pointer text-primary"
                onClick={() => {
                  setForm(tableData[index]);
                  setEditIndex(index);
                  setAddItem(true);
                }}
              />,

              <CustomCheckbox
                checked={item.selected}
                onChange={(v) => toggleSelect(index, v)}
              />,

              item.itemName,
              item.itemCategory,
              formatDisplayDate(item.expiryDate),
              item.uom,
              item.tp,
              item.mrp,
            ])}
          />
        </div>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-100 rounded-xl b">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p onClick={() => setConfirm(false)} className="cursor-pointer">
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
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  boxShadow: "0px 1px 12px 0px #0000001F",
                }}
                className="h-10 w-25 cursor-pointer rounded-md text-white bg-[#FF0000]"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {addItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full p-6 bg-white shadow-xl max-w-250 rounded-2xl">
            <div className="flex items-center justify-between pb-3 border-b">
              <h2 className="text-xs font-semibold text-heading1">Add Item</h2>

              <button
                onClick={() => setAddItem(false)}
                className="cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <CustomInput
                label="Item Name"
                name="itemName"
                value={form.itemName}
                onChange={handleChange}
              />
              <CustomDatePicker
                label="Expiry Date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={(v) => setForm({ ...form, expiryDate: v })}
              />
              <CustomInput
                label="Item Category"
                name="itemCategory"
                value={form.itemCategory}
                onChange={handleChange}
              />

              <CustomInput
                label="TP"
                name="tp"
                value={form.tp}
                onChange={handleChange}
              />
              <CustomSelect
                label="Units"
                options={[
                  { value: "ml", label: "ML" },
                  { value: "l", label: "Litre" },
                  { value: "g", label: "Gram" },
                  { value: "kg", label: "KG" },
                  { value: "pcs", label: "PCS" },
                  { value: "box", label: "Box" },
                  { value: "strip", label: "Strip" },
                  { value: "bottle", label: "Bottle" },
                  { value: "pack", label: "Pack" },
                  { value: "dozen", label: "Dozen" },
                ]}
                value={form.uom}
                onChange={(v) => setForm({ ...form, uom: v })}
              />
              <CustomInput
                label="MRP"
                name="mrp"
                value={form.mrp}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="h-10 text-sm flex justify-center items-center gap-1 text-white rounded-md cursor-pointer bg-primary w-27.5"
              >
                <Icon icon="mynaui:save" className="text-xl" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
