import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import {
  getAllAttendanceHolidays,
  updateAttendanceHolidays,
} from "../../../../api/hrServices";
import CustomTextarea from "../../../../components/customTextarea";
import dayjs from "dayjs";

export default function DefineAttendanceHolidays() {
  const { goTo } = useAppNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<any>({
    _id: "",
    holidayName: "",
    description: "",
    location: "",
    startDate: "",
    toDate: "",
  });

  const {
    data: holidaysData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllAttendanceHolidays"],
    queryFn: getAllAttendanceHolidays,
  });
  const GetAllholidays: any[] = holidaysData?.data?.data || [];
  console.log("🚀 ~ GetAllholidays:", GetAllholidays);

  const { mutate: updateHoliday, isPending: updateLoading } = useMutation({
    mutationFn: ({ id, values }: any) => updateAttendanceHolidays(id, values),

    onSuccess: (res: any) => {
      notifySuccess(res?.message || "Updated successfully");

      setOpenModal(false);

      queryClient.invalidateQueries({
        queryKey: ["getAllAttendanceHolidays"],
      });

      refetch();
    },

    onError: (error: any) => {
      notifyError(error?.response?.data?.message || "Something went wrong");
    },
  });
  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEdit = (item: any) => {
    setFormData({
      _id: item?._id || "",
      holidayName: item?.holidayName || "",
      description: item?.description || "",
      location: item?.location || "",
      startDate: item?.startDate || "",
      endDate: item?.endDate || "",
    });

    setOpenModal(true);
  };

  const handleUpdate = () => {
    if (
      !formData.holidayName ||
      !formData.location ||
      !formData.startDate ||
      !formData.endDate
    ) {
      notifyError("Please fill all required fields");
      return;
    }

    updateHoliday({
      id: formData._id,
      values: {
        holidayName: formData.holidayName,
        description: formData.description,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
    });
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Define Attendance Holidays
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <div className="relative w-full md:w-60">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
              />

              <Icon
                icon="mynaui:search"
                className="absolute text-[20px] text-heading1/36 top-2.5 left-3"
              />
            </div>

            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo(
                  "/hr-module/attendance-setup/define-attendance-holidays/create",
                );
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-3">
            <CustomTable
              loading={isLoading}
              height="60vh"
              headers={[
                "Edit",
                "Name",
                "Description",
                "Location",
                "From Date",
                "To Date",
              ]}
              data={
                GetAllholidays?.length > 0
                  ? GetAllholidays?.map((item: any) => [
                      <Icon
                        icon="basil:edit-outline"
                        onClick={() => handleEdit(item)}
                        className="text-lg cursor-pointer text-primary"
                      />,

                      item?.holidayName || "-",

                      item?.description || "-",

                      item?.location || "-",
                      item.startDate
                        ? dayjs(item.startDate).format("DD-MMM-YYYY")
                        : "-",
                      item.endDate
                        ? dayjs(item.endDate).format("DD-MMM-YYYY")
                        : "-",
                    ])
                  : [["-", "-", "-", "-", "-", "-"]]
              }
            />
          </div>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Employee
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
              <CustomInput
                label="Holiday Name"
                placeholder="Enter Holiday Name"
                value={formData.holidayName}
                onChange={(e: any) =>
                  handleChange("holidayName", e.target.value)
                }
              />

              <CustomInput
                label="Location"
                placeholder="Enter Location"
                value={formData.location}
                onChange={(e: any) => handleChange("location", e.target.value)}
              />

              <CustomDatePicker
                label="From Date"
                value={formData.startDate}
                onChange={(value: any) => handleChange("startDate", value)}
              />

              <CustomDatePicker
                label="To Date"
                value={formData.endDate}
                onChange={(value: any) => handleChange("endDate", value)}
              />
            </div>
            <div className="mt-4 px-4">
              <CustomTextarea
                label="Description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={(e: any) =>
                  handleChange("description", e.target.value)
                }
              />
            </div>
            <div className="flex justify-end p-4">
              <button
                onClick={handleUpdate}
                disabled={updateLoading}
                className="flex items-center justify-center cursor-pointer h-10 gap-2 px-8 text-white rounded-md bg-primary"
              >
                {updateLoading ? (
                  <SyncLoader size={8} color="#fff" />
                ) : (
                  <>
                    <Icon icon="material-symbols:save-outline" />
                    Save
                  </>
                )}
              </button>
            </div>{" "}
          </div>
        </div>
      )}
    </>
  );
}
