import { useState } from "react";
import { Icon } from "@iconify/react";

import CustomTable from "../../../../components/customTable";

import TimeAttendanceSummary from "./timeAttendanceSummary";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import CustomTimePicker from "../../../../components/timePicker";
export default function TimeAttendanceMachineData() {
  const [activeTab, setActiveTab] = useState("machine");
  const [openFilter, setOpenFilter] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const { goTo } = useAppNavigate();
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Time Attendance Machine Data
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <div className="relative w-full md:w-30">
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
              onClick={() => setOpenFilter(!openFilter)}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>
            {activeTab === "machine" && (
              <>
                <button
                  onClick={() => {
                    goTo(
                      "/hr-module/hr-attendance/time-attendance-machine-data/upload",
                    );
                  }}
                  className="flex items-center justify-center w-full h-10 gap-1 px-2 text-white rounded-md cursor-pointer md:w-auto bg-secondary"
                >
                  <Icon icon="basil:add-outline" className="w-5 h-5" />
                  Upload
                </button>

                <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-2 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
                  <Icon icon="basil:add-outline" className="w-5 h-5" />
                  Auto Generated Attendance
                </button>

                <button
                  onClick={() => {
                    setOpenModel(true);
                  }}
                  className="flex items-center justify-center w-full h-10 gap-1 px-2 text-white rounded-md cursor-pointer md:w-auto bg-primary"
                >
                  <Icon icon="basil:add-outline" className="w-5 h-5" />
                  Create
                </button>
              </>
            )}
          </div>
        </div>
        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

        <div className="mt-3 bg-white rounded-2xl overflow-hidden">
          <div className="flex flex-wrap gap-4 p-4">
            <button
              onClick={() => setActiveTab("machine")}
              className={`text-xs font-semibold cursor-pointer ${
                activeTab === "machine" ? "text-primary" : "text-heading1"
              }`}
            >
              Time Attendance Machine Data
            </button>

            <button
              onClick={() => setActiveTab("summary")}
              className={`text-xs font-semibold cursor-pointer ${
                activeTab === "summary" ? "text-primary" : "text-heading1"
              }`}
            >
              Time Attendance Summary
            </button>
          </div>

          {activeTab === "machine" && (
            <CustomTable
              norounded
              height="55vh"
              headers={[
                "Edit",
                "Employee Machine Number",
                "Attendance Date",
                "Attendance Datetime",
                "Attendance Mode",
                "Machine Ip",
              ]}
              data={[
                [
                  <Icon
                    icon="basil:edit-outline"
                    className="text-lg cursor-pointer text-primary"
                  />,

                  "-",

                  "-",

                  "-",

                  "-",

                  "-",
                ],
              ]}
            />
          )}

          {activeTab === "summary" && <TimeAttendanceSummary />}
        </div>
      </div>{" "}
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3  max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Create Attendance Machine Data
              </h2>

              <button
                onClick={() => {
                  setOpenModel(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-5 p-4">
              <CustomInput placeholder="" label="	Employee Machine Number" />
              <CustomDatePicker placeholder="" label="	Attendance Date" />
              <CustomTimePicker placeholder="" label="	Attendance Time" />
              <CustomInput placeholder="" label="	Attendance Mode" />
              <CustomInput placeholder="" label="	Machine Ip" />
            </div>
            <div className="p-4 flex justify-end items-center">
              <button
                type="submit"
                // disabled={saveLoading}
                className="h-10 text-sm flex justify-center items-center gap-2 text-white rounded-md cursor-pointer bg-primary w-27.5 disabled:opacity-60"
              >
                {/* {saveLoading ? (
                <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
              ) : (
                <>
                  <Icon icon="mynaui:save" className="text-xl" />
                  Save
                </>
              )} */}{" "}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
