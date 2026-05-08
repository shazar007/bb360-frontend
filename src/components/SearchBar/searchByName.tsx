import { Icon } from "@iconify/react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchByName({ value, onChange }: Props) {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-xs font-normal leading-3 text-heading1">
        Emp Name:
      </label>
      <div className="relative w-full">
        <input
          placeholder="Search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9 w-full bg-[#ECF0F4] placeholder:text-sm h-10 pr-4 rounded-lg focus:outline-none"
        />

        <div className="absolute inset-y-0 left-0 flex items-center gap-3 pl-3 pointer-events-none">
          <Icon icon="circum:search" color="#7d7d7d" />
        </div>
      </div>
    </div>
  );
}
