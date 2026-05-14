import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import CustomCheckbox from "../../../../components/customCheckbox";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomTimePicker from "../../../../components/timePicker";

export default function WorkCalendarCreate() {
  const [loading, setLoading] = useState(false);

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

    const payload = {
      name: formData.name,
      start_hour: formData.startHour,
      half_mark_after: formData.halfMarkAfter,
      half_duty_minimum_min: Number(formData.halfDutyMinimumMin),
      work_hours_per_day: formData.workHoursPerDay,
      end_hour: formData.endHour,
      full_duty_minimum_min: Number(formData.fullDutyMinimumMin),
      working_days: Object.keys(formData.workingDays).filter(
        (day) => formData.workingDays[day as keyof typeof formData.workingDays],
      ),
    };

    console.log("Payload => ", payload);

    try {
      setLoading(true);
      // const response = await createWorkCalendar(payload);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      notifySuccess("Work Calendar Created Successfully");
      console.log(payload);
    } catch (error: any) {
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
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              <Icon icon="mage:filter" className="text-lg" />
              Filters
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27 disabled:opacity-50"
            >
              {loading ? (
                "Loading..."
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
            <CustomTimePicker
              label="Half Mark After"
              placeholder="12:30 PM"
              value={formData.halfMarkAfter}
              onChange={(value: any) => handleChange("halfMarkAfter", value)}
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
                { label: "1 Hour", value: "1H" },
                { label: "2 Hours", value: "2H" },
                { label: "3 Hours", value: "3H" },
                { label: "4 Hours", value: "4H" },
                { label: "5 Hours", value: "5H" },
                { label: "6 Hours", value: "6H" },
                { label: "7 Hours", value: "7H" },
                { label: "8 Hours", value: "8H" },
                { label: "9 Hours", value: "9H" },
                { label: "10 Hours", value: "10H" },
                { label: "11 Hours", value: "11H" },
                { label: "12 Hours", value: "12H" },
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
