import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

type Option = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  label?: string;
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
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
  placeholder = "Select option",
  required = false,
  disabled = false,
  className = "",
  white = false,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((opt) => opt.value === value);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col relative" ref={dropdownRef}>
      {label && (
        <label className="text-heading1 text-xs mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        onClick={() => {
          if (disabled || options.length === 0) return;
          setOpen((prev) => !prev);
        }}
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
          className={`transition-transform text-heading1/36 ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && options.length > 0 && (
        <div className="absolute top-full py-2 mt-1 w-full bg-white shadow-md rounded-md z-50 max-h-48 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
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
