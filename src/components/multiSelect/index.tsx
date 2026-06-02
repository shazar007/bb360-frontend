import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
  uom?: string;
};

type MultiSelectProps = {
  label?: string;
  options?: Option[];
  value?: string[];
  onChange?: (values: string[]) => void;
  onQuantityChange?: (id: string, qty: string) => void;
  quantities?: Record<string, string>;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function MultiSelect({
  label,
  options = [],
  value = [],
  onChange = () => {},
  onQuantityChange = () => {},
  quantities = {},
  onBlur = () => {},
  placeholder = "Select options",
  required = false,
  disabled = false,
  className = "",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const selected = new Set(value);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
        onBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) searchRef.current?.focus();
    else setSearch("");
  }, [open]);

  const toggle = (val: string) => {
    const next = new Set(selected);
    next.has(val) ? next.delete(val) : next.add(val);
    onChange([...next]);
  };

  const removeTag = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== val));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  // Selected options with full data (for showing rows below)
  const selectedOptions = value
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean) as Option[];

  return (
    <div className="flex flex-col gap-1" ref={dropdownRef}>
      {label && (
        <label className="text-xs text-heading1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Trigger */}
      <div
        onClick={() => {
          if (!disabled) setOpen((p) => !p);
        }}
        className={`relative flex items-center justify-between min-h-10 px-3 rounded-md bg-[#ECF0F4]
          ${open ? "rounded-b-none" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${className}`}
      >
        <div className="flex flex-wrap gap-1 flex-1 py-1.5">
          {value.length === 0 ? (
            <span className="text-xs text-gray-400">{placeholder}</span>
          ) : (
            value.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-[11px] px-2 py-0.5 rounded-full"
                >
                  {opt?.label}
                  <span
                    onClick={(e) => removeTag(e, val)}
                    className="text-sm leading-none cursor-pointer opacity-70 hover:opacity-100"
                  >
                    ×
                  </span>
                </span>
              );
            })
          )}
        </div>
        <Icon
          icon="mdi:chevron-down"
          width="18"
          className={`flex-shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />

        {/* Dropdown */}
        {open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute z-50 left-0 right-0 top-full bg-white border border-gray-200 border-t-0 rounded-b-md shadow-md"
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
              <Icon
                icon="mdi:magnify"
                width="16"
                className="text-gray-400 flex-shrink-0"
              />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="flex-1 text-xs outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>

            {/* Options */}
            <div className="max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-3">
                  No options found
                </p>
              ) : (
                filtered.map((opt) => (
                  <div
                    key={opt.value}
                    className={`flex items-center gap-2.5 px-3 py-2 ${
                      selected.has(opt.value) ? "bg-blue-50" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      onClick={() => toggle(opt.value)}
                      className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors cursor-pointer
            ${selected.has(opt.value) ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
                    >
                      {selected.has(opt.value) && (
                        <Icon
                          icon="mdi:check"
                          width="11"
                          className="text-white"
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      onClick={() => toggle(opt.value)}
                      className="text-xs flex-1 cursor-pointer"
                    >
                      {opt.label}
                    </span>

                    {/* Quantity Input + UOM — sirf selected hone pe active */}
                    <div
                      className="flex items-center gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="number"
                        min={0}
                        value={quantities[opt.value] || ""}
                        onChange={(e) =>
                          onQuantityChange(opt.value, e.target.value)
                        }
                        placeholder="Qty"
                        disabled={!selected.has(opt.value)}
                        className={`w-16 h-7 px-2 text-xs rounded-md border bg-white outline-none transition-colors
              ${
                selected.has(opt.value)
                  ? "border-gray-300 focus:border-blue-400"
                  : "border-gray-200 opacity-35 pointer-events-none"
              }`}
                      />
                      {opt.uom && (
                        <span className="text-[11px] text-gray-500 font-medium min-w-[18px]">
                          {opt.uom}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
              <span className="text-[11px] text-gray-400">
                {value.length} selected
              </span>
              {value.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-[11px] text-blue-500 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
