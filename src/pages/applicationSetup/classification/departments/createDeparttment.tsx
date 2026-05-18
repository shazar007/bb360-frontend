import { Icon } from "@iconify/react";
import { useState } from "react";
import { SyncLoader } from "react-spinners";

import CustomInput from "../../../../components/customInput";
import { useQuery } from "@tanstack/react-query";
import {
  addDepartments,
  getAllDepartments,
} from "../../../../api/classificationServices";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { useAppNavigate } from "../../../../hooks/navigation";

export default function CreateDeparttment() {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const { goBack } = useAppNavigate();
  const {
    data: getdepartment,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: getAllDepartments,
  });
  const getAlldepartment: any[] = getdepartment?.data?.data || [];
  const departmentsOptions = getAlldepartment.map((emp: any) => ({
    label: emp.fullName,
    value: emp._id,
  }));
  const [formData, setFormData] = useState({
    fullName: "",
    parentName: "",
  });

  const handleUpload = async () => {
    if (!formData.fullName) {
      notifyError("Department name is required");
      return;
    }

    try {
      setUploadLoading(true);
      const payload = {
        fullName: formData.fullName.trim(),
        ...(formData.parentName ? { parentName: formData.parentName } : {}),
      };

      await addDepartments(payload);
      notifySuccess("Department added successfully");
      setFormData({
        fullName: "",
        parentName: "",
      });
      await refetch();
      goBack();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Upload failed");
    } finally {
      setUploadLoading(false);
    }
  };
  return (
    <>
      {" "}
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Create Departments
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
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27 disabled:opacity-50"
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
          </div>
        </div>
        <div className="w-full mt-2 ">
          <div className="p-4 bg-[#ECF0F4] rounded-t-2xl">
            <p className="text-xs font-semibold text-heading1">
              Upload Departments
            </p>
          </div>
          <div className="bg-white rounded-b-2xl">
            <div className="grid grid-cols-2 gap-4 p-4">
              <CustomInput
                label="Name"
                value={formData.fullName}
                onChange={(e: any) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />{" "}
              <CustomSelectSearch
                loading={isLoading}
                label="Parent Name"
                options={departmentsOptions}
                value={formData.parentName}
                onChange={(value: any) =>
                  setFormData({ ...formData, parentName: value })
                }
              />
            </div>
          </div>
        </div>{" "}
      </div>{" "}
    </>
  );
}
