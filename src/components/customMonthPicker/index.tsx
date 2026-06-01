import React, { useState } from "react";
import { Icon } from "@iconify/react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getDaysInMonth(monthIndex: number, year: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export default function CustomMonthPicker({
  value,
  onChange,
  label,
  required,
}: {
  value?: any;
  onChange?: (val: any) => void;
  label?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const handleSelect = (monthIndex: number, year: number) => {
    const days = getDaysInMonth(monthIndex, year);

    const result = {
      periodName: `${months[monthIndex]} ${year}`,
      periodMonth: monthIndex + 1,
      periodYear: year,
      fromDate: `${year}-${String(monthIndex + 1).padStart(2, "0")}-01`,
      toDate: `${year}-${String(monthIndex + 1).padStart(2, "0")}-${days}`,
    };

    onChange?.(result);
    setOpen(false);
  };

  return (
    <div className="relative max-h-10 w-full">
      {label && (
        <label className="text-xs text-heading1  block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className="flex items-center gap-3 px-3 h-10 w-full bg-[#ECF0F4] rounded-md cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Icon
          icon="solar:calendar-date-linear"
          width="18"
          className="text-gray-400"
        />

        <span
          className={`text-xs transition  ${
            value?.periodName ? "text-black" : "text-heading1/36"
          }`}
        >
          {value?.periodName || "Select Period"}
        </span>
      </div>

      {open && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-md shadow-md p-2">
          <div className="mb-2">
            <p className="text-xs font-semibold text-gray-500">Year</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2 py-1 text-xs border cursor-pointer border-[#7d7d7d]/40 rounded transition
                    ${selectedYear === y ? "bg-primary border-primary text-white" : "hover:bg-gray-100"}
                  `}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500">Month</p>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {months.map((m, i) => {
                const isActive =
                  value?.periodMonth === i + 1 &&
                  value?.periodYear === selectedYear;

                return (
                  <button
                    key={m}
                    onClick={() => handleSelect(i, selectedYear)}
                    className={`px-2 py-1 text-xs cursor-pointer border border-[#7d7d7d]/40 rounded transition
                      ${isActive ? "bg-primary text-white border-primary" : "hover:bg-gray-100"}
                    `}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
