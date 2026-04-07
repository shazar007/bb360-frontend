import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

type Option = {
  label: string;
  value: string;
};

type CustomMultiSelectProps = {
  label?: string;
  options: Option[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function CustomMultiSelect({
  label,
  options,
  value = [],
  onChange = () => {},
  placeholder = "Select options",
  required = false,
  disabled = false,
  className = "",
}: CustomMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeItem = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <div className="flex flex-col relative" ref={dropdownRef}>
      {label && (
        <label className="text-heading1 text-xs mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        onClick={() => !disabled && setOpen(!open)}
        className={`flex flex-wrap items-center min-h-10 gap-1 px-3 py-1 bg-[#ECF0F4] rounded-md cursor-pointer ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-400 text-xs">{placeholder}</span>
        ) : (
          selectedOptions.map((opt) => (
            <span
              key={opt.value}
              className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full text-xs"
            >
              {opt.label}
              <Icon
                icon="mdi:close-circle-outline"
                width="14"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(opt.value);
                }}
              />
            </span>
          ))
        )}
        <span className="ml-auto">
          <Icon
            icon="mdi:chevron-down"
            width="18"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </div>
      {open && (
        <div className="absolute top-full py-2 mt-1 w-full bg-white shadow-md rounded-md z-50 max-h-48 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
                value.includes(opt.value) ? "bg-gray-100 font-medium" : ""
              }`}
            >
              <span>{opt.label}</span>
              {value.includes(opt.value) && (
                <Icon icon="mdi:check" width="16" className="text-green-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
