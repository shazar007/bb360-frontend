import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
export default function WorkCalendarCreate() {
  return (
    <div className="bg-bgprimary rounded-2xl mt-3">
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Add / Edit Work Calendar
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <button className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary">
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
              <Icon icon="ion:print-outline" className="w-5 h-5" />
              Print
            </button>
            <button className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary">
              <Icon icon="mynaui:save" className="w-5 h-5" />
              Save
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
            <CustomInput label="Name" placeholder="Lorem Ipsum" />

            <CustomSelect label="Start Hour" placeholder="09:00 AM" />
            <CustomSelect label="Half Mark After" placeholder="12:30 PM" />
            <CustomInput label="Half Duty Minimum Min" placeholder="-" />

            <CustomSelect label="Work Hours Per Day" placeholder="8H" />
            <CustomSelect label="End Hour" placeholder="09:00 AM" />
            <CustomInput label="Full Duty Minimum Min" placeholder="-" />
          </div>
        </div>

        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">Working Days</p>
          </div>

          <div className="p-4 grid grid-cols-2 md:grid-cols-4  gap-y-6">
            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />
              <p className="text-xs text-heading1">Monday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />

              <p className="text-xs text-heading1">Tuesday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />

              <p className="text-xs text-heading1">Wednesday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />

              <p className="text-xs text-heading1">Thursday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />

              <p className="text-xs text-heading1">Friday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />

              <p className="text-xs text-heading1">Saturday</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-primary text-lg"
              />

              <p className="text-xs text-heading1">Sunday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
