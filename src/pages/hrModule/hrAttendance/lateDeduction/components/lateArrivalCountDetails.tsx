import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import CustomSelect from "../../../../../components/customSelect";
import CustomToggles from "../../../../../components/custontogles";

interface Props {
  onClose: () => void;
}

export default function LateArrivalCountDetails({ onClose }: Props) {
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowDrawer(true);
    }, 10);
  }, []);

  const handleClose = () => {
    setShowDrawer(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };
  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex justify-end bg-black/20 transition-opacity duration-300  ${
        showDrawer ? "opacity-100" : "opacity-0"
      }`}
    >
      {" "}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-t-2xl w-full max-w-152.5 h-screen bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D8DEE6] ">
          <p className="text-base font-semibold text-heading1">
            Late Arrival Count Details
          </p>

          <button
            onClick={handleClose}
            className="text-2xl cursor-pointer text-[#302250]"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div className="p-6">
          <div className="w-full md:w-60">
            <CustomSelect label="Status" placeholder="Pending" />
          </div>
        </div>

        <div className="w-full">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-[#ECF0F4]">
                {[
                  "Date",
                  "Shift Start Time",
                  "Actual Time-in",
                  "Minutes Late",
                  "Action",
                ].map((item, index) => (
                  <th
                    key={index}
                    className="px-2 h-12 text-[11px] font-semibold text-center text-heading1 border border-[#D8DEE6]"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[
                ["12-May-2026", "09:00 AM", "09:34 AM", "34 Mins"],
                ["12-May-2026", "09:00 AM", "09:34 AM", "14 Mins"],
                ["12-May-2026", "09:00 AM", "09:34 AM", "25 Mins"],
                ["12-May-2026", "09:00 AM", "09:34 AM", "08 Mins"],
              ].map((row, index) => (
                <tr key={index} className="border-b border-[#E5E7EB]">
                  <td className="h-14 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                    {row[0]}
                  </td>

                  <td className="h-14 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                    {row[1]}
                  </td>

                  <td className="h-14 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                    {row[2]}
                  </td>

                  <td className="h-14 px-4 text-xs text-center text-heading1 border-r border-[#E5E7EB]">
                    {row[3]}
                  </td>

                  <td className="h-14 px-4 border-r border-[#E5E7EB]">
                    <div className="flex items-center justify-center">
                      <CustomToggles />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
