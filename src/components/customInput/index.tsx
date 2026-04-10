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

export default function CustomInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  required = false,
  disabled = false,
  className = "",
  white = false,
}: CustomInputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-xs font-normal leading-3 text-heading1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`placeholder:text-heading1/36 Roboto placeholder:text-xs text-xs rounded-md p-4 h-10 w-full focus:outline-none ${
          white ? "bg-white" : "bg-[#ECF0F4]"
        } ${className}`}
      />
    </div>
  );
}
