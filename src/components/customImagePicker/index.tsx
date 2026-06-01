import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { SyncLoader } from "react-spinners";
import { uploadFile } from "../../api/employeesServices";

type CustomImagePickerProps = {
  label?: string;
  value?: string | null;
  onChange?: (url: string | null) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
};

export default function CustomImagePicker({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  name,
  placeholder = "Select image",
}: CustomImagePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!disabled && !loading) {
      inputRef.current?.click();
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      const response = await uploadFile(file, "images");
      const imageUrl = response?.data?.data?.url || response?.data?.url;

      if (onChange && imageUrl) {
        onChange(imageUrl);
      }
    } catch (error) {
      console.log("Upload Error => ", error);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange(null);
    }
  };

  const fileName = typeof value === "string" ? value.split("/").pop() : "";

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-xs text-heading1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`relative ${
          disabled || loading
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept="image/*"
          onChange={handleChange}
          disabled={disabled || loading}
          className="hidden"
        />

        <div
          className={`w-full h-10 px-3 flex items-center justify-between text-xs rounded-md bg-[#ECF0F4] ${className}`}
        >
          <div className="flex items-center gap-2">
            {value && !loading ? (
              <div
                className="overflow-hidden bg-center bg-cover rounded w-7 h-7"
                style={{
                  backgroundImage: `url(${value})`,
                }}
              />
            ) : (
              <Icon
                icon="material-symbols-light:image-outline-rounded"
                width="22"
                className="text-gray-400"
              />
            )}

            <span
              className={
                !fileName
                  ? "text-gray-400"
                  : "text-heading1 text-[10px] line-clamp-2"
              }
            >
              {loading ? (
                <SyncLoader color="#14CCC3" size={6} speedMultiplier={0.6} />
              ) : (
                fileName || placeholder
              )}
            </span>
          </div>

          {value && !loading && (
            <button
              onClick={handleClear}
              className="rounded-full cursor-pointer"
              type="button"
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
