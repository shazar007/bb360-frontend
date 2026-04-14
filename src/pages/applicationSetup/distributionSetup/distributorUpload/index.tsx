import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { addDistributorApi } from "../../../../api/distributorServices";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { SyncLoader } from "react-spinners";
const STORAGE_KEY = "temp_distributor_upload";
export default function DistributorUpload() {
  const [addDistributor, setAddDistributor] = useState(false);
  const [confirm, setConfirm] = useState(false);
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

  const handleSave = () => {
    if (!form.distributorName) {
      notifyError("Distributor Name is required");
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
      distributorCode: "", // keep but not required
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
  };
  const toggleSelect = (index: number, value: boolean) => {
    const updated = [...tableData];
    updated[index].selected = value;
    setTableData(updated);
  };

  const [uploadLoading, setUploadLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setUploadLoading(true);

      const validData = tableData.filter(
        (i) => i.distributorCode && i.distributorName,
      );

      if (!validData.length) {
        notifyError("No valid data to upload");
        return;
      }

      for (const item of validData) {
        const requestBody = {
          distributorName: item.distributorName,
          contactNumber: item.contactNumber,
          address: item.address,
          city: item.city,
          licenceNumber: item.licenceNumber,
          licenceExpiryDate: item.licenceExpiryDate,
        };

        console.log("SENDING 👉", requestBody);

        await addDistributorApi(requestBody);
      }

      notifySuccess("Uploaded successfully");

      localStorage.removeItem(STORAGE_KEY);
      setTableData([]);
    } catch (err: any) {
      console.log("UPLOAD ERROR:", err?.response?.data);
      notifyError(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploadLoading(false);
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
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-45"
            >
              {" "}
              <Icon icon="basil:add-outline" className="text-lg" />
              Download Template
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
            <button
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
            >
              Choose File
            </button>
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
                <Icon icon="mynaui:save" className="text-xl" />
                Save
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
