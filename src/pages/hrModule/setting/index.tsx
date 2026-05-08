import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "@tanstack/react-query";
import {
  GetCompanyTimingAPI,
  setCompanyTimingAPI,
} from "../../../api/hrServices";
import { notifyError, notifySuccess } from "../../../components/toast";
import CustomTimePicker from "../../../components/timePicker";
import { Icon } from "@iconify/react";
import { SyncLoader } from "react-spinners";

export default function Setting() {
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [lateAfterMinutes, setLateAfterMinutes] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "HR-Management | Setting";
  }, []);
  const { data } = useQuery({
    queryKey: ["GetCompanyTimingAPI"],
    queryFn: GetCompanyTimingAPI,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data?.data?.timing) {
      setStartTime(dayjs(data.data?.timing.startTime, "HH:mm"));
      setEndTime(dayjs(data.data?.timing.endTime, "HH:mm"));
      setLateAfterMinutes(data.data?.timing.lateAfterMinutes || 0);
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!startTime || !endTime) {
      notifyError("Please select both start and end time.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        startTime: startTime.format("HH:mm"),
        endTime: endTime.format("HH:mm"),
        lateAfterMinutes,
      };

      const response = await setCompanyTimingAPI(payload);
      notifySuccess("Company timing updated successfully!");
      console.log("Response:", response.data);
    } catch (error: any) {
      console.error(error);
      notifyError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Setting
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:w-auto">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
          >
            {loading ? (
              <SyncLoader color="#fff" size={6} />
            ) : (
              <>
                <Icon icon="mynaui:save" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
      <div className="mt-3 bg-white rounded-2xl">
        <div className="bg-[#ECF0F4] p-4 rounded-t-2xl">
          <p className="text-xs font-semibold">Set the Office Timing</p>
        </div>

        <div className="bg-white rounded-b-2xl">
          <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-20">
            <CustomTimePicker
              placeholder="Select Start Time"
              label="Start Time"
              value={startTime}
              // onChange={(val: Dayjs | null) => setStartTime(val)}
            />
            <CustomTimePicker
              placeholder="Select End Time"
              label="End Time"
              value={endTime}
              // onChange={(val: Dayjs | null) => setEndTime(val)}
            />

            <CustomTimePicker
              label="Late After (minutes)"
              // value={lateAfterMinutes}
              // onChange={(e) => setLateAfterMinutes(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
