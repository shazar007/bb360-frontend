import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useEffect, useState } from "react";
import CustomCheckbox from "../../../../components/customCheckbox";
import { addItems } from "../../../../api/itemServices";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import { SyncLoader } from "react-spinners";
import type { AxiosError } from "axios";
import * as XLSX from "xlsx";
import { useQueryClient } from "@tanstack/react-query";
import BatchManager from "../../../../components/BatchManager";

const getCategoryRule = (category: string) => itemCategoryRules?.[category];
const isFieldAllowed = (category: string, field: string) => {
  const rule = getCategoryRule(category);
  return !!rule?.fields?.[field];
};
const shouldHaveBatches = (category: string) => {
  const rule = getCategoryRule(category);
  return !!rule?.requireBatches;
};
const itemCategoryRules: Record<string, any> = {
  FINISHED_GOODS: {
    fields: {
      tp: true,
      mrp: true,
      standardCost: true,
      shelfLifeDays: true,
      storageConditions: true,
      inspectionRequired: true,
      hazardous: true,
    },
    showMeta: true,
  },

  RAW_MATERIAL: {
    fields: {
      standardCost: true,
      reorderLevel: true,
      reorderQty: true,
      leadTimeDays: true,
      shelfLifeDays: true,
      storageConditions: true,
      inspectionRequired: true,
      hazardous: true,
      batches: true,
    },
    requireBatches: true,
  },

  PACKAGING_MATERIAL: {
    fields: {
      standardCost: true,
      reorderLevel: true,
      reorderQty: true,
      leadTimeDays: true,
      shelfLifeDays: true,
      storageConditions: true,
      inspectionRequired: false,
      hazardous: true,
      batches: true,
    },
    requireBatches: true,
  },

  WORK_IN_PROGRESS: {
    fields: {
      standardCost: true,
      shelfLifeDays: true,
      storageConditions: true,
      inspectionRequired: true,
      hazardous: true,
      batches: false,
      reorderLevel: false,
      reorderQty: false,
      leadTimeDays: false,
      tp: false,
      mrp: false,
    },
    requireBatches: false,
  },

  CONSUMABLE: {
    fields: {
      standardCost: true,
      reorderLevel: true,
      reorderQty: true,
      leadTimeDays: true,
      shelfLifeDays: true,
      storageConditions: true,
      inspectionRequired: false,
      hazardous: true,
      batches: true,
    },
    requireBatches: true,
  },

  SPARE_PART: {
    fields: {
      standardCost: true,
      reorderLevel: true,
      reorderQty: true,
      leadTimeDays: true,
      storageConditions: true,
      inspectionRequired: true,
      hazardous: true,
      batches: true,
    },
    requireBatches: true,
  },
};
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
  const queryClient = useQueryClient();
  const [form, setForm] = useState<any>({
    itemName: "",
    itemCategory: "",
    uom: "",
    tp: "",
    mrp: "",
    standardCost: "",
    reorderLevel: "",
    reorderQty: "",
    leadTimeDays: "",
    shelfLifeDays: "",
    storageConditions: "",
    hazardous: false,
    inspectionRequired: false,
    isActive: true,
    batches: [],
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
    const category = form.itemCategory;

    if (!form.itemName) {
      notifyError("Item Name is required");
      return;
    }

    const batches = shouldHaveBatches(category) ? form.batches || [] : [];

    const newItem = {
      itemName: form.itemName,
      itemCategory: category,
      uom: form.uom,

      tp: isFieldAllowed(category, "tp") ? Number(form.tp) || 0 : undefined,
      mrp: isFieldAllowed(category, "mrp") ? Number(form.mrp) || 0 : undefined,

      standardCost: Number(form.standardCost) || 0,

      reorderLevel: isFieldAllowed(category, "reorderLevel")
        ? Number(form.reorderLevel) || 0
        : undefined,

      reorderQty: isFieldAllowed(category, "reorderQty")
        ? Number(form.reorderQty) || 0
        : undefined,

      leadTimeDays: isFieldAllowed(category, "leadTimeDays")
        ? Number(form.leadTimeDays) || 0
        : undefined,

      shelfLifeDays: Number(form.shelfLifeDays) || 0,
      storageConditions: form.storageConditions || "",
      hazardous: Boolean(form.hazardous),
      inspectionRequired: Boolean(form.inspectionRequired),
      isActive: true,

      batches,
    };
    setTableData((prev) => {
      const updated = [...prev];
      if (editIndex !== null) updated[editIndex] = newItem;
      else updated.push(newItem);
      return updated;
    });

    setForm({
      itemName: "",
      itemCategory: "",
      uom: "",
      tp: "",
      mrp: "",
      standardCost: "",
      reorderLevel: "",
      reorderQty: "",
      leadTimeDays: "",
      shelfLifeDays: "",
      storageConditions: "",
      hazardous: false,
      inspectionRequired: false,
      isActive: true,
      batches: [],
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

  const handleUpload = async () => {
    try {
      if (!tableData.length) {
        notifyError("Please add row before uploading item data");
        return;
      }

      setLoading(true);

      const buildPayloadItem = (item: any) => {
        const base = {
          itemName: item.itemName?.trim(),
          itemCategory: item.itemCategory,
          uom: item.uom,
          standardCost: Number(item.standardCost) || 0,
          shelfLifeDays: Number(item.shelfLifeDays) || 0,
          storageConditions: item.storageConditions || "",
          hazardous: Boolean(item.hazardous),
          inspectionRequired: Boolean(item.inspectionRequired),
          isActive: item.isActive ?? true,
        };

        switch (item.itemCategory) {
          case "FINISHED_GOODS":
            return {
              ...base,
              tp: Number(item.tp) || 0,
              mrp: Number(item.mrp) || 0,
              batches: item.batches || [],
            };

          case "RAW_MATERIAL":
            return {
              ...base,
              reorderLevel: Number(item.reorderLevel) || 0,
              reorderQty: Number(item.reorderQty) || 0,
              leadTimeDays: Number(item.leadTimeDays) || 0,
              batches: item.batches || [],
            };

          case "PACKAGING_MATERIAL":
            return {
              ...base,
              reorderLevel: Number(item.reorderLevel) || 0,
              reorderQty: Number(item.reorderQty) || 0,
              leadTimeDays: Number(item.leadTimeDays) || 0,
              batches: item.batches || [],
            };

          case "WORK_IN_PROGRESS":
            return {
              ...base,
              standardCost: Number(item.standardCost) || 0,
            };

          case "CONSUMABLE":
            return {
              ...base,
              reorderLevel: Number(item.reorderLevel) || 0,
              reorderQty: Number(item.reorderQty) || 0,
              leadTimeDays: Number(item.leadTimeDays) || 0,
              batches: item.batches || [],
            };

          case "SPARE_PART":
            return {
              ...base,
              reorderLevel: Number(item.reorderLevel) || 0,
              reorderQty: Number(item.reorderQty) || 0,
              leadTimeDays: Number(item.leadTimeDays) || 0,
              batches: item.batches || [],
            };

          default:
            return base;
        }
      };
      const payload = tableData.map((item) => buildPayloadItem(item));
      await addItems(payload);
      notifySuccess("Item Uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["getAllItems"] });
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
        const formatted = jsonData.map((row: any) => ({
          itemName: row["Item Name"] || "",
          itemCategory: row["Item Category"] || "",
          uom: row["Units"] || "",
          tp: row["tp"] || 0,
          mrp: row["mrp"] || 0,
          standardCost: row["Standard Cost"] || 0,
          reorderLevel: row["Reorder Level"] || 0,
          reorderQty: row["Reorder Qty"] || 0,
          leadTimeDays: row["Lead Time Days"] || 0,
          shelfLifeDays: row["Shelf Life Days"] || 0,
          storageConditions: row["Storage Conditions"] || "",
          hazardous: row["Hazardous"] === "true" || false,
          inspectionRequired: row["Inspection Required"] === "true" || false,
          isActive: true,
          selected: false,
        }));
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
      <div className="mt-2">
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
                onClick={() => {
                  const isAnySelected = tableData.some((item) => item.selected);

                  if (!isAnySelected) {
                    return notifyError("Please select at least one item first");
                  }

                  setConfirm(true);
                }}
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
              "Category",
              "Units",
              "TP",
              "MRP",
              "Standard Cost",
              "Reorder Level",
              "Reorder Qty",
              "Lead Time",
              "Shelf Life",
              "Storage",
              "Hazardous",
              "Inspection",
            ]}
            data={tableData.map((item, index) => {
              return [
                <Icon
                  icon="basil:edit-outline"
                  className="text-xl cursor-pointer text-primary"
                  onClick={() => {
                    setForm(item);
                    setEditIndex(index);
                    setAddItem(true);
                  }}
                />,

                <CustomCheckbox
                  checked={item.selected}
                  onChange={(v) => toggleSelect(index, v)}
                />,
                item.itemName || "-",
                item.itemCategory || "-",
                item.uom || "-",
                item.tp ?? "-",
                item.mrp ?? "-",
                item.standardCost ?? "-",
                item.reorderLevel ?? "-",
                item.reorderQty ?? "-",
                item.leadTimeDays ?? "-",
                item.shelfLifeDays ?? "-",
                item.storageConditions || "-",
                item.hazardous ? "Yes" : "No",
                item.inspectionRequired ? "Yes" : "No",
              ];
            })}
          />
        </div>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
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

            <div className="flex justify-between gap-2 p-4 pt-0">
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
          <div className="w-full bg-white shadow-xl max-w-250 rounded-2xl">
            <div className="flex items-center justify-between p-4 pb-3 border-b">
              <h2 className="text-xs font-semibold text-heading1">Add Item</h2>

              <button
                onClick={() => setAddItem(false)}
                className="cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              <CustomInput
                label="Item Name"
                name="itemName"
                value={form.itemName}
                onChange={handleChange}
              />

              <CustomSelect
                label="Item Category"
                options={[
                  { value: "RAW_MATERIAL", label: "Raw Material" },
                  { value: "FINISHED_GOODS", label: "Finished Goods" },
                  { value: "PACKAGING_MATERIAL", label: "Packaging Material" },
                  { value: "WORK_IN_PROGRESS", label: "Work in Progress" },
                  { value: "CONSUMABLE", label: "Consumable" },
                  { value: "SPARE_PART", label: "Spare Part" },
                ]}
                value={form.itemCategory}
                onChange={(val: any) =>
                  setForm((prev: any) => ({
                    ...prev,
                    itemCategory: val?.value || val,
                  }))
                }
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

              {isFieldAllowed(form.itemCategory, "tp") && (
                <CustomInput
                  label="TP"
                  name="tp"
                  value={form.tp}
                  onChange={handleChange}
                />
              )}

              {isFieldAllowed(form.itemCategory, "mrp") && (
                <CustomInput
                  label="MRP"
                  name="mrp"
                  value={form.mrp}
                  onChange={handleChange}
                />
              )}

              {isFieldAllowed(form.itemCategory, "standardCost") && (
                <CustomInput
                  label="Standard Cost"
                  name="standardCost"
                  value={form.standardCost}
                  onChange={handleChange}
                />
              )}

              {isFieldAllowed(form.itemCategory, "reorderLevel") && (
                <CustomInput
                  label="Reorder Level"
                  name="reorderLevel"
                  value={form.reorderLevel}
                  onChange={handleChange}
                />
              )}

              {isFieldAllowed(form.itemCategory, "reorderQty") && (
                <CustomInput
                  label="Reorder Quantity"
                  name="reorderQty"
                  value={form.reorderQty}
                  onChange={handleChange}
                />
              )}

              {isFieldAllowed(form.itemCategory, "leadTimeDays") && (
                <CustomInput
                  label="Lead Time (Days)"
                  name="leadTimeDays"
                  value={form.leadTimeDays}
                  onChange={handleChange}
                />
              )}

              {isFieldAllowed(form.itemCategory, "shelfLifeDays") && (
                <CustomInput
                  label="Shelf Life (Days)"
                  name="shelfLifeDays"
                  value={form.shelfLifeDays}
                  onChange={handleChange}
                />
              )}

              {isFieldAllowed(form.itemCategory, "storageConditions") && (
                <CustomInput
                  label="Storage Conditions"
                  name="storageConditions"
                  value={form.storageConditions}
                  onChange={handleChange}
                />
              )}
            </div>

            {(isFieldAllowed(form.itemCategory, "hazardous") ||
              isFieldAllowed(form.itemCategory, "inspectionRequired")) && (
              <div className="p-5 grid grid-cols-1 md:grid-cols-3 pt-0">
                {isFieldAllowed(form.itemCategory, "hazardous") && (
                  <div className="flex items-center gap-2">
                    <CustomCheckbox
                      checked={form.hazardous}
                      onChange={(v) =>
                        setForm((prev: any) => ({ ...prev, hazardous: v }))
                      }
                    />
                    <span>Hazardous</span>
                  </div>
                )}

                {isFieldAllowed(form.itemCategory, "inspectionRequired") && (
                  <div className="flex items-center gap-2">
                    <CustomCheckbox
                      checked={form.inspectionRequired}
                      onChange={(v) =>
                        setForm((prev: any) => ({
                          ...prev,
                          inspectionRequired: v,
                        }))
                      }
                    />
                    <span>Inspection Required</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <CustomCheckbox
                    checked={form.isActive}
                    onChange={(v) =>
                      setForm((prev: any) => ({ ...prev, isActive: v }))
                    }
                  />
                  <span>Active</span>
                </div>
              </div>
            )}

            <div className=" p-4 pt-0">
              <BatchManager
                value={form.batches || []}
                onChange={(batches) =>
                  setForm((prev: any) => ({
                    ...prev,
                    batches,
                  }))
                }
                shouldShow={shouldHaveBatches(form.itemCategory)}
              />
            </div>
            <div className="flex justify-end p-4 pt-0 ">
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
