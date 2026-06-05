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
}: CustomInputProps) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-xs font-normal leading-3 text-white">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative ">
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="placeholder:text-white/50 placeholder:text-xs text-xs text-white  p-4 h-10 border-b border-white/70 w-full focus:outline-none pr-10 bg-transparent"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute text-white -translate-y-1/2 cursor-pointer right-3 top-1/2"
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
