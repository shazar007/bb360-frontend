import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

type Option = {
  label: any;
  value: any;
};
type CustomSelectProps = {
  label?: string;
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void; // <- add onBlur
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  white?: boolean;
};

export default function CustomSelect({
  label,
  options = [],
  value,
  onChange = () => {},
  onBlur = () => {}, // <- default
  placeholder = "Select option",
  required = false,
  disabled = false,
  className = "",
  white = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col" ref={dropdownRef}>
      {label && (
        <label className="text-xs text-heading1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        onClick={() => {
          if (disabled || options.length === 0) return;
          setOpen((prev) => !prev);
        }}
        onBlur={onBlur} // <- pass Formik blur
        className={`flex items-center justify-between h-10 px-4 rounded-md text-xs
        ${white ? "bg-white" : "bg-[#ECF0F4]"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}`}
      >
        <span className={!selected ? "text-gray-400" : ""}>
          {selected?.label || placeholder}
        </span>
        <Icon
          icon="mdi:chevron-down"
          width="18"
          className={`transition-transform text-heading1/36 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && options.length > 0 && (
        <div className="absolute z-50 w-full py-2 mt-1 overflow-auto bg-white rounded-md shadow-md top-full max-h-48">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value); // <- Formik setFieldValue
                setOpen(false);
              }}
              className="px-4 py-3 text-xs cursor-pointer hover:bg-gray-100"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
