import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import CustomTable from "../../../../components/customTable";
import { notifyError } from "../../../../components/toast";

export default function UploadAttendanceMechineData() {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const handleDownloadTemplate = () => {};
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleUpload = async () => {};
  return (
    <>
      <div className="mt-2">
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
              {uploadLoading ? (
                <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
              ) : (
                <>
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
        {/* <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-2">
            <p className="text-xs font-semibold text-primary">
              Distributor_Temp
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (selectedRows.length === 0) {
                    return notifyError(
                      "Please select at least one Distributor first",
                    );
                  }
                  setConfirm(true);
                }}
                className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center"
              >
                <Icon icon="proicons:delete" className="text-xl" />
              </button>
            </div>
          </div>
          <CustomTable
            norounded
            height="auto"
            headers={[
              "Edit",
              "Select",
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
              <CustomCheckbox
                checked={selectedRows.includes(index)}
                onChange={(v) => toggleSelect(index, v)}
              />,
              item.distributorName,
              item.contactNumber,
              item.address,
              item.city,
              item.licenceNumber,
              item.licenceExpiryDate
                ? dayjs(item.licenceExpiryDate).format("DD-MMM-YYYY")
                : "-",
            ])}
          />
        </div> */}
      </div>
    </>
  );
}
