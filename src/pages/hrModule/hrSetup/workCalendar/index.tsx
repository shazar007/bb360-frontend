import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getAllWorkCalendar,
  updateWorkCalendar,
} from "../../../../api/hrServices";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import CustomInput from "../../../../components/customInput";
import CustomCheckbox from "../../../../components/customCheckbox";
import CustomTimePicker from "../../../../components/timePicker";

export default function WorkCalendar() {
  const { goTo } = useAppNavigate();
  const [editModal, setEditModal] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    workHoursPerDay: 0,
    startHour: "",
    endHour: "",
    halfMarkAfter: 0,
    halfDutyMinimumMin: 0,
    fullDutyMinimumMin: 0,
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
  const {
    data: getWorkCalendar,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllWorkCalendar"],
    queryFn: getAllWorkCalendar,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const AllWorkCalendar: any[] = getWorkCalendar?.data?.data || [];
  const renderDayIcon = (value: boolean) => {
    return (
      <Icon
        icon={
          value
            ? "fluent:checkbox-checked-16-regular"
            : "fluent:checkbox-unchecked-16-regular"
        }
        className={`text-lg ${value ? "text-primary" : "text-gray-400"}`}
      />
    );
  };
  const handleEdit = (item: any) => {
    setFormData({
      id: item._id,
      name: item.name,
      workHoursPerDay: item.workHoursPerDay,
      startHour: item.startHour,
      endHour: item.endHour,
      halfMarkAfter: item.halfMarkAfter,
      halfDutyMinimumMin: item.halfDutyMinimumMin,
      fullDutyMinimumMin: item.fullDutyMinimumMin,
      workingDays: item.workingDays || {},
    });

    setEditModal(true);
  };
  const handleUpdate = async () => {
    try {
      setLoadingUpdate(true);

      await updateWorkCalendar(formData.id, formData);

      notifySuccess("Work Calendar Updated Successfully");

      setEditModal(false);

      await refetch();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Update failed");
    } finally {
      setLoadingUpdate(false);
    }
  };
  const handleNumberChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: Number(value) || 0,
    }));
  };
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Work Calendar
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
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

            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo("/hr-module/hr-setup/work-calendar/create");
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
              height="auto"
              headers={[
                "Edit",
                "Name",
                "Work Hours Per Day",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
              data={
                AllWorkCalendar?.map((item: any) => [
                  <Icon
                    icon="basil:edit-outline"
                    className="text-lg cursor-pointer text-primary"
                    onClick={() => handleEdit(item)}
                  />,
                  item?.name,
                  item?.workHoursPerDay,

                  renderDayIcon(item?.workingDays?.monday),
                  renderDayIcon(item?.workingDays?.tuesday),
                  renderDayIcon(item?.workingDays?.wednesday),
                  renderDayIcon(item?.workingDays?.thursday),
                  renderDayIcon(item?.workingDays?.friday),
                  renderDayIcon(item?.workingDays?.saturday),
                  renderDayIcon(item?.workingDays?.sunday),
                ]) || []
              }
            />
          </div>
        </div>
      </div>
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3  max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Work Calendar
              </h2>

              <button
                onClick={() => {
                  setEditModal(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 p-6 md:grid-cols-2 gap-y-4 gap-x-15">
              <CustomInput
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <CustomInput
                label="Work Hours Per Day"
                value={formData.workHoursPerDay}
                onChange={(e: any) =>
                  handleNumberChange("workHoursPerDay", e.target.value)
                }
              />{" "}
              <CustomTimePicker
                label="Start Hour"
                value={formData.startHour}
                onChange={(value: string) =>
                  setFormData({
                    ...formData,
                    startHour: value,
                  })
                }
              />
              <CustomTimePicker
                label="End Hour"
                value={formData.endHour}
                onChange={(value: string) =>
                  setFormData({
                    ...formData,
                    endHour: value,
                  })
                }
              />
              <CustomInput
                label="Full Duty Minimum Min"
                value={formData.fullDutyMinimumMin}
                onChange={(e: any) =>
                  handleNumberChange("fullDutyMinimumMin", e.target.value)
                }
              />{" "}
              <CustomInput
                label="Half Duty Minimum Min"
                value={formData.halfDutyMinimumMin}
                onChange={(e: any) =>
                  handleNumberChange("halfDutyMinimumMin", e.target.value)
                }
              />{" "}
              <CustomInput
                label="Half Mark After (Minutes)"
                value={formData.halfMarkAfter}
                onChange={(e: any) =>
                  handleNumberChange("halfMarkAfter", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-2 px-6 mt-4 md:grid-cols-4">
              {Object.keys(formData.workingDays).map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <CustomCheckbox
                    checked={
                      formData.workingDays[
                        day as keyof typeof formData.workingDays
                      ]
                    }
                    onChange={() =>
                      setFormData({
                        ...formData,
                        workingDays: {
                          ...formData.workingDays,
                          [day]:
                            !formData.workingDays[
                              day as keyof typeof formData.workingDays
                            ],
                        },
                      })
                    }
                  />
                  <p className="capitalize"> {day}</p>
                </label>
              ))}
            </div>

            <div className="flex justify-end p-4">
              <button
                onClick={handleUpdate}
                disabled={loadingUpdate}
                className="px-6 py-2 mt-4 text-white rounded cursor-pointer bg-primary"
              >
                {loadingUpdate ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
