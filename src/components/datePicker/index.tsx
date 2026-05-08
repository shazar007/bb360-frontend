import { Icon } from "@iconify/react";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";

type CustomDatePickerProps = {
  label?: string;
  value?: string | Dayjs | null;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  white?: boolean;
  placeholder?: string;
};

export default function CustomDatePicker({
  label,
  value,
  onChange = () => {},
  required = false,
  disabled = false,
  className = "",
  name,
  white = false,
  placeholder = "Select date",
}: CustomDatePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [internalValue, setInternalValue] = useState(value || "");
  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);
  const handleChange = (val: string) => {
    setInternalValue(val);
    onChange(val);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleChange("");
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-xs text-heading1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`relative h-10 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => !disabled && inputRef.current?.showPicker()}
      >
        <input
          ref={inputRef}
          type="date"
          name={name}
          value={
            typeof internalValue === "string"
              ? internalValue
              : internalValue
                ? internalValue.format("YYYY-MM-DD")
                : ""
          }
          onChange={(e) => handleChange(e.target.value)}
          required={required}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div
          className={`w-full h-10 px-4 flex items-center justify-between text-xs rounded-md ${
            white ? "bg-white" : "bg-[#ECF0F4]"
          } ${className}`}
        >
          <div className="flex items-center gap-2 pointer-events-none">
            <Icon
              icon="solar:calendar-date-linear"
              width="18"
              className="text-gray-400"
            />
            <span className={!internalValue ? "text-gray-400" : ""}>
              {internalValue && dayjs(internalValue).isValid()
                ? dayjs(internalValue).format("DD-MMM-YYYY")
                : placeholder}
            </span>
          </div>
          {internalValue && !disabled && (
            <span
              className="text-gray-400 cursor-pointer"
              onClick={handleClear}
            >
              &#10005;
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
