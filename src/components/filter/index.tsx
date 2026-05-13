import { Icon } from "@iconify/react";
import CustomDatePicker from "../datePicker";
import CustomSelect from "../customSelect";
import { useState } from "react";

const optionsData = {
  item: [
    { label: "Laptop", value: "laptop" },
    { label: "Mouse", value: "mouse" },
    { label: "Keyboard", value: "keyboard" },
  ],
  department: [
    { label: "IT", value: "it" },
    { label: "Finance", value: "finance" },
    { label: "HR", value: "hr" },
  ],
  req: [
    { label: "REQ001", value: "req001" },
    { label: "REQ002", value: "req002" },
    { label: "REQ003", value: "req003" },
  ],
  vendor: [
    { label: "Vendor A", value: "vendor_a" },
    { label: "Vendor B", value: "vendor_b" },
    { label: "Vendor C", value: "vendor_c" },
  ],
  create: [
    { label: "RFQ", value: "rfq" },
    { label: "PO", value: "po" },
    { label: "Both", value: "both" },
  ],
};

type FiltersProps = {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
};

export default function Filters({
  isOpen = false,
  onClose,
  title = "Filters",
}: FiltersProps) {
  const [values, setValues] = useState({
    item: "",
    department: "",
    req: "",
    vendor: "",
    create: "",
  });
  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div
      style={{ boxShadow: "-4px 0px 24px 0px #00000029" }}
      className={`fixed top-0 right-0 w-110 flex flex-col h-screen bg-bgprimary rounded-tl-2xl rounded-bl-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex justify-between items-center p-6 border-b border-heading1/36">
        <h2 className="text-xs text-heading1 font-semibold">{title}</h2>
        <Icon
          icon="gridicons:cross"
          onClick={onClose}
          className="text-gray-500 text-[20px] hover:text-gray-800 cursor-pointer"
        />
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <p className="text-heading1 text-sm">Select Date Range</p>
        <div className="space-y-4">
          <CustomDatePicker white label="From Date" />{" "}
          <CustomDatePicker white label="To Date" />
        </div>
        <div className="mt-4.5">
          <p className="text-heading1 text-sm mb-4.5">Select Details</p>
          <div className="space-y-4">
            <CustomSelect
              white
              label="Item"
              options={optionsData.item}
              value={values.item}
              onChange={(val) => handleChange("item", val)}
            />

            <CustomSelect
              white
              label="Department"
              options={optionsData.department}
              value={values.department}
              onChange={(val) => handleChange("department", val)}
            />

            <CustomSelect
              white
              label="Req #"
              options={optionsData.req}
              value={values.req}
              onChange={(val) => handleChange("req", val)}
            />

            <CustomSelect
              white
              label="Vendor"
              options={optionsData.vendor}
              value={values.vendor}
              onChange={(val) => handleChange("vendor", val)}
            />

            <CustomSelect
              white
              label="Create RFQ & PO"
              options={optionsData.create}
              value={values.create}
              onChange={(val) => handleChange("create", val)}
            />
          </div>
        </div>{" "}
      </div>
      <div className="p-4 border-t border-heading1/36">
        <button
          style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
          className="w-full bg-secondary text-white h-10 gap-2 rounded-md text-sm cursor-pointer flex justify-center items-center transition"
        >
          <Icon icon="mynaui:search" className="text-white text-[20px]" />
          Find
        </button>
      </div>
    </div>
  );
}
