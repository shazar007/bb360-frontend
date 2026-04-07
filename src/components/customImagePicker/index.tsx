import React, { useRef } from "react";
import { Icon } from "@iconify/react";

type CustomImagePickerProps = {
  label?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
};

export default function CustomImagePicker({
  label,
  value,
  onChange = () => {},
  required = false,
  disabled = false,
  className = "",
  name,
  placeholder = "Select image",
}: CustomImagePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    } else {
      onChange(null);
    }
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-heading1 text-xs mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`relative cursor-pointer ${disabled ? "opacity-50" : ""}`}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept="image/*"
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <div
          className={`w-full h-10 px-4 flex items-center text-xs rounded-md bg-[#ECF0F4] ${className}`}
        >
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:image-outline"
              width="18"
              className="text-gray-400"
            />
            <span className={!value ? "text-gray-400" : ""}>
              {value ? value.name : placeholder}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
