import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import CustomCheckbox from "../../../../components/customCheckbox";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomTimePicker from "../../../../components/timePicker";
import {
  addWorkCalendar,
  getAllWorkCalendar,
} from "../../../../api/hrServices";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { useAppNavigate } from "../../../../hooks/navigation";

export default function WorkCalendarCreate() {
  const [loading, setLoading] = useState(false);
  const { goBack } = useAppNavigate();
  const [formData, setFormData] = useState({
    name: "",
    startHour: "",
    halfMarkAfter: "",
    halfDutyMinimumMin: "",
    workHoursPerDay: "",
    endHour: "",
    fullDutyMinimumMin: "",
    workingDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  });
  const { refetch } = useQuery({
    queryKey: ["getAllWorkCalendar"],
    queryFn: getAllWorkCalendar,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckbox = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: !prev.workingDays[day as keyof typeof prev.workingDays],
      },
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      notifyError("Name is required");
      return false;
    }

    if (!formData.startHour) {
      notifyError("Start Hour is required");
      return false;
    }

    if (!formData.halfMarkAfter) {
      notifyError("Half Mark After is required");
      return false;
    }

    if (!formData.halfDutyMinimumMin) {
      notifyError("Half Duty Minimum Min is required");
      return false;
    }

    if (!formData.workHoursPerDay) {
      notifyError("Work Hours Per Day is required");
      return false;
    }

    if (!formData.endHour) {
      notifyError("End Hour is required");
      return false;
    }

    if (!formData.fullDutyMinimumMin) {
      notifyError("Full Duty Minimum Min is required");
      return false;
    }

    const selectedDays = Object.values(formData.workingDays).some((day) => day);

    if (!selectedDays) {
      notifyError("Please select at least one working day");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const toNumber = (val: any) => Number(val) || 0;

    const payload = {
      name: formData.name,
      workHoursPerDay: toNumber(formData.workHoursPerDay),
      startHour: formData.startHour,
      endHour: formData.endHour,
      halfMarkAfter: toNumber(formData.halfMarkAfter),
      fullDutyMinimumMin: toNumber(formData.fullDutyMinimumMin),
      halfDutyMinimumMin: toNumber(formData.halfDutyMinimumMin),
      workingDays: { ...formData.workingDays },
    };
    try {
      setLoading(true);
      const response = await addWorkCalendar(payload);
      notifySuccess(
        response?.data?.message || "Work Calendar Created Successfully",
      );
      await refetch();
      setFormData({
        name: "",
        startHour: "",
        halfMarkAfter: "",
        halfDutyMinimumMin: "",
        workHoursPerDay: "",
        endHour: "",
        fullDutyMinimumMin: "",
        workingDays: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
      });
      goBack();
    } catch (error: any) {
      console.log("Error => ", error);

      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 bg-bgprimary rounded-2xl">
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Add / Edit Work Calendar
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

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27 disabled:opacity-50"
            >
              {loading ? (
                <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
              ) : (
                <>
                  <Icon icon="basil:add-outline" className="text-lg" />
                  Create
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Add / Edit Work Calendar
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-40.25">
            <CustomInput
              label="Name"
              placeholder="Lorem Ipsum"
              value={formData.name}
              onChange={(e: any) => handleChange("name", e.target.value)}
            />{" "}
            <CustomTimePicker
              label="End Hour"
              placeholder="09:00 AM"
              value={formData.endHour}
              onChange={(value: any) => handleChange("endHour", value)}
            />
            <CustomInput
              label="Half Mark After"
              placeholder="Half Mark After (Minutes)"
              value={formData.halfMarkAfter}
              onChange={(e: any) =>
                handleChange("halfMarkAfter", e.target.value)
              }
            />
            <CustomInput
              label="Half Duty Minimum Min"
              placeholder="-"
              value={formData.halfDutyMinimumMin}
              onChange={(e: any) =>
                handleChange("halfDutyMinimumMin", e.target.value)
              }
            />{" "}
            <CustomTimePicker
              label="Start Hour"
              placeholder="09:00 AM"
              value={formData.startHour}
              onChange={(value: any) => handleChange("startHour", value)}
            />
            <CustomSelect
              label="Work Hours Per Day"
              placeholder="Select Work Hours"
              value={formData.workHoursPerDay}
              onChange={(value: any) => handleChange("workHoursPerDay", value)}
              options={[
                { label: "1 Hour", value: "1" },
                { label: "2 Hours", value: "2" },
                { label: "3 Hours", value: "3" },
                { label: "4 Hours", value: "4" },
                { label: "5 Hours", value: "5" },
                { label: "6 Hours", value: "6" },
                { label: "7 Hours", value: "7" },
                { label: "8 Hours", value: "8" },
                { label: "9 Hours", value: "9" },
                { label: "10 Hours", value: "10" },
                { label: "11 Hours", value: "11" },
                { label: "12 Hours", value: "12" },
              ]}
            />{" "}
            <CustomInput
              label="Full Duty Minimum Min"
              placeholder="-"
              value={formData.fullDutyMinimumMin}
              onChange={(e: any) =>
                handleChange("fullDutyMinimumMin", e.target.value)
              }
            />
          </div>
        </div>

        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">Working Days</p>
          </div>

          <div className="grid grid-cols-2 p-4 md:grid-cols-4 gap-y-6">
            {[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ].map((day) => (
              <div className="flex items-center gap-2" key={day}>
                <CustomCheckbox
                  checked={
                    formData.workingDays[
                      day as keyof typeof formData.workingDays
                    ]
                  }
                  onChange={() => handleCheckbox(day)}
                />

                <p className="text-xs capitalize text-heading1">{day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
