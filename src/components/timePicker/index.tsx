import { useRef } from "react";
import { Icon } from "@iconify/react";
import type { Dayjs } from "dayjs";

type CustomTimePickerProps = {
  label?: string;
  value?: string | Dayjs | null;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
};

function formatTime(time?: string | Dayjs | null) {
  if (!time) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  if (typeof time === "string") return time;
  return time.format("HH:mm");
}

export default function CustomTimePicker({
  label,
  value,
  onChange = () => {},
  required = false,
  disabled = false,
  className = "",
  name,
}: CustomTimePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-xs text-heading1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className="relative cursor-pointer"
        onClick={() => inputRef.current?.showPicker()}
      >
        <input
          ref={inputRef}
          type="time"
          name={name}
          value={
            typeof value === "string"
              ? value
              : value
                ? value.format("HH:mm")
                : ""
          }
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <div
          className={`w-full h-10 px-4 flex items-center justify-between text-xs rounded-md bg-[#ECF0F4] ${className}`}
        >
          <div className="flex items-center gap-2">
            <Icon
              icon="iconamoon:clock-light"
              width="20"
              className="text-gray-400"
            />

            <span className={!value ? "text-gray-400" : ""}>
              {formatTime(value)}
            </span>
          </div>

          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full cursor-pointer hover:bg-gray-200"
            >
              <Icon
                icon="material-symbols:close"
                className="text-sm text-gray-400"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
