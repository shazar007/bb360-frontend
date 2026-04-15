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
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  white?: boolean;
};

export default function CustomSelectSearch({
  label,
  options = [],
  value,
  onChange = () => {},
  onBlur = () => {},
  placeholder = "Select option",
  required = false,
  disabled = false,
  className = "",
  white = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selected = options.find((opt) => opt.value === value);

  // 🔍 Filtered options
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch(""); // reset search on close
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🎯 focus input when open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

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
        onBlur={onBlur}
        className={`flex items-center justify-between h-10 px-4 rounded-md text-xs
        ${white ? "bg-white" : "bg-[#ECF0F4]"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}`}
      >
        <span className={selected ? "text-heading1" : "text-gray-400"}>
          {selected?.label ?? placeholder}
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
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-md top-full">
          {/* 🔍 Search Input */}
          <div className="p-2 border-b">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 text-xs border-[0.5px] border-gray-300 h-10 rounded outline-none"
            />
          </div>

          {/* 📋 Options */}
          <div className="overflow-auto max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setSearch(""); // reset after select
                  }}
                  className="px-4 py-3 text-xs cursor-pointer hover:bg-gray-100"
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-xs text-gray-400">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
