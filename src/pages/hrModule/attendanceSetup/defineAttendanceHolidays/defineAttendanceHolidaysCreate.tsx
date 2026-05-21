import { Icon } from "@iconify/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";

import CustomSelect from "../../../../components/customSelect";
import CustomDatePicker from "../../../../components/datePicker";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { addAttendanceHolidays } from "../../../../api/hrServices";
import CustomTextarea from "../../../../components/customTextarea";

export default function DefineAttendanceHolidaysCreate() {
  const { goBack } = useAppNavigate();

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<any>({
    holidayName: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { mutate: addHoliday, isPending } = useMutation({
    mutationFn: addAttendanceHolidays,

    onSuccess: (res: any) => {
      notifySuccess(res?.message || "Holiday created successfully");

      queryClient.invalidateQueries({
        queryKey: ["getAllAttendanceHolidays"],
      });

      goBack();
    },

    onError: (error: any) => {
      notifyError(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSave = () => {
    if (
      !formData.holidayName ||
      !formData.location ||
      !formData.startDate ||
      !formData.endDate
    ) {
      notifyError("Please fill all required fields");
      return;
    }

    const payload = {
      holidayName: formData.holidayName,
      location: formData.location,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    addHoliday(payload);
  };

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Create Holidays
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={goBack}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            {isPending ? (
              <SyncLoader size={8} color="#fff" />
            ) : (
              <>
                <Icon icon="mynaui:save" className="w-5 h-5" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Create Holidays
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full p-4 xl:gap-y-2 xl:gap-x-40.25">
            <div>
              <CustomSelect
                label="Holiday Name"
                placeholder="Eid Holiday"
                value={formData.holidayName}
                options={[
                  { label: "New Year’s Day", value: "New Year’s Day" },
                  {
                    label: "Kashmir Solidarity Day",
                    value: "Kashmir Solidarity Day",
                  },
                  { label: "Pakistan Day", value: "Pakistan Day" },
                  { label: "Labour Day", value: "Labour Day" },
                  { label: "Eid ul Fitr", value: "Eid ul Fitr" },
                  { label: "Eid ul Adha", value: "Eid ul Adha" },
                  { label: "Independence Day", value: "Independence Day" },
                  { label: "Ashura", value: "Ashura" },
                  { label: "Eid Milad-un-Nabi", value: "Eid Milad-un-Nabi" },
                  { label: "Quaid-e-Azam Day", value: "Quaid-e-Azam Day" },
                  { label: "Christmas Day", value: "Christmas Day" },
                ]}
                onChange={(value: any) => handleChange("holidayName", value)}
              />
            </div>
            <div>
              <CustomDatePicker
                label="Date Start"
                placeholder="01-Mar-2026"
                value={formData.startDate}
                onChange={(value: any) => handleChange("startDate", value)}
              />
            </div>
            <div className="lg:row-span-2">
              <CustomTextarea
                label="Description"
                placeholder="Lorem Ipsum"
                value={formData.description}
                onChange={(e: any) =>
                  handleChange("description", e.target.value)
                }
              />
            </div>
            <div>
              <CustomSelect
                label="Location"
                placeholder="Head Office"
                value={formData.location}
                options={[
                  {
                    label: "Head Office",
                    value: "Head Office",
                  },
                  {
                    label: "Branch Office",
                    value: "Branch Office",
                  },
                ]}
                onChange={(value: any) => handleChange("location", value)}
              />
            </div>
            <div>
              <CustomDatePicker
                label="Date End"
                placeholder="01-Mar-2026"
                value={formData.endDate}
                onChange={(value: any) => handleChange("endDate", value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
