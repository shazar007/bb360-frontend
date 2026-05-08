import { useState } from "react";

export default function CustomToggles({ label }: any) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      {label && (
        <label className="text-heading1 text-xs font-normal leading-3 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3 ">
        <button
          onClick={() => setEnabled(!enabled)}
          className={`w-10 h-6 flex items-center rounded-full p-1 transition duration-300 
          ${enabled ? "bg-secondary" : "bg-gray-300"}`}
        >
          <div
            className={`bg-white w-4.5 cursor-pointer h-4.5 rounded-full shadow-md transform transition duration-300 
            ${enabled ? "translate-x-4" : "translate-x-0"}`}
          />
        </button>
      </div>
    </div>
  );
}
