import type { TextareaHTMLAttributes } from "react";

interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
}

export default function CustomTextarea({
  className = "",
  label = "Enter text...",
  ...props
}: CustomTextareaProps) {
  return (
    <div className="relative w-full">
      <label className="bg-white px-1 text-xs leading-4 text-heading1">
        {label}
      </label>
      <textarea
        {...props}
        style={{ resize: "none" }}
        className={`rounded-md w-full bg-[#ECF0F4] h-25 px-3 placeholder:text-heading1/36 py-2 placeholder:text-xs text-xs outline-none ${className}`}
      />
    </div>
  );
}
