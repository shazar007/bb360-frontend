import { Icon } from "@iconify/react";
import { useState } from "react";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);
interface MonthYearPickerProps {
  value: { month: number; year: number };
  onChange: (val: { month: number; year: number }) => void;
}

export const MonthYearFilter: React.FC<MonthYearPickerProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleMonthChange = (month: number) => {
    onChange({ ...value, month });
  };

  const handleYearChange = (year: number) => {
    onChange({ ...value, year });
  };

  return (
    <div className="relative inline-block w-full h-10 lg:w-45">
      <div
        className="flex items-center justify-between px-3 py-2 h-10 text-sm text-heading1 bg-[#ECF0F4] rounded-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <Icon
            icon="solar:calendar-date-linear"
            width="18"
            className="text-gray-400"
          />
          <span>{`${value.month}-${value.year}`}</span>
        </div>
        <Icon
          icon="mdi:chevron-down"
          width="18"
          className={`transition-transform text-heading1/36 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="absolute z-50 flex w-full gap-2 p-3 mt-1 text-xs bg-white rounded shadow-lg">
          <select
            className="flex-1 p-1 w-10 border border-primary rounded"
            value={value.month}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
          >
            {months.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

          <select
            className="flex-1 p-1 border-primary border rounded"
            value={value.year}
            onChange={(e) => handleYearChange(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
