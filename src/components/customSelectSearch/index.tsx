import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { SyncLoader } from "react-spinners";

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
  title?: string;
  className?: string;
  white?: boolean;
  loading?: boolean;
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
  title,
  className = "",
  white = false,
  loading = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selected = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    String(opt.label).toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        title={disabled ? title : undefined}
        onClick={() => {
          if (disabled || loading || options.length === 0) return;
          setOpen((prev) => !prev);
        }}
        onBlur={onBlur}
        className={`flex items-center justify-between h-10 px-4 rounded-md text-xs
        ${white ? "bg-white" : "bg-[#ECF0F4]"}
        ${
          disabled || loading
            ? "opacity-100 cursor-not-allowed"
            : "cursor-pointer"
        }
        ${className}`}
      >
        <span className={selected ? "text-black" : "text-gray-400"}>
          {loading ? (
            <SyncLoader color="#14CCC3" size={6} speedMultiplier={0.6} />
          ) : (
            (selected?.label ?? placeholder)
          )}
        </span>

        <Icon
          icon="mdi:chevron-down"
          width="18"
          className={`transition-transform text-heading1/36 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="absolute z-50 w-full py-2 mt-1 bg-white rounded-md shadow-md top-full">
          <div className="p-2 border-b">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 text-xs border-[0.5px] border-gray-300 h-10 rounded outline-none"
            />
          </div>{" "}
          {loading ? (
            <div className="px-4 py-3 text-xs text-gray-400">
              <SyncLoader color="#14CCC3" size={6} speedMultiplier={0.6} />
            </div>
          ) : (
            <>
              <div className="overflow-auto max-h-48">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                        setSearch("");
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
