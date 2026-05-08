import { Icon } from "@iconify/react";
import React, { useState } from "react";

type CustomInputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  white?: boolean;
};

export default function PasswordFeild({
  label,
  placeholder,
  type = "password",
  value,
  onChange,
  name,
  required = false,
  disabled = false,
  className = "",
  white = false,
}: CustomInputProps) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-xs font-normal leading-3 text-heading1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`placeholder:text-heading1/36 placeholder:text-xs text-xs rounded-md p-4 h-10 w-full focus:outline-none pr-10 ${
            white ? "bg-white" : "bg-[#ECF0F4]"
          } ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute text-gray-500 -translate-y-1/2 cursor-pointer right-3 top-1/2"
          >
            {show ? (
              <Icon
                icon="ant-design:eye-invisible-twotone"
                className="text-xl"
              />
            ) : (
              <Icon icon="ant-design:eye-twotone" className="text-xl" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
